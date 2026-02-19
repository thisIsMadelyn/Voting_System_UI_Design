// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import './styles/variables.css'
// import App from './App'; // Make sure this points to your actual App file
//
// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);
//
// root.render(
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>
// );

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // 1. Import these
// import App from './App';
// import './styles/variables.css';
//
// // 2. Create a client instance
// const queryClient = new QueryClient();
//
// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         {/* 3. Wrap your App with the Provider */}
//         <QueryClientProvider client={queryClient}>
//             <App />
//         </QueryClientProvider>
//     </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom'; // 1. Add this import
import App from './App';
import './styles/variables.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter> {/* 2. Wrap your App component */}
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);
