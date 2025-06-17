import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, ImageBackground, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FavoritesContext } from '../context/FavoritesContext';
import { getRecipeDetail } from '~/services/recipe';
import type { Recipe } from '~/constants/types';
import { Button } from '~/components/ui/button';
import { Link } from 'expo-router';

export default function Favorites() {
    const { favorites } = useContext(FavoritesContext);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigation = useNavigation();
    const { clearFavorites } = useContext(FavoritesContext);

    useEffect(() => {
        const loadFavorites = async () => {
            setLoading(true);

            if (favorites.length === 0) {
                setRecipes([]);
                setLoading(false);
                return;
            }

            try {
                const details = await Promise.all(
                    favorites.map(async (fav) => {
                        // favorites is an array of Recipe, so access fav.id
                        const recipeDetail = await getRecipeDetail(fav.id.toString());
                        if (!recipeDetail) {
                            console.error(`Error loading recipe ${fav.id}`);
                            return fav; // fallback to existing data
                        }
                        return recipeDetail;
                    })
                );
                setRecipes(details);
            } catch (error) {
                console.error('Error fetching favourite recipes', error);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, [favorites]);

    if (loading) {
        return <ActivityIndicator size="large" className="flex-1 justify-center" />;
    }

    return (
        <View>
            <View>
                <Button onPress={clearFavorites} className="bg-red-600">
                    <Text className="text-white">Borrar todos los favoritos</Text>
                </Button>
            </View>
            <ScrollView className="p-4 bg-white dark:bg-black">
                {recipes.map((recipe) => (
                    <Link
                        key={recipe.id}
                        href={{
                            pathname: `/recipe/${recipe.id}`,
                            params: {
                                name: recipe.title,
                            },
                        }}
                        asChild
                    >
                        <TouchableOpacity className="mb-6 h-48 rounded-2xl overflow-hidden">
                            <ImageBackground
                                source={{ uri: recipe.image }}
                                className="w-full h-full"
                                resizeMode="cover"
                            >
                                <View className="absolute bottom-0 w-full bg-black bg-opacity-50 dark:bg-white py-2 px-4">
                                    <Text className="text-white dark:text-black text-lg font-semibold">
                                        {recipe.title}
                                    </Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </Link>
                ))}

                {!recipes.length && !loading && (
                    <View className="flex-1 items-center justify-center mt-20">
                        <Text className="text-gray-500 dark:text-gray-400">
                            No tienes recetas favoritas aún.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};