export interface Ingredient {
    aisle: string;
    amount: number;
    consistency: 'SOLID' | 'LIQUID';
    id: number;
    image: string;
    measures: object;
    meta: string[];
    name: string;
    original: string;
    unit: string;
}

export interface Instruction {
    name: string;
    steps: string[];
}

export interface RecipeDetail {
    aggregateLikes: number;
    analyzedInstructions: Instruction[];
    cheap: boolean;
    cookingMinutes: number | null;
    creditsText: string;
    cuisines: string[];
    dairyFree: boolean;
    diets: string[];
    dishTypes: string[];
    extendedIngredients: Ingredient[];
    gaps: string;
    glutenFree: boolean;
    healthScore: number;
    id: number;
    image: string;
    imageType: string;
    instructions: string;
    license: string | null;
    lowFodmap: boolean;
    occasions: string[];
    preparationMinutes: number | null;
    pricePerServing: number;
    readyInMinutes: number;
    servings: number;
    sourceName: string;
    sourceUrl: string;
    spoonacularScore: number;
    spoonacularSourceUrl: string;
    summary: string;
    sustainable: boolean;
    title: string;
    vegan: boolean;
    vegetarian: boolean;
    veryHealthy: boolean;
    veryPopular: boolean;
    weightWatcherSmartPoints: number;
}

export interface Recipe {
    id: number;
    image: string;
    imageType: string;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
}

export interface RecipesResponse {
    results: Recipe[];
    baseUri: string;
    offset: number;
    number: number;
    totalResults: number;
    processingTimeMs: number;
    expires: number;
}

export interface AutocompleteSearchRecipe {
    id: number,
    title: string,
}
