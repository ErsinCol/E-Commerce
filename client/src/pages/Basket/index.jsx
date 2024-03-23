import {useBasket} from "../../contexts/BasketContext.jsx";
import {useAuth} from "../../contexts/AuthContext.jsx";
import {
    Alert,
    List,
    ListItem,
    Image,
    Text,
    Flex,
    Box,
    Button,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    useDisclosure, Input, Textarea, useToast,
} from "@chakra-ui/react";
import {Link, useNavigate} from "react-router-dom";
import {DeleteIcon} from "@chakra-ui/icons";
import OrderAPI from "../../apis/OrderAPI.js";
import React, {useState} from "react";

export default function Basket(){
    const {items, removeItem, clearBasket} = useBasket();
    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();

    const {isOpen, onOpen, onClose} = useDisclosure();
    const toast = useToast();
    const initialRef = React.useRef(null);

    const [address, setAddress] = useState("");

    const isEmptyBasket = items.length === 0;

    const total = items.reduce((accumulator, item)=> accumulator + item.price, 0);

    const handleRemoveItem = (event, item) => {
        event.preventDefault();

        removeItem(item);
    }

    const handleOrder = () => {
        if(isLoggedIn){
            onOpen();
        }else{
            navigate("/signin");
        }
    }

    const handleSubmit = async () => {
        try{
            const itemsId = items.map(item => item._id);

            const data = {
                address: address,
                items: itemsId,
            }

            await OrderAPI.Create(data);

            clearBasket();

            onClose();

            toast({
                title: "Order created successfully",
                status: "success"
            })

        }catch(e){
            console.error(e);
        }
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

                    <Button mt={2} size="sm" colorScheme="green" onClick={handleOrder}>Order</Button>

                    <Modal
                        initialFocusRef={initialRef}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Order</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl isRequired>
                                    <FormLabel>Address</FormLabel>
                                    <Textarea
                                        size="sm"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        ref={initialRef}
                                    />
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    colorScheme="blue"
                                    isDisabled={address === ""}
                                    onClick={handleSubmit}
                                >
                                    Save
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>

            )}
        </Box>
    );
}