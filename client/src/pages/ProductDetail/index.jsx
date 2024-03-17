import {useParams} from "react-router-dom";
import {fetchProductDetail} from "../../apis/ProductAPI.js";
import {useQuery} from "@tanstack/react-query";
import { Box, Text, Button } from "@chakra-ui/react";
import {formatDate} from "../../utils/formatDate.js";
import ImageGallery from "react-image-gallery";

export default function ProductDetail(){
    const {productId} = useParams();

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => fetchProductDetail(productId)
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    let images;
    if(data.photos.length > 0){
        images = data.photos.map((url) => ({original: `http://localhost:3000${url}`}))
    }

    return (
        <div>
            <Button colorScheme="pink">Add to basket</Button>

            <Text as="h2" fontSize="2xl">{data.title}</Text>

            <Text>{formatDate(data.createdAt)}</Text>

            <p>{data.description}</p>

            {images &&
                <Box margin="10px">
                    <ImageGallery items={images} />
                </Box>
            }

        </div>
    )
}