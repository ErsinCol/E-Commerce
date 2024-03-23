import {useLoaderData} from "react-router-dom";
import {fetchProductDetail} from "../../apis/ProductAPI.js";
import {Box, Text, Button, Flex, Grid, Heading, VStack} from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";
import {useBasket} from "../../contexts/BasketContext.jsx";

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
        <Grid templateColumns="repeat(2, 1fr)" border="1px" borderColor="gray.300" borderRadius="lg">
            <Box borderTopLeftRadius="lg" borderBottomLeftRadius="lg">
                {
                    images && (
                        <ImageGallery items={images} />
                    )
                }
            </Box>
            <VStack align="start" spacing="16px" p="4" backgroundColor="gray.100" borderBottomRightRadius="lg" borderTopRightRadius="lg">
                <Heading as="h4" size="md">{product.title}</Heading>

                <Text fontSize="xl" fontWeight="bold">{product.price} TL</Text>

                <Text>{product.description}</Text>

                <Button colorScheme={isInBasket ? "pink" : "green"} onClick={() => isInBasket ? removeItem(product) : addItem(product)}>
                    {isInBasket ? "Remove from basket" : "Add to basket"}
                </Button>
            </VStack>
        </Grid>
    );
}