import { View, Text, FlatList, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../../utils/GlobalApi";
import { colors, padding, fontSize } from "../../../utils/Constant";
import EducationVideo from "../../components/EducationVideo";
import { FontAwesome6 } from "@expo/vector-icons";

export default function BookmarkScreen() {
  const [educations, setEducations] = useState();
  const [filteredEducations, setFilteredEducations] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await GlobalApi.getBookmarkedEducations();
      setEducations(data.educations);
      setFilteredEducations(data.educations);
    };
    fetchData();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = educations.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredEducations(filtered);
  };

  return (
    <View style={{ backgroundColor: colors.white, height: "100%" }}>
      <View
        style={{
          backgroundColor: colors.orange,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: padding["2xl"],
          paddingVertical: padding["3xl"],
          gap: padding["2xl"],
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: fontSize["2xl"],
              color: colors.white,
            }}
          >
            Your Wonderful{" "}
          </Text>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: fontSize["2xl"],
              color: colors.white,
            }}
          >
            Bookmarked Videos!
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            backgroundColor: colors.white,
            paddingHorizontal: padding["xl"],
            paddingVertical: padding.lg,
            borderRadius: 100,
          }}
        >
          <FontAwesome6
            name="magnifying-glass"
            size={16}
            color={colors.greyLight}
          />
          <TextInput
            style={{
              width: "100%",
              fontFamily: "outfit-regular",
              marginLeft: padding.lg,
              color: colors.greyLight,
            }}
            placeholder="Search Video"
            placeholderTextColor={colors.greyLight}
            value={searchQuery}
            onChangeText={(text) => handleSearch(text)}
          />
        </View>
      </View>

      <FlatList
        contentContainerStyle={{
          paddingTop: padding["3xl"],
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
        data={filteredEducations}
        ListFooterComponent={<View style={{ height: 150 }} />}
      />
    </View>
  );
}
