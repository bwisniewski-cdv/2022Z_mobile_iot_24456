const sql = require('mssql');
const parser = require('mssql-connection-string');

class PeopleDbContext {
    constructor(connectionString, log) {
        log("PeopleDbContext object has been created.");
        this.log = log;
        this.config = parser(connectionString);
        this.getPeople = this.getPeople.bind(this);
    }

    async getPeople() {
        try{
            this.log("getPeople function - run")
            this.config.options.port = 1433;
            const connection = await new sql.ConnectionPool(this.config).connect();
            const request = new sql.Request(connection);
            const result = await request.query('select * from People');
            this.log("getPeople function - done")
            return result.recordset;
    }
        catch(err){
            this.log(err)
            return err;
    }
    }

    async getPerson(id) {
        this.log("getPerson function - run")
        this.config.options.port = 1433;
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.Request(connection);
        const result = await request.query('select * from People where PersonId = '+id);
        this.log("getPerson function - done")
        return result.recordset;
    }

    async addPerson(data) {
        this.log("addPerson function - run")
        this.config.options.port = 1433;
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.Request(connection);
        const result = await request
        .input("firstName", sql.VarChar(60), data.FirstName)
        .input("lastName", sql.VarChar(60), data.LastName)
        .query("insert into People (FirstName, LastName) values (@firstName, @lastName)");
        this.log("addPerson function - done")
        return "Person added: "+ data.FirstName + " " + data.LastName;
    }

    async deletePerson(id) {
        this.log("deletePerson function - run")
        this.config.options.port = 1433;
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.Request(connection);
        const result = await request.query('delete from People where PersonId = '+id);
        this.log("deletePerson function - done")
        return result.rowsAffected;
    }

}

module.exports = PeopleDbContext;