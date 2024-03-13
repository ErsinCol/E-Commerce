import './reset.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {ChakraProvider} from "@chakra-ui/react";
import {RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import router from "./router/index.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <ChakraProvider>
              <RouterProvider router={router} />
          </ChakraProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)
