import { EXPO_PUBLIC_API_KEY } from "~/constants/const";
import axios from "axios";
import { Recipe, RecipesResponse } from "~/constants/types";

const API_KEY = EXPO_PUBLIC_API_KEY

export async function searchRecipe(search: string): Promise<RecipesResponse | false> {
    try {
        const response = await axios({
            url: `https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&query=pasta&cuisine=italian&diet=vegetarian`,
            method: 'GET',
        });

        return response.data;
    } catch (error: any) {
        return false
    }
}

export async function autocompleteSearchRecipe(search: string): Promise<RecipesResponse | false> {
    try {
        const response = await axios({
            url: `https://api.spoonacular.com/recipes/autocomplete?apiKey=${API_KEY}&number=7&query=${search}`,
            method: 'GET',
        });

        return response.data;
    } catch (error: any) {
        console.log("error");
        console.log(error);
        return false
    }
}

export async function getRecipeDetail(idRecipe: string): Promise<Recipe | false> {
    try {
        const response = await axios({
            url: `https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`,
            method: 'GET',
        });

        return response.data;
    } catch (error: any) {
        return false
    }
}

export async function searchRecipeByIngredients(ingredients: string, number: number = 10, ranking: number = 1, ignorePantry: boolean = true): Promise<Recipe[] | false> {
    try {
        const response = await axios({
            url: `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${encodeURIComponent(ingredients)}&number=${number}&ranking=${ranking}&ignorePantry=${ignorePantry}`,
            method: 'GET',
        });
        return response.data;
    } catch (error: any) {
        console.log("error");
        console.log(error);
        return false;
    }
}
