import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "../node_modules/@tanstack/react-query-devtools/src/index";
import { ToastContainer } from "react-toastify";

// react query client oluşturuyoruz
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
    <ToastContainer />
  </QueryClientProvider>
);
