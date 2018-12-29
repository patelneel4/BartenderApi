const express = require('express');
const router = express.Router();
const PinController = require('../../controller/pinController');
const pinController = new PinController();

router.post("/set", function (req, res) {
    console.log("POST REQ: " + req.body.pin);
    res.end(pinController.write(req.body.pin, req.body.state));
});

router.get("/:id", function (req, res) {

    console.log("POST REQ: " + req.body.pin);
    var pin = pinController.read(req.body.pin);
     res.end(JSON.stringify(pin));
});
module.exports = router;