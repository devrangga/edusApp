import React, { useState, useMemo } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GlobalApi from "../../../utils/GlobalApi";
import { colors, fontSize, padding } from "../../../utils/Constant";

export default function EducationDetail() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [isWatched, setIsWatched] = useState(params.data.isWatched);
  const [isLoading, setIsLoading] = useState(false);
  const [isBookmark, setIsBookmark] = useState(params.data.isBookmark);

  const title = params.data.title;

  const handlePress = () => {
    setIsLoading(true);
    GlobalApi.updateMarkAsDone(params.data.id, !params.data.isWatched)
      .then((res) => {
        setIsWatched((prev) => !prev);
        console.log("SUCCESS UPDATING MARK AS DONE", res);
      })
      .catch((err) => console.log("ERROR", err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateBookmark = () => {
    GlobalApi.updateBookmark(params.data.id, !params.data.isBookmark)
      .then((res) => {
        console.log(res);
        setIsBookmark((prev) => !prev);
      })
      .catch((err) => console.log(err));
  };

  const color = useMemo(() => {
    switch (params.data.videoType) {
      case "Mixed":
        return colors.red;
      case "Webinar":
        return colors.blue;
      case "Parenting":
        return colors.orange;
      default:
        return colors.greyLight;
    }
  }, [params.data.videoType]);

  return (
    <View
      style={{
        backgroundColor: colors.white,
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: padding["2xl"],
          height: "10%",
        }}
      >
        <Ionicons
          name="arrow-back-outline"
          size={32}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{ fontFamily: "outfit-medium", fontSize: fontSize["2xl"] }}
        >
          Detail Video
        </Text>
        <Ionicons name="arrow-back-outline" size={24} color={"transparent"} />
      </View>

      <Image
        source={{ uri: params.data.uri }}
        style={{ width: "100%", height: "40%" }}
      />

      <View
        style={{
          paddingHorizontal: padding["2xl"],
          alignItems: "start",
          flexDirection: "column",
          marginTop: padding["2xl"],
          height: "35%",
        }}
      >
        <View style={{ gap: padding.md, alignItems: "flex-start" }}>
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
              gap: padding.lg,
            }}
          >
            <View
              style={{
                paddingHorizontal: padding["2xl"],
                paddingVertical: padding.md,
                backgroundColor: color,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontFamily: "outfit-medium",
                  fontSize: fontSize.md,
                }}
              >
                {params.data.videoType}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: padding.lg,
              }}
            >
              <MaterialIcons
                onPress={() => navigation.navigate("Note", { data: title })}
                name="edit-note"
                size={32}
                color={colors.deepPurple}
              />
              <TouchableOpacity onPress={updateBookmark}>
                <Ionicons
                  name={isBookmark ? "bookmark" : "bookmark-outline"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text
            style={{
              color: colors.deepPurple,
              fontFamily: "outfit-bold",
              fontSize: fontSize["2xl"],
            }}
          >
            {params.data.title}
          </Text>
          <Text
            style={{
              color: colors.blue,
              fontFamily: "outfit-medium",
              fontSize: fontSize.lg,
            }}
          >
            {params.data.author}
          </Text>

          <Text
            style={{
              color: colors.greyLight,
              fontFamily: "outfit-regular",
              fontSize: fontSize.lg,
            }}
          >
            Sinopsis
          </Text>
        </View>

        <ScrollView
          style={{
            marginTop: padding.lg,
            gap: padding.lg,
          }}
        >
          <Text
            style={{
              color: colors.deepPurple,
              fontFamily: "outfit-regular",
              fontSize: fontSize.lg,
            }}
          >
            "Lost Connections" follows the life of Sarah Thompson, a young woman
            struggling to find her place in the world after a series of
            unexpected events shatter the foundation of her existence. As Sarah
            navigates through the complexities of life, she discovers the power
            of human connections and the profound impact they have on personal
            growth and healing.
          </Text>
        </ScrollView>
      </View>

      <TouchableOpacity
        onPress={handlePress}
        style={{
          justifyContent: "center",
          width: "100%",
        }}
      >
        <LinearGradient
          colors={
            isLoading
              ? [colors.greySuperLight, colors.greySuperLight]
              : [colors.purple, colors.purpleDark]
          }
          style={{
            margin: padding["2xl"],
            paddingVertical: padding["lg"],
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: fontSize.lg,
              color: colors.white,
              textAlign: "center",
            }}
          >
            {isLoading ? "Loading" : isWatched ? "Mark Undone" : "Mark As Done"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
