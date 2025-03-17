
import { ParsedRecipe } from "./recipeParser";

export interface TransformationRules {
  // Word replacements for ingredients (modern term → period term)
  ingredientReplacements: Map<string, string>;
  // Measurement replacements (modern → period)
  measurementReplacements: Map<string, string>;
  // Cooking method replacements (modern → period)
  methodReplacements: Map<string, string>;
  // Phrase transformations (function to transform common phrases)
  phraseTransformers: Array<(text: string) => string>;
  // Title transformations
  titleTransformer: (title: string) => string;
  // Language style enhancements
  languageEnhancer: (text: string) => string;
}

// Reusable utility functions
const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const findAndReplace = (text: string, replacements: Map<string, string>): string => {
  let result = text;
  
  replacements.forEach((newTerm, oldTerm) => {
    // Create a regex that matches the word with word boundaries
    const regex = new RegExp(`\\b${oldTerm}\\b`, 'gi');
    result = result.replace(regex, newTerm);
  });
  
  return result;
};

// Ancient era transformation rules
const ancientTransformationRules: TransformationRules = {
  ingredientReplacements: new Map([
    ['butter', 'olive oil'],
    ['vegetable oil', 'pressed olive oil'],
    ['canola oil', 'olive oil'],
    ['all-purpose flour', 'barley flour'],
    ['wheat flour', 'emmer wheat flour'],
    ['white flour', 'stone-ground barley flour'],
    ['sugar', 'honey'],
    ['brown sugar', 'date syrup'],
    ['granulated sugar', 'honey'],
    ['baking powder', 'natron'],
    ['baking soda', 'natron'],
    ['yeast', 'sourdough starter'],
    ['chocolate', 'carob'],
    ['vanilla extract', 'crushed cinnamon bark'],
    ['cinnamon', 'cinnamon from eastern trade routes'],
    ['nutmeg', 'rare spices from the east'],
    ['cloves', 'precious eastern spices'],
    ['raisins', 'dried grapes from the vineyard'],
    ['milk', 'goat\'s milk'],
    ['cream', 'fresh goat\'s milk'],
    ['yogurt', 'curdled milk'],
    ['egg', 'fresh eggs from the coop'],
    ['garlic', 'wild garlic bulbs'],
    ['onion', 'wild onions'],
    ['vegetable', 'garden herbs'],
    ['potato', 'turnip'],
    ['rice', 'pearl barley'],
    ['chicken', 'fowl'],
    ['beef', 'ox meat'],
    ['pork', 'wild boar'],
    ['salt', 'sea salt from the Mediterranean shores'],
    ['black pepper', 'exotic peppercorns'],
    ['wine', 'aged wine'],
    ['vinegar', 'soured wine'],
    ['lemon', 'bitter orange'],
    ['orange', 'citron'],
    ['berries', 'wild berries'],
    ['nuts', 'walnuts'],
    ['almonds', 'almonds from the eastern lands'],
    ['celsius', 'hot as the midday sun'],
    ['fahrenheit', 'hot as the midday sun'],
    ['degrees', 'hot as the midday sun'],
    ['oven', 'clay oven'],
    ['pan', 'bronze cooking vessel'],
    ['bowl', 'clay vessel'],
    ['minute', 'moment'],
    ['hour', 'sun position']
  ]),
  
  measurementReplacements: new Map([
    ['cup', 'measure'],
    ['tablespoon', 'large spoonful'],
    ['teaspoon', 'small spoonful'],
    ['ounce', 'small handful'],
    ['pound', 'weight of a stone'],
    ['gram', 'small measure'],
    ['kilogram', 'large measure'],
    ['ml', 'small pouring'],
    ['liter', 'large vessel full'],
    ['gallon', 'amphora'],
    ['pint', 'small amphora'],
    ['quart', 'medium amphora']
  ]),
  
  methodReplacements: new Map([
    ['bake', 'cook in the clay oven'],
    ['roast', 'cook over open flame'],
    ['boil', 'heat in cauldron until bubbling'],
    ['simmer', 'keep at gentle heat'],
    ['sauté', 'cook quickly in oil'],
    ['fry', 'cook in hot oil'],
    ['grill', 'place over hot coals'],
    ['mix', 'combine with wooden spoon'],
    ['blend', 'mix vigorously'],
    ['whisk', 'beat with reed whisk'],
    ['beat', 'work with vigor'],
    ['fold', 'gently combine'],
    ['knead', 'work with hands'],
    ['chop', 'cut with bronze knife'],
    ['dice', 'cut into small pieces'],
    ['slice', 'cut thinly'],
    ['mince', 'chop finely'],
    ['grate', 'scrape against rough stone'],
    ['drain', 'strain through cloth'],
    ['strain', 'pass through reed sieve'],
    ['refrigerate', 'cool in cold cellar'],
    ['freeze', 'place in winter snow if available'],
    ['heat', 'warm over flames'],
    ['preheat', 'prepare thy fire'],
    ['stir', 'mix with wooden implement'],
    ['pour', 'empty thy vessel'],
    ['sprinkle', 'scatter sparingly'],
    ['marinate', 'soak in flavorful liquids'],
    ['season', 'add salt and herbs to taste']
  ]),
  
  phraseTransformers: [
    // Replace modern cooking times
    (text: string) => text.replace(/(\d+)[-\s](\d+) minutes/gi, 'the time it takes to recite a short prayer'),
    (text: string) => text.replace(/(\d+) minutes/gi, 'the time needed to draw water from a well'),
    // Add ancient-style food descriptors
    (text: string) => text.replace(/until golden/gi, 'until golden as the desert sands'),
    (text: string) => text.replace(/until brown/gi, 'until brown as fertile Nile soil'),
    // Transform temperature references
    (text: string) => text.replace(/(\d+)°[CF]/gi, 'a hot oven'),
    // Personal pronouns
    (text: string) => text.replace(/\byou\b/gi, 'thee'),
    (text: string) => text.replace(/\byour\b/gi, 'thy')
  ],
  
  titleTransformer: (title: string) => {
    // Make ancient titles more descriptive and elaborate
    if (title.toLowerCase().includes('cake')) {
      return 'Honey-Sweetened Barley Cakes';
    } else if (title.toLowerCase().includes('bread')) {
      return 'Hearth-Baked Emmer Bread';
    } else if (title.toLowerCase().includes('cookie')) {
      return 'Sweet Honey Cakes';
    } else if (title.toLowerCase().includes('soup')) {
      return 'Cauldron-Simmered Broth';
    } else if (title.toLowerCase().includes('stew')) {
      return 'Slow-Cooked Grain and Herb Pottage';
    } else if (title.toLowerCase().includes('fish')) {
      return 'River Fish with Herbs';
    } else if (title.toLowerCase().includes('meat')) {
      return 'Spiced Roasted Game';
    } else {
      return `Ancient ${title}`;
    }
  },
  
  languageEnhancer: (text: string) => {
    // Add ancient style language flourishes
    let enhancedText = text;
    
    // Add thee/thy style language
    enhancedText = enhancedText
      .replace(/\bthe\b/gi, 'thy')
      .replace(/\bit\b/gi, 'it')
      .replace(/\buntil\b/gi, 'until')
      .replace(/\bmix\b/gi, 'combine')
      .replace(/\badd\b/gi, 'add')
      .replace(/\bremove\b/gi, 'remove')
      .replace(/\bplace\b/gi, 'place')
      .replace(/\binto\b/gi, 'into');
    
    return enhancedText;
  }
};

