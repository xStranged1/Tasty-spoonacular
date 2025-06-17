import * as React from 'react';
import { View } from 'react-native';
import { Button } from "~/components/ui/button";
import SearchRecipes from './components/searchRecipes';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Text } from "~/components/ui/text";

export default function Screen() {

  return (
    <View className='flex-1 items-center gap-5 p-6 bg-secondary/30'>
      <Link href={{ pathname: '/favorites' }} asChild>
        <Button variant={"outline"} className="flex-row gap-2">
          <FontAwesome name="heart" size={20} color="red" />
          <Text >Favoritos</Text>
        </Button>
      </Link>
      <SearchRecipes />

    </View>

  );
}
