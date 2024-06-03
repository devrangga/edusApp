import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import Game from "../../components/Game";
import { colors, padding } from "../../../utils/Constant";
import GameScreen from "../Home Screen/GameScreen";
import EducationScreen from "./EducationScreen";

export default function HomeScreen() {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        height: "100%",
        paddingVertical: padding.lg,
        gap: padding.xl,
      }}
    >
      <GameScreen />
      <EducationScreen />
    </View>
  );
}
