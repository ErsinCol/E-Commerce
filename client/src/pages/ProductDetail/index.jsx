import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import ImageGallery from "react-image-gallery";
import {Box, Text, Button, Grid, Heading, VStack} from "@chakra-ui/react";
import {useBasket} from "../../contexts/BasketContext.jsx";
import ProductAPI from "../../apis/ProductAPI.js";
import {useEffect, useState} from "react";

function useProduct(productId) {
    return useQuery({
        queryKey: ["product", productId],
        queryFn: () => ProductAPI.getProductById(productId),
        enabled: !!productId,
    })
}

export default function ProductDetail() {
    const {addItem, removeItem, items} = useBasket();

    const {productId} = useParams();

    const [productPhotos, setProductPhotos] = useState([]);

    const {status, data, error, isFetching} = useProduct(productId);

    useEffect(()=> {
        if(status === "success"){
            const photos = data.photos.map((url) => ({original: `http://localhost:3000${url}`}));
            setProductPhotos(photos);
        }
    }, [status])

    const isInBasket = items.find(item => item._id === data._id);

    return (
        <div>
            { status === "pending" ? (
                "Loading..."
            ) : status === "error" ? (
                <span>Error: {error.message}</span>
            ) : (
                <>
                    <Grid templateColumns="repeat(2, 1fr)" border="1px" borderColor="gray.300" borderRadius="lg">
                        {productPhotos.length && (
                            <Box borderTopLeftRadius="lg" borderBottomLeftRadius="lg">
                                <ImageGallery items={productPhotos}/>
                            </Box>
                        )}
                        <VStack align="start" spacing="16px" p="4" backgroundColor="gray.100"
                                borderBottomRightRadius="lg"
                                borderTopRightRadius="lg">
                            <Heading as="h4" size="md">{data.title}</Heading>

                            <Text fontSize="xl" fontWeight="bold">{data.price} TL</Text>

                            <Text>{data.description}</Text>

                            <Button colorScheme={isInBasket ? "pink" : "green"}
                                    onClick={() => isInBasket ? removeItem(data) : addItem(data)}>
                                {isInBasket ? "Remove from basket" : "Add to basket"}
                            </Button>
                        </VStack>
                    </Grid>
                    <div>{isFetching ? 'Background Updating...' : ' '}</div>
                </>
            )}
        </div>
    )
}