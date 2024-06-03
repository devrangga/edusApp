import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { colors, fontSize, padding } from "../../utils/Constant";
import { Ionicons } from "@expo/vector-icons";
import GlobalApi from "../../utils/GlobalApi";

export default function Note({ data }) {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [note, setNote] = useState(data.note);

  const handleDelete = async () => {
    try {
      await GlobalApi.deleteNote(data.title);
      console.log("Note deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    if (isEdit) {
      try {
        await GlobalApi.updateNote(title, note, data.id).then((res) =>
          console.log(res)
        );
        console.log(isEdit);
      } catch (error) {
        console.log(error);
        console.log(title);
        console.log(note);
      } finally {
        console.log(isEdit);
        setIsEdit((prev) => !prev);
      }
    } else {
      setIsEdit((prev) => !prev);
    }
  };

  return (
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
          editable={isEdit}
          value={title}
          style={{
            color: colors.deepPurple,
            fontFamily: "outfit-bold",
            fontSize: fontSize.lg,
          }}
        />

        <View style={{ flexDirection: "row-reverse", gap: padding.xl }}>
          <TouchableOpacity
            onPress={handleDelete}
            style={{
              padding: padding.sm,
              backgroundColor: colors.greySuperLight,
              borderRadius: 4,
              aspectRatio: 1 / 1,
            }}
          >
            <Ionicons name="trash-sharp" size={16} color={colors.greyMedium} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleUpdate}
            style={{
              padding: padding.sm,
              backgroundColor: isEdit ? colors.blue : colors.greySuperLight,
              borderRadius: 4,
              aspectRatio: 1 / 1,
            }}
          >
            <Ionicons
              name={isEdit ? "checkmark-sharp" : "pencil"}
              size={16}
              color={isEdit ? colors.white : colors.greyMedium}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        autoFocus={isEdit}
        editable={isEdit}
        onChangeText={(text) => setNote(text)}
        value={note}
        style={{
          fontFamily: "outfit-regular",
          color: colors.deepPurple,
          fontSize: fontSize.lg,
        }}
      />
    </View>
  );
}
