const ControllerCommon = require('./common/controllerCommon');
const Promise = require('bluebird');
const AppDao = require('../dao/appDao');
const DrinksDao = require('../dao/drinksDao');
const DrinksQueueDao = require('../dao/drinksQueueDao');
const LiquidDao = require('../dao/liquidsDao');
const IngredientsDao = require('../dao/ingredientsDao');
const Drink = require('../model/drink');
const config = require('../config.json');
const dbLocation = config['dbLocation'];
let drinksDao;
let ingredientDao;
let liquidDao;
let drinksQueueDao;
class DrinksController {
    constructor() {
        const dao = new AppDao(dbLocation);
        drinksDao = new DrinksDao(dao);
        ingredientDao = new IngredientsDao(dao);
        drinksQueueDao = new DrinksQueueDao(dao);
        liquidDao = new LiquidDao(dao);
    }

    create(param) {
        return new Promise((resolve, reject) => {
            drinksDao.create(param.name, param.description)
                .then((data) => {
                    var ingredients = []
                    param.ingredients.forEach(element => {
                        ingredientDao.create(element.liquid, element.volume, data.id)
                            .then((i) => {
                                var ingredient = {
                                    id: i.id,
                                    liquid: element.liquid,
                                    volume: element.volume,
                                    drinksId: data.id
                                };
                                ingredients.push(ingredient);
                            }).then(_ => {
                                var drink = new Drink(data.id, param.name, param.description, ingredients);
                                resolve(drink);
                            })


                    });

                });
        });
    }

    getAll() {
        var drinks = [];
        return new Promise((resolve, reject) => {
            drinksDao.getAll()
                .then((data) => {
                    data.forEach(d => {
                        ingredientDao.getById(d.id)
                            .then((ingredients) => {
                                var drink = new Drink(d.id, d.name, d.description, ingredients);
                                drinks.push(drink);
                            })
                            .then(() => {
                                resolve(drinks);
                            });
                    });

                });
        });

    }

    update(drink) {
        console.log(drink);
        return new Promise((resolve, reject) => {
            drinksDao.update(drink)
                .then((data) => {
                    ingredientDao.delete(drink.id);
                    var ingredients = []
                    drink.ingredients.forEach(element => {
                        ingredientDao.create(element.liquid, element.volume, drink.id)
                            .then((i) => {
                                var ingredient = {
                                    id: i.id,
                                    liquid: element.liquid,
                                    volume: element.volume,
                                    drinksId: drink.id
                                };
                                ingredients.push(ingredient);
                            }).then(_ => {
                                var d = new Drink(drink.id, drink.name, drink.description, ingredients);
                                resolve(d);
                            })
                    });

                });
        });
    }

    getById(id) {

        return new Promise((resolve, reject) => {
            drinksDao.getById(id)
                .then((d) => {
                    ingredientDao.getById(d.id)
                        .then((ingredients) => {
                            var ingredientsArray = [];
                            ingredients.map(i => {
                                liquidDao.getById(i.liquid)
                                    .then((liquid) => {
                                        ingredientsArray.push({
                                            "id": i.id,
                                            "liquid": i.liquid,
                                            "liquidName": liquid.name,
                                            "volume": i.volume,
                                            "drinksId": i.drinksId
                                        });
                                        var drink = new Drink(d.id, d.name, d.description, ingredientsArray);
                                        resolve(drink);
                                    })

                            });


                        })


                })

        });

    }

    delete(id) {
        return new Promise((resolve, reject) => {
            drinksDao.delete(id)
                .then(resolve("Deleted drink: " + id));
        });
    }

    addDrinkToQueue(drinkId){
        return new Promise((resolve, reject)=>{
            drinksQueueDao.add(drinkId)
                .then(resolve("Drink Queued: "+drinkId))
        });
    }
    deleteDrinkFromQueue(drinkId){
        return new Promise((resolve, reject)=>{
            drinksQueueDao.delete(drinkId)
                .then(resolve("Drink Deleted from Queue: "+drinkId))
        });
    }
    getDrinksQueue() {
        return new Promise((resolve, reject) => {
            drinksQueueDao.getAll()
                .then((data) => {
                    resolve(data)
                });
        });
    }

}
module.exports = DrinksController;