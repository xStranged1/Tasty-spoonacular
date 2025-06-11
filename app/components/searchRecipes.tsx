import { useState } from "react";
import { View, ScrollView } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { dumpReceipe } from "~/constants/const";
import { AutocompleteSearchRecipe } from "~/constants/types";
import { autocompleteSearchRecipe } from "~/services/recipe";
import { Text } from "~/components/ui/text";
import { Link } from "expo-router";

export default function SearchRecipes() {
    const [value, setValue] = useState("");
    const [recipes, setRecipes] = useState<AutocompleteSearchRecipe[]>([]);

    const handleGetReceipes = async () => {
        if (value) {
            const recipes = await autocompleteSearchRecipe(value);
            console.log("recipes", recipes);
            setRecipes(Array.isArray(recipes) ? recipes : []);
        }
    };

    return (
        <View className="flex w-full flex-shrink p-6 relative ">
            <View className="flex flex-row items-center gap-2">
                <Input
                    className="flex-1"
                    placeholder="Buscar receta..."
                    value={value}
                    onChangeText={setValue}
                    aria-labelledby="inputLabel"
                    aria-errormessage="inputError"
                />
                <Button variant="outline" onPress={handleGetReceipes}>
                    <Text>Buscar</Text>
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