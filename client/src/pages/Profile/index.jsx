import { useAuth } from "../../contexts/AuthContext.jsx";
import {Button, Flex, Heading} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export default function Profile(){
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout(()=>{
            navigate("/");
        });
    }

    return (
        <Flex flexDir="column" alignItems="start" gap="4">
            <Heading>Profile</Heading>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <Button
                onClick={handleLogout}
                colorScheme="pink"
            >
                Logout
            </Button>
        </Flex>
    )
}