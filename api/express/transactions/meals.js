const { getClient, getDb, transactionOptions } = require('../util/mongo-util');
const { getLastDocumentId } = require('../util/transaction-util');
const { MongoError } = require('mongodb');
const transactionUtil = require('../util/transaction-util');

module.exports = {
    newMeal: async (data) => {
        const db = await getDb();
        const client = await getClient();
        
        const userId = data.userid;
        
        const session = client.startSession();
        try{
            session.startTransaction(transactionOptions);
            try{
                const mealsId = await getLastDocumentId('Meals', userId, db, session);

                const mealsResult = await db.collection('Meals')
                    .updateOne(
                        {_id: mealsId}, 
                        {$addToSet: { meals: data.meal }},
                        { session }
                );
                if(mealsResult && mealsResult.modifiedCount){
                    await session.commitTransaction();
                    return {ok: 1};
                }
            }catch(error){
                transactionUtil.handleTransactionError(data, module.exports.newMeal, error);
                await session.abortTransaction();
            }finally{
                await session.endSession();
            }
        }catch(error){
            await session.abortTransaction();
        }finally{
            await session.endSession();
        }
    },
    updateMeal: async (data) => {
        const db = await getDb();
        const client = await getClient();

        const userId = data.userid;
        const mealId = data.meal.id;

        const session = client.startSession();
        try{
            session.startTransaction();

            try{
                const result = await db.collection('Meals')
                    .updateOne(
                        {userid: data.userid, 'meals.id': data.meal.id},
                        {$set: {'meals.$': data.meal}}
                );
                if(result && result.modifiedCount == 1){
                    return {ok: 1};
                }
            }catch(error){
                transactionUtil.handleTransactionError(data, module.exports.updateMeal, error);
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
