import { useState } from "react";
import { View, FlatList, TextInput, Modal, TouchableOpacity } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { searchIngredients } from "~/services/ingredients";
import { useIngredientsStore } from "~/context/IngredientesStore";

export default function IngredientsScreen() {
    const { ingredients, addIngredient, removeIngredient } = useIngredientsStore();
    const [searchModalVisible, setSearchModalVisible] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedAmount, setSelectedAmount] = useState("");

    const handleSearch = async () => {
        const results = await searchIngredients(query);
        console.log("results");
        console.log(results);

        setSearchResults(results);
    };

    const handleSelect = (item) => {
        if (!selectedAmount) return;
        addIngredient({ ...item, amount: parseFloat(selectedAmount) });
        setSearchModalVisible(false);
        setQuery("");
        setSelectedAmount("");
    };

    return (
        <View className="flex-1 p-4">
            <Text className="text-xl font-bold mb-4">Ingredientes</Text>

            <FlatList
                data={ingredients}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View className="p-2 border-b border-gray-300">
                        <Text>{item.name} - {item.amount}</Text>
                    </View>
                )}
            />

            <Button className="mt-4 bg-blue-600" onPress={() => setSearchModalVisible(true)}>
                <Text className="text-white">Agregar Ingrediente</Text>
            </Button>

            <Modal visible={searchModalVisible} animationType="slide">
                <View className="flex-1 p-4">
                    <TextInput
                        placeholder="Buscar ingrediente..."
                        value={query}
                        onChangeText={setQuery}
                        className="border p-2 rounded mb-2"
                    />
                    <Button onPress={handleSearch} className="bg-green-600 mb-2">
                        <Text className="text-white">Buscar</Text>
                    </Button>

                    <TextInput
                        placeholder="Cantidad"
                        value={selectedAmount}
                        onChangeText={setSelectedAmount}
                        keyboardType="numeric"
                        className="border p-2 rounded mb-4"
                    />

                    <FlatList
                        data={searchResults}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                className="p-2 border-b border-gray-200"
                                onPress={() => handleSelect(item)}
                            >
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />

                    <Button onPress={() => setSearchModalVisible(false)} className="mt-4 bg-red-500">
                        <Text className="text-white">Cerrar</Text>
                    </Button>
                </View>
            </Modal>
        </View>
    );
}
