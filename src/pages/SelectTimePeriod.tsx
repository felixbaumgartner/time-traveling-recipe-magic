
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import TimePeriodSelector from "@/components/TimePeriodSelector";
import RandomTransform from "@/components/RandomTransform";
import { sampleTransformations } from "@/lib/constants";
import { timePeriods } from "@/lib/constants";
import { ArrowDownIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const SelectTimePeriod = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recipeText, setRecipeText] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [bgLoaded, setBgLoaded] = useState(false);

  // Preload the background image to ensure it loads properly
  useEffect(() => {
    // Get the recipe from sessionStorage
    const storedRecipe = sessionStorage.getItem('recipeText');
    if (!storedRecipe) {
      toast({
        title: "No recipe found",
        description: "Please start by entering a recipe on the home page.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
    setRecipeText(storedRecipe);

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

  const handleTimePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
    
    // Transform the recipe based on selected time period
    if (recipeText) {
      const transform = sampleTransformations[period] || ((r) => r);
      const transformedRecipe = transform(recipeText);
      
      // Store the transformed recipe and selected period in sessionStorage
      sessionStorage.setItem('transformedRecipe', transformedRecipe);
      sessionStorage.setItem('selectedPeriod', period);
      
      // Navigate to the results page
      navigate('/result');
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
    const transformedRecipe = transform(recipeText);
    
    // Store the transformed recipe and selected period in sessionStorage
    sessionStorage.setItem('transformedRecipe', transformedRecipe);
    sessionStorage.setItem('selectedPeriod', randomPeriod);
    
    // Navigate to the results page
    navigate('/result');
  };

  const backgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/photo-1587466280419-e014d689a45c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  };

  const handleBackClick = () => {
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
                Select a Time Period
              </h2>
              <p className="text-center text-ink/80 max-w-2xl mx-auto">
                Choose a historical era to transform your recipe, or try a random transformation!
              </p>
              
              <div className="flex flex-col items-center justify-center mt-6 gap-4">
                <div className="flex items-center justify-center gap-2 bg-parchment px-4 py-2 rounded-full shadow-sm border border-aged/30">
                  <span className="flex items-center font-bold text-ink">
                    <Clock className="h-5 w-5 mr-1" /> Step 2: Select Time Period
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 max-w-3xl mx-auto">
              <TimePeriodSelector 
                onSelectTimePeriod={handleTimePeriodSelect}
                disabled={!recipeText}
              />
              
              <RandomTransform 
                onRandomTransform={handleRandomTransform}
                disabled={!recipeText}
              />

              <div className="flex justify-center mt-8">
                <Button 
                  onClick={handleBackClick}
                  variant="outline" 
                  className="border-aged text-ink hover:bg-aged/20"
                >
                  Back to Recipe Input
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

export default SelectTimePeriod;
