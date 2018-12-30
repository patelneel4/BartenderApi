class LiquidsDao{
    constructor(dao){
        this.dao = dao;
    }
    createTable(){
        const sql =`CREATE TABLE IF NOT EXISTS liquids
        (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, brand TEXT, UNIQUE(name, brand))`;
        return this.dao.run(sql);
    }
    create(name, brand){
        return this.dao.run(
            `INSERT INTO liquids(name, brand)
            VALUES (?,?)`,
            [name, brand]
        );
    }

    update(liquid){
        const {id, name, brand} = liquid;
        return this.dao.run(
            `UPDATE liquids SET name=?, brand=?
            WHERE id=?`,
            [name, brand, id]
        );
    }

    getById(id){
        return this.dao.get(
            `SELECT * FROM liquids WHERE id =?`,
            [id]
        );
    }

    getAll(){
        return this.dao.all(`SELECT * FROM liquids`);
    }
}
module.exports=LiquidsDao;