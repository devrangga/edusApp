import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors, padding, fontSize } from "../../utils/Constant";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";

export default function UserSettings({ icon, title, subtitle }) {
  const { isSignedIn, signOut } = useAuth();

  const handleSignOut = async () => {
    if (title === "Log Out" && isSignedIn) {
      try {
        await signOut();
      } catch (error) {
        console.error("Error signing out:", error);
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSignOut}
      style={{
        flexDirection: "row",
        gap: padding.xl,
        alignItems: "center",
        backgroundColor: colors.greySuperLight,
        padding: padding.lg,
        marginHorizontal: padding["3xl"],
        paddingHorizontal: padding["2xl"],
        borderRadius: padding.lg,
      }}
    >
      <AntDesign name={icon} size={24} color="black" />
      <View>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: fontSize.lg,
            color: colors.deepPurple,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-regular",
            fontSize: fontSize.md,
            color: colors.greyMedium,
          }}
        >
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
