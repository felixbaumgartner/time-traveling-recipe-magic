
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { timePeriods } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BookOpen, Clock, Utensils } from "lucide-react";

interface RecipeDisplayProps {
  originalRecipe: string;
  transformedRecipe: string;
  selectedTimePeriod: string;
}

const RecipeDisplay = ({ originalRecipe, transformedRecipe, selectedTimePeriod }: RecipeDisplayProps) => {
  const period = timePeriods.find(p => p.id === selectedTimePeriod) || timePeriods[0];

  // Function to format recipe with headers
  const formatRecipe = (recipe: string, isOriginal: boolean) => {
    const parts = recipe.split('\n\n');
    
    if (parts.length <= 1) {
      // Simple formatting if the recipe doesn't have clear sections
      const ingredientsStart = recipe.indexOf('-');
      const instructionsStart = recipe.toLowerCase().indexOf('instruction');
      
      if (ingredientsStart > 0 && instructionsStart > 0) {
        const title = recipe.substring(0, ingredientsStart).trim();
        const ingredients = recipe.substring(ingredientsStart, instructionsStart).trim();
        const instructions = recipe.substring(instructionsStart).trim();
        
        return (
          <>
            <h3 className={cn(
              "text-lg font-semibold mb-3",
              !isOriginal && period.fontClass
            )}>{title}</h3>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Utensils className="h-4 w-4" />
                <h4 className="font-semibold">Ingredients</h4>
              </div>
              <div className="ml-5 space-y-1">{ingredients}</div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4" />
                <h4 className="font-semibold">Method</h4>
              </div>
              <div className="ml-5 space-y-1">{instructions}</div>
            </div>
          </>
        );
      }
    }
    
    // Fallback to just the raw text if we can't parse it
    return <div>{recipe}</div>;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      <Card className="recipe-card border-2 border-aged/30 shadow-md">
        <CardHeader className="pb-2 bg-gradient-to-r from-aged/10 to-aged/5 rounded-t-lg">
          <CardTitle className="text-ink text-xl text-left flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-aged-dark" />
            Modern Recipe
          </CardTitle>
          <CardDescription className="text-ink/70 text-left">
            Original ingredients and instructions
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="whitespace-pre-wrap text-ink bg-white/70 p-5 rounded-md border border-aged/20 text-left shadow-sm">
            {formatRecipe(originalRecipe, true)}
          </div>
        </CardContent>
      </Card>

      <Card className={cn(
        "border-2 shadow-lg transition-all duration-500",
        period.cardClass
      )}>
        <CardHeader className={cn(period.headerClass, "pb-2")}>
          <CardTitle className={cn("text-parchment text-xl text-left flex items-center gap-2", period.fontClass)}>
            <BookOpen className="h-5 w-5" />
            {period.name} Version
          </CardTitle>
          <CardDescription className="text-parchment/90 text-left">
            Transformed for {period.years}
          </CardDescription>
        </CardHeader>
        <CardContent className={cn(
          "whitespace-pre-wrap p-5 text-left",
          period.contentClass,
          period.fontClass
        )}>
          {formatRecipe(transformedRecipe, false)}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeDisplay;
