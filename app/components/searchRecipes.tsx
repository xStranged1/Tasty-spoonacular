import { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { AutocompleteSearchRecipe } from "~/constants/types";
import { autocompleteSearchRecipe, searchRecipeByIngredients } from "~/services/recipe";
import { Text } from "~/components/ui/text";
import { Link } from "expo-router";
import { Plus } from "~/lib/icons/Plus";
import { X } from "~/lib/icons/X";

export default function SearchRecipes() {
    const [value, setValue] = useState("");
    const [recipes, setRecipes] = useState<AutocompleteSearchRecipe[]>([]);
    const [searchType, setSearchType] = useState<'name' | 'ingredient'>('name');
    const [loading, setLoading] = useState(false);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [ingredientInput, setIngredientInput] = useState("");

    const handleGetRecipes = async () => {
        setLoading(true);
        if (searchType === 'name') {
            if (!value) return setLoading(false);
            const recipes = await autocompleteSearchRecipe(value);
            setRecipes(Array.isArray(recipes) ? recipes : []);
        } else {
            if (ingredients.length === 0) return setLoading(false);
            const recipes = await searchRecipeByIngredients(ingredients.join(","));
            setRecipes(Array.isArray(recipes) ? recipes : []);
        }
        setLoading(false);
    };

    const handleAddIngredient = () => {
        const trimmed = ingredientInput.trim();
        if (trimmed && !ingredients.includes(trimmed)) {
            setIngredients([...ingredients, trimmed]);
            setIngredientInput("");
        }
    };

    const handleRemoveIngredient = (ingredient: string) => {
        setIngredients(ingredients.filter(i => i !== ingredient));
    };

    // Vista para búsqueda por ingredientes
    if (searchType === 'ingredient') {
        return (
            <View className="flex w-full flex-shrink p-6 relative bg-background flex-1">
                <View className="flex flex-row items-center gap-2">
                    <Input
                        className="flex-1"
                        placeholder="Agregar ingrediente"
                        value={ingredientInput}
                        onChangeText={setIngredientInput}
                        onSubmitEditing={handleAddIngredient}
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        onPress={handleAddIngredient}
                        disabled={!ingredientInput.trim()}
                    >
                        <Plus className="w-5 h-5 text-primary" />
                    </Button>
                </View>
                <ScrollView horizontal className="flex flex-row gap-2 mb-4 max-h-10 mt-2">
                    {ingredients.map((ingredient) => (
                        <View key={ingredient} className="flex flex-row items-center bg-secondary rounded-full px-3 py-1 mr-2">
                            <Text className="mr-1 text-xs">{ingredient}</Text>
                            <Button
                                variant="ghost"
                                size="icon"
                                onPress={() => handleRemoveIngredient(ingredient)}
                            >
                                <X className="w-3 h-3 text-muted-foreground" />
                            </Button>
                        </View>
                    ))}
                </ScrollView>
                <View style={{ minWidth: 110, backgroundColor: 'transparent', borderRadius: 6, overflow: 'hidden', marginBottom: 8 }}>
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
                <Button
                    variant="default"
                    className="w-full mt-2 mb-2"
                    onPress={handleGetRecipes}
                    disabled={ingredients.length === 0 || loading}
                >
                    <Text className="text-lg">{loading ? "Buscando..." : "Buscar recetas"}</Text>
                </Button>
                <ScrollView className="flex-1 mt-2" contentContainerClassName="gap-2 bg-secondary rounded-lg">
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

    // Vista para búsqueda por nombre (igual que antes)
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