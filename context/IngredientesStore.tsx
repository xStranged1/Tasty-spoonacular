import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IngredientStore {
    id: number;
    name: string;
    image?: string;
    aisle?: string;
    unit: string;
    amount: number;
}

interface IngredientsState {
    ingredients: IngredientStore[];
    addIngredient: (ingredient: IngredientStore) => void;
    removeIngredient: (id: number) => void;
    clearIngredients: () => void;
}

export const useIngredientsStore = create<IngredientsState>()(
    persist(
        (set) => ({
            ingredients: [],
            addIngredient: (ingredient) =>
                set((state) => ({
                    ingredients: [...state.ingredients, ingredient],
                })),
            removeIngredient: (id) =>
                set((state) => ({
                    ingredients: state.ingredients.filter((i) => i.id !== id),
                })),
            clearIngredients: () => set(() => ({ ingredients: [] })),
        }),
        {
            name: 'ingredients-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
