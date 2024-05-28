import React from "react";
import ReactDOM from "react-dom/client";
import "@ogcio-ds/theme-govie/light.css";
import { App } from "./application.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
