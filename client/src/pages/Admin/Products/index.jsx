import {deleteProduct, fetchProductList} from "../../../apis/ProductAPI.js";
import {Link, useLoaderData} from "react-router-dom";
import {Heading} from "@chakra-ui/react";
import {Table, Space, Popconfirm, Button, message} from "antd";
import {useMemo} from "react";

export async function loader(){
    const products = await fetchProductList();

    return {products};
}

export default function AdminProducts(){
    const {products} = useLoaderData();

    const handleDeleteProduct = async(id) => {
        try{
            const response = await deleteProduct(id);
            message.success(response);
        }catch (e) {
            console.error(e);
            message.error("Error. product not be deleted.")
        }
    }

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
                            onConfirm={() => handleDeleteProduct(_id)}
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
        <>
            <Heading as="h3" size="lg" my="4">Products</Heading>

            <Table dataSource={products} columns={columns} rowKey="_id"></Table>
        </>
    )
}