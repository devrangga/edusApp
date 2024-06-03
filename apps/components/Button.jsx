import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fontSize, padding } from "../../utils/Constant";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";

export default function Button({ text, filled }) {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderRadius: 100,
          overflow: "hidden",
        }}
      >
        {filled ? (
          <LinearGradient colors={[colors.orange, colors.orangeDark]}>
            <Text
              style={{
                paddingVertical: padding.xl,
                color: colors.white,
                textAlign: "center",
                fontFamily: "outfit-bold",
                fontSize: fontSize.lg,
              }}
            >
              {text}
            </Text>
          </LinearGradient>
        ) : (
          <View
            style={{
              backgroundColor: colors.white,
              width: "100%",
              borderWidth: 2,
              borderRadius: 100,
              borderColor: colors.orange,
            }}
          >
            <Text
              style={{
                paddingVertical: padding.xl,
                color: colors.orange,
                textAlign: "center",
                fontFamily: "outfit-bold",
                fontSize: fontSize.lg,
              }}
            >
              {text}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
