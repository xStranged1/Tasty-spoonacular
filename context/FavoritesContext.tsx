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
    addFavorite: (recipe: Recipe) => Promise<void>;
    removeFavorite: (id: number) => Promise<void>;
}

interface FavoritesProviderProps {
    children: ReactNode;
}

export const FavoritesContext = createContext<FavoritesContextData>({
    favorites: [],
    addFavorite: async () => { },
    removeFavorite: async () => { },
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
        const updated = [...favorites, recipe];
        setFavorites(updated);
        await saveItem('favoriteRecipes', JSON.stringify(updated));
    };

    const removeFavorite = async (id: number) => {
        const updated = favorites.filter(r => r.id !== id);
        setFavorites(updated);
        await saveItem('favoriteRecipes', JSON.stringify(updated));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};