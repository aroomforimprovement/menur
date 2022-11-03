const mongoUtil = require('../util/mongo-util');
const ctrlUtil = require('../util/controller-util');
const { newPlan } = require('../transactions/plan');

module.exports = {
    addPlan: async (data, res) => {
        const db = await mongoUtil.getDb();
        let result;
        if(await ctrlUtil.hasExistingAccount(data)){
            console.log("hasExistingAccount");
            try{
                const exists = await module.exports.isExistingPlan(data);
                if(exists){
                    console.log("updatingPlan");
                    module.exports.updatePlan(data, res);
                }else{
                    console.log("addingNewPlan");
                    module.exports.addNewPlan(data, res);
                }
            }catch(error){
                console.error(error);
                res.status(500).send("error saving mealplan");
            }
        }
    },
    addNewPlan: async (data, res) => {
        const result = await newPlan(data);
        if(result){
            console.log("result ok, returning 201");
            res.status(201).send(result);
        }else{
            console.log(`error, returning 500 ${err}`);
            res.status(500).send(`Error saving mealplan to account`);        
        }
    },
    deletePlanById: async (id, userid, res) => {
        const db = await mongoUtil.getDb();
        console.log(id);
        console.log(userid);
        try{
            db.collection('Plans')
                .updateOne({'userid': userid},
                {$pull: {plans: {id: id}}},
                (err, result) => {
                    if(err){
                        console.error(error);
                        res.status(500).send("Error deleting plan");
                    }
                    if(result && result.modifiedCount > 0){
                        console.dir(result);
                        res.status(201).send("Plan deleted ok");
                    }else{
                        console.log("result not ok");
                        console.dir(result);
                        res.status(500).send("Something went wrong deleting the plan");
                    }
                })
        }catch(error){
            console.error(error);
            res.status(500).send("Error deleting the plan");
        }
    },
    hasPlan: async (userid, id) => {
        const db = await mongoUtil.getDb();
        let hasPlan;
        try{
            hasPlan = await db.collection('Plans')
            .countDocuments({userid: userid, 'plans.id': id});
        }catch(error){
            console.error(error);
        }
        console.log(`hasPlan: ${hasPlan}`);
        return hasPlan;
    },
    isExistingPlan: async (data) => {
        const db = await mongoUtil.getDb();
        let exists = 0;
        console.dir(data.mealplan);
        try{
            exists = await db.collection('Plans').countDocuments(
                {userid: data.userid, 'plans.id': data.mealplan.id}
            );
        }catch(error){
            return error;
        }
        console.log("Exists: "+exists);
        return exists;
    },
    isValidDeletePlanReq: async (req) => {
        console.log('isValidDeletePlanReq?');
        const id = req.params[0];
        if(req.user && req.user && req.user.sub){
            const userid = req.user.sub.replace('auth0|', '');
            let hasPlan;
            try{
                hasPlan = await module.exports.hasPlan(userid, id);
            }catch(error){
                console.error(error);
                return {isValid: false};
            }
            if(hasPlan){
                console.log('isValidDeletePlanReq');
                return {userid: userid, id: id, isValid: true};
            }else{
                console.log('isNOTValidDeletePlanReq');
                return {isValid: false};
            }
        }else{
            console.log('isNOTValidDeletePlanReq');
            return {isValid: false};
        }
    },
    isValidPlanReq: (req) => {
        console.log('isValidPlanReq?');
        const body = req.body;
        console.dir(body);
        const userid = body.userid;
        const mealplan = body.mealplan;
        if(ctrlUtil.isRequesterOwner(req) && userid && 
            userid.length === 24 
            && mealplan && mealplan.id && mealplan.mealplan){
            console.log('isValidPlanReq');
            return {isValid: true, userid: userid, mealplan: mealplan};
        }else{
            return {isValid: false};
        }
    },
    updatePlan: async (data, res) => {
        const db = await mongoUtil.getDb();
        try{
            await db.collection('Plans').updateOne(
                {userid: data.userid, 'plans.id': data.mealplan.id},
                {$set: {'plans.$': data.mealplan}},
                (err, result) => {
                    if(result && result.modifiedCount == 1){
                        console.log(result);
                        res.status(201).send(result);
                    }else if(err){
                        console.log(err);
                        res.status(500).send("Error updating the resource: " + err);
                    }
                }
            )
       }catch(error){
            console.error(error);
        }
    }
}