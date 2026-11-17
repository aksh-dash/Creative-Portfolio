import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';
import ErrorBoundary from './components/common/ErrorBoundary';

export function render(route = 'home') {
    return ReactDOMServer.renderToString(
        <ErrorBoundary>
            <App initialRoute={route} />
        </ErrorBoundary>
    );
}
