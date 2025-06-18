import { EXPO_PUBLIC_API_KEY } from "~/constants/const";
import axios from "axios";
import { Recipe, RecipesResponse } from "~/constants/types";

const API_KEY = EXPO_PUBLIC_API_KEY

export async function searchIngredients(search: string): Promise<RecipesResponse | false> {
    try {
        const response = await axios({
            url: `https://api.spoonacular.com/food/ingredients/search?apiKey=${API_KEY}&query=${search}&number=6`,
            method: 'GET',
        });

        return response.data;
    } catch (error: any) {
        console.log("error");
        console.log(error);

        return false
    }
}

