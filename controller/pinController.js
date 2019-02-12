const gpio = require('gpio');
const ControllerCommon = require('./common/controllerCommon');
const Pin = require('../model/pin');

class PinController {
    constructor() {

    }

    write(param, time, err) {
        console.log("Time: "+time);
        var intervalTimer;
        var gpiop = gpio.export(param,{
            direction: gpio.DIRECTION.OUT,
            
            ready: function(){
                gpiop.reset();
                setTimeout(function () {
                    gpiop.set();         
                }, time * 1000);
            }
        });

      
    }

    read(param, err) {

        var gpiop = gpio.export(param, {
            direction: gpio.DIRECTION.IN,
            ready: function () {
                console.log("Finished read function")
            }
        });
        gpiop.unexport();
        return new Pin(param, gpiop.value);




    }
}
module.exports = PinController;