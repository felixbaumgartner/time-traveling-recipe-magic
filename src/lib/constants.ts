import { parseRecipe, transformRecipe } from "./recipeTransformer";

export const timePeriods = [
  {
    id: "ancient",
    name: "Ancient",
    shortName: "Ancient",
    years: "3000 BCE - 500 CE",
    fontClass: "font-medieval",
    headerClass: "bg-amber-800 text-parchment",
    contentClass: "bg-amber-50 text-amber-900",
    cardClass: "border-amber-800"
  },
  {
    id: "medieval",
    name: "Medieval",
    shortName: "Medieval",
    years: "500 - 1400 CE",
    fontClass: "font-medieval",
    headerClass: "bg-medieval-primary text-parchment",
    contentClass: "bg-aged-light text-medieval-secondary",
    cardClass: "border-medieval-primary"
  },
  {
    id: "victorian",
    name: "Victorian",
    shortName: "Victorian",
    years: "1800s",
    fontClass: "font-victorian",
    headerClass: "bg-victorian-primary text-parchment",
    contentClass: "bg-amber-50 text-victorian-secondary",
    cardClass: "border-victorian-primary"
  },
  {
    id: "future",
    name: "Future",
    shortName: "Future",
    years: "Next 100 Years",
    fontClass: "font-future",
    headerClass: "bg-future-primary text-white",
    contentClass: "bg-slate-100 text-slate-800",
    cardClass: "border-future-primary"
  }
];

export const sampleTransformations: Record<string, (recipe: string) => string> = {
  "ancient": (recipe) => {
    const parsedRecipe = parseRecipe(recipe);
    return transformRecipe(parsedRecipe, "ancient");
  },
  "medieval": (recipe) => {
    const parsedRecipe = parseRecipe(recipe);
    return transformRecipe(parsedRecipe, "medieval");
  },
  "victorian": (recipe) => {
    const parsedRecipe = parseRecipe(recipe);
    return transformRecipe(parsedRecipe, "victorian");
  },
  "future": (recipe) => {
    const parsedRecipe = parseRecipe(recipe);
    return transformRecipe(parsedRecipe, "future");
  }
};
