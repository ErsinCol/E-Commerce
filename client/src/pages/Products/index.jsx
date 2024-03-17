import { useInfiniteQuery } from "@tanstack/react-query";
import {Button, Grid, Flex} from "@chakra-ui/react";
import Card from "../../components/Card/index.jsx";
import {fetchProductList} from "../../apis/ProductAPI.js";
import React from "react";

export default function Products() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        ...result
    } = useInfiniteQuery({
        queryKey: ['products'],
        queryFn: ({pageParam}) => fetchProductList(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) =>{
            const morePageExist = lastPage?.length === 12;

            if(!morePageExist) return;

            return allPages.length + 1;
        },
    })

    if (result.isLoading) {
        return <span>Loading...</span>
    }

    if (result.isError) {
        return <span>Error: {result.error}</span>
    }

    return (
        <>
            <Grid templateColumns="repeat(3, 1fr)" gap="4">
                {
                    data.pages.map((group, index)=>(
                        <React.Fragment key={index}>
                            {
                                group.map((product, index)=>(
                                    <Card product={product} key={index} />
                                ))
                            }
                        </React.Fragment>
                    ))
                }
            </Grid>

            <Flex justifyContent="end" mt="10px">
                <Button
                    onClick={() => fetchNextPage()}
                    isLoading={isFetchingNextPage}
                    isDisabled={!hasNextPage || isFetchingNextPage}
                >
                    { isFetchingNextPage
                        ? "Loading more..."
                        : hasNextPage
                            ? "Load more"
                            : "Nothing more to load"
                    }
                </Button>
            </Flex>
        </>
    );
}