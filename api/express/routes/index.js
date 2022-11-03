const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("reached GET /")
    res.status(200).send("It looks like you're trying get a look at my back end :O");
});

module.exports = router;