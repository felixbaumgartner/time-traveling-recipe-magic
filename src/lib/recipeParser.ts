/**
 * Parses a plain text recipe into structured sections
 */
export interface ParsedRecipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  originalText: string;
}

export const parseRecipe = (recipeText: string): ParsedRecipe => {
  // Default values in case we can't parse properly
  const defaultResult: ParsedRecipe = {
    title: "Recipe",
    ingredients: [],
    instructions: [],
    originalText: recipeText
  };
  
  if (!recipeText) return defaultResult;

  try {
    // Split by double newlines to find major sections
    const sections = recipeText.split(/\n{2,}/);
    
    // If we only have one section, try to be smarter about parsing
    if (sections.length <= 1) {
      return parseSingleSectionRecipe(recipeText);
    }
    
    // Try to identify title (usually the first line or section)
    let title = sections[0].trim();
    let ingredientsSection = "";
    let instructionsSection = "";
    
    // Look for ingredients section (often has "ingredients" header or starts with bullet points/dashes)
    const ingredientsIndex = findSectionIndex(sections, ["ingredients", "ingredient list", "you'll need"]);
    if (ingredientsIndex > 0) {
      ingredientsSection = sections[ingredientsIndex];
    } else {
      // Look for a section with bullets or dashes (likely ingredients)
      const bulletIndex = sections.findIndex(s => s.includes("-") || s.includes("•") || /^\d+\./.test(s.trim()));
      if (bulletIndex > 0) {
        ingredientsSection = sections[bulletIndex];
      }
    }
    
    // Look for instructions section
    const instructionsIndex = findSectionIndex(sections, ["instructions", "directions", "method", "steps", "preparation"]);
    if (instructionsIndex > 0) {
      instructionsSection = sections[instructionsIndex];
    } else if (ingredientsIndex > 0 && ingredientsIndex < sections.length - 1) {
      // Assume instructions follow ingredients
      instructionsSection = sections.slice(ingredientsIndex + 1).join("\n\n");
    }
    
    // Extract ingredients as array
    const ingredients = extractListItems(ingredientsSection);
    
    // Extract instructions as array
    const instructions = extractListItems(instructionsSection);
    
    return {
      title: title || defaultResult.title,
      ingredients: ingredients.length > 0 ? ingredients : defaultResult.ingredients,
      instructions: instructions.length > 0 ? instructions : defaultResult.instructions,
      originalText: recipeText
    };
  } catch (error) {
    console.error("Error parsing recipe:", error);
    return defaultResult;
  }
};

const findSectionIndex = (sections: string[], possibleHeaders: string[]): number => {
  return sections.findIndex(section => {
    const lowerSection = section.toLowerCase();
    return possibleHeaders.some(header => lowerSection.includes(header));
  });
};

const extractListItems = (text: string): string[] => {
  if (!text) return [];
  
  // Split by newlines
  const lines = text.split("\n");
  
  // Remove any headers
  const contentLines = lines.slice(lines[0].toLowerCase().includes("ingredient") || 
                               lines[0].toLowerCase().includes("instruction") || 
                               lines[0].toLowerCase().includes("direction") || 
                               lines[0].toLowerCase().includes("method") ? 1 : 0);
  
  // Clean up list items
  return contentLines
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => line.replace(/^[-•*]|\d+[.)]/, "").trim());
};

const parseSingleSectionRecipe = (recipeText: string): ParsedRecipe => {
  // For recipes without clear sections, we'll try to identify parts
  const lines = recipeText.split("\n").map(line => line.trim()).filter(line => line.length > 0);
  
  // Assume first line is title if it's not a list item or direction
  const title = !lines[0].startsWith("-") && !lines[0].startsWith("•") && !/^\d+[.)]/.test(lines[0]) ? 
    lines[0] : "Recipe";
  
  // Find where ingredients might end and instructions begin
  const instructionStartIndex = lines.findIndex(line => 
    line.toLowerCase().includes("instruction") || 
    line.toLowerCase().includes("direction") ||
    line.toLowerCase().includes("method") ||
    line.toLowerCase().includes("step") ||
    /^step\s+\d+/i.test(line));
  
  let ingredients: string[] = [];
  let instructions: string[] = [];
  
  if (instructionStartIndex > 0) {
    // Extract ingredients and instructions based on the found index
    ingredients = lines.slice(1, instructionStartIndex)
      .filter(line => line.length > 0)
      .map(line => line.replace(/^[-•*]|\d+[.)]/, "").trim());
    
    instructions = lines.slice(instructionStartIndex + 1)
      .filter(line => line.length > 0)
      .map(line => line.replace(/^[-•*]|\d+[.)]/, "").trim());
  } else {
    // Try to separate based on line formatting (bullets vs. numbered)
    const bulletLines = lines.filter(line => line.startsWith("-") || line.startsWith("•"));
    const numberedLines = lines.filter(line => /^\d+[.)]/.test(line));
    
    if (bulletLines.length > 0 && numberedLines.length > 0) {
      // If we have both bullet points and numbered lines, assume bullets are ingredients
      ingredients = bulletLines.map(line => line.replace(/^[-•*]/, "").trim());
      instructions = numberedLines.map(line => line.replace(/^\d+[.)]/, "").trim());
    } else {
      // Otherwise, just try to split the recipe in half
      const midpoint = Math.floor(lines.length / 2);
      ingredients = lines.slice(1, midpoint).map(line => line.replace(/^[-•*]|\d+[.)]/, "").trim());
      instructions = lines.slice(midpoint).map(line => line.replace(/^[-•*]|\d+[.)]/, "").trim());
    }
  }
  
  return {
    title: title,
    ingredients,
    instructions,
    originalText: recipeText
  };
};
