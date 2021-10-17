const express = require('express');
const router = express.Router();
const PinController = require('../../controller/pinController');
const pinController = new PinController();

router.post("/set", function (req, res) {
    console.log("POST REQ: " + req.body.gpio);
   pinController.write(req.body.gpio, req.body.time).then(() =>{
    res.end();
   });


});

router.get("/:id", function (req, res) {

    console.log("GPIO: " + req.params.id);
    var pin = pinController.read(req.params.id)
     console.log(pin);
     res.end();
});
module.exports = router;