// Medieval transformation rules
const medievalTransformationRules: TransformationRules = {
  ingredientReplacements: new Map([
    ['butter', 'fresh churned butter'],
    ['vegetable oil', 'rendered fat'],
    ['canola oil', 'goose fat'],
    ['all-purpose flour', 'fine wheat flour, sifted thrice'],
    ['wheat flour', 'stone-ground wheat flour'],
    ['white flour', 'sifted wheat flour'],
    ['sugar', 'honey from thy lord\'s apiary'],
    ['brown sugar', 'dark honey'],
    ['granulated sugar', 'fine sugar from the Indies, if available to thy purse'],
    ['baking powder', 'ale barm'],
    ['baking soda', 'potash'],
    ['yeast', 'ale leavening'],
    ['chocolate', 'spiced honey (as chocolate is not yet discovered)'],
    ['vanilla extract', 'rosewater'],
    ['cinnamon', 'cinnamon from the Orient'],
    ['nutmeg', 'freshly grated nutmeg'],
    ['cloves', 'precious cloves'],
    ['raisins', 'dried grapes'],
    ['milk', 'fresh milk'],
    ['cream', 'rich cream'],
    ['yogurt', 'soured cream'],
    ['egg', 'eggs from thy henhouse'],
    ['garlic', 'garlic cloves'],
    ['onion', 'onions from thy garden'],
    ['vegetable', 'garden vegetables'],
    ['potato', 'turnip (as potatoes are not yet brought from the New World)'],
    ['rice', 'imported rice, if available'],
    ['chicken', 'spring chicken'],
    ['beef', 'beef from thy lord\'s estate'],
    ['pork', 'fatted pig'],
    ['salt', 'salt from the salt pans'],
    ['black pepper', 'ground pepper'],
    ['wine', 'good wine'],
    ['vinegar', 'wine vinegar'],
    ['lemon', 'verjuice'],
    ['orange', 'bitter orange'],
    ['berries', 'forest berries'],
    ['nuts', 'freshly gathered nuts'],
    ['almonds', 'ground almonds'],
    ['water', 'spring water'],
    ['juice', 'pressed fruit'],
    ['celsius', 'a moderate oven'],
    ['fahrenheit', 'a moderate oven'],
    ['degrees', 'a moderate oven'],
    ['oven', 'stone oven'],
    ['pan', 'iron pan'],
    ['bowl', 'wooden bowl'],
    ['minute', 'while'],
    ['hour', 'hour by the church bell']
  ]),
  
  measurementReplacements: new Map([
    ['cup', 'wooden cup'],
    ['tablespoon', 'goodly spoonful'],
    ['teaspoon', 'small spoonful'],
    ['ounce', 'ounce by weight'],
    ['pound', 'pound weight'],
    ['gram', 'small measure'],
    ['kilogram', 'weight of a small child'],
    ['ml', 'small pour'],
    ['liter', 'quart pot'],
    ['gallon', 'gallon measure'],
    ['pint', 'pint measure'],
    ['quart', 'quart measure'],
    ['1/2', 'half'],
    ['1/4', 'quarter'],
    ['1/3', 'third part'],
    ['2/3', 'two parts in three'],
    ['3/4', 'three parts in four']
  ]),
  
  methodReplacements: new Map([
    ['bake', 'bake in thy stone oven'],
    ['roast', 'roast before the fire'],
    ['boil', 'set to boil in cauldron'],
    ['simmer', 'keep at gentle heat'],
    ['sauté', 'fry lightly'],
    ['fry', 'fry in fat'],
    ['grill', 'grill over coals'],
    ['mix', 'mix well'],
    ['blend', 'blend together'],
    ['whisk', 'beat with a whisk of birch twigs'],
    ['beat', 'beat well'],
    ['fold', 'fold with care'],
    ['knead', 'knead upon a floured board'],
    ['chop', 'chop fine'],
    ['dice', 'cut in small cubes'],
    ['slice', 'slice thinly'],
    ['mince', 'mince very small'],
    ['grate', 'grate upon a grater'],
    ['drain', 'drain through a cloth'],
    ['strain', 'strain through a cloth'],
    ['refrigerate', 'set in a cool buttery'],
    ['freeze', 'place in winter snow if season permits'],
    ['heat', 'heat upon the fire'],
    ['preheat', 'prepare thy oven'],
    ['stir', 'stir with a wooden spoon'],
    ['pour', 'pour forth'],
    ['sprinkle', 'sprinkle from above'],
    ['marinate', 'steep in flavorful liquors'],
    ['season', 'season to taste']
  ]),
  
  phraseTransformers: [
    // Replace modern cooking times
    (text: string) => text.replace(/(\d+)[-\s](\d+) minutes/gi, 'the time of two Pater Nosters'),
    (text: string) => text.replace(/(\d+) minutes/gi, 'whilst thou mightest walk a furlong'),
    // Add medieval-style food descriptors
    (text: string) => text.replace(/until golden/gi, 'until golden as a florin'),
    (text: string) => text.replace(/until brown/gi, 'until brown as a monk\'s robe'),
    // Transform temperature references
    (text: string) => text.replace(/(\d+)°[CF]/gi, 'a well-heated oven'),
    // Personal pronouns
    (text: string) => text.replace(/\byou\b/gi, 'thou'),
    (text: string) => text.replace(/\byour\b/gi, 'thy')
  ],
  
  titleTransformer: (title: string) => {
    // Make medieval titles more descriptive
    if (title.toLowerCase().includes('cake')) {
      return 'Spiced Honey Cake for Feast Days';
    } else if (title.toLowerCase().includes('bread')) {
      return 'Fine Manchet Bread';
    } else if (title.toLowerCase().includes('cookie')) {
      return 'Sweet Wafers with Spices';
    } else if (title.toLowerCase().includes('soup')) {
      return 'Pottage of Garden Vegetables';
    } else if (title.toLowerCase().includes('stew')) {
      return 'Hearty Stew for Winter\'s Day';
    } else if (title.toLowerCase().includes('fish')) {
      return 'Fish in Court Bouillon';
    } else if (title.toLowerCase().includes('meat')) {
      return 'Roasted Meats with Fine Spices';
    } else {
      return `${title} for the Lord's Table`;
    }
  },
  
  languageEnhancer: (text: string) => {
    // Add medieval style language flourishes
    let enhancedText = text;
    
    // Add thou/thy style language
    enhancedText = enhancedText
      .replace(/\bthe\b/gi, 'thy')
      .replace(/\bit\b/gi, 'it')
      .replace(/\buntil\b/gi, 'until')
      .replace(/\bmix\b/gi, 'mix well')
      .replace(/\badd\b/gi, 'add thereto')
      .replace(/\bremove\b/gi, 'remove forthwith')
      .replace(/\bplace\b/gi, 'place thus')
      .replace(/\binto\b/gi, 'into');
    
    return enhancedText;
  }
};

