const express = require('express');
const router = express.Router();
const controller = require('../controllers/app');
const util = require('../util/routes-util');
const here = "routes/app: ";

const handleLogin = (req, res) => {
    const sig = 'handleLogin: ';
    console.debug(`${here}${sig}`);
    //if(req.method === 'OPTIONS') { return res.status(200).json(({ body: "OK" })) }
    const checkedData = controller.isValidLoginReq(req);
    if(checkedData.isValid){
        controller.addLogin(checkedData, res);
    }else{
        res.status(400).send("Bad request");
    }
}

router.post('/login', util.jwtCheck(false), (req, res) => {
    console.log('reached POST /app/login');
    handleLogin(req, res);
});

router.post('/verify', util.jwtCheck(false), (req, res) => {
    console.log('reached POST /app/verify');
    controller.resendVerification(req, res);
})

module.exports = router;