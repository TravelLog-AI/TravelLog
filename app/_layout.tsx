import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import theme from "./../theme/theme";
import { Provider as PaperProvider } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  useFonts({
    "open-sans": require("./../assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-medium": require("./../assets/fonts/OpenSans-Medium.ttf"),
    "open-sans-bold": require("./../assets/fonts/OpenSans-Bold.ttf"),
    "open-sans-light": require("./../assets/fonts/OpenSans-Light.ttf"),
    "open-sans-thin": require("./../assets/fonts/OpenSans-Light.ttf"),
  });
  return (
    <RootSiblingParent>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
        <Toast />
      </PaperProvider>
    </RootSiblingParent>
  );
}
