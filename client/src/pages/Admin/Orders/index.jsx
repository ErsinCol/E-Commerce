import {useQuery} from "@tanstack/react-query";
import {
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import OrderAPI from "../../../apis/OrderAPI.js";

function useAdminOrders(){
    return useQuery({
        queryKey: ["admin:orders"],
        queryFn: OrderAPI.getOrders,
    })
}

export default function AdminOrders(){
    const {data, status, error, isFetching} = useAdminOrders();

    return (
        <div>
            <Heading as="h3" size="lg" my="4">Orders</Heading>
            <div>
                { status === "pending" ? (
                    "Loading..."
                ) : status === "error" ? (
                    <span>Error: {error.message}</span>
                ) : (
                    <>
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
                                    {data.map((order, index) => (
                                        <Tr key={index}>
                                            <Td>{order.user.email}</Td>
                                            <Td>{order.address}</Td>
                                            <Td isNumeric>{order.items.length}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                        <div>{isFetching ? 'Background Updating...' : ' '}</div>
                    </>
                )}
            </div>
        </div>
    )
}