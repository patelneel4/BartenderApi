const Promise = require('bluebird');
const AppDao = require('./dao/appDao');
const DrinksDao = require('./dao/drinksDao');
const DrinksQueueDao = require('./dao/drinksQueueDao');
const LiquidsDao = require('./dao/liquidsDao');
const IngredientsDao = require('./dao/ingredientsDao');
const PumpsDao = require('./dao/pumpsDao');
const config = require('./config.json');
const dbLocation = config['dbLocation'];
let drinksDao;
let liquidsDao;
let ingredientsDao;
let pumpsDao;
let drinksQueueDao

class Database {
    constructor() {
        const dao = new AppDao(dbLocation);
        drinksDao = new DrinksDao(dao);
        liquidsDao = new LiquidsDao(dao);
        ingredientsDao = new IngredientsDao(dao);
        drinksQueueDao = new DrinksQueueDao(dao);
        pumpsDao = new PumpsDao(dao);
    }
    
    create() {
        drinksDao.createTable()
            .then(() => liquidsDao.createTable())
            .then(() => ingredientsDao.createTable())
            .then(() => pumpsDao.createTable())
            .then(() => drinksQueueDao.createTable())
    }
}
module.exports = Database;