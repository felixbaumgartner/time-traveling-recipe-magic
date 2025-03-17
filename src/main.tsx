
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
    
    // Check Tailwind classes
    try {
      const bodyClasses = document.body.classList.toString();
      console.log("Main CSS classes applied:", bodyClasses);
      
      // Force apply some basic styles if needed
      if (!bodyClasses || bodyClasses === '') {
        console.log("Applying fallback styles");
        document.body.classList.add('bg-parchment');
      }
    } catch (e) {
      console.error("Error checking body classes:", e);
    }
    
    // Check if stylesheet rules are accessible
    try {
      const styleRules = [];
      for (let i = 0; i < document.styleSheets.length; i++) {
        try {
          const sheet = document.styleSheets[i];
          const rules = sheet.cssRules || sheet.rules;
          styleRules.push(`Sheet ${i}: ${rules.length} rules`);
        } catch (e) {
          styleRules.push(`Sheet ${i}: Cannot access rules (CORS)`);
        }
      }
      console.log("Style rules:", styleRules);
    } catch (e) {
      console.error("Error checking style rules:", e);
    }
  });
}

// Ensure styles are applied before mounting
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM Content fully loaded");
  createRoot(document.getElementById("root")!).render(<App />);
});
