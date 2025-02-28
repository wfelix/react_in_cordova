import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

declare global {
  interface Window {
    cordova?: any;
  }
}

const startAPP = () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

if ( window.cordova ) {
  document.addEventListener('deviceready', startAPP, false)
}
else {
  startAPP();
}