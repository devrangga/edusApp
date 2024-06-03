import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput } from "react-native";
import GlobalApi from "../../../utils/GlobalApi";
import { colors, fontSize, padding } from "../../../utils/Constant";
import EducationVideo from "../../components/EducationVideo";
import { FontAwesome6 } from "@expo/vector-icons";
import ButtonFilterEducation from "../../components/ButtonFilterEducation";

export default function CompleteEducations() {
  const [selectedType, setSelectedType] = useState([
    { text: "All", isSelected: true },
    { text: "Parenting", isSelected: false },
    { text: "Webinar", isSelected: false },
  ]);
  const [educations, setEducations] = useState([]);
  const [filteredEducations, setFilteredEducations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const res = await GlobalApi.getEducations();
        setEducations(res.educations);
        setFilteredEducations(res.educations);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEducations();
  }, []);

  const handlePress = (index) => {
    const updatedSelectedType = selectedType.map((item, i) => ({
      ...item,
      isSelected: i === index,
    }));
    setSelectedType(updatedSelectedType);
    filterEducations(updatedSelectedType[index].text);
  };

  const filterEducations = (videoType) => {
    if (videoType === "All") {
      setFilteredEducations(educations);
    } else {
      const filtered = educations.filter(
        (education) => education.videoType === videoType
      );
      setFilteredEducations(filtered);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = educations.filter((education) =>
      education.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredEducations(filtered);
  };

  return (
    <View style={{ backgroundColor: colors.white, height: "100%" }}>
      <View
        style={{
          backgroundColor: colors.blue,
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
            Let’s Find{" "}
          </Text>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: fontSize["2xl"],
              color: colors.white,
            }}
          >
            Your Desired Video!
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
            onChangeText={handleSearch}
          />
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {selectedType.map((item, index) => (
            <ButtonFilterEducation
              key={index}
              text={item.text}
              isSelected={item.isSelected}
              handlePress={() => handlePress(index)}
            />
          ))}
        </View>
      </View>

      <FlatList
        contentContainerStyle={{
          marginTop: padding["3xl"],
          gap: padding.xl,
          backgroundColor: colors.white,
        }}
        renderItem={({ item }) => (
          <EducationVideo
            id={item.id}
            uri={item.educationImage.url}
            title={item.title}
            author={item.author}
            duration={item.duration}
            videoType={item.videoType}
            isWatched={item.isWatched}
          />
        )}
        data={filteredEducations}
        ListFooterComponent={<View style={{ height: 50 }} />}
      />
    </View>
  );
}
