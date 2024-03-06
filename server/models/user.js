import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        toJSON: false
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    }
})


UserSchema.pre("save", async function(next){
    try{
        if(this.isNew){
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }

        next();
    }catch (e) {
        next(e);
    }
})

UserSchema.methods.isValidPassword = async function(pass){
    return await bcrypt.compare(pass, this.password)
}


const User = mongoose.model("user", UserSchema);

export default User;