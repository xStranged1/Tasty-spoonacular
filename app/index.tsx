import { View } from 'react-native';
import SearchRecipes from './components/searchRecipes';
import { FavoritesContext } from '~/context/FavoritesContext';
import { useContext } from 'react';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function Screen() {
  const { favorites, removeFavorite } = useContext(FavoritesContext)

  return (
    <View className='flex-1 items-center gap-5 p-6 bg-secondary/30'>
      <SearchRecipes />
      <Button onPress={() => {
        console.log("Favoritos guardados", favorites);
      }}>
        <Text>ver favs </Text>
      </Button>
      <Button onPress={() => {
        removeFavorite(632706)
      }}>
        <Text>eliminar un fav </Text>
      </Button>
    </View>
  );
}
