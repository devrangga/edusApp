import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home Screen/HomeScreen";
import MessageScreen from "./screens/Message Screen/MessageScreen";
import UserScreen from "./screens/User Screen/UserScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils/Constant";
import EducationDetail from "./screens/Home Screen/EducationDetail";
import CompleteEducations from "./screens/Home Screen/CompleteEducations";
import EducationNote from "./screens/Home Screen/EducationNote";
import BookmarkScreen from "./screens/Bookmark Screen/BookmarkScreen";

const Tab = createBottomTabNavigator();
const TabsGroup = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Message") {
            iconName = focused
              ? "chatbox-ellipses"
              : "chatbox-ellipses-outline";
          } else if (route.name === "Bookmark") {
            iconName = focused ? "folder-sharp" : "folder-outline";
          } else if (route.name === "User") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.purple,
        tabBarInactiveTintColor: colors.greyLight,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookmark" component={BookmarkScreen} />
      <Tab.Screen name="Message" component={MessageScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();
const StacksGroup = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tabs" component={TabsGroup} />
      <Stack.Screen name="Education Detail" component={EducationDetail} />
      <Stack.Screen name="ViewAll" component={CompleteEducations} />
      <Stack.Screen
        name="Note"
        component={EducationNote}
        options={{ presentation: "containedModal" }}
      />
    </Stack.Navigator>
  );
};

export default function TabNavigation() {
  return (
    <SafeAreaView
      style={{ flex: 1, height: "100%", backgroundColor: colors.white }}
    >
      <StacksGroup />
    </SafeAreaView>
  );
}
