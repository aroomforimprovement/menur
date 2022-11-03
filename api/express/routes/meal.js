const express = require('express');
const router = express.Router();
const controller = require('../controllers/meal');
const util = require('../util/routes-util');


router.post('/', util.jwtCheck(false), (req, res) => {
    console.log('reached POST /meal');
    console.dir(`${req.body}`);
    const checkedData = controller.isValidMealReq(req);
    if(checkedData.isValid){
        controller.addMeal(checkedData, res);
    }else{
        res.status(400).send("Bad request");
    }
});
    
router.post('/*', util.jwtCheck(false), async (req, res) => {
    console.log(`reached POST /meal/*`);
    console.log(`${req.params[0]}`);
    const checkedData = await controller.isValidUpdateMealReq(req);
    if(checkedData.isValid){
        controller.updateMeal(checkedData, res);
    }else{
        res.status(400).send("Bad request");
    }
});
    
router.delete('/*', util.jwtCheck(false), async (req, res) => {
    console.log('reached DELETE /meal/*');
    console.log(`${req.params[0]}`);
    const checkedData = await controller.isValidDeleteMealReq(req);
    console.log(`checkedDataIsValid: ${checkedData.isValid}`);
    if(checkedData.isValid){
        controller.deleteMealById(checkedData.id, checkedData.userid, res);
    }else{
        res.status(400).send("Bad request");
    }
});

module.exports = router;