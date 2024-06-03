import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors, padding, fontSize } from "../../../utils/Constant";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import GlobalApi from "../../../utils/GlobalApi";
import Note from "../../components/Note";

export default function EducationNote() {
  const navigation = useNavigation();
  const [notes, setNotes] = useState(null);
  const { params } = useRoute();
  const [isLoading, setIsLoading] = useState();
  const [isAddingData, setIsAddingData] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      const datas = await GlobalApi.getNote(params.data);
      setNotes(datas.educationNotes.reverse());
    };
    fetchNote();
  }, []);

  const handleCreateNote = () => {
    if (!title || !content) {
      setContent("");
      setTitle("");
      setIsAddingData((prev) => !prev);
    } else {
      GlobalApi.createNote(title, content, "Urgent", params.data)
        .then((res) => {
          console.log("BISAAA BROKKK");
          console.log(res);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setContent("");
          setTitle("");
          setIsAddingData((prev) => !prev);

          const fetchNote = async () => {
            const datas = await GlobalApi.getNote(params.data);
            console.log(datas);
            setNotes(datas.educationNotes.reverse());
          };
          fetchNote();
        });
    }
  };

  return (
    <View
      style={{
        position: "relative",
        height: "100%",
        backgroundColor: colors.white,
      }}
    >
      <TouchableOpacity
        style={{
          paddingHorizontal: padding["2xl"],
          paddingVertical: padding.lg,
          backgroundColor: colors.blue,
          position: "absolute",
          borderRadius: 100,
          right: padding["3xl"],
          bottom: padding["3xl"],
          zIndex: 100,
        }}
        onPress={() => {
          setIsAddingData((prev) => !prev);
        }}
      >
        <Text style={{ fontFamily: "outfit-medium", color: colors.white }}>
          Add Notes
        </Text>
      </TouchableOpacity>

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
          name="close-sharp"
          size={32}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{ fontFamily: "outfit-medium", fontSize: fontSize["2xl"] }}
        >
          Your Notes
        </Text>
        <Ionicons name="arrow-back-outline" size={24} color={"transparent"} />
      </View>

      {isAddingData ? (
        <View
          style={{
            paddingHorizontal: padding["2xl"],
            marginBottom: padding["2xl"],
          }}
        >
          <View
            style={{
              width: "100%",
              paddingHorizontal: padding["2xl"],
              paddingVertical: padding.xl,
              shadowColor: colors.deepPurple,
              backgroundColor: colors.whiteLight,
              shadowOpacity: 0.03,
              shadowOffset: { height: 12, width: 0 },
              borderRadius: 12,
              gap: padding["2xl"],
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextInput
                onChangeText={(text) => setTitle(text)}
                placeholderTextColor={colors.greyLight}
                autoFocus={isAddingData ? true : false}
                placeholder="Title"
                style={{
                  color: colors.deepPurple,
                  fontFamily: "outfit-bold",
                  fontSize: fontSize.lg,
                }}
              />

              <TouchableOpacity
                onPress={handleCreateNote}
                style={{
                  padding: padding.sm,
                  backgroundColor: colors.greySuperLight,
                  borderRadius: 4,
                  aspectRatio: 1 / 1,
                }}
              >
                <Ionicons
                  name="checkmark-sharp"
                  size={16}
                  color={colors.greyMedium}
                />
              </TouchableOpacity>
            </View>

            <TextInput
              onChangeText={(text) => setContent(text)}
              placeholderTextColor={colors.greyLight}
              placeholder="What's Inside?"
              style={{
                fontFamily: "outfit-regular",
                color: colors.deepPurple,
                fontSize: fontSize.lg,
              }}
            />
          </View>
        </View>
      ) : (
        ""
      )}

      {notes ? (
        <FlatList
          contentContainerStyle={{
            gap: padding["2xl"],
            paddingHorizontal: padding["2xl"],
          }}
          data={notes}
          horizontal={false}
          renderItem={({ item, index }) => {
            return <Note data={item} key={index} />;
          }}
        />
      ) : (
        <View
          style={{
            paddingHorizontal: padding["2xl"],
          }}
        >
          <Text style={{ fontFamily: "outfit-regular", fontSize: fontSize.lg }}>
            Data is Loading...
          </Text>
        </View>
      )}
    </View>
  );
}
