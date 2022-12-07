import mysql from "mysql";
import config from "../01-utils/config";

// Create a pool of connections for connecting to MySQL database:
const connection = mysql.createPool({
    host: config.mysql.host, // Computer name where the database exists.
    user: config.mysql.user, // Database username
    password: config.mysql.password, // Database password
    database: config.mysql.database, // Database name 
});


function execute(sql: string, values?: any[]): Promise<any> {

    return new Promise<any>((resolve, reject) => {

        connection.query(sql, values, (err, result) => {

            if(err) {
                reject(err);
                return;
            }

            resolve(result);
        });
    });
}

export default {
    execute
};
