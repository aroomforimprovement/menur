const mongoUtil = require('./mongo-util.js');

const here = 'util: controller-util: ';

module.exports = {
    hasExistingAccount: async (data) => {
        const sig = 'hasExistingAccount?: ';
        console.debug(`${here}${sig}`);
        let count;
        const db = await mongoUtil.getDb();
        try{
            count = await db.collection('menur').countDocuments({userid: data.userid});
        }catch(error){
            console.error(error);
        }
        console.log(`count: ${count}`);
        if(!count || count === 0){
            return false;
        }else{
            return true;
        }
    },
    isRequesterOwner: (req) => {
        if(req.user.sub.replace('auth0|', '') === req.body.userid){
            return true;
        }
        return false;
    }
}