const connection = require("./connection.js");

const userInput = (num) => {
    const userArray = [];

    for (let i = 0; i < num; i++) {
        userArray.push("?");

        return userArray.toString();
    }
};

const objToSQL = (obj) => {
    const arr = [];

    for (const key in obj) {
        let value = obj[key];

        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'"
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}



const orm = {
    selectAll: (tableInput, cb) => {
        const queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: (table, cols, vals, cb) => {
        let queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += userInput(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);


        });
    },

    updateOne: (table, condition, cb) => {
        let queryString = "DELETE FROM" + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, (err, result) => {
            if (err) {
                throw err
            }
            cb(result);
        });
    }
};

module.exports = orm;