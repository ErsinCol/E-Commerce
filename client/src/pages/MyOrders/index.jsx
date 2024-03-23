import OrderAPI from "../../apis/OrderAPI.js";
import {useLoaderData} from "react-router-dom";
import { Heading, List, ListItem, Text} from "@chakra-ui/react";
import {formatDate} from "../../utils/formatDate.js";

export async function loader(){
    const orders = await OrderAPI.MyOrders();

    return {orders};
}

export default function MyOrders(){
    const {orders} = useLoaderData();

    return (
        <div>
            <Heading mb="4" size="xl">My Orders</Heading>
            <List>
                {orders.map((order, index) => (
                    <ListItem key={index} border="1px solid #e2e8e0" padding="4" mb="4" borderRadius="md">
                        <Text>Order number: {order._id}</Text>
                        <Text>{formatDate(order.createdAt)}</Text>
                        <Text color="green.500">{order.items.reduce((acc, item)=> acc + item.price, 0)} TL</Text>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}