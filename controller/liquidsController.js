const ControllerCommon = require('./common/controllerCommon');
const Promise = require('bluebird');
const AppDao = require('../dao/appDao');
const LiquidsDao = require('../dao/liquidsDao');
const Liquid = require('../model/liquid');
let liquidsDao;

class LiquidsController {
    constructor() {
        const dao = new AppDao('./database.sqlite3');
        liquidsDao = new LiquidsDao(dao);
    }

    create(param){
        
        return new Promise((resolve, reject)=>{
            liquidsDao.create(param.name, param.brand)
            .then((data) =>{
                var liquid = new Liquid(data.id, param.name, param.brand);
                resolve(liquid);
            });
        });
    }   

    getAll(err) {
        return new Promise((resolve, reject) => {
            liquidsDao.getAll()
                .then((liquids) => {
                    resolve(liquids);
                });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            liquidsDao.getById(id)
                .then((liquid) => {
                    resolve(liquid);
                });
            
        });
    }
}
module.exports = LiquidsController;