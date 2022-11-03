const express = require('express');
const router = express.Router();
const controller = require('../controllers/settings');
const util = require('../util/routes-util');

router.post('/', util.jwtCheck(false), (req, res) => {
    console.log('reached POST /settings');
    console.dir(req.body);
    const checkedData = controller.isValidSettingsUpdate(req);
    console.log(checkedData.isValid);
    if(checkedData.isValid){
        controller.updateSettings(checkedData, res)
    }else{
        res.status(400).send("Bad request");
    }
});

module.exports = router;