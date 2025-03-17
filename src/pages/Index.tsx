
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import RecipeInput from "@/components/RecipeInput";
import { ArrowDownIcon, ChefHat, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [bgLoaded, setBgLoaded] = useState(false);

  // Preload the background image to ensure it loads properly
  useEffect(() => {
    const img = new Image();
    img.src = 'https://images.unsplash.com/photo-1550136513-548af4445338?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    img.onload = () => {
      console.log("Background image loaded successfully");
      setBgLoaded(true);
    };
    img.onerror = () => {
      console.error("Background image failed to load");
    };
  }, []);

  const handleRecipeSubmit = (recipe: string) => {
    // Store the recipe in sessionStorage to pass between pages
    sessionStorage.setItem('recipeText', recipe);
    // Navigate to the next page
    navigate('/select-period');
  };

  const backgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/photo-1550136513-548af4445338?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  };

  return (
    <div className="min-h-screen" style={backgroundStyle}>
      <div className="min-h-screen bg-gradient-to-b from-parchment/90 to-parchment/70 backdrop-blur-sm">
        <Header />
        
        <main className="container max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-8 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-block mb-3 bg-gradient-to-r from-medieval-primary via-victorian-primary to-future-primary px-6 py-2 rounded-full">
                <Sparkles className="h-6 w-6 text-white inline mr-2" />
                <span className="text-white font-bold">Culinary Time Travel</span>
              </div>
              <h2 className="text-4xl font-bold text-ink mb-4 font-medieval bg-gradient-to-r from-medieval-primary via-victorian-primary to-future-primary bg-clip-text text-transparent">
                Transform Your Recipes Through Time
              </h2>
              <p className="text-center text-ink/80 max-w-2xl mx-auto text-lg">
                Ever wondered how your favorite recipes would be prepared in Medieval times or in a future space colony? 
                Start by entering your recipe below!
              </p>
              
              <div className="flex flex-col items-center justify-center mt-6 gap-4">
                <div className="flex items-center justify-center gap-2 bg-parchment/90 px-4 py-2 rounded-full shadow-md border border-aged/30 hover:shadow-lg hover:border-aged/50 transition-all">
                  <span className="flex items-center font-bold text-ink">
                    <ChefHat className="h-5 w-5 mr-1 text-medieval-primary" /> Step 1: Enter Your Recipe
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 max-w-2xl mx-auto">
              <RecipeInput onSubmitRecipe={handleRecipeSubmit} />
            </div>
          </div>
        </main>
        
        <footer className="bg-gradient-to-r from-medieval-primary to-victorian-primary text-parchment py-4 mt-8">
          <div className="container max-w-6xl mx-auto px-4 md:px-6 text-center">
            <p className="text-sm">Temporal Recipe Transformer &copy; {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
