import {Schema, model} from "mongoose";

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    address: {
        type: String,
        required: true,
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: "product",
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

const Order = model("order", OrderSchema);

export default Order;