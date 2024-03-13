import {Image, Button, Box} from "@chakra-ui/react";
import {Link} from "react-router-dom";

export default function BaseCard(){
    return (
        <Box borderWidth="1px" borderRadius="lg" borderColor="#e2e8f0" borderStyle="solid" overflow="hidden" p="4">
            <Link to="/">
                <Image src="https://picsum.photos/id/0/5000/3333" alt="product"/>
                <Box p="4">
                    <Box display="flex" alignItems="baseline">
                        12/12/2023
                    </Box>

                    <Box mt="1" fontWeight="semibold" as="h4">
                        Macbook air
                    </Box>

                    <Box>27500 TL</Box>
                </Box>
            </Link>
            <Button colorScheme="pink">Add to basket</Button>
        </Box>
    )
}