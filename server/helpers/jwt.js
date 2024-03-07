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
                return reject(err);
            }

            resolve(token);
        })
    })
}

const verifyAccessToken = (req, res, next) =>{
    const token = req.headers["authorization"];

    if(!token) return res.status(401).send("Authorization failed. Token not found.")

    jwt.verify(
        token.split(" ")[1],
        process.env.JWT_SECRET,
        {
            expiresIn: "10d",
            issuer: "ecommerce.app",
        },
        (err, decoded)=>{
            if(err) return res.status(401).send(err.message);

            req.payload = decoded;
            next();
        }
    )
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

        jwt.sign(payload, process.env.JWT_REFRESH_SECRET, options, (err, token)=>{
            if(err){
                return reject(err);
            }

            const userIdStr = userId.toString();

            client.set(userIdStr, token);

            resolve(token);
        })
    })
}

const verifyRefreshToken = async (refreshToken)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: "180d",
                issuer: "ecommerce.app",
            },
            async(err, decoded)=>{
                if(err) return reject(err);

                const {userId} = decoded;

                const userToken = await client.get(userId);

                if(!userToken) return reject(new Error("Invalid refresh token."));

                if(refreshToken === userToken) resolve(userId);
            }
        )
    })
}

export {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken,
}