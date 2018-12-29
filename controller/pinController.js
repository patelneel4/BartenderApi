const gpio = require('gpio');
const ControllerCommon = require('./common/controllerCommon');
const Pin = require('../model/pin');

class PinController {
    constructor() {

    }

    write(param, state, err) {

        var gpiop = gpio.export(param, {
            direction: gpio.DIRECTION.OUT,
            interval: 150,
            ready: function () {
                gpiop.set(state, function(){
                    console.log(gpiop.value);
                });
            }
        });
       
       // gpiop.unexport();
    }

    read(param, err) {

        var gpiop = gpio.export(param, {
            direction: gpio.DIRECTION.IN,
            ready: function () {
                console.log("Finished read function")
            }
        });
        return new Pin(param, gpiop.value);
       
       
       

    }
}
module.exports = PinController;