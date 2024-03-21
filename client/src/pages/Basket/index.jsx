import {useBasket} from "../../contexts/BasketContext.jsx";
import {
    Alert,
    List,
    ListItem,
    Image,
    Text,
    Flex,
    Box,
    Button, IconButton
} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {DeleteIcon, AddIcon} from "@chakra-ui/icons";

export default function Basket(){
    const {items, removeItem} = useBasket();

    const isEmptyBasket = items.length === 0;

    const total = items.reduce((accumulator, item)=> accumulator + item.price, 0);

    const handleRemoveItem = (event, item) => {
        event.preventDefault();

        removeItem(item);
    }
    return (
        <Box p="4">
            {isEmptyBasket ? (
                <Alert status="warning">Your cart is currently empty.</Alert>
            ) : (
                <>
                    <List>
                        {items.map((item, index) => (
                                <ListItem key={index} border="1px solid #e2e8f0" borderRadius="md" padding="4" marginBottom="4">
                                    <Link to={`/product/${item._id}`}>
                                        <Flex gap={4}>
                                            <Image boxSize="100px" objectFit="cover" src={`http://localhost:3000${item.photos[0]}`} alt={item.title} />
                                            <Flex flex="1" flexDir="column" justifyContent="center">
                                                <Box>
                                                    <Text>{item.title}</Text>
                                                </Box>
                                                <Flex alignItems="center" justifyContent="space-between">
                                                    <IconButton
                                                        aria-label="Remove product from basket"
                                                        icon={<DeleteIcon />}
                                                        colorScheme="pink"
                                                        size="sm"
                                                        variant="outline"
                                                        isRound={true}
                                                        onClick={(e) => handleRemoveItem(e, item)}
                                                    />
                                                    <Text>{item.price} TL</Text>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Link>
                                </ListItem>
                        ))}
                    </List>

                    <Box mt={4}>
                        <Text fontSize="lg">
                            Total: {total} TL
                        </Text>
                    </Box>
                </>

            )}
        </Box>
    );
}