class DrinksDao{
    constructor(dao){
        this.dao = dao;
    }
    createTable(){
        const sql =`CREATE TABLE IF NOT EXISTS drinks
        (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE,
             description TEXT)`;
        return this.dao.run(sql);
    };

    create(name, description){
        return this.dao.run(
            `INSERT INTO drinks(name, description)
            VALUES (?,?)`,
            [name, description]
        );
    }

    delete(id){
        return this.dao.run(
            `DELETE FROM drinks WHERE id =?`,
            [id]
        )
    }

    update(drink){
        const {id, name, description} = drink;
        return this.dao.run(
            `UPDATE drinks SET name=?, description=?
            WHERE id=?`,
            [name, description, id]
        );
    }

    getById(id){
        return this.dao.get(
            `SELECT * FROM drinks WHERE id =?`,
            [id]
        );
    }

    getAll(){
        return this.dao.all(`SELECT * FROM drinks`);
    }
}
module.exports= DrinksDao;