const ControllerCommon = require('./common/controllerCommon');
const Promise = require('bluebird');
const AppDao = require('../dao/appDao');
const LiquidsDao = require('../dao/liquidsDao');
const Liquid = require('../model/liquid');
const config = require('../config.json');
const dbLocation = config['dbLocation'];
let liquidsDao;

class LiquidsController {
    constructor() {
        const dao = new AppDao(dbLocation);
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

    delete(id) {
        return new Promise((resolve, reject) => {
            liquidsDao.delete(id)
            .then(()=>{
                resolve(id);
            });
           
        });
    }

    search(query){
        return new Promise((resolve, reject) => {
            liquidsDao.search(query)
            .then((liquids)=> {
                resolve(liquids);
            })
        })
    }
}
module.exports = LiquidsController;