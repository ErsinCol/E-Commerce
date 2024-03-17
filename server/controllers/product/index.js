import Product from "../../models/product.js";
import Schemas from './validations.js';

const limit = 12;
const GetList = async (req, res, next)=>{
    let {page} = req.query || 1;

    if(page < 1) page = 1;

    const skip = (parseInt(page) - 1) * limit;

    try{
        const products = await Product.find({}, { __v: 0 }).sort({createdAt: -1}).skip(skip).limit(limit);

        res.status(200).json(products);
    }catch(e){
        next(e);
    }
}

const Get = async(req, res, next) =>{
    const { productId } = req.params;

    if(!productId) return res.status(400).send("Missing parameter (:productId)");

    try{
        const product = await Product.findById(productId);

        if(!product) return res.status(404).send('Product not found.');

        res.status(200).json(product);
    }catch(e){
        next(e);
    }
}

const Create = async(req, res, next)=>{
    try{
        const input = req.body;
        const photos = req.files?.photos;

        const photoUrls = photos?.map(photo => `/product/photos/${photo.name}`)
        const payload = {
            ...input,
            photos: photoUrls || [],
        }

        const {error} = Schemas.Create.validate(payload);

        if(error) return res.status(400).send(error.details[0].message);

        photos?.forEach((photo)=>{
            const uploadPath = `${global.appRoot}/public/images/product/${photo.name}`;
            photo.mv(uploadPath, function (err){
                if(err){
                    return res.status(500).send(err);
                }
            })
        })


        const product = new Product(payload);
        const savedData = await product.save();

        res.status(201).json(savedData);
    }catch (e) {
        next(e);
    }
}

const Update = async(req, res, next)=>{
    const { productId } = req.params;
    if(!productId) return res.status(400).send("Missing parameter (:productId)");

    const input = req.body;
    const {error} = Schemas.Update.validate(input);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        const updatedProduct = await Product.findByIdAndUpdate(productId, input, {new: true});

        res.status(200).json(updatedProduct);
    }catch(e){
        next(e);
    }
}

const Delete = async(req, res, next)=>{
    const { productId } = req.params;

    if(!productId) return res.status(400).send("Missing parameter (:productId)");

    try{
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if(!deletedProduct) return res.status(400).send("Product not found");

        res.status(200).send("Product successfully deleted");
    }catch(e){
        next(e);
    }
}

export default {
    GetList,
    Get,
    Create,
    Update,
    Delete,
}