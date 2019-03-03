const ControllerCommon = require('./common/controllerCommon');
const Promise = require('bluebird');
const AppDao = require('../dao/appDao');
const DrinksDao = require('../dao/drinksDao');
const LiquidDao = require('../dao/liquidsDao');
const IngredientsDao = require('../dao/ingredientsDao');
const Drink = require('../model/drink');
let drinksDao;
let ingredientDao;
let liquidDao;
class DrinksController {
    constructor() {
        const dao = new AppDao('./database.sqlite3');
        drinksDao = new DrinksDao(dao);
        ingredientDao = new IngredientsDao(dao);
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

}
module.exports = DrinksController;