//const gpio = require('gpio');
const ControllerCommon = require('./common/controllerCommon');
const Pin = require('../model/pin');
const config = require('../config.json');
const Gpio = require('onoff').Gpio;


class PinController {
    constructor() {

    }
    write(param, time, err) {
        return new Promise((resolve) => {
        const led = new Gpio(param, 'out'); 
        led.writeSync(led.readSync() ^ 1);
        return setTimeout(_ => {
                //clearInterval(iv); // Stop blinking
                led.writeSync(0);
                led.unexport(); // Unexport GPIO and free resources
                console.log("timeout ended");
                resolve();
            }, time * 1000);
        });
   } 


    read(param, err) {

        const led = new Gpio(param, 'in'); 
        return led.readSync();

    }
}
module.exports = PinController;