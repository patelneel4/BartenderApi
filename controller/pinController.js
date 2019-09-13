const gpio = require('gpio');
const ControllerCommon = require('./common/controllerCommon');
const Pin = require('../model/pin');
const config = require('../config.json');
const piModel = config['pi-model'];
class PinController {
    constructor() {

    }

    write(param, time, err) {
        return new Promise((resolve, reject) => {
            console.log("Time: " + time);
            var intervalTimer;
            var gpiop = gpio.export(param, {
                direction: gpio.DIRECTION.OUT,

                ready: function () {
                    if (piModel == 1) {
                        gpiop.set();
                        setTimeout(function () {
                            gpiop.reset();
                            resolve();
                        }, time * 1000);
                    } else {
                        gpiop.reset();
                        setTimeout(function () {
                            gpiop.set();
                            resolve();
                        }, time * 1000);
                    }
                }
            });

        });
    }

    read(param, err) {

        var gpiop = gpio.export(param, {
            direction: gpio.DIRECTION.IN,
            ready: function () {
                console.log("Finished read function")
                return new Pin(param, gpiop.value);
            }
        });
     
     




    }
}
module.exports = PinController;