import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams";
import React from "react";
import {Link, BrowserRouter, Routes, Route} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Details from "./Details";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staletime: Infinity,
      cachetime: Infinity,
    }

  }
})
const App = () => {
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
        <header>
          <Link to="/" >Adopt Me!</Link>
        </header>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
    </QueryClientProvider>
   
    </BrowserRouter>
   
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);