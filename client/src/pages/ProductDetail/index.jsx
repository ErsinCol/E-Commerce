import {useLoaderData} from "react-router-dom";
import {fetchProductDetail} from "../../apis/ProductAPI.js";
import { Box, Text, Button } from "@chakra-ui/react";
import {formatDate} from "../../utils/formatDate.js";
import ImageGallery from "react-image-gallery";
import {useBasket} from "../../contexts/BasketContext.jsx";
import {useEffect} from "react";

export async function loader({params}){
    const product = await fetchProductDetail(params.productId);

    if (!product) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }

    return { product };
}

export default function ProductDetail(){
    const {product} = useLoaderData();
    const {addItem, removeItem, items} = useBasket();

    let images;
    if(product.photos.length > 0){
        images = product.photos.map((url) => ({original: `http://localhost:3000${url}`}))
    }

    const isInBasket = items.find(item => item._id === product._id);

    return (
        <div>
            <Button colorScheme={isInBasket ? "pink" : "green"} onClick={() => isInBasket ? removeItem(product) : addItem(product)}>
                {isInBasket ? "Remove from basket" : "Add to basket"}
            </Button>

            <Text as="h2" fontSize="2xl">{product.title}</Text>

            <Text>{formatDate(product.createdAt)}</Text>

            <p>{product.description}</p>

            {images &&
                <Box margin="10px">
                    <ImageGallery items={images} />
                </Box>
            }

        </div>
    )
}