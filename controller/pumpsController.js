const ControllerCommon = require('./common/controllerCommon');
const Promise = require('bluebird');
const AppDao = require('../dao/appDao');
const PumpsDao = require('../dao/pumpsDao');
const Pump = require('../model/pump');
let pumpsDao;

class PumpsController{
    constructor(){
        const dao = new AppDao('./database.sqlite3');
        pumpsDao = new PumpsDao(dao);
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
                    resolve(pumps);
                });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            pumpsDao.getById(id)
                .then((pump) => {
                    resolve(pump);
                });
            
        });
    }
}
module.exports = PumpsController;