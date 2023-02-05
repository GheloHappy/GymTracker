import jwt from "jsonwebtoken";
import { getValidUsers } from "../models/userModel.js";
import bcrypt from "bcrypt";

const secret = process.env.JWT_SECRET || 'secret';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    getValidUsers((err, results) => {
        if (err) {
            res.send(err);
        } else {
            const user = results.find(function (u) {
                return u.email === email;
            })
            if (!user) {
                return res.send({ "result": "Email or password does not match" });
            }
            bcrypt.compare(password, user.password, (err, hash) => {
                if (err) {
                    throw err;
                }
                if (hash) {
                    const expiresIn = '1d';
                    const token = jwt.sign({ id: user.id }, secret, { algorithm: 'HS256',expiresIn});
                    res.send({
                        "id": user.id,
                        "name": user.name,
                        token,
                        "tokenExpiration": expiresIn,
                        "message":"success"
                    });
                } else {
                    return res.send({ "result": "Email or password does not match" });
                }
            });
        }
    });
}

export const validateToken = async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, secret);
        //console.log('Token is valid:', decoded);
        return res.status(200).send({'Token is valid': decoded});
    } catch (error) {
        return res.status(400).send({ error: 'Invalid token' });
    }
}