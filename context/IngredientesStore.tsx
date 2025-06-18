// store/ingredientsStore.ts
import { create } from 'zustand';

interface Ingredient {
    id: number;
    name: string;
    image: string;
    aisle: string;
    possibleUnits: string[];
    amount: number;
}

interface IngredientsState {
    ingredients: Ingredient[];
    addIngredient: (ingredient: Ingredient) => void;
    removeIngredient: (id: number) => void;
}

export const useIngredientsStore = create<IngredientsState>((set) => ({
    ingredients: [],
    addIngredient: (ingredient) =>
        set((state) => ({
            ingredients: [...state.ingredients, ingredient],
        })),
    removeIngredient: (id) =>
        set((state) => ({
            ingredients: state.ingredients.filter((i) => i.id !== id),
        })),
}));
