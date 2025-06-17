import { useLocalSearchParams, useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, Image, ScrollView, Linking } from "react-native";
import { Text } from '~/components/ui/text';
import { RecipeDetail } from "~/constants/types";
import { getRecipeDetail, getRecipeInstructions } from "~/services/recipe";
import { capitalizer } from "~/utils/utils";
import LoadingScreen from "./components/LoadingScreen";
import { Card, CardContent, CardDescription, CardFooter } from "~/components/ui/card";
import { dummyReceipe } from "~/constants/const";
import { FavoritesContext } from "~/context/FavoritesContext";
import { Heart } from '~/lib/icons/Heart'
import { HeartOff } from '~/lib/icons/HeartOff'
import { showSuccessToast } from "~/hooks/toast";
import { Button } from "~/components/ui/button";

export default function RecipeDetailScreen() {
    const { id, name, isFavorite } = useLocalSearchParams();
    const [recipe, setRecipe] = useState<RecipeDetail>(dummyReceipe);
    const [steps, setSteps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { favorites, toggleFavorite } = useContext(FavoritesContext);
    console.log("isFavorite");
    console.log(isFavorite);

    const [isInFavorites, setIsInfavorites] = useState(isFavorite ? true : false);
    console.log("isInFavorites");
    console.log(isInFavorites);

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({ title: capitalizer(name as string) });
    }, [navigation]);

    useEffect(() => {
        const getRecipe = async () => {
            try {
                const [recipeDetail, instructions] = await Promise.all([
                    getRecipeDetail(id as string),
                    getRecipeInstructions(id as string)
                ]);

                if (recipeDetail) {
                    setRecipe(recipeDetail as RecipeDetail);
                    const isFavorite = favorites.some(fav => fav.id == (id || 0))
                    console.log("setea isFavorite");
                    console.log(isFavorite);
                    console.log("favorites");
                    console.log(favorites);

                    setIsInfavorites(isFavorite)
                }
                if (instructions && instructions.length > 0) {
                    setSteps(instructions[0].steps);
                }
            } catch (error) {
                console.error("Error fetching recipe:", error);
            } finally {
                setLoading(false);
            }
        };

        getRecipe();
    }, [id]);


    const openExternalLink = (url: string) => {
        Linking.openURL(url);
    };

    const handleAddFavorite = async () => {
        const favoriteRecipe = {
            id: recipe?.id || 0,
            title: recipe?.title || "",
            image: recipe?.image || "",
        };
        if (isInFavorites) {
            setIsInfavorites(false);
        } else {
            setIsInfavorites(true);
        }
        const res = await toggleFavorite(favoriteRecipe);
        if (res) {
            showSuccessToast('Receta agregada a favoritos', '');
            return
        }
        showSuccessToast('Se eliminó esta receta de favoritos', '');
    }

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <ScrollView className="flex-1 bg-background">
            {/* Imagen y botón de favoritos */}
            <View className="relative">
                <Image
                    source={{ uri: recipe?.image }}
                    className="w-full h-64 object-cover"
                />
                <Button
                    className="absolute top-2 right-2 bg-background/90 rounded-full p-2"
                    onPress={handleAddFavorite}
                >
                    {!isInFavorites ? (<Heart size={24} color='#e81224' />) : (<HeartOff size={24} color='#e81224' />)}
                </Button>
            </View>

            {/* Información principal */}
            <Card className="m-4">
                <CardDescription className="p-4">
                    <Text className="text-2xl font-bold text-foreground">{recipe?.title}</Text>
                    <View className="flex-row items-center mt-1">
                        <Text className="text-sm text-muted-foreground">
                            ⏱️ {recipe?.readyInMinutes} minutos • 🍽️ {recipe?.servings} porciones
                        </Text>
                    </View>

                </CardDescription>
                {/* Ingredientes */}
                <CardContent className="px-4 pb-4">
                    <Text className="text-lg font-bold mb-2 text-foreground">Ingredientes:</Text>
                    {recipe?.extendedIngredients.map((ingredient) => (
                        <View key={ingredient.id} className="flex-row items-start mb-1">
                            <Text className="text-muted-foreground">•</Text>
                            <Text className="ml-2 flex-1 text-muted-foreground">{ingredient.original}</Text>
                        </View>
                    ))}
                </CardContent>
            </Card>

            {/* Pasos de preparación */}
            {steps.length > 0 && (
                <Card className="m-4">
                    <CardContent className="p-4">
                        <Text className="text-lg font-bold mb-3 text-foreground">Preparación:</Text>
                        {steps.map((step) => (
                            <View key={step.number} className="mb-4">
                                <View className="flex-row items-start">
                                    <View className="bg-primary rounded-full w-6 h-6 items-center justify-center mr-2">
                                        <Text className="text-white dark:text-black font-bold">{step.number}</Text>
                                    </View>
                                    <Text className="flex-1 text-muted-foreground">{step.step}</Text>
                                </View>
                            </View>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Fuente */}
            {recipe?.sourceUrl && (
                <Card className="m-4">
                    <CardFooter className="p-4">
                        <Button variant='ghost' onPress={() => {
                            openExternalLink(recipe.sourceUrl);
                        }}>
                            <Text className="text-sm text-muted-foreground">
                                Fuente: <Text className="text-blue-500 underline">{recipe.sourceName}</Text>
                            </Text>
                        </Button>

                    </CardFooter>
                </Card>
            )}
        </ScrollView>
    );
}