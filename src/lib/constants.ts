
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
    return `Honey-Sweetened Barley Cakes
- 2 parts barley flour, freshly ground
- 1 part emmer wheat flour
- Pinch of natron (natural soda)
- Sea salt from the Mediterranean shores
- Olive oil from the first pressing
- Honey from the mountain apiaries
- Fresh eggs
- Water from the spring
- Dried figs, finely chopped
- Cinnamon bark, ground (a rare spice from eastern trade routes)

Instructions:
1. Kindle thy fire with fragrant cedar wood
2. Combine thy flours, natron and salt in a clay vessel
3. Work in the olive oil with thy hands until crumbly
4. Make a hollow in thy mixture and pour in honey
5. Beat eggs separately and add to thy mixture
6. Add water slowly until thy dough forms
7. Work in the chopped figs and cinnamon
8. Form into small flat rounds
9. Bake on hot stones until golden as the desert sands`;
  },
  "medieval": (recipe) => {
    return `Spiced Honey Manchets
- 2 measures of fine wheat flour, sifted thrice
- 1 measure of rye flour
- A goodly pinch of salt from the salt pans
- Leavening from the ale vat
- Fat from the rendered lard
- Honey from thy lord's apiary
- Fresh eggs from thy henhouse
- Small beer or whey
- Currants or dried berries from the market fair
- Precious spices (cinnamon, nutmeg, cloves) if thy purse allows

Method of Preparation:
1. Prepare thy hearth fire to proper heat
2. Combine thy flours and salt in a wooden trencher
3. Make a well and add thy leavening
4. Pour in warmed honey and work in the fat
5. Add eggs one by one, mixing thoroughly
6. Moisten with small beer until proper consistency
7. Work thy dough upon a floured board until smooth
8. Fold in thy dried fruits and costly spices
9. Shape into rounds and score with a cross
10. Bake in thy brick oven until sounding hollow when tapped`;
  },
  "victorian": (recipe) => {
    return `Mrs. Beeton's Superior Drawing Room Biscuits
- 2¼ pounds of the finest pastry flour, twice-sifted
- 1 teaspoon of bicarbonate of soda
- ½ teaspoon of cream of tartar
- 1 teaspoon of sea salt, finely ground
- 8 ounces of the best fresh butter, softened but not oiled
- 6 ounces of white caster sugar
- 4 ounces of Demerara sugar from the West Indies
- 2 fresh eggs from country hens
- 1 tablespoon of finest vanilla essence
- 6 ounces of Cadbury's chocolate, cut into small pieces
- 2 ounces of crystallized ginger, finely diced (optional)

Method:
1. Ensure your kitchen range is heated to precisely 375 degrees Fahrenheit
2. Sift the flour, bicarbonate, cream of tartar and salt together three times
3. In your best mixing bowl, cream the butter until the consistency of whipped syllabub
4. Add the sugars gradually, beating continuously for no less than 5 minutes
5. Beat in the eggs one at a time, followed by the vanilla essence
6. Incorporate the flour mixture using the lightest possible touch
7. Fold in the chopped chocolate pieces with a silver spoon
8. Using two dessert spoons, place neat portions onto greased baking sheets, allowing ample room for spreading
9. Bake in the middle of the oven for precisely 10 minutes
10. Allow to cool on the sheets for 2 minutes before transferring to a wire cooling rack
11. Store in an airtight tin and serve with afternoon tea within 3 days`;
  },
  "future": (recipe) => {
    return `Protein-Enhanced Nutrient-Optimized Cookie Discs (Version 7.3.1)
- 145g cultured wheat protein composite (sustainability rating: 93%)
- 5g sodium bicarbonate (recycled from carbon capture systems)
- 3g mineral salt complex (Mars-Ceres asteroid belt blend)
- 70g plant-based lipid matrix (zero deforestation certified)
- 90g natural sugar alternative (derived from modified algae cultures)
- 45ml aquafaba protein solution
- 5ml vanilla flavor compound (lab-grown from original orchid DNA)
- 100g ethically-sourced cacao nibs (carbon-negative production)
- 10g adaptogenic mushroom blend (cognitive enhancement profile)

Production Protocol:
1. Calibrate thermal unit to 190°C (±1°C) using minimal grid energy
2. Combine protein composite with alkaline agents in compostable mixing vessel
3. Homogenize lipid matrix with sweetener using sonic emulsification (30 seconds)
4. Introduce protein solution and flavor compounds in precise ratio
5. Integrate dry components while monitoring optimal texture parameters
6. Fold in functional ingredients using minimal-waste technique
7. Portion into 24g units using infrared sizing grid
8. Transfer to upcycled carbon-fiber baking surface
9. Process in thermal unit for 9 minutes 15 seconds
10. Cool in controlled environment chamber to preserve bioactive properties
11. Packaging utilizes edible mycelium film with embedded nutritional data`;
  }
};
