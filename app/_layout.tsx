import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import theme from './../theme/theme';
import { Provider as PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  useFonts({
    'open-sans': require("./../assets/fonts/OpenSans-Regular.ttf"),
    'open-sans-medium': require("./../assets/fonts/OpenSans-Medium.ttf"),
    'open-sans-bold': require("./../assets/fonts/OpenSans-Bold.ttf"),
    'open-sans-light': require("./../assets/fonts/OpenSans-Light.ttf"),
    'open-sans-thin': require("./../assets/fonts/OpenSans-Light.ttf"),
  });
  return (
    <PaperProvider theme={theme}>
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
    </Stack>
    </PaperProvider>
  );
}
