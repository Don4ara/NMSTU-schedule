import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import './app/style/index.css'

const AppWithGlobalHandlers = () => {
  useEffect(() => {
    // Prevent Tab key navigation for kiosk-like experience
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        e.stopPropagation();
        // Remove focus from currently focused element to avoid "highlight" sticking
        (document.activeElement as HTMLElement)?.blur();
      }
    };

    // Use capture phase to ensure we intercept before other listeners
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, []);

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppWithGlobalHandlers />
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
