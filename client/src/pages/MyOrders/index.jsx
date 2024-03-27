import OrderAPI from "../../apis/OrderAPI.js";
import { Heading, List, ListItem, Text} from "@chakra-ui/react";
import {formatDate} from "../../utils/formatDate.js";
import {useQuery} from "@tanstack/react-query";

function useMyOrders(){
    return useQuery({
        queryKey: ["orders"],
        queryFn: OrderAPI.getMyOrders
    })
}

export default function MyOrders(){
    const { status, data, error, isFetching } = useMyOrders();

    return (
        <div>
            <Heading mb="4" size="xl">My Orders</Heading>
            <div>
                {status === "pending" ? (
                    "Loading..."
                ) : status === "error" ? (
                    <span>Error: {error.message}</span>
                ) : data.length ? (
                    <>
                        <List>
                            {data.map((order, index) => (
                                <ListItem key={index} border="1px solid #e2e8e0" padding="4" mb="4" borderRadius="md">
                                    <Text>Order number: {order._id}</Text>
                                    <Text>{formatDate(order.createdAt)}</Text>
                                    <Text color="green.500">{order.items.reduce((acc, item)=> acc + item.price, 0)} TL</Text>
                                </ListItem>
                            ))}
                        </List>
                        <div>{isFetching ? 'Background Updating...' : ' '}</div>
                    </>
                ) : (
                    <Text>No orders found.</Text>
                )}
            </div>
        </div>
    );
}