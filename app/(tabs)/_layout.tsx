import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { ThemeToggle } from '~/components/ThemeToggle';
import { ChefHat } from '~/lib/icons/ChefHat'
import { Heart } from '~/lib/icons/Heart'
import { LeafyGreen } from '~/lib/icons/LeafyGreen'

export default function TabLayout() {
    const navigation = useNavigation();
    useEffect(() => { // Pone titulo en la screen
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#2068ff' }}>
            <Tabs.Screen
                name="ingredients"
                options={{
                    title: 'Ingredientes',
                    tabBarActiveTintColor: '#2a9c32',
                    tabBarIcon: ({ color }) => <LeafyGreen size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Recetas',
                    headerRight: () => <ThemeToggle />,
                    tabBarIcon: ({ color }) => <ChefHat size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favoritos',
                    tabBarActiveTintColor: '#e50020',
                    tabBarIcon: ({ color }) => <Heart size={28} color={color} />,
                }}
            />
        </Tabs>
    );
}
