import {useLoaderData, useNavigation} from "react-router-dom";
import { Grid } from "@chakra-ui/react";
import Card from "../../components/Card/index.jsx";
import {fetchProductList} from "../../apis/ProductAPI.js";

export async function loader(){
    const products = await fetchProductList();

    return { products };
}

export default function Products(){
    const {products} = useLoaderData();

    return (
        <div id="products-page">
            {
                products.length ? (
                    <Grid templateColumns="repeat(5, 1fr)" gap="4">
                        {
                            products.map((product, index)=>(
                                <Card product={product} key={index} />
                            ))
                        }
                    </Grid>
                ) : (
                    <p>
                        <i>No products</i>
                    </p>
                )
            }
        </div>
    );
}