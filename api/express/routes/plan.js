const express = require('express');
const router = express.Router();
const controller = require('../controllers/plan');
const util = require('../util/routes-util');

router.delete('/*', util.jwtCheck(false), async (req, res) => {
    console.log('reached DELETE /plan/*');
    console.log(req.params[0]);
    const checkedData = await controller.isValidDeletePlanReq(req);
    console.log(`checkedDataIsValid: ${checkedData.isValid}`);
    if(checkedData.isValid){
        controller.deletePlanById(checkedData.id, checkedData.userid, res);
    }else{
        res.status(400).send("Bad request");
    }
});

router.post('/', util.jwtCheck(false), (req, res) => {
    console.log('reached POST /plan');
    console.dir(req.body);
    const checkedData = controller.isValidPlanReq(req);
    if(checkedData.isValid){
        console.log("isValidPlanReq");
        controller.addPlan(checkedData, res);
    }else{
        console.log("isNOTValidPlanReq");
        res.status(400).send("Bad request");
    }
});

module.exports = router;