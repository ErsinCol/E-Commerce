import {useQuery} from "@tanstack/react-query";
import { Grid } from "@chakra-ui/react";
import Card from "../../components/Card/index.jsx";
import ProductAPI from "../../apis/ProductAPI.js";

function useProducts(){
    return useQuery({
        queryKey: ["products"],
        queryFn: ProductAPI.getProducts
    })
}

export default function Products() {
    const { status, data, error, isFetching } = useProducts();

    return (
        <div id="products-page">
            { status === 'pending' ? (
                'Loading...'
            ) : status === 'error' ? (
                    <span>Error: {error.message}</span>
            ) : data.length ? (
                <>
                    <Grid templateColumns="repeat(5, 1fr)" gap="4">
                        {
                            data.map((product, index) => (
                                <Card product={product} key={index}/>
                            ))
                        }
                    </Grid>
                    <div>{isFetching ? 'Background Updating...' : ' '}</div>
                </>
            ) : (
                <p>
                    <i>No products</i>
                </p>
            )}
        </div>
    );
}