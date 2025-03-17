
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import RecipeInput from "@/components/RecipeInput";
import { ArrowDownIcon, ChefHat } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [bgLoaded, setBgLoaded] = useState(false);

  // Preload the background image to ensure it loads properly
  useEffect(() => {
    const img = new Image();
    img.src = 'https://images.unsplash.com/photo-1587466280419-e014d689a45c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
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
    backgroundImage: "url('https://images.unsplash.com/photo-1587466280419-e014d689a45c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  };

  return (
    <div className="min-h-screen" style={backgroundStyle}>
      <div className="min-h-screen bg-parchment/80 backdrop-blur-sm">
        <Header />
        
        <main className="container max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-ink mb-4 font-medieval">
                Transform Your Recipes Through Time
              </h2>
              <p className="text-center text-ink/80 max-w-2xl mx-auto">
                Ever wondered how your favorite recipes would be prepared in Medieval times or in a future space colony? 
                Start by entering your recipe below!
              </p>
              
              <div className="flex flex-col items-center justify-center mt-6 gap-4">
                <div className="flex items-center justify-center gap-2 bg-parchment px-4 py-2 rounded-full shadow-sm border border-aged/30">
                  <span className="flex items-center font-bold text-ink">
                    <ChefHat className="h-5 w-5 mr-1" /> Step 1: Enter Your Recipe
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 max-w-2xl mx-auto">
              <RecipeInput onSubmitRecipe={handleRecipeSubmit} />
            </div>
          </div>
        </main>
        
        <footer className="bg-ink text-parchment py-4 mt-8">
          <div className="container max-w-6xl mx-auto px-4 md:px-6 text-center">
            <p className="text-sm">Temporal Recipe Transformer &copy; {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
