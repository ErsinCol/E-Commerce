import Product from "../../models/product.js";
import ProductSchema from "./validations.js";

const limit = 12;
const GetList = async (req, res, next)=>{
    let {page} = req.query || 1;

    if(page < 1) page = 1;

    const skip = (parseInt(page) - 1) * limit;

    try{
        const products = await Product.find({}).sort({createdAt: -1}).skip(skip).limit(limit);

        res.status(200).json(products);
    }catch(e){
        next(e);
    }
}

const Create = async(req, res, next)=>{
    const input = req.body;

    const {error} = ProductSchema.validate(input);

    if(error) return res.status(400).send(error.details[0].message);

    try{
        if(input.photos){
            input.photos = JSON.parse(input.photos);
        }

        const product = new Product(input);
        const savedData = await product.save();

        res.status(201).json(savedData);
    }catch (e) {
        next(e);
    }
}

export default {
    GetList,
    Create,
}