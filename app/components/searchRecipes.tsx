import { useState } from "react";
import { View, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { AutocompleteSearchRecipe } from "~/constants/types";
import { autocompleteSearchRecipe, searchRecipeByIngredients } from "~/services/recipe";
import { Text } from "~/components/ui/text";
import { Link } from "expo-router";

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
                <View style={{ minWidth: 110, marginLeft: 8, backgroundColor: 'transparent', borderRadius: 6, overflow: 'hidden' }}>
                    <Picker
                        selectedValue={searchType}
                        onValueChange={(itemValue) => setSearchType(itemValue)}
                        mode="dropdown"
                        dropdownIconColor="#888"
                        style={{ height: 36, color: '#222', fontSize: 12 }}
                    >
                        <Picker.Item label="Nombre" value="name" />
                        <Picker.Item label="Ingrediente" value="ingredient" />
                    </Picker>
                </View>
                <Button variant="outline" onPress={handleGetRecipes} disabled={loading}>
                    <Text>{loading ? "Buscando..." : "Buscar"}</Text>
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