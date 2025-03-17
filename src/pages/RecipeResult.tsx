
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import RecipeDisplay from "@/components/RecipeDisplay";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Scroll } from "lucide-react";

const RecipeResult = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recipeText, setRecipeText] = useState<string>("");
  const [transformedRecipe, setTransformedRecipe] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [bgLoaded, setBgLoaded] = useState(false);

  // Preload the background image to ensure it loads properly
  useEffect(() => {
    // Get the recipe and transformation from sessionStorage
    const storedRecipe = sessionStorage.getItem('recipeText');
    const storedTransformedRecipe = sessionStorage.getItem('transformedRecipe');
    const storedPeriod = sessionStorage.getItem('selectedPeriod');
    
    if (!storedRecipe || !storedTransformedRecipe || !storedPeriod) {
      toast({
        title: "Missing information",
        description: "Please start by entering a recipe on the home page.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
    
    setRecipeText(storedRecipe);
    setTransformedRecipe(storedTransformedRecipe);
    setSelectedPeriod(storedPeriod);

    const img = new Image();
    img.src = 'https://images.unsplash.com/photo-1587466280419-e014d689a45c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    img.onload = () => {
      console.log("Background image loaded successfully");
      setBgLoaded(true);
    };
    img.onerror = () => {
      console.error("Background image failed to load");
    };
  }, [navigate, toast]);

  const backgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/photo-1587466280419-e014d689a45c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  };

  const handleBackClick = () => {
    navigate('/select-period');
  };

  const handleStartOver = () => {
    // Clear sessionStorage and go back to the beginning
    sessionStorage.removeItem('recipeText');
    sessionStorage.removeItem('transformedRecipe');
    sessionStorage.removeItem('selectedPeriod');
    navigate('/');
  };

  return (
    <div className="min-h-screen" style={backgroundStyle}>
      <div className="min-h-screen bg-parchment/80 backdrop-blur-sm">
        <Header />
        
        <main className="container max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-ink mb-4 font-medieval">
                Your Transformed Recipe
              </h2>
              <p className="text-center text-ink/80 max-w-2xl mx-auto">
                Here's how your recipe would look in a different time period!
              </p>
              
              <div className="flex flex-col items-center justify-center mt-6 gap-4">
                <div className="flex items-center justify-center gap-2 bg-parchment px-4 py-2 rounded-full shadow-sm border border-aged/30">
                  <span className="flex items-center font-bold text-ink">
                    <Scroll className="h-5 w-5 mr-1" /> Step 3: View Transformed Recipe
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {recipeText && transformedRecipe && selectedPeriod && (
                <RecipeDisplay 
                  originalRecipe={recipeText}
                  transformedRecipe={transformedRecipe}
                  selectedTimePeriod={selectedPeriod}
                />
              )}

              <div className="flex justify-center gap-4 mt-8">
                <Button 
                  onClick={handleBackClick}
                  variant="outline" 
                  className="border-aged text-ink hover:bg-aged/20"
                >
                  Back to Time Period Selection
                </Button>
                <Button 
                  onClick={handleStartOver}
                  className="gradient-button"
                >
                  Start Over with New Recipe
                </Button>
              </div>
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

export default RecipeResult;
