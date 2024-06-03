import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, fontSize, padding } from "../../../utils/Constant";
import EducationVideo from "../../components/EducationVideo";
import GlobalApi from "../../../utils/GlobalApi";
import { useNavigation } from "@react-navigation/native";

export default function EducationScreen() {
  const [educations, setEducations] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    const fetchEducations = () => {
      GlobalApi.getEducations()
        .then((res) => {
          setEducations(res.educations);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchEducations();
  }, []);
  return (
    <View style={{ gap: padding.xl }}>
      <View
        style={{
          paddingHorizontal: padding["2xl"],
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: fontSize.xl,
            color: colors.deepPurple,
          }}
        >
          Trending Educations
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ViewAll")}
          style={{
            backgroundColor: colors.deepPurple,
            paddingHorizontal: padding.xl,
            paddingVertical: padding.md,
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: fontSize.md,
              color: colors.white,
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={{
          gap: padding.xl,
          backgroundColor: colors.white,
        }}
        renderItem={({ item, index }) => {
          return (
            <EducationVideo
              id={item.id}
              uri={item.educationImage.url}
              title={item.title}
              author={item.author}
              duration={item.duration}
              videoType={item.videoType}
              isWatched={item.isWatched}
              isBookmark={item.isBookmark}
            />
          );
        }}
        data={educations}
        ListFooterComponent={<View style={{ height: 300 }} />}
      />
    </View>
  );
}
