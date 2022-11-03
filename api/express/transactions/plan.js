const { getClient, getDb, transactionOptions } = require('../util/mongo-util');
const { getLastDocumentId } = require('../util/transaction-util');
const { MongoError } = require('mongodb');
const transactionUtil = require('../util/transaction-util');

module.exports = {
    newPlan: async (data) => {
        const db = await getDb();
        const client = await getClient();

        const userId = data.userid;

        const session = client.startSession();
        try{
            session.startTransaction(transactionOptions);
            try{
                const plansId = await getLastDocumentId('Plans', userId, db, session);

                const plansResult = await db.collection('Plans')
                .updateOne(
                    {_id: plansId},
                    {$addToSet: {plans: data.mealplan}},
                    { session }
                );
                if(plansResult && plansResult.modifiedCount){
                    await session.commitTransaction();
                    return {ok: 1};
                }
            }catch(error){
                transactionUtil.handleTransactionError(data, module.exports.newPlan, error);
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
