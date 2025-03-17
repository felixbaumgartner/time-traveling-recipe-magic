
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRightIcon } from "lucide-react";

interface RecipeInputProps {
  onSubmitRecipe: (recipe: string) => void;
}

const RecipeInput = ({ onSubmitRecipe }: RecipeInputProps) => {
  const [recipeText, setRecipeText] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (recipeText.trim().length < 50) {
      toast({
        title: "Recipe too short",
        description: "Please enter a complete recipe with ingredients and instructions.",
        variant: "destructive",
      });
      return;
    }
    
    onSubmitRecipe(recipeText);
    toast({
      title: "Recipe submitted",
      description: "Now select a time period to transform your recipe!",
    });
  };

  const handleSampleRecipe = () => {
    const sampleRecipe = `Chocolate Chip Cookies
- 2 1/4 cups all-purpose flour
- 1 tsp baking soda
- 1 tsp salt
- 1 cup butter, softened
- 3/4 cup granulated sugar
- 3/4 cup packed brown sugar
- 2 eggs
- 2 tsp vanilla extract
- 2 cups semi-sweet chocolate chips

Instructions:
1. Preheat oven to 375°F
2. Combine flour, baking soda, and salt
3. Beat butter, granulated sugar, and brown sugar until creamy
4. Add eggs and vanilla, beat well
5. Gradually add flour mixture
6. Stir in chocolate chips
7. Drop by rounded tablespoon onto baking sheets
8. Bake 9-11 minutes until golden brown`;
    setRecipeText(sampleRecipe);
  };

  return (
    <Card className="recipe-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-ink text-xl text-left">Enter Your Modern Recipe</CardTitle>
        <CardDescription className="text-ink/70 text-left">
          Paste a complete recipe with ingredients and instructions
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <Textarea
          placeholder="Enter your recipe here..."
          className="recipe-textarea"
          value={recipeText}
          onChange={(e) => setRecipeText(e.target.value)}
          rows={10}
        />
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={handleSampleRecipe} 
          className="border-aged text-ink hover:bg-aged/20"
        >
          Use Sample Recipe
        </Button>
        <Button 
          onClick={handleSubmit} 
          className="gradient-button"
          disabled={recipeText.trim().length < 10}
        >
          Continue <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeInput;
