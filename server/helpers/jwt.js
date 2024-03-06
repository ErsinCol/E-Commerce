import jwt from "jsonwebtoken";
import {client} from "../clients/redis.js";

const signAccessToken = (data)=>{
    return new Promise((resolve, reject)=>{
        const payload = {
            ...data,
        }

        const options = {
            expiresIn: "10d",
            issuer: "ecommerce.app",
        }

        jwt.sign(payload, process.env.JWT_SECRET, options, (err, token)=>{
            if(err){
                reject(err);
            }

            resolve(token);
        })
    })
}

const signRefreshToken = (userId) =>{
    return new Promise((resolve, reject)=>{
        const payload = {
            userId,
        };

        const options = {
            expiresIn: "180d",
            issuer: "ecommerce.app",
        };

        jwt.sign(payload, process.env.JWT_SECRET, options, (err, token)=>{
            if(err){
                reject(err);
            }

            const userIdStr = userId.toString();

            client.set(userIdStr, token);

            resolve(token);
        })
    })
}


export {
    signAccessToken,
    signRefreshToken,
}