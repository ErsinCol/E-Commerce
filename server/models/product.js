import {Schema, model} from "mongoose";

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    photos: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Product = model("product", ProductSchema);

export default Product;