class IngredientsDao{
    constructor(dao){
        this.dao = dao;
    }
    createTable(){
        const sql =`CREATE TABLE IF NOT EXISTS ingredients
        (id INTEGER PRIMARY KEY AUTOINCREMENT, liquid INT, volume REAL, drinksId INT,
            CONSTRAINT ingredients_fk_drinksId FOREIGN KEY (drinksId)
            REFERENCES drinks(id) ON UPDATE CASCADE ON DELETE CASCADE)`;
        return this.dao.run(sql);
    }
    
    create(liquid,volume,drinksId){
        return this.dao.run(
            `INSERT INTO ingredients(liquid, volume, drinksId)
            VALUES (?,?,?)`,
            [liquid,volume, drinksId]
        );
    }

    getById(id){
        return this.dao.all(
            `SELECT * FROM ingredients WHERE drinksId =?`,
            [id]
        );
    }

    delete(id){
        return this.dao.run(
            `DELETE FROM ingredients WHERE drinksId =?`,
            [id]
        )
    }

    getAll(){
        return this.dao.all(`SELECT * FROM ingredients`);
    }

}
module.exports=IngredientsDao;