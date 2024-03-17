import {Image, Button, Box} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {formatDate} from "../../utils/formatDate.js";
import PropTypes from "prop-types";

export default function Card({product}){
    return (
        <Box borderWidth="1px" borderRadius="lg" borderColor="#e2e8f0" borderStyle="solid" overflow="hidden" p="4">
            <Link to={`/product/${product._id}`}>
                <Image src={`http://localhost:3000${product.photos[0]}`} alt="product" width="150px" fallbackSrc='https://via.placeholder.com/150'/>
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

Card.propTypes = {
    product: PropTypes.exact({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        description: PropTypes.string,
        photos: PropTypes.arrayOf(PropTypes.string),
    }).isRequired
}

