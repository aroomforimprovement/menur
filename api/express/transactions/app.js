const { getClient, getDb, transactionOptions } = require('../util/mongo-util');
const { MongoError } = require('mongodb');

module.exports = {
    newAccount: async (accObj) => {
        const client = await getClient();
        const db = await getDb();

        const session = client.startSession();

        try{
            session.startTransaction(transactionOptions);
            try{
                const mealsResult = await db.collection('Meals')
                    .insertOne(accObj.meals, { session });
                accObj.meals = mealsResult.insertedId;

                const plansResult = await db.collection('Plans')
                    .insertOne(accObj.plans, { session });
                accObj.plans = plansResult.insertedId;

                await db.collection('menur')
                    .insertOne(accObj, { session });
                const commit = await session.commitTransaction();
                return commit;
            }catch(error){
                console.error(error);
                if(error instanceof MongoError && error.hasErrorLabel('UnknownTransactionCommitResult')){
                    return {ok: 0};
                }else if(error instanceof MongoError && error.hasErrorLabel('TransientTransactionError')){
                    module.exports.newAccount(accObj);
                }
                await session.abortTransaction();
            }finally{
                await session.endSession();
            }
        }catch(error){
            console.error(error);
            await session.abortTransaction();
        }finally{
            await session.endSession();
        }
    },
    getAccount: async (id) => {
        const client = await getClient();
        const db = await getDb();

        const session = client.startSession();

        try{
            session.startTransaction(transactionOptions);

            try{
                const accountResult = await db.collection('menur')
                    .findOne({userid: id}, { session });
                
                const meals = [];
                const mealsCursor = db.collection('Meals')
                .find({userid: id}, { session });
                await mealsCursor.forEach((doc) => {
                    doc.meals.forEach((meal) => {
                        meals.push(meal);
                    });
                });
                accountResult.meals = meals;

                const plans = [];
                const plansCursor = db.collection('Plans')
                .find({userid: id}, { session });
                await plansCursor.forEach((doc) => {
                    doc.plans.forEach((plan) => {
                        plans.push(plan);
                    });
                });
                accountResult.plans = plans;

                return {ok: 1, account: accountResult};

            }catch(error){
                console.error(error);
                if(error instanceof MongoError && error.hasErrorLabel('UnknownTransactionCommitResult')){
                    return {ok: 0};
                }else if(error instanceof MongoError && error.hasErrorLabel('TransientTransactionError')){
                    module.exports.getAccount(id);
                }
                await session.abortTransaction();
            }finally{
                await session.endSession();
            }
        }catch(error){
            await session.abortTransaction();
        }finally{
            await session.endSession();
        }
    }
}
