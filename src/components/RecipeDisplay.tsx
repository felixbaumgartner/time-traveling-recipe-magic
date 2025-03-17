
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
      <Card className="bg-white/80 border-aged">
        <CardHeader>
          <CardTitle className="text-ink">Modern Recipe</CardTitle>
          <CardDescription className="text-ink/70">
            Original ingredients and instructions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap text-ink">
            {originalRecipe}
          </div>
        </CardContent>
      </Card>

      <Card className={cn(
        "border-2",
        period.cardClass
      )}>
        <CardHeader className={period.headerClass}>
          <CardTitle className={cn("text-parchment", period.fontClass)}>
            {period.name} Version
          </CardTitle>
          <CardDescription className="text-parchment/80">
            Transformed for {period.years}
          </CardDescription>
        </CardHeader>
        <CardContent className={cn(
          "whitespace-pre-wrap",
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
