import {Grid} from "@chakra-ui/react";
import BaseCard from "../../components/BaseCard/index.jsx";
export default function Products() {
    return (
        <Grid templateColumns="repeat(3, 1fr)" gap="4">
            <BaseCard />
            <BaseCard />
            <BaseCard />
            <BaseCard />
            <BaseCard />
        </Grid>
    );
}