import { View, Text } from "react-native";
import React from "react";
import { colors, fontSize } from "../../utils/Constant";

export default function UserStatistics({ number, tag }) {
    
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: fontSize.lg,
          color: colors.deepPurple,
        }}
      >
        {number}
      </Text>
      <Text
        style={{
          fontFamily: "outfit-regular",
          fontSize: fontSize.md,
          color: colors.greyMedium,
        }}
      >
        {tag}
      </Text>
    </View>
  );
}
