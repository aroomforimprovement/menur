const mongoUtil = require('../util/mongo-util');
const ctrlUtil = require('../util/controller-util');
const transactions = require('../transactions/app');
const { auth } = require('express-openid-connect');
const fetch = require('node-fetch');
const authUtil = require('../util/auth-util');

const here = 'controllers/app: ';

module.exports = {
    addLogin: async (data, res) => {
        const sig = 'addLogin: ';
        console.debug(`${here}${sig}`);
        let login;
        if(await ctrlUtil.hasExistingAccount(data)){
            console.debug(`${here}${sig} account exists`);
            try{
                login = await module.exports.addLoginEntry(data);
            }catch(error){
//                console.error(`${here}${sig}${error}`);
                console.error(`${here}${sig} error`);
            }
            if(login){
                try{
                    module.exports.getAccountFromId(data.userid, res);
                }catch(error){
                    console.error(error);
                    res.status(500).send("Error retrieving account info");
                }
            }else{
                console.error("login not ok, returning 500");
                res.status(500).send("Error recording login");
            }
        }else{
            module.exports.createAccount(data, res);
        }
    },
    addLoginEntry: async (data) => {
        const db = await mongoUtil.getDb();
        const val = new Date();
        let result;
        try{
            result = await db.collection('menur')
                .updateOne({userid: data.userid}, {$set: {loggedin: val}});
            if(result){
                console.dir(result);
            }
        }catch(error){
            console.error(error);
            return false;
        }
        return result;
    },
    createAccount: async (data, res) => {
        const db = await mongoUtil.getDb();
        const email = data.email;
        try{
            count = await db.collection('menur').countDocuments({ email: email});
        }catch (error) {
            console.error(error);
            res.status(500).send("Error creating new user");
        }
        if(count === 0){
            const account = module.exports.getNewAccountFromReq(data);
            let commit;
            try{
                commit = await transactions.newAccount(account);
            }catch(error){
                console.error(error);
                res.status(500).send("Error creating new account");
            }
            if(commit && commit.ok){
                module.exports.getAccountFromId(data.userid, res);
            }else{
                res.status(500).send("Error creating new account");
            }
        }else{
            res.status(500).send("An account already exists for that email");
        }
    },
    getAccountFromId: async (id, res) => {
        const db = await mongoUtil.getDb();
        let result;
        try{
            result = await transactions.getAccount(id);
        }catch (error){
            console.error(error);
            res.status(500).send("Error retieving account info");
        }
        if(result && result.ok){
            res.status(201).send(result.account);
        }else{
            res.status(500).send("Something went wrong retrieving account info");
        }
    },
    getNewAccountFromReq: (data) => {
        const joined = new Date();
        return {
            userid: data.userid ? data.userid : "ERROR",
            email: data.email ? data.email : "ERROR",
            username: data.username ? data.username : '',
            joined: joined,
            loggedin: joined,
            meals: {userid: data.userid, meals: []},
            plans: {userid: data.userid, plans: []}
        }
    },
    isValidLoginReq: (req) => {
        console.log('isValidLoginReq?');
        const body = req.body;
        console.dir(body);
        const userid = body.userid;
        const email = body.email;
        const username = body.username ? body.username : '';
        if(ctrlUtil.isRequesterOwner(req) && email && email.length > 6 && email.indexOf('@') > -1
            && email.indexOf('.') > -1 && userid.length === 24){
            console.log('isValidLoginReq');
            return {isValid: true, userid: userid, email: email,
                username: username}
        }else{
            console.log('isNOTValidLoginReq');
            return {isValid: false}
        }
    },
    resendVerification: async (req, res) => {
        const endpoint = `https://${process.env.AUTH_DOMAIN}/api/v2/jobs/verification-email`;
        const token = await authUtil.getAuthManToken();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const body = JSON.stringify(req.body);
        const response = await fetch(endpoint, {method: 'POST', headers: headers, body: body});
        const data = await response.json();
        console.dir(data);
        if(data && data.type){
            res.status(200).send(`Verification email resent: ${data.id}`);
        }else{
            res.status(500).send("There was a problem sending the verification email");
        }
    }
}