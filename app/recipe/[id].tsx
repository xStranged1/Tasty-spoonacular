import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { Text } from '~/components/ui/text';
import { RecipeDetail } from "~/constants/types";
import { getRecipeDetail } from "~/services/recipe";
import { capitalizer } from "~/utils/utils";
import LoadingScreen from "./components/LoadingScreen";
import { Card, CardContent, CardDescription, CardFooter } from "~/components/ui/card";
import { dummyReceipe } from "~/constants/const";

export default function RecipeDetailScreen() {
    const { id, name } = useLocalSearchParams();
    const [recipe, setRecipe] = useState<RecipeDetail>(dummyReceipe);
    const [loading, setLoading] = useState(true);

    console.log("RecipeDetail", id, name, recipe);

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({ title: capitalizer(name as string) });
    }, [navigation]);

    useEffect(() => {
        const getRecipe = async () => {
            const recipeDetail = await getRecipeDetail(id as string);
            console.log("recipeDetail");
            console.log(recipeDetail);
            if (recipeDetail) {
                setRecipe(recipeDetail as RecipeDetail);
            }
            setLoading(false)
        }

        getRecipe()
    }, [])

    if (loading) {
        return <LoadingScreen />
    }
    return (
        <ScrollView>
            <Image
                source={{ uri: recipe?.image }}
                className="w-full h-64 object-contain"
            />
            <Card className="p-4">
                <CardDescription>
                    <Text className="text-lg font-bold">{recipe?.title}</Text>
                    <View className="px-1" />
                    <Text className="text-sm text-muted-foreground">
                        {recipe?.readyInMinutes} minutes - {recipe?.servings} servings
                    </Text>
                </CardDescription>
                <CardContent>

                    <Text className="mt-2 text-sm font-semibold">Ingredients:</Text>
                    {recipe?.extendedIngredients.map((ingredient) => (
                        <Text key={ingredient.id} className="text-sm">
                            - {ingredient.original}
                        </Text>
                    ))}
                </CardContent>
                <CardFooter>
                    <Text className="text-sm text-muted-foreground">
                        Source: <Text className="text-blue-500">{recipe?.sourceName}</Text>
                    </Text>
                    <Text className="text-sm text-muted-foreground">
                        <Text className="text-blue-500">{recipe?.sourceUrl}</Text>
                    </Text>
                </CardFooter>
            </Card>
        </ScrollView>
    )
}