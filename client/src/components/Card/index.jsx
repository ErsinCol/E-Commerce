import PropTypes from "prop-types";
import {Image, Button, Box, Text, Heading, Center, Flex} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {useBasket} from "../../contexts/BasketContext.jsx";
import {formatMoney} from "../../utils/formatMoney.js";

export default function Card({product}){
    const {addItem, removeItem, items} = useBasket();

    const isInBasket = items.find(item => item._id === product._id);

    return (
        <Box borderWidth="1px" borderRadius="lg" borderColor="#e2e8f0" borderStyle="solid" overflow="hidden" p="4">
            <Link to={`/product/${product._id}`}>
                <Flex direction="column" alignItems="center" justifyContent="center">
                    <Image src={product.photos[0]} alt="product-photo" boxSize="150px" objectFit="cover" fallbackSrc='https://via.placeholder.com/150'/>
                    <Box mt="4">
                        <Heading as="h5" size="sm" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                            {product.title}
                        </Heading>

                        <p style={{textAlign: "center"}}>{formatMoney(product.price)} TL</p>
                    </Box>
                </Flex>
            </Link>
            <Center mt="2">
                <Button onClick={()=> isInBasket ? removeItem(product) : addItem(product)} colorScheme={isInBasket ? "pink" : "green"}>{isInBasket ? "Remove from basket" : "Add to basket"}</Button>
            </Center>
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

