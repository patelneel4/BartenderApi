const express = require('express');
const router = express.Router();
const PinController = require('../../controller/pinController');
const pinController = new PinController();

router.post("/set", function (req, res) {
    console.log("POST REQ: " + req.body.gpio);
    var result = pinController.write(req.body.gpio, req.body.time)
    .then(()=>{
        res.end();
    });
});

router.get("/:id", function (req, res) {

    console.log("POST REQ: " + req.params.gpio);
    var pin = pinController.read(req.params.gpio)
        .then((data) => {
            res.end(JSON.stringify(data));
        });
});
module.exports = router;