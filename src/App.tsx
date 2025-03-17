
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import "./App.css"; // Ensure CSS is explicitly imported

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Debug logs to check CSS and asset loading
    console.log("App component mounted");
    console.log("Environment:", import.meta.env.MODE);
    console.log("Document ready state:", document.readyState);
    
    // Check if background image is loading
    const computedStyle = window.getComputedStyle(document.body);
    console.log("Body background:", computedStyle.background);
    
    // Check if CSS files loaded
    const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
    console.log("CSS links loaded:", linkElements.length);
    linkElements.forEach(link => {
      console.log("CSS link:", link.getAttribute('href'));
    });
    
    // Check for custom fonts
    console.log("Font families available:", 
      document.fonts ? document.fonts.check('1em "EB Garamond"') : 'Fonts API not available');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
