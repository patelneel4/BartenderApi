class PumpsDao{
    constructor(dao){
        this.dao = dao;
    }

    createTable(){
        const sql = `CREATE TABLE IF NOT EXISTS pumps
        (id INTEGER PRIMARY KEY UNIQUE, name TEXT NOT NULL UNIQUE,
            flowrate REAL NOT NULL, liquid INT NOT NULL)`;
        return this.dao.run(sql);
    };

    create(pump){
        const {id, name, flowrate, liquid}= pump;
        return this.dao.run(
            `INSERT INTO pumps VALUES (?,?,?,?)`,
            [id, name, flowrate, liquid]
        );
    }

    update(pump){
        const {id, name, flowrate, liquid}= pump;
        return this.dao.run(
            `UPDATE pumps SET flowrate=?, liquid=?
            WHERE id=?`,
            [flowrate, liquid, id]
        );
    }

    getById(id){
        return this.dao.get(
            `SELECT * FROM pumps WHERE id =?`,
            [id]
        );
    }

    getAll(){
        return this.dao.all(`SELECT * FROM pumps`);
    }
}
module.exports=PumpsDao;