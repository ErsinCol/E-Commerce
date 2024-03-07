import User from "../../models/user.js";
import ValidationSchema from "./validation.js";
import {signAccessToken, signRefreshToken, verifyRefreshToken} from "../../helpers/jwt.js";
import {client} from "../../clients/redis.js";

const Register = async (req, res, next) => {
    const input = req.body;

    const {error} = ValidationSchema.validate(input);

    if(error) return res.status(400).send(error.details[0].message)

    try{
        const isExist = await User.findOne({email: input.email});

        if(isExist) return res.status(409).send("This email already using.")

        const user = new User(input);
        const data = await user.save();
        const userData = data.toObject()

        delete userData.password;
        delete userData.__v;

        const accessToken = await signAccessToken({
            userId: user._id,
            role: user.role
        })

        const refreshToken = await signRefreshToken(user._id)

        res.status(201).json({
            user: userData,
            accessToken,
            refreshToken
        })

    }catch (e) {
        next(e);
    }
}

const Login = async (req, res, next)=> {
    const input = req.body;

    const {error} = ValidationSchema.validate(input);

    if(error) return res.status(400).send(error.details[0].message)

    try{
        const user = await User.findOne({email: input.email});

        if(!user) return res.status(404).send("The email address was not found.");

        const isMatched = await user.isValidPassword(input.password);

        if(!isMatched) return res.status(401).send("Password not correct.");

        const accessToken = await signAccessToken({
            userId: user._id,
            role: user.role
        })

        const refreshToken = await signRefreshToken(user._id)

        const userData = await user.toObject();
        delete userData.password;
        delete userData.__v;

        res.status(200).json({ user: userData, accessToken, refreshToken });
    }catch(e){
        next(e);
    }
}

const Logout = async(req, res, next)=>{
    try{
        const { refresh_token } = req.body;

        if(!refresh_token) return res.status(400).send("Missing refresh token");

        verifyRefreshToken(refresh_token)
            .then(async (userId) => {
                const data = await client.del(userId);

                if(!data) return res.status(400).send("Failed to delete token from cache")

                return res.status(200).json({
                    message: "Success"
                })
            })
            .catch((err) => {
                return res.status(400).send(err);
            })
    }catch(e){
        next(e)
    }
}

const RefreshToken = async(req, res, next)=>{
    try{
        const {refresh_token} = req.body;

        if(!refresh_token) return res.status(400).send("Missing refresh token.");

        verifyRefreshToken(refresh_token)
            .then(async(userId) =>{
                const accessToken = await signAccessToken(userId);
                const refreshToken = await signRefreshToken(userId);
                return res.status(200).json({
                    accessToken,
                    refreshToken
                })
            })
            .catch((err)=>{
                return res.status(400).json(err);
            })
    }catch (e){
        next(e);
    }
}

export default {
    Register,
    Login,
    Logout,
    RefreshToken,
}