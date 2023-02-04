import bcrypt from "bcrypt";
import {
    getUsers,
    getValidUsers,
    insertUser,
} from "../models/userModel.js";

export const showUsers = async (req, res) => {
    getUsers((err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const createUser = async (req, res) => {
    const { email, password } = req.body;
    getValidUsers((err, results) => {
        if(err) {
            res.send(err);
        } else {
            const user = results.find(function(u) {
                return u.email === email;
            })
            if (user) {
                return res.send({"message":"User already exists."});
            } else {
                const saltRounds = 10;
                
                bcrypt.hash(password, saltRounds, function(err, hash) {
                    if(err) {
                        console.log(err);
                    } else {
                        const data = {
                            "email": req.body.email,
                            "password": hash,
                            "name": req.body.name,
                        }
                    
                        //const data = req.body;
                        insertUser(data,
                            (err) => {
                                if(err) {
                                    res.send(err);
                                } else {
                                    res.send({"message":"success"});
                                }
                            }
                        );
                    }
                });
            }
        }
    });
}