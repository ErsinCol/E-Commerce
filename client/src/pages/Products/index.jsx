import {useInfiniteQuery} from "@tanstack/react-query";
import {Button, Flex, Grid} from "@chakra-ui/react";
import Card from "../../components/Card/index.jsx";
import ProductAPI from "../../apis/ProductAPI.js";
import React from "react";

export default function Products() {
    const {data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status} = useInfiniteQuery({
        queryKey: ["products"],
        queryFn: ProductAPI.getProducts,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
            if(!lastPage.hasMore){
                return undefined;
            }
            return lastPageParam + 1;
        }
    })

    return (
        <div id="products-page">
            { status === "pending" ? (
                'Loading...'
            ) : status === "error" ? (
                    <span>Error: {error.message}</span>
            ) : (
                    <>
                        <Grid templateColumns="repeat(4, 1fr)" gap="4">
                            {data.pages.map((group, index) => (
                                <React.Fragment key={index}>
                                    {group.products.map((product, index) => (
                                        <Card product={product} key={index}/>
                                    ))}
                                </React.Fragment>
                            ))}
                        </Grid>
                        <Flex my="4" justifyContent="end">
                            <Button
                                onClick={() => fetchNextPage()}
                                isDisabled={!hasNextPage || isFetchingNextPage}
                                isLoading={isFetchingNextPage}
                                loadingText="Loading more..."
                            >
                                { hasNextPage
                                    ? 'Load More'
                                    : 'Nothing more to load'
                                }
                            </Button>
                        </Flex>
                        {isFetching && !isFetchingNextPage && <p>Fetching...</p>}
                    </>
                )}
        </div>
    );
}