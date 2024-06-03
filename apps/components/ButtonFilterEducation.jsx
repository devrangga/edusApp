import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors, padding, fontSize } from "../../utils/Constant";

export default function ButtonFilterEducation({
  isSelected,
  text,
  handlePress,
}) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        width: "30%",
        backgroundColor: isSelected ? colors.white : "transparent",
        justifyContent: "center",
        alignContent: "center",
        paddingVertical: padding.md,
        borderRadius: 100,
        borderWidth: isSelected ? 0 : 1,
        borderColor: colors.white,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-regular",
          textAlign: "center",
          color: isSelected ? colors.blue : colors.white,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
