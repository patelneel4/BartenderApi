const ControllerCommon = require('./common/controllerCommon');
const Promise = require('bluebird');
const AppDao = require('../dao/appDao');
const PumpsDao = require('../dao/pumpsDao');
const LiquidDao = require('../dao/liquidsDao');
const Pump = require('../model/pump');
let pumpsDao;
let liquidDao;
class PumpsController{
    constructor(){
        const dao = new AppDao('./database.sqlite3');
        pumpsDao = new PumpsDao(dao);
        liquidDao = new LiquidDao(dao);
    }

    create(pump){
        return new Promise((resolve, reject)=>{
            pumpsDao.create(pump)
            .then((data)=>{
                resolve(pump);
            });
        });
    }

    update(pump){
        return new Promise((resolve, reject)=>{
            pumpsDao.update(pump)
            .then((data)=>{

                resolve(pump);
            });
        });
    }

    getAll(err) {
        return new Promise((resolve, reject) => {
            pumpsDao.getAll()
                .then((pumps) => {
                    var pumpsArray = [];
                    pumps.map(pump => {
                        liquidDao.getById(pump.liquid)
                        .then((liquid) => {
                            pumpsArray.push({ "id": pump.id, "name": pump.name, "flowrate": pump.flowrate,"liquid": pump.liquid, "liquidName": liquid.name, "liquidBrand": liquid.brand});
                            resolve(pumpsArray);
                        });
                    })
                    
                });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            pumpsDao.getById(id)
                .then((pump) => {
                    liquidDao.getById(pump.liquid)
                        .then((liquid) => {
                            pump.liquidName = liquid.name;
                            pump.LiquidBrand = liquid.brand;
                            resolve(pump);
                        });
                });
            
        });
    }
}
module.exports = PumpsController;