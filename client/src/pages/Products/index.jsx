import {keepPreviousData, useQuery, useQueryClient} from "@tanstack/react-query";
import {Button, Grid} from "@chakra-ui/react";
import Card from "../../components/Card/index.jsx";
import ProductAPI from "../../apis/ProductAPI.js";
import {useState, useEffect} from "react";

function useProducts(page){
    return useQuery({
        queryKey: ["products", page],
        queryFn: () => ProductAPI.getProducts(page),
        placeholderData: keepPreviousData,
        staleTime: 5000
    })
}

export default function Products() {
    const [page, setPage] = useState(1);

    const queryClient = useQueryClient();

    const { isPending, isError, error, data, isFetching, isPlaceholderData } = useProducts(page);

    // Prefetch the next page!
    useEffect(() => {
        if (!isPlaceholderData && data?.hasMore) {
            queryClient.prefetchQuery({
                queryKey: ['products', page + 1],
                queryFn: () => ProductAPI.getProducts(page + 1),
            })
        }
    }, [data, isPlaceholderData, page, queryClient])

    return (
        <div id="products-page">
            { isPending ? (
                'Loading...'
            ) : isError ? (
                    <span>Error: {error.message}</span>
            ) : data.products.length > 0 ? (
                <>
                    <Grid templateColumns="repeat(5, 1fr)" gap="4">
                        {
                            data.products.map((product, index) => (
                                <Card product={product} key={index}/>
                            ))
                        }
                    </Grid>
                    <span>Current Page: {page}</span>
                    <Button
                        onClick={() => setPage((old) => Math.max(old-1, 1))}
                        disabled={page === 1}
                    >
                        Previous Page
                    </Button>{' '}
                    <Button
                        onClick={() => {
                            if (!isPlaceholderData && data.hasMore) {
                                setPage((old) => old + 1)
                            }
                        }}
                        disabled={isPlaceholderData || !data?.hasMore}
                    >
                        Next Page
                    </Button>
                    {isFetching ? <span> Loading...</span> : null}{' '}
                </>
            ) : (
                <p>
                    <i>No products</i>
                </p>
            )}
        </div>
    );
}