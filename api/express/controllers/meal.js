const mongoUtil = require('../util/mongo-util');
const ctrlUtil = require('../util/controller-util');
const transactions = require('../transactions/meals');

module.exports = {
    addMeal: async (data, res) => {
        const db = await mongoUtil.getDb();
        let result;
        if(await ctrlUtil.hasExistingAccount(data)){
            try{
                const result = await transactions.newMeal(data, data.meal);
                if(result && result.ok){
                    console.log("result ok, returning 201");
                    res.status(201).send(`Meal saved ok: ${result}`);
                }else{
                    console.error(`error, returning 500`);
                    res.status(500).send(`Error saving meal to account`);
                }
            }catch(error){
                console.error(error);
                res.status(500).send("error saving meal");
            }
        }
    },
    deleteMealById: async (id, userid, res) => {
        const db = await mongoUtil.getDb();
        console.log(id);
        console.log(userid);
        try{
            db.collection('Meals')
                .updateOne({'userid': userid},
                    {$pull: {meals: {id: id}}},
                    (err, result) => {
                        console.dir(result);
                        if(err) {
                            console.error(err);
                            res.status(500).send("Error deleting meal");
                        }
                        if(result && result.modifiedCount > 0) {
                            console.dir(result);
                            res.status(201).send("Meal deleted ok")
                        }else{
                            res.status(500).send("Something went wrong deleting the meal");
                        }
                    });
        }catch(error){
            console.error(error);
            res.status(500).send("Error deleting the meal");
        }
    },
    hasMeal: async (userid, id) => {
        const db = await mongoUtil.getDb();
        let hasMeal;
        try{
            hasMeal = await db.collection('Meals')
            .countDocuments({userid: userid, 'meals.id': id});
        }catch(error){
            console.error(error);
        }
        console.log(`hasMeal: ${hasMeal}`);
        return hasMeal;
    },
    isValidDeleteMealReq: async (req) => {
        console.log('isValidDeleteMealReq?');
        const id = req.params[0];
        if(req.user && req.user.sub){
            const userid = req.user.sub.replace('auth0|', '');
            let hasMeal;
            try{
                hasMeal = await module.exports.hasMeal(userid, id);
            }catch(error){
                console.error(error);
                return {isValid: false};
            }
            if(hasMeal){
                console.log('isValidReq');
                return {userid: userid, id: id, isValid: true};
            }else{
                console.log('isNOTValidReq');
                return {isValid: false};
            }
        }else{
            console.log('isNOTValidReq');
            return {isValid: false};
        }
    },
    isValidMealReq: (req) => {
        console.log('isValidMealReq?');
        const body = req.body;
        console.dir(body);
        const userid = body.userid;
        const meal = body.meal;
        if(ctrlUtil.isRequesterOwner(req) && userid && userid.length === 24
            && meal && meal.id ){
            return {isValid: true, userid: userid, meal: meal};
        }else{
            return {isValid: false};
        }
    },
    isValidUpdateMealReq: async (req) => {
        console.log('isValidUpdateMealReq?');
        const id = req.params[0];
        if(req.user && req.user.sub){
            const userid = req.user.sub.replace('auth0|', '');
            let hasMeal;
            try{
                hasMeal = await module.exports.hasMeal(userid, id);
            }catch(error){
                console.error(error);
                return {isValid: false};
            }
            if(hasMeal && req.body.meal ){
                const meal = req.body.meal;
                if(meal.name && meal.name.length > 0
                    && meal.id && meal.id.length > 12){
                        console.log('isValidReq');
                        return {userid: userid, id: id, meal: meal, isValid: true}
                }else{
                    console.log('isNOTValidReq');
                    return {isValid: false};
                }
            }else{
                console.log('isNOTValidReq');
                return {isValid: false};
            }
        }
    },
    updateMeal: async (data, res) => {
        console.log("updateMeal");
        const db = await mongoUtil.getDb();
        if(await ctrlUtil.hasExistingAccount(data)){
            try{
                console.log("trying update");
                const result = await transactions.updateMeal(data);
                if(result && result.ok){
                    console.log(result);
                    res.status(201).send(result);
                }else{
                    console.error(`error udpating ${data.meal.id}`);
                    res.status(500).send(`Error updating the resource: ${err}`);
                }
            }catch(error){
                console.error(error);
            }
        }
    },
}