// Victorian transformation rules
const victorianTransformationRules: TransformationRules = {
  ingredientReplacements: new Map([
    ['butter', 'the finest fresh butter'],
    ['vegetable oil', 'clarified butter'],
    ['canola oil', 'finest quality butter'],
    ['all-purpose flour', 'finest quality flour, twice-sifted'],
    ['wheat flour', 'best quality wheat flour'],
    ['white flour', 'finest pastry flour'],
    ['sugar', 'white caster sugar'],
    ['brown sugar', 'Demerara sugar from the West Indies'],
    ['granulated sugar', 'granulated white sugar'],
    ['baking powder', 'bicarbonate of soda and cream of tartar'],
    ['baking soda', 'bicarbonate of soda'],
    ['yeast', 'brewer\'s yeast'],
    ['chocolate', 'Cadbury\'s chocolate'],
    ['vanilla extract', 'finest vanilla essence'],
    ['cinnamon', 'Ceylon cinnamon'],
    ['nutmeg', 'freshly grated nutmeg'],
    ['cloves', 'whole cloves, ground in a mortar'],
    ['raisins', 'plump raisins'],
    ['milk', 'fresh country milk'],
    ['cream', 'thick double cream'],
    ['yogurt', 'curds'],
    ['egg', 'fresh eggs from country hens'],
    ['garlic', 'garlic (used sparingly)'],
    ['onion', 'Spanish onions'],
    ['vegetable', 'garden vegetables'],
    ['potato', 'floury potatoes'],
    ['rice', 'Carolina rice'],
    ['chicken', 'spring chicken'],
    ['beef', 'prime cut of beef'],
    ['pork', 'best quality pork'],
    ['salt', 'sea salt, finely ground'],
    ['black pepper', 'freshly ground black pepper'],
    ['wine', 'good quality wine'],
    ['vinegar', 'white wine vinegar'],
    ['lemon', 'unwaxed lemon'],
    ['orange', 'Seville orange'],
    ['berries', 'seasonal berries'],
    ['nuts', 'shelled nuts'],
    ['almonds', 'blanched almonds'],
    ['water', 'fresh spring water'],
    ['juice', 'freshly squeezed juice'],
    ['celsius', 'moderate oven (approx. 375 degrees Fahrenheit)'],
    ['fahrenheit', 'precisely X degrees Fahrenheit'],
    ['degrees', 'degrees Fahrenheit'],
    ['oven', 'kitchen range'],
    ['pan', 'heavy-bottomed pan'],
    ['bowl', 'best mixing bowl'],
    ['minute', 'minute'],
    ['hour', 'hour by the clock']
  ]),
  
  measurementReplacements: new Map([
    ['cup', 'teacup'],
    ['tablespoon', 'tablespoonful'],
    ['teaspoon', 'teaspoonful'],
    ['ounce', 'ounce'],
    ['pound', 'pound'],
    ['gram', 'gram'],
    ['kilogram', 'kilogram'],
    ['ml', 'millilitre'],
    ['liter', 'litre'],
    ['gallon', 'gallon'],
    ['pint', 'pint'],
    ['quart', 'quart']
  ]),
  
  methodReplacements: new Map([
    ['bake', 'bake in a moderate oven'],
    ['roast', 'roast in the oven'],
    ['boil', 'bring to the boil'],
    ['simmer', 'simmer gently'],
    ['sauté', 'cook gently'],
    ['fry', 'fry until done'],
    ['grill', 'grill under a hot flame'],
    ['mix', 'mix thoroughly'],
    ['blend', 'blend until smooth'],
    ['whisk', 'whisk with vigor'],
    ['beat', 'beat well until light and fluffy'],
    ['fold', 'fold in gently'],
    ['knead', 'knead on a floured board'],
    ['chop', 'chop finely'],
    ['dice', 'dice into small cubes'],
    ['slice', 'slice thinly'],
    ['mince', 'mince finely'],
    ['grate', 'grate on the fine side of the grater'],
    ['drain', 'drain thoroughly'],
    ['strain', 'strain through a fine sieve'],
    ['refrigerate', 'place in the cold store'],
    ['freeze', 'place in the ice box'],
    ['heat', 'heat thoroughly'],
    ['preheat', 'ensure your kitchen range is heated to'],
    ['stir', 'stir continuously'],
    ['pour', 'pour carefully'],
    ['sprinkle', 'sprinkle evenly'],
    ['marinate', 'leave to marinate'],
    ['season', 'season to taste']
  ]),
  
  phraseTransformers: [
    // Replace modern cooking times
    (text: string) => text.replace(/(\d+)[-\s](\d+) minutes/gi, 'precisely $1 to $2 minutes'),
    (text: string) => text.replace(/(\d+) minutes/gi, 'precisely $1 minutes'),
    // Add Victorian-style food descriptors
    (text: string) => text.replace(/until golden/gi, 'until a pleasing golden hue is achieved'),
    (text: string) => text.replace(/until brown/gi, 'until nicely browned'),
    // Transform temperature references
    (text: string) => text.replace(/(\d+)°[CF]/gi, (match) => {
      const temp = parseInt(match);
      if (match.includes('C')) {
        // Convert Celsius to Fahrenheit for Victorian style
        const fTemp = Math.round(temp * 9/5 + 32);
        return `precisely ${fTemp} degrees Fahrenheit`;
      }
      return `precisely ${temp} degrees Fahrenheit`;
    })
  ],
  
  titleTransformer: (title: string) => {
    // Make Victorian titles more formal and elaborate
    let newTitle = title;
    
    if (title.toLowerCase().includes('cake')) {
      newTitle = 'Mrs. Beeton\'s Superior Sponge Cake';
    } else if (title.toLowerCase().includes('bread')) {
      newTitle = 'Finest Quality Home-made Bread';
    } else if (title.toLowerCase().includes('cookie')) {
      newTitle = 'Mrs. Beeton\'s Superior Drawing Room Biscuits';
    } else if (title.toLowerCase().includes('soup')) {
      newTitle = 'Restorative Clear Soup for the Invalid';
    } else if (title.toLowerCase().includes('stew')) {
      newTitle = 'Economical Stew for the Family Table';
    } else if (title.toLowerCase().includes('fish')) {
      newTitle = 'Baked Fish with White Sauce';
    } else if (title.toLowerCase().includes('meat')) {
      newTitle = 'Roasted Joint for Sunday Dinner';
    } else {
      newTitle = `${title} à la Moderne`;
    }
    
    return newTitle;
  },
  
  languageEnhancer: (text: string) => {
    // Add Victorian style language flourishes
    let enhancedText = text;
    
    // Replace simple instructions with more verbose ones
    enhancedText = enhancedText
      .replace(/mix/gi, 'combine thoroughly')
      .replace(/put/gi, 'place')
      .replace(/add/gi, 'incorporate')
      .replace(/stir/gi, 'stir continuously with a wooden spoon')
      .replace(/cook/gi, 'cook until perfectly done');
    
    return enhancedText;
  }
};

