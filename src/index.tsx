import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from "styled-components";
import App from './App';

/* color theme 設定*/
const darkTheme = {
    textColor: "whitesmoke",
    backgroundColor: "#111"
}

const lightTheme = {
    textColor: "#111",
    backgroundColor: "whitesmoke"
}

// typescript形式に変更する場合、as HTMLElement追加
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
          <App />
      </ThemeProvider>
  </React.StrictMode>
);
