import * as React from 'react';
import { View } from 'react-native';
import SearchRecipes from '../components/searchRecipes';

export default function HomeScreen() {

  return (
    <View className='flex-1 items-center gap-5 p-6 bg-secondary/30'>
      <SearchRecipes />
    </View>
  );
}
