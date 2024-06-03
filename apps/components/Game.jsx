import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { colors, padding, fontSize } from "../../utils/Constant";
import { BlurView } from "expo-blur";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Game({ uri, title, subtitle, index }) {
  return (
    <TouchableOpacity
      style={{
        width: 350,
        marginLeft: index === 0 ? padding["2xl"] : 0,
      }}
    >
      <View
        style={{
          borderRadius: 24,
          overflow: "hidden",
          height: 200,
          position: "relative",
        }}
      >
        <Image
          source={{ uri: uri }}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <BlurView
          intensity={35}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "30%",
            paddingHorizontal: padding["3xl"],
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "outfit-regular",
                  color: colors.white,
                  fontSize: fontSize.md,
                }}
              >
                {title}
              </Text>
              <Text
                style={{
                  marginTop: -4,
                  fontFamily: "outfit-bold",
                  color: colors.white,
                  fontSize: fontSize["xl"],
                }}
              >
                {subtitle}
              </Text>
            </View>

            <FontAwesome6 name="gamepad" size={36} color={colors.white} />
          </View>
        </BlurView>
      </View>
    </TouchableOpacity>
  );
}