// Future transformation rules
const futureTransformationRules: TransformationRules = {
  ingredientReplacements: new Map([
    ['butter', 'plant-based lipid matrix'],
    ['vegetable oil', 'algae-derived omega fat complex'],
    ['canola oil', 'neutral lipid emulsion'],
    ['all-purpose flour', 'cultured wheat protein composite'],
    ['wheat flour', 'multi-grain protein substrate'],
    ['white flour', 'refined grain protein matrix'],
    ['sugar', 'natural sugar alternative'],
    ['brown sugar', 'natural caramel flavor enhancer'],
    ['granulated sugar', 'crystallized sweetness modules'],
    ['baking powder', 'sodium bicarbonate rising agent'],
    ['baking soda', 'alkaline leavening compound'],
    ['yeast', 'bioengineered rising culture'],
    ['chocolate', 'ethically-sourced cacao compound'],
    ['vanilla extract', 'vanilla flavor compound'],
    ['cinnamon', 'Ceylon Cinnamomum extract'],
    ['nutmeg', 'Myristica fragrans seed powder'],
    ['cloves', 'Syzygium aromaticum bud extract'],
    ['raisins', 'dehydrated grape concentrate'],
    ['milk', 'plant protein milk alternative'],
    ['cream', 'cultured cashew emulsion'],
    ['yogurt', 'probiotic culture base'],
    ['egg', 'aquafaba protein solution'],
    ['garlic', 'Allium sativum flavor compound'],
    ['onion', 'allium flavor base'],
    ['vegetable', 'seasonal plant matter'],
    ['potato', 'starchy root vegetable'],
    ['rice', 'sustainable grain option'],
    ['chicken', 'cultured protein strands'],
    ['beef', 'lab-grown protein fibers'],
    ['pork', 'plant-based protein alternative'],
    ['salt', 'mineral salt complex'],
    ['black pepper', 'Piper nigrum micro-grounds'],
    ['wine', 'fermented grape essence'],
    ['vinegar', 'acetic acid solution'],
    ['lemon', 'citrus flavor concentrate'],
    ['orange', 'citrus complex'],
    ['berries', 'antioxidant-rich forest fruits'],
    ['nuts', 'protein-dense seed kernels'],
    ['almonds', 'Prunus dulcis protein nuggets'],
    ['water', 'purified H2O'],
    ['juice', 'cold-pressed fruit extract'],
    ['celsius', 'celsius'],
    ['fahrenheit', 'fahrenheit'],
    ['degrees', 'degrees'],
    ['oven', 'thermal unit'],
    ['pan', 'cooking surface'],
    ['bowl', 'mixing vessel'],
    ['minute', 'minute'],
    ['hour', 'hour']
  ]),
  
  measurementReplacements: new Map([
    ['cup', 'standard unit (240ml)'],
    ['tablespoon', '15ml unit'],
    ['teaspoon', '5ml unit'],
    ['ounce', '28g'],
    ['pound', '454g'],
    ['gram', 'g'],
    ['kilogram', 'kg'],
    ['ml', 'ml'],
    ['liter', 'L'],
    ['gallon', '3.8L'],
    ['pint', '473ml'],
    ['quart', '946ml']
  ]),
  
  methodReplacements: new Map([
    ['bake', 'process in thermal unit'],
    ['roast', 'dry-heat process'],
    ['boil', 'heat to 100°C'],
    ['simmer', 'maintain at sub-boiling temperature'],
    ['sauté', 'quick-heat in minimal lipid'],
    ['fry', 'immersion-heat in lipid'],
    ['grill', 'apply direct radiant heat'],
    ['mix', 'homogenize'],
    ['blend', 'process to uniform consistency'],
    ['whisk', 'incorporate air via rapid agitation'],
    ['beat', 'agitate vigorously'],
    ['fold', 'incorporate with minimal structural disruption'],
    ['knead', 'manipulate protein matrix to develop elasticity'],
    ['chop', 'reduce to uniform segments'],
    ['dice', 'process into regular cubes'],
    ['slice', 'create uniform thin sections'],
    ['mince', 'reduce to minimal particle size'],
    ['grate', 'abrade into small particles'],
    ['drain', 'separate liquid phase'],
    ['strain', 'filter particulates'],
    ['refrigerate', 'cool to 4°C'],
    ['freeze', 'reduce temperature below 0°C'],
    ['heat', 'increase thermal energy'],
    ['preheat', 'calibrate thermal unit'],
    ['stir', 'maintain homogeneity via agitation'],
    ['pour', 'transfer liquid phase'],
    ['sprinkle', 'distribute in small quantities'],
    ['marinate', 'enzymatically pre-process'],
    ['season', 'adjust flavor profile']
  ]),
  
  phraseTransformers: [
    // Replace cooking times with precise measurements
    (text: string) => text.replace(/(\d+)[-\s](\d+) minutes/gi, '$1 minutes $2 seconds (±30 seconds)'),
    (text: string) => text.replace(/(\d+) minutes/gi, '$1 minutes (±15 seconds)'),
    // Add futuristic-style food descriptors
    (text: string) => text.replace(/until golden/gi, 'until optimal caramelization (color code #E3C770)'),
    (text: string) => text.replace(/until brown/gi, 'until Maillard reaction completes (color code #8B4513)'),
    // Transform temperature references to precise values
    (text: string) => text.replace(/(\d+)°[CF]/gi, (match) => {
      const temp = parseInt(match);
      if (match.includes('F')) {
        // Convert Fahrenheit to Celsius for futuristic style
        const cTemp = Math.round((temp - 32) * 5/9);
        return `${cTemp}°C (±1°C)`;
      }
      return `${temp}°C (±1°C)`;
    })
  ],
  
  titleTransformer: (title: string) => {
    // Make futuristic titles technical and precise
    let newTitle = title;
    
    if (title.toLowerCase().includes('cake')) {
      newTitle = 'Protein-Enhanced Nutrient-Optimized Baked Matrix';
    } else if (title.toLowerCase().includes('bread')) {
      newTitle = 'Artisanal Grain Cultivation Loaf';
    } else if (title.toLowerCase().includes('cookie')) {
      newTitle = 'Protein-Enhanced Nutrient-Optimized Cookie Discs';
    } else if (title.toLowerCase().includes('soup')) {
      newTitle = 'Hydrated Nutrient Suspension';
    } else if (title.toLowerCase().includes('stew')) {
      newTitle = 'Slow-Processed Protein-Vegetable Matrix';
    } else if (title.toLowerCase().includes('fish')) {
      newTitle = 'Sustainable Aquatic Protein Preparation';
    } else if (title.toLowerCase().includes('meat')) {
      newTitle = 'Cultured Protein Fiber Assembly';
    } else {
      newTitle = `Optimized ${title} Formula (Version 7.3.1)`;
    }
    
    return newTitle;
  },
  
  languageEnhancer: (text: string) => {
    // Add futuristic technical language
    let enhancedText = text;
    
    // Replace simple instructions with technical ones
    enhancedText = enhancedText
      .replace(/mix/gi, 'homogenize')
      .replace(/put/gi, 'transfer')
      .replace(/add/gi, 'integrate')
      .replace(/stir/gi, 'maintain kinetic suspension')
      .replace(/cook/gi, 'thermally process');
    
    return enhancedText;
  }
};

