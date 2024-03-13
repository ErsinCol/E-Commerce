import { useQuery} from "@tanstack/react-query";
import {Grid} from "@chakra-ui/react";
import Card from "../../components/Card/index.jsx";
import {fetchProductList} from "../../apis/ProductAPI.js";

export default function Products() {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductList,
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <Grid templateColumns="repeat(3, 1fr)" gap="4">
            { data.map((product, index) => <Card key={index} product={product} /> )}
        </Grid>
    );
}