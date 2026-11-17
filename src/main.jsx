// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/common/ErrorBoundary';

// Global styles
import './styles/index.css';

const rootElement = document.getElementById('root');
const appJsx = (
    <React.StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </React.StrictMode>
);

if (rootElement && rootElement.hasChildNodes()) {
    ReactDOM.hydrateRoot(rootElement, appJsx);
} else if (rootElement) {
    ReactDOM.createRoot(rootElement).render(appJsx);
}