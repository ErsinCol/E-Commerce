import User from "../../models/user.js";
import {RegisterSchema} from "./validation.js";
import {signAccessToken, signRefreshToken} from "../../helpers/jwt.js";

const Register = async (req, res, next) => {
    const input = req.body;

    const {error} = RegisterSchema.validate(input);

    if(error) res.status(400).send(error.details[0].message)

    try{
        const isExist = await User.finsdOne({email: input.email});

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

export default {
    Register
}