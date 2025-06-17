import '~/global.css';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Dimensions, Platform } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeToggle } from '~/components/ThemeToggle';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import Toast, { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';
import { AuthProvider } from '../context/AuthContext';
import { FavoritesProvider } from '../context/FavoritesContext';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const { width } = Dimensions.get('window');

export const toastConfig: ToastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        marginHorizontal: 20,
        maxWidth: width - 40,
        paddingRight: 20,
        borderLeftColor: '#4caf50',
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        marginHorizontal: 20,
        maxWidth: width - 40,
        paddingRight: 20,
        borderLeftColor: '#f00',
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
};

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <AuthProvider>
          <FavoritesProvider>
            <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
            <Stack>
              <Stack.Screen
                name='index'
                options={{
                  title: 'Login',
                }}
              />
              <Stack.Screen
                name='register'
                options={{
                  title: 'Registro',
                }}
              />
              <Stack.Screen
                name='home'
                options={{
                  title: 'Starter Base',
                  headerRight: () => <ThemeToggle />,
                }}
              />
              <Stack.Screen
                name='favorites'
                options={{
                  title: 'Favoritos',
                  headerRight: () => <ThemeToggle />,
                }}
              />

              <Stack.Screen
                name='recipe/[id]'
                options={{
                  title: 'Receta',
                  headerRight: () => <ThemeToggle />,
                }}
              />
            </Stack>
            <PortalHost />
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
      <Toast config={toastConfig} />
    </>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
