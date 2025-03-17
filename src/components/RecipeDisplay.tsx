
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { timePeriods } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface RecipeDisplayProps {
  originalRecipe: string;
  transformedRecipe: string;
  selectedTimePeriod: string;
}

const RecipeDisplay = ({ originalRecipe, transformedRecipe, selectedTimePeriod }: RecipeDisplayProps) => {
  const period = timePeriods.find(p => p.id === selectedTimePeriod) || timePeriods[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      <Card className="recipe-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-ink text-xl text-left">Modern Recipe</CardTitle>
          <CardDescription className="text-ink/70 text-left">
            Original ingredients and instructions
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="whitespace-pre-wrap text-ink bg-white/70 p-4 rounded-md border border-aged/20 text-left">
            {originalRecipe}
          </div>
        </CardContent>
      </Card>

      <Card className={cn(
        "border-2 shadow-md",
        period.cardClass
      )}>
        <CardHeader className={cn(period.headerClass, "pb-2")}>
          <CardTitle className={cn("text-parchment text-xl text-left", period.fontClass)}>
            {period.name} Version
          </CardTitle>
          <CardDescription className="text-parchment/80 text-left">
            Transformed for {period.years}
          </CardDescription>
        </CardHeader>
        <CardContent className={cn(
          "whitespace-pre-wrap p-4 text-left",
          period.contentClass,
          period.fontClass
        )}>
          {transformedRecipe}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeDisplay;
