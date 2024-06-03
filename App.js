import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-splash-screen";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./apps/TabNavigation";
import Login from "./apps/screens/Login Screen/Login";
import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      console.log(`ERROR ATAS ${err}`);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.log(`ERROR BAWAH ${err}`);
      return;
    }
  },
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "outfit-bold": require("./assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("./assets/fonts/Outfit-Medium.ttf"),
    "outfit-regular": require("./assets/fonts/Outfit-Regular.ttf"),
  });

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey="pk_test_d2lyZWQtZ25hdC0yOS5jbGVyay5hY2NvdW50cy5kZXYk"
    >
      <SignedIn>
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </SignedIn>
      <SignedOut>
        <Login />
      </SignedOut>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
