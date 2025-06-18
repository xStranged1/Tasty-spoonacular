import BottomSheet, { BottomSheetView, TouchableOpacity } from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, TextInput, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { useIngredientsStore } from "~/context/IngredientesStore";
import { searchIngredients } from "~/services/ingredients";
import { Search } from '~/lib/icons/Search'
import { IngredientSearchResponse } from "~/constants/types";
import { showSuccessToast } from "~/hooks/toast";
import DropdownUnits from "./DropdownUnits";

export default function AddIngredient({ bottomSheetRef }: { bottomSheetRef: any }) {

    const snapPoints = useMemo(() => ["50%", "90%"], []);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<IngredientSearchResponse[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<IngredientSearchResponse[]>([]);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const { addIngredient } = useIngredientsStore();

    const closeBottomSheet = () => bottomSheetRef.current?.close();

    const selectedIngredientsRef = useRef<any>([]);
    const handleSearch = async () => {
        setLoadingSearch(true)
        const res = await searchIngredients(query);
        setLoadingSearch(false)
        console.log("res search");
        console.log(res);
        if (res) {
            setResults(res);
        }
    };

    const handleSelect = (ingredient: IngredientSearchResponse) => {
        setSelectedIngredients(prev => [...prev, { ...ingredient }]);
        selectedIngredientsRef.current.push({ ...ingredient });
    };

    const handleSaveAllIngredients = () => {
        if (selectedIngredientsRef.current.length === 0) return;
        selectedIngredientsRef.current.forEach(ingredient => {
            addIngredient(ingredient);
        });
        setSelectedIngredients([]);
        selectedIngredientsRef.current = [];
        setResults([]);
        setQuery("");
        showSuccessToast("Ingredientes agregados correctamente", "");
        closeBottomSheet();
    }

    const SelectedIngredient = ({ ingredient }: { ingredient: any }) => {

        const [amount, setAmount] = useState("");

        const handleSetAmount = (value: string) => {
            setAmount(value);
            let copy = JSON.parse(JSON.stringify(selectedIngredientsRef.current));
            copy = copy.map((item: any) => {
                if (item.id === ingredient.id) {
                    return { ...item, amount: value };
                }
                return item;
            });
            selectedIngredientsRef.current = copy;
        }

        const handleSelectUnit = (unit: string) => {
            let copy = JSON.parse(JSON.stringify(selectedIngredientsRef.current));
            copy = copy.map((item: any) => {
                if (item.id === ingredient.id) {
                    return { ...item, unit };
                }
                return item;
            });
            console.log("copy");
            console.log(copy);

            selectedIngredientsRef.current = copy
        };

        return (
            <View className="flex flex-row items-center gap-2" key={ingredient.id}>
                <Text className="font-semibold flex-1">{ingredient.name}</Text>
                <DropdownUnits units={ingredient.possibleUnits} onSelect={handleSelectUnit} />
                <Input
                    className="flex-6"
                    placeholder="Cantidad"
                    value={amount}
                    onChangeText={handleSetAmount}
                    aria-labelledby="inputLabel"
                    aria-errormessage="inputError"
                />
            </View>
        )
    }
    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose
        >

            <BottomSheetView className="flex-1 h-full bg-[#e7e5e5] dark:bg-[#141414]">
                <View className="flex-1 px-4 pt-2">
                    <View className="flex flex-row items-center gap-2 mt-4">
                        <Input
                            className="flex-1"
                            placeholder="Buscar ingrediente..."
                            value={query}
                            onChangeText={setQuery}
                            aria-labelledby="inputLabel"
                            aria-errormessage="inputError"
                        />
                        <Button variant="outline" onPress={handleSearch} disabled={loadingSearch}>
                            {loadingSearch ? <ActivityIndicator size="large" className="flex-1 justify-center" /> : <Search size={24} className="text-foreground" />}
                        </Button>
                    </View>
                    {results.length > 0 && (
                        <View className="flex flex-col gap-2 mt-4">
                            {results.map((ingredient) => (
                                <Button
                                    key={ingredient.id}
                                    variant="outline"
                                    className="w-full"
                                    onPress={() => handleSelect(ingredient)}
                                >
                                    <Text className="self-left">{ingredient.name}</Text>
                                </Button>
                            ))}
                        </View>
                    )}
                    {selectedIngredients.length > 0 && (
                        <View className="mt-4">
                            {selectedIngredients.map((ingredient) => <SelectedIngredient ingredient={ingredient} key={ingredient.id} />)}
                            <Button
                                className="w-full mt-4"
                                onPress={handleSaveAllIngredients}
                            >
                                <Text >Guardar Ingredientes</Text>
                            </Button>
                        </View>
                    )}
                </View>
            </BottomSheetView>
        </BottomSheet>

    )
}