import { View } from "react-native";
import { Skeleton } from "~/components/ui/skeleton";

export default function LoadingScreen() {
    return (
        <View>
            <Skeleton className="w-full h-52 mb-4" />
            <View className="p-4">
                <Skeleton className="w-48 h-6 mb-2 mt-4" />
                <Skeleton className="w-32 h-4 mb-2" />
                <Skeleton className="w-32 h-4 mb-2" />
                <Skeleton className="w-32 h-4 mb-2" />
                <Skeleton className="w-32 h-4 mb-2" />
            </View>

        </View >
    );
}