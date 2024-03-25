import ProductAPI from "../../../apis/ProductAPI.js";
import {Link} from "react-router-dom";
import {Heading} from "@chakra-ui/react";
import {Table, Space, Popconfirm, Button, message} from "antd";
import {useMemo} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

function useProducts(){
    return useQuery({
        queryKey: ["products"],
        queryFn: ProductAPI.getProducts
    })
}

export default function AdminProducts(){
    const queryClient = useQueryClient();

    const { status, data, error, isFetching } = useProducts();

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
                key: "price"
            },
            {
                title: "Created At",
                dataIndex: "createdAt",
                key: "createdAt"
            },
            {
                title: "Action",
                key: "action",
                render: (_, {_id}) => (
                    <Space>
                        <Link to={`/admin/products/${_id}`}>
                            <Button>Edit</Button>
                        </Link>

                        <Popconfirm
                            title="Delete the product"
                            description="Are you sure to delete the product"
                            onConfirm={() => mutate(_id)}
                            okText="Delete"
                            cancelText="Cancel"
                            placement="bottomRight"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                    </Space>
                )
            },
        ]
    }, [])

    return (
        <div>
            <Heading as="h3" size="lg" my="4">Products</Heading>

            <div>
                { status === "pending" ? (
                    "Loading..."
                ) : status === "error" ? (
                    <span>Error: {error.message}</span>
                ) : (
                    <>
                        <Table dataSource={data} columns={columns} rowKey="_id"></Table>
                        <div>{isFetching ? 'Background Updating...' : ' '}</div>
                    </>
                )}
            </div>
        </div>
    )
}