import OrderAPI from "../../../apis/OrderAPI.js";
import {useLoaderData} from "react-router-dom";
import {
    Heading,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";

export async function loader(){
    const orders = await OrderAPI.List();

    return {orders};
}
export default function AdminOrders(){
    const {orders} = useLoaderData();

    return (
        <>
            <Heading as="h3" size="lg" my="4">Orders</Heading>

            <TableContainer>
                <Table variant="striped">
                    <TableCaption>Orders List</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>User</Th>
                            <Th>Address</Th>
                            <Th isNumeric>Items</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.map((order, index) => (
                            <Tr key={index}>
                                <Td>{order.user.email}</Td>
                                <Td>{order.address}</Td>
                                <Td isNumeric>{order.items.length}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}