class DrinksQueueDao{
    constructor(dao){
        this.dao = dao;
    }
    createTable(){
        const sql =`CREATE TABLE IF NOT EXISTS drinksQueue
        (id INTEGER PRIMARY KEY AUTOINCREMENT, drinkId INTEGER NOT NULL)`;
        return this.dao.run(sql);
    };

    add(id){
        return this.dao.run(
            `INSERT INTO drinksQueue(drinkId)
            VALUES (?)`,
            [id]
        );
    }

    delete(id){
        return this.dao.run(
            `DELETE FROM drinksQueue WHERE drinkId =?`,
            [id]
        );
    }

    getAll(){
        return this.dao.all(`SELECT * FROM drinksQueue`);
    }
}
module.exports= DrinksQueueDao;