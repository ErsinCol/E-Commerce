import { useAuth } from "../../contexts/AuthContext.jsx";
import {Heading} from "@chakra-ui/react";

export default function Profile(){
    const { user } = useAuth();

    return (
        <div>
            <Heading>Profile</Heading>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    )
}