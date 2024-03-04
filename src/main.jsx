import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "../src/scss/styles.scss";
import Router from "./Router/Router.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "./Components/App context/AppContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AppProvider>
      <RouterProvider router={Router} />
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
