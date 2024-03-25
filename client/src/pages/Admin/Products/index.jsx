import ProductAPI from "../../../apis/ProductAPI.js";
import {Link, Outlet} from "react-router-dom";
import {Heading, Flex, Box, Button} from "@chakra-ui/react";
import {Table, Space, Popconfirm, message} from "antd";
import {useMemo} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {formatDate} from "../../../utils/formatDate.js";
import {formatMoney} from "../../../utils/formatMoney.js";

function useAdminProducts(){
    return useQuery({
        queryKey: ["admin:products"],
        queryFn: ProductAPI.getProducts
    })
}

export default function AdminProducts(){
    const queryClient = useQueryClient();

    const { status, data, error, isFetching } = useAdminProducts();

    const {mutate}  = useMutation({
        mutationKey: ["deleteProduct"],
        mutationFn: (id) => ProductAPI.deleteProduct(id),
        onError : (error) => {
            console.error(error);
            message.error("Error. Product not be deleted.");
        },
        onSuccess : (data) => {
            console.log(data);
            message.success("Product successfully deleted.")
        },
        onSettled : async() => {
            return await queryClient.invalidateQueries({queryKey: ["products"]});
        }
    })

    const columns = useMemo(()=> {
        return [
            {
                title: "Title",
                dataIndex: "title",
                key: "title"
            },
            {
                title: "Price",
                dataIndex: "price",
                key: "price",
                render: (amount) => {
                    const formattedMount = formatMoney(amount);
                    return `${formattedMount} TL`;
                }
            },
            {
                title: "Created At",
                dataIndex: "createdAt",
                key: "createdAt",
                render: (text) => formatDate(text),
            },
            {
                title: "Action",
                key: "action",
                render: (_, {_id}) => (
                    <Space>
                        <Link to={`/admin/product/${_id}`}>
                            <Button size="sm">Edit</Button>
                        </Link>

                        <Popconfirm
                            title="Delete the product"
                            description="Are you sure to delete the product"
                            onConfirm={() => mutate(_id)}
                            okText="Delete"
                            cancelText="Cancel"
                            placement="bottomRight"
                        >
                            <Button size="sm" colorScheme="red">Delete</Button>
                        </Popconfirm>
                    </Space>
                )
            },
        ]
    }, [])

    return (
        <div>
            <Flex justifyContent="space-between" alignItems="center" py="4">
                <Heading size="md">Products</Heading>
                <Link to="/admin/products/new">
                    <Button colorScheme="blue" size="sm">New</Button>
                </Link>
            </Flex>

            <div>
                { status === "pending" ? (
                    "Loading..."
                ) : status === "error" ? (
                    <span>Error: {error.message}</span>
                ) : (
                    <>
                        <Table dataSource={data} columns={columns} rowKey="_id"></Table>
                        <Outlet />
                        <div>{isFetching ? 'Background Updating...' : ' '}</div>
                    </>
                )}
            </div>
        </div>
    )
}