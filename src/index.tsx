import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RecoilRoot} from "recoil";

const queryClient = new QueryClient();

// typescript形式に変更する場合、as HTMLElement追加
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <RecoilRoot>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </RecoilRoot>
);
