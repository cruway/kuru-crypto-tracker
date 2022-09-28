import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ThemeProvider} from "styled-components";
import {theme} from "./theme";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

// typescript形式に変更する場合、as HTMLElement追加
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </QueryClientProvider>
);
