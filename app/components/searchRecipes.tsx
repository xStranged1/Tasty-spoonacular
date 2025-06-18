import { useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { AutocompleteSearchRecipe } from "~/constants/types";
import { autocompleteSearchRecipe, searchRecipeByIngredients } from "~/services/recipe";
import { Text } from "~/components/ui/text";
import { Link } from "expo-router";
import { Search } from '~/lib/icons/Search'

import DropdownFilter from "./DropdownFilter";

export default function SearchRecipes() {
    const [value, setValue] = useState("");
    const [recipes, setRecipes] = useState<AutocompleteSearchRecipe[]>([]);
    const [searchType, setSearchType] = useState<'name' | 'ingredient'>('name');
    const [loading, setLoading] = useState(false);

    const handleGetRecipes = async () => {
        if (!value) return;
        setLoading(true);
        if (searchType === 'name') {
            const recipes = await autocompleteSearchRecipe(value);
            setRecipes(Array.isArray(recipes) ? recipes : []);
        } else {
            const recipes = await searchRecipeByIngredients(value);
            setRecipes(Array.isArray(recipes) ? recipes : []);
        }
        setLoading(false);
    };

    return (
        <View className="flex w-full flex-shrink p-6 relative ">
            <View className="flex flex-row items-center gap-2">
                <Input
                    className="flex-1"
                    placeholder={searchType === 'name' ? "Buscar receta..." : "Buscar por ingredientes (ej: pollo, arroz)"}
                    value={value}
                    onChangeText={setValue}
                    aria-labelledby="inputLabel"
                    aria-errormessage="inputError"
                />
                <DropdownFilter onSelect={(value: any) => setSearchType(value)} />
                <Button variant="outline" onPress={handleGetRecipes} disabled={loading}>
                    {loading ? <ActivityIndicator size="large" className="flex-1 justify-center" /> : <Search size={24} className="text-foreground" />}
                </Button>
            </View>

            <ScrollView className="absolute top-20 z-20 left-0 right-0 px-6 max-h-32" contentContainerClassName="gap-2 bg-secondary rounded-lg">
                {recipes.map((recipe) => (
                    <Link
                        asChild
                        key={recipe.id}
                        href={{
                            pathname: `/recipe/${recipe.id}`,
                            params: {
                                name: recipe.title,
                            }
                        }}
                    >
                        <Button
                            variant="outline"
                            className="w-full"
                        >
                            <Text className="self-left">{recipe.title}</Text>
                        </Button>
                    </Link>
                ))}
            </ScrollView>
        </View>
    );
}