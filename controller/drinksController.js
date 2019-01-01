const ControllerCommon = require('./common/controllerCommon');
const Promise = require('bluebird');
const AppDao = require('../dao/appDao');
const DrinksDao = require('../dao/drinksDao');
const IngredientsDao = require('../dao/ingredientsDao');
const Drink = require('../model/drink');
let drinksDao;
let ingredientDao;

class DrinksController {
    constructor() {
        const dao = new AppDao('./database.sqlite3');
        drinksDao = new DrinksDao(dao);
        ingredientDao = new IngredientsDao(dao);
    }

    create(param) {
        return new Promise((resolve, reject) => {
            drinksDao.create(param.name, param.description)
                .then((id) => {
                    var ingredients = []
                    param.ingredients.array.forEach(element => {
                        ingredientDao.create(element.liquid, element.volume, id)
                            .then((i) => {
                                var ingredient = {
                                    i,
                                    liquid: element.liquid,
                                    volume: element.volume,
                                    id
                                };
                                ingredients.push(ingredient);
                            });
                    });
                    var drink = new Drink(id, param.name, param.description, ingredients);
                    resolve(drink);
                });
        });
    }

    getAll() {

        return new Promise((resolve, reject) => {
            drinksDao.getAll()
                .then((drinks) => {
                    resolve(drinks);
                });
        });

    }

    getIngredients(data) {
        var drinks = []
        return new Promise((resolve, reject) => {
            data.forEach(d => {
                ingredientDao.getById(d.id)
                    .then((ingredients) => {
                        var drink = new Drink(d.id, d.name, d.description, ingredients);
                        drinks.push(drink);
                    }).then(()=>{
                        resolve(drinks);
                    });
            });
            
        });
    }


}
module.exports = DrinksController;