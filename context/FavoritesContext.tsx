import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { saveItem, getItem } from '../data/secureStore';

export interface Recipe {
    id: number;
    title: string;
    image?: string;
    // ...otros campos que uses
}

interface FavoritesContextData {
    favorites: Recipe[];
    addFavorite: (recipe: Recipe) => Promise<void | true>;
    toggleFavorite: (recipe: Recipe) => Promise<void | true>;
    removeFavorite: (id: number) => Promise<void>;
    clearFavorites: () => Promise<void>;
}

interface FavoritesProviderProps {
    children: ReactNode;
}

export const FavoritesContext = createContext<FavoritesContextData>({
    favorites: [],
    addFavorite: async () => { },
    toggleFavorite: async () => { },
    removeFavorite: async () => { },
    clearFavorites: async () => { },
});

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
    const [favorites, setFavorites] = useState<Recipe[]>([]);

    useEffect(() => {
        (async () => {
            const stored = await getItem('favoriteRecipes');
            setFavorites(stored ? JSON.parse(stored) : []);
        })();
    }, []);

    const addFavorite = async (recipe: Recipe) => {
        if (favorites.some(r => r.id === recipe.id)) {
            return;
        }
        const updated = [...favorites, recipe];
        setFavorites(updated);
        await saveItem('favoriteRecipes', JSON.stringify(updated));
        return true
    };

    const toggleFavorite = async (recipe: Recipe) => {
        if (favorites.some(r => r.id === recipe.id)) {
            await removeFavorite(recipe.id);
            return
        } else {
            await addFavorite(recipe);
            return true
        }
    }

    const removeFavorite = async (id: number) => {
        const updated = favorites.filter(r => r.id !== id);
        setFavorites(updated);
        await saveItem('favoriteRecipes', JSON.stringify(updated));
    };

    const clearFavorites = async () => {
        setFavorites([]);
        await saveItem('favoriteRecipes', JSON.stringify([]));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, toggleFavorite, removeFavorite, clearFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};