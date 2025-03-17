
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
    return `Honey-Sweetened Flat Cakes
- 2 cups barley flour, stone-ground
- Pinch of natron (natural soda ash)
- Pinch of sea salt
- 1/2 cup olive oil, fresh-pressed
- 1/3 cup honey from wild bees
- 2 eggs from your hen house
- Water from the river Nile, as needed
- 1/4 cup dried dates, chopped
- 1/2 tsp ground cinnamon bark from distant lands

Instructions:
1. Heat thy clay oven with sacred woods
2. Mix the barley flour with natron and salt in your finest pottery bowl
3. In separate bronze vessel, combine olive oil with honey
4. Add thy eggs and beat with wooden implement
5. Slowly combine wet and dry ingredients
6. Add chopped dates and precious spices
7. Form into flat circles with thy hands
8. Bake on hot stones until the color of desert sand
9. Offer to the gods before consumption`;
  },
  "medieval": (recipe) => {
    return `Honey Sweetened Spiced Cakes
- 2 cups coarse ground wheat flour
- 1 pinch wood ash (leavening)
- 1 large pinch salt
- 1/2 cup rendered lard
- 1/3 cup honey, warmed
- 2 hen's eggs
- 1 sennight aged ale (fermentation flavor)
- 1/4 cup chopped dried figs
- 1/2 tsp ground cinnamon
- 1 pinch ground cloves

Instructions:
1. Stoke thy hearth fire to moderate heat
2. Combine thy flour, wood ash, and salt in an earthenware bowl
3. Beat thy lard with a wooden spoon until softened
4. Pour in thy warmed honey and continue beating until combined
5. Add eggs and ale, mix vigorously
6. Gradually add thy flour mixture
7. Fold in chopped figs and spices
8. Form small cakes with thy hands and place on a greased baking stone
9. Bake near thy hearth fire, turning once, until browned (about the time to recite 2 paternosters)`;
  },
  "victorian": (recipe) => {
    return `Mrs. Wellington's Finest Chocolate Biscuits
- 2 1/4 cups of the finest wheat flour
- 1 teaspoon of bicarbonate of soda
- 1 teaspoon of salt from the shores of Brittany
- 8 ounces of fresh churned butter, softened
- 3/4 cup of granulated sugar from the West Indies
- 3/4 cup of demerara sugar, packed
- 2 fresh eggs from country hens
- 2 teaspoons of vanilla extract, imported
- 8 ounces of finest chocolate, chopped (Mr. Cadbury's preferred)

Instructions:
1. Ensure your kitchen range is heated to precisely 375 degrees Fahrenheit
2. In a Wedgwood mixing bowl, combine the flour, bicarbonate, and salt
3. In your largest mixing bowl, cream the butter with both sugars until the consistency is that of fine whipped cream
4. Beat in the eggs one at a time, followed by the vanilla essence
5. Gradually incorporate the flour mixture, stirring with 50 rotations of the wooden spoon
6. Fold in the chopped chocolate pieces with great care
7. Using a silver tablespoon, place rounded portions onto greased baking sheets
8. Bake in the oven for precisely 9 to 11 minutes until the color of golden honey
9. Allow to cool upon wire racks before serving with afternoon tea`;
  },
  "future": (recipe) => {
    return `Protein-Enhanced Moisture-Optimized Cookie Discs
- 150g hydroponic wheat protein composite
- 5g sodium bicarbonate (recycled from atmospheric processors)
- 3g salt (Mars-mined mineral extract)
- 75g cultivated lipid spread
- 100g synthesized sucrose
- 2 lab-cultured egg protein units
- 10ml vanilla compound
- 75g moisture-preserved carob nibs

Instructions:
1. Activate heating unit to 190°C (minimal power draw during non-peak hours)
2. Combine protein composite with leavening compounds in sterile container
3. Homogenize lipids and carbohydrates in mixer (set to oxygen-conservation mode)
4. Incorporate protein units and flavor compounds using hermetically sealed process
5. Integrate dry components using minimal motion technique (conserving energy)
6. Add carob nibs (imported during last supply mission)
7. Dispense uniform 25g portions onto recycled baking sheet
8. Heat in community-shared oven during your habitat's allocated cooking time slot
9. Cool in controlled environment to minimize moisture loss`;
  }
};
