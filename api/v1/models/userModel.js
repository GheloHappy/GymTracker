import db from "../config/dbconfig.js";

export const getUsers = (result) => {
    db.query("SELECT name FROM users", (err,results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const getValidUsers = (result) => {
    db.query("SELECT * FROM users", (err,results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const insertUser = (data, result) => {
    db.query("INSERT INTO users SET ?", 
    [data],
    (err, results) => { 
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}