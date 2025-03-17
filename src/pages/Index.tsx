
import { useState } from "react";
import Header from "@/components/Header";
import RecipeInput from "@/components/RecipeInput";
import TimePeriodSelector from "@/components/TimePeriodSelector";
import RecipeDisplay from "@/components/RecipeDisplay";
import { sampleTransformations } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [recipeText, setRecipeText] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [transformedRecipe, setTransformedRecipe] = useState<string>("");
  const [showTransformation, setShowTransformation] = useState(false);

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

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1587466280419-e014d689a45c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3')] bg-cover bg-fixed">
      <div className="min-h-screen bg-white/30 backdrop-blur-sm">
        <Header />
        
        <main className="container py-8 space-y-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-ink mb-4 text-center">
              Transform Your Recipes Through Time
            </h2>
            <p className="text-center text-ink/80 mb-8">
              Enter a modern recipe and select a historical era to see how it would have been prepared in that time period.
            </p>
            
            <div className="space-y-6">
              <RecipeInput onSubmitRecipe={handleRecipeSubmit} />
              
              {recipeText && (
                <TimePeriodSelector 
                  onSelectTimePeriod={handleTimePeriodSelect}
                  disabled={!recipeText}
                />
              )}
              
              {showTransformation && (
                <>
                  <Separator className="my-8 bg-aged" />
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
          <div className="container text-center">
            <p className="text-sm">Temporal Recipe Transformer &copy; {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
