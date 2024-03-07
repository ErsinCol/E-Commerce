import Product from "../../models/product.js";

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

export default {
    GetList,
}