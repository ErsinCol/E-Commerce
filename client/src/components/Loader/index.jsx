import { Spinner } from '@chakra-ui/react'
import { useIsFetching } from '@tanstack/react-query'

export default function Loader(){
    const isFetching = useIsFetching();

    return isFetching ? (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}}>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </div>
    ) : null
}