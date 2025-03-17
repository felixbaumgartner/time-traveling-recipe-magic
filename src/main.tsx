
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Debug logging for CSS loading
console.log("Main script executing");
console.log("Document content loaded:", document.readyState);

// Log when CSS files finish loading
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    console.log("Window loaded completely");
    console.log("Stylesheets loaded:", document.styleSheets.length);
    console.log("Main CSS classes applied:", document.body.classList.toString());
  });
}

createRoot(document.getElementById("root")!).render(<App />);
