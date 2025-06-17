import { View, Text } from "react-native";
import { Step } from "~/constants/types"; 

export default function RecipeSteps({ steps }: { steps: Step[] }) {
  if (!steps || steps.length === 0) {
    return <Text className="text-muted-foreground">No hay instrucciones disponibles.</Text>;
  }

  return (
    <View className="mt-4">
      <Text className="text-lg font-bold mb-2">Instrucciones:</Text>
      <View className="space-y-3">
        {steps.map((step) => (
          <View key={step.number} className="flex-row gap-2">
            <Text className="font-bold text-primary">{step.number}.</Text>
            <Text className="flex-1">{step.step}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}