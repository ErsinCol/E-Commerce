import './reset.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {ChakraProvider} from "@chakra-ui/react";
import router from "./router/index.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 10,
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
          <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ReactQueryDevtools buttonPosition="bottom-right" />
            </QueryClientProvider>
          </ChakraProvider>
  </React.StrictMode>,
)
