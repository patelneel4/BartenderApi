const Promise = require('bluebird');
const AppDao = require('./dao/appDao');
const DrinksDao = require('./dao/drinksDao');
const LiquidsDao = require('./dao/liquidsDao');
const IngredientsDao = require('./dao/ingredientsDao');

function main(){
    const dao = new AppDAO('./database.sqlite3');
    const drinksDao = new DrinksDao(dao);
    const liquidsDao = new LiquidsDao(dao);
    const ingredientsDao = new IngredientsDao(dao);
    
    drinksDao.createTable()
        .then(()=> ingredientsDao.createTable())
        .then(()=> liquidsDao.createTable());
}