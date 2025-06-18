import { useState, useRef, useMemo } from "react";
import { View, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { useIngredientsStore } from "~/context/IngredientesStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AddIngredient from "../components/AddIngredient";
import { showSuccessToast } from "~/hooks/toast";

export default function IngredientsScreen() {
    const { clearIngredients } = useIngredientsStore();
    const ingredients = useIngredientsStore.getState().ingredients
    const bottomSheetRef = useRef<BottomSheet>(null);

    const openBottomSheet = () => bottomSheetRef.current?.expand();
    const handleClearIngredients = () => {
        clearIngredients();
        showSuccessToast("Todos los ingredientes han sido borrados", "");
    }

    return (
        <GestureHandlerRootView className="flex-1">
            <View className="flex-1 items-center gap-5 p-6 dark:bg-[#000]">
                {ingredients.length === 0 && <Text className="text-xl font-bold mb-4">No tienes ingredientes agregados</Text>}
                {ingredients.length > 0 && (
                    <FlatList
                        className="w-full"
                        data={ingredients}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View className="mb-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <Text className="text-lg font-bold text-gray-800 dark:text-white">{item.name}</Text>
                                <View className="flex-row justify-between mt-2">
                                    <View className="flex-row items-center">
                                        <Text className="text-gray-600 dark:text-gray-300">Unidad: </Text>
                                        <Text className="font-medium text-gray-800 dark:text-white">{item.unit}</Text>
                                    </View>
                                    <View className="flex-row items-center">
                                        <Text className="text-gray-600 dark:text-gray-300">Cantidad: </Text>
                                        <Text className="font-medium text-gray-800 dark:text-white">{item.amount}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                )}

                <Button className="bg-green-600" onPress={openBottomSheet}>
                    <Text className="text-white">Agregar Ingrediente</Text>
                </Button>
                <Button onPress={handleClearIngredients} className="bg-red-600">
                    <Text className="text-white">Borrar todos los ingredientes</Text>
                </Button>
            </View>

            <AddIngredient bottomSheetRef={bottomSheetRef} />

        </GestureHandlerRootView>
    );
}