// Main transformation function
export const transformRecipe = (recipe: ParsedRecipe, timePeriod: string): string => {
  let rules: TransformationRules;
  
  // Select rules based on time period
  switch (timePeriod) {
    case 'ancient':
      rules = ancientTransformationRules;
      break;
    case 'medieval':
      rules = medievalTransformationRules;
      break;
    case 'victorian':
      rules = victorianTransformationRules;
      break;
    case 'future':
      rules = futureTransformationRules;
      break;
    default:
      // Default to medieval if an invalid time period is provided
      rules = medievalTransformationRules;
  }
  
  // Transform the title
  const transformedTitle = rules.titleTransformer(recipe.title);
  
  // Transform ingredients
  const transformedIngredients = recipe.ingredients.map(ingredient => {
    // Apply ingredient replacements
    let transformed = findAndReplace(ingredient, rules.ingredientReplacements);
    
    // Apply measurement replacements
    transformed = findAndReplace(transformed, rules.measurementReplacements);
    
    // Apply language enhancement
    transformed = rules.languageEnhancer(transformed);
    
    // Capitalize first letter
    return capitalizeFirstLetter(transformed);
  });
  
  // Transform instructions
  const transformedInstructions = recipe.instructions.map(instruction => {
    // Apply method replacements
    let transformed = findAndReplace(instruction, rules.methodReplacements);
    
    // Apply ingredient replacements
    transformed = findAndReplace(transformed, rules.ingredientReplacements);
    
    // Apply measurement replacements
    transformed = findAndReplace(transformed, rules.measurementReplacements);
    
    // Apply phrase transformers
    for (const transformer of rules.phraseTransformers) {
      transformed = transformer(transformed);
    }
    
    // Apply language enhancement
    transformed = rules.languageEnhancer(transformed);
    
    // Capitalize first letter
    return capitalizeFirstLetter(transformed);
  });
  
  // Assemble the transformed recipe
  let transformedRecipe = `${transformedTitle}\n`;
  
  // Add ingredients
  transformedIngredients.forEach(ingredient => {
    transformedRecipe += `- ${ingredient}\n`;
  });
  
  // Add instructions
  transformedRecipe += `\nInstructions:\n`;
  transformedInstructions.forEach((instruction, index) => {
    transformedRecipe += `${index + 1}. ${instruction}\n`;
  });
  
  return transformedRecipe;
};
