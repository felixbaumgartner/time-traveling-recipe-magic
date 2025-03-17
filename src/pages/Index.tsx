
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import RecipeInput from "@/components/RecipeInput";
import TimePeriodSelector from "@/components/TimePeriodSelector";
import RecipeDisplay from "@/components/RecipeDisplay";
import RandomTransform from "@/components/RandomTransform";
import { sampleTransformations } from "@/lib/constants";
import { timePeriods } from "@/lib/constants";
import { ArrowDownIcon, ChefHat, Clock, Scroll } from "lucide-react";

const Index = () => {
  const [recipeText, setRecipeText] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [transformedRecipe, setTransformedRecipe] = useState<string>("");
  const [showTransformation, setShowTransformation] = useState(false);
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
    setRecipeText(recipe);
    setSelectedPeriod("");
    setShowTransformation(false);
  };

  const handleTimePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
    
    // Transform the recipe based on selected time period
    if (recipeText) {
      const transform = sampleTransformations[period] || ((r) => r);
      setTransformedRecipe(transform(recipeText));
      setShowTransformation(true);
    }
  };
  
  const handleRandomTransform = () => {
    if (!recipeText) return;
    
    // Get random time period
    const availablePeriods = timePeriods.map(period => period.id);
    const randomIndex = Math.floor(Math.random() * availablePeriods.length);
    const randomPeriod = availablePeriods[randomIndex];
    
    setSelectedPeriod(randomPeriod);
    
    // Transform the recipe based on random time period
    const transform = sampleTransformations[randomPeriod] || ((r) => r);
    setTransformedRecipe(transform(recipeText));
    setShowTransformation(true);
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
                Simply enter your recipe below and select a historical era to see the transformation!
              </p>
              
              <div className="flex flex-col items-center justify-center mt-6 gap-4">
                <div className="flex items-center justify-center gap-2 bg-parchment px-4 py-2 rounded-full shadow-sm border border-aged/30">
                  <span className="flex items-center"><ChefHat className="h-5 w-5 mr-1" /> Enter Recipe</span>
                  <ArrowDownIcon className="h-4 w-4" />
                  <span className="flex items-center"><Clock className="h-5 w-5 mr-1" /> Select Era</span>
                  <ArrowDownIcon className="h-4 w-4" />
                  <span className="flex items-center"><Scroll className="h-5 w-5 mr-1" /> View Transformation</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <RecipeInput onSubmitRecipe={handleRecipeSubmit} />
              
              {recipeText && (
                <>
                  <div className="flex justify-center">
                    <ArrowDownIcon className="h-8 w-8 text-ink animate-bounce" />
                  </div>
                  <TimePeriodSelector 
                    onSelectTimePeriod={handleTimePeriodSelect}
                    disabled={!recipeText}
                  />
                  
                  <RandomTransform 
                    onRandomTransform={handleRandomTransform}
                    disabled={!recipeText}
                  />
                </>
              )}
              
              {showTransformation && (
                <>
                  <div className="flex justify-center">
                    <ArrowDownIcon className="h-8 w-8 text-ink animate-bounce" />
                  </div>
                  <RecipeDisplay 
                    originalRecipe={recipeText}
                    transformedRecipe={transformedRecipe}
                    selectedTimePeriod={selectedPeriod}
                  />
                </>
              )}
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
