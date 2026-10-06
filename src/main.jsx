import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SmoothScroll from './components/SmoothScroll.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </ErrorBoundary>
  </React.StrictMode>,
);


