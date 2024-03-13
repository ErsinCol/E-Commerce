import {Image, Button, Box} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {formatDate} from "../../utils/formatDate.js";

export default function Card({product}){
    return (
        <Box borderWidth="1px" borderRadius="lg" borderColor="#e2e8f0" borderStyle="solid" overflow="hidden" p="4">
            <Link to="/">
                <Image src={product.photos[0]} alt="product" fallbackSrc='https://via.placeholder.com/150'/>
                <Box p="4">
                    <Box display="flex" alignItems="baseline">
                        {formatDate(product.createdAt)}
                    </Box>

                    <Box mt="1" fontWeight="semibold" as="h4">
                        {product.title}
                    </Box>

                    <Box>{product.price} TL</Box>
                </Box>
            </Link>
            <Button colorScheme="pink">Add to basket</Button>
        </Box>
    )
}