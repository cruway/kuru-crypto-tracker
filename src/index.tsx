import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


// typescript形式に変更する場合、as HTMLElement追加
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
