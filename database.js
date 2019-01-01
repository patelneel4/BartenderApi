const Promise = require('bluebird');
const AppDao = require('./dao/appDao');
const DrinksDao = require('./dao/drinksDao');
const LiquidsDao = require('./dao/liquidsDao');
const IngredientsDao = require('./dao/ingredientsDao');
let drinksDao;
let liquidsDao;
let ingredientsDao;

class Database {
    constructor() {
        const dao = new AppDao('./database.sqlite3');
        drinksDao = new DrinksDao(dao);
        liquidsDao = new LiquidsDao(dao);
        ingredientsDao = new IngredientsDao(dao);
    }
    
    create() {
        let liquidId;
        let drinkId;
        let ingredientId;
        drinksDao.createTable()
            .then(() => liquidsDao.createTable())
            .then(() => ingredientsDao.createTable())
            .then(() => liquidsDao.create("Vodka", "Absolut"))
            .then(() => liquidsDao.create("Whiskey", "Glenfiddich"))
            .then((data) =>{
                liquidId = data.id;
            })
            .then(() => drinksDao.create("Vodka on the rocks", "Straight vodka"))
            .then((data) =>{
                drinkId = data.id;
            })
            .then(() => ingredientsDao.create(liquidId, 10, drinkId))
            .then((data) => {
                ingredientId = data.id;
                console.log(`Ingredient id: ${data.id}`);
                console.log(`liquid id: ${data.liquid}`);
                console.log(`volume: ${data.volume}`);
                console.log(`drinks id: ${data.drinkId}`);

            })
            .then(()=> ingredientsDao.create(2,15, drinkId ));
    }
}
module.exports = Database;