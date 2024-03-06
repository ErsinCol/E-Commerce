import User from "../../models/user.js";
import ValidationSchema from "./validation.js";
import {signAccessToken, signRefreshToken} from "../../helpers/jwt.js";

const Register = async (req, res, next) => {
    const input = req.body;

    const {error} = ValidationSchema.validate(input);

    if(error) res.status(400).send(error.details[0].message)

    try{
        const isExist = await User.findOne({email: input.email});

        if(isExist) res.status(409).send("This email already using.")

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

    if(error) res.status(400).send(error.details[0].message)

    try{
        const user = await User.findOne({email: input.email});

        if(!user) res.status(404).send("The email address was not found.");

        const isMatched = await user.isValidPassword(input.password);

        if(!isMatched) res.status(401).send("Password not correct.");

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

export default {
    Register,
    Login
}