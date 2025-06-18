import { EXPO_PUBLIC_API_KEY } from "~/constants/const";
import axios from "axios";
import { IngredientSearchResponse, RecipesResponse } from "~/constants/types";

const API_KEY = EXPO_PUBLIC_API_KEY

export async function searchIngredients(search: string): Promise<IngredientSearchResponse[] | false> {
    try {
        const response = await axios({
            url: `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${API_KEY}&query=${search}&number=3&metaInformation=true`,
            method: 'GET',
        });

        return response.data;
    } catch (error: any) {
        console.log("error");
        console.log(error);

        return false
    }
}

