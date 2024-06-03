import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { colors, fontSize, padding } from "../../utils/Constant";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function EducationVideo({
  id,
  uri,
  title,
  author,
  duration,
  videoType,
  isWatched,
  isBookmark,
}) {
  const navigation = useNavigation();
  const [isWatchedd, setIsWatchedd] = useState(isWatched);
  const color = () => {
    switch (videoType) {
      case "Mixed":
        return colors.red;
      case "Webinar":
        return colors.blue;
      case "Parenting":
        return colors.orange;
      default:
        return colors.greyLight;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsWatchedd(isWatched);
    }, [isWatched])
  );
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Education Detail", {
          data: {
            id,
            uri,
            title,
            author,
            duration,
            videoType,
            isWatched,
            isBookmark,
          },
        })
      }
      style={{
        shadowColor: colors.deepPurple,
        shadowOpacity: 0.05,
        shadowRadius: 8,
        backgroundColor: colors.white,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: padding["2xl"],
        paddingHorizontal: padding.xl,
        paddingVertical: padding.lg,
        borderRadius: 12,
        gap: padding["2xl"],
      }}
    >
      <Image
        source={{ uri: uri }}
        style={{
          width: 75,
          height: 75,
          borderRadius: padding.lg,
          backgroundColor: colors.blueDark,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
          gap: padding["2xl"],
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
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
              fontFamily: "outfit-medium",
              fontSize: fontSize.md,
              color: colors.greyLight,
            }}
          >
            {author}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: padding.lg,
                paddingVertical: padding.sm,
                borderRadius: 100,
                backgroundColor: color(),
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  fontSize: fontSize.xs,
                  color: colors.white,
                }}
              >
                {videoType}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: fontSize.md,
                color: colors.purple,
              }}
            >
              {duration}
            </Text>
          </View>
        </View>

        <AntDesign
          name="play"
          size={36}
          color={isWatchedd ? colors.purple : colors.greyLight}
          style={{ alignSelf: "center" }}
        />
      </View>
    </TouchableOpacity>
  );
}
