import OrderSchema from "./validations.js";
import Order from "../../models/order.js";

const Create = async (req, res, next) =>{
    const input = req.body;

    const {error} = OrderSchema.validate(input);

    if(error) return res.status(400).send(error.details[0].message);

    const { userId } = req.payload;

    try{
        const order = new Order({
            user: userId,
            address: input.address,
            items: input.items
        })

        let savedData = await order.save();

        res.status(201).json(savedData);
    }catch(e){
        next(e);
    }
}

export default {
    Create,
}