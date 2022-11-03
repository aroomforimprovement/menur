const mongoUtil = require('../util/mongo-util');
const ctrlUtil = require('../util/controller-util');

module.exports = {
    isValidSettingsUpdate: (req) => {
        console.log('isValidSettingsUpdate?');
        const body = req.body;
        console.dir(body);
        const userid = body.userid;
        const settings = body.settings;
        if(ctrlUtil.isRequesterOwner(req) && userid && userid.length === 24
            && settings && (settings.defaultServings || settings.displayName)){
                return {isValid: true, userid: userid, settings: settings};
        }else{
            return {isValid: false};
        }
    },
    updateDefaultServings: async (data, res) => {
        const db = await mongoUtil.getDb();
        try{
            db.collection('menur')
                .updateOne({'userid': data.userid},
                {$set: {defaultServings: data.settings.defaultServings}},
                (err, result) => {
                    if(err){
                        console.error(error);
                        res.status(500).send("Error updating defaultServings");
                    }else if(result){
                        console.dir("ModifiedCount: " + result.modifiedCount);
                        if(result.modifiedCount == 1){
                            console.log("defaultServings updated ok");
                            res.status(201).send("defaultServings updated ok");
                        }else{
                            console.log("defaultServings not updated")
                            res.status(200).send("defaultServings not updated");
                        }
                        
                    }else{
                        console.log("defaultServings result not ok");
                        console.dir(result);
                        res.status(500).send("Something went wrong updating defaultServings");
                    }
                });
        }catch(error){
            console.error(error);
            res.status(500).send("Error updating defaultServings");
        }
    },
    updateDisplayName: async (data, res) => {
        const db = await mongoUtil.getDb();
        db.collection('menur').updateOne({userid: data.userid},
            {$set: {username: data.settings.displayName}},
            (err, result) => {
                if(err){
                    console.error(error);
                    res.status(500).send("Error updating DisplayName");
                }
                if(result){
                    console.dir(result);
                    if(result.modifiedCount == 1){
                        res.status(201).send("DisplayName updated ok");
                    }else{
                        res.status(200).send("DisplayName not updated");
                    }
                    
                }else{
                    console.log("DisplayName result not ok");
                    console.dir(result);
                    res.status(500).send("Something went wrong updating DisplayName");
                }
            });
    },
    updateSettings: async (data, res) => {
        const db = await mongoUtil.getDb();
        if(data.settings.defaultServings){
            module.exports.updateDefaultServings(data, res);
        }
        if(data.settings.displayName){
            module.exports.updateDisplayName(data, res);
        }
    }
}