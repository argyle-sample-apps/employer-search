import axios from "axios";
import { Head } from "components/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "../styles/globals.css";

axios.defaults.baseURL = "/employer-search";
const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
