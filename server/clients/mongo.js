import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(()=> console.info("MongoDB connected."))
    .catch((err)=> console.error(err.message))