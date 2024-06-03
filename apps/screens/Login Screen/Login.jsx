import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors, fontSize, padding } from "../../../utils/Constant";
import Button from "../../components/Button";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/kidWithHorse.png")}
        style={{
          width: "100%",
          height: "40%",
          borderRadius: 32,
          objectFit: "cover",
        }}
      />

      <View
        style={{
          marginVertical: padding["2xl"],
          flexDirection: "column",
          gap: padding.lg,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: fontSize["3xl"],
            textAlign: "center",
            color: colors.blue,
          }}
          numberOfLines={2}
        >
          Edukasi Dini terhadap Anak Usia Muda Itu Asyik
        </Text>
        <Text
          style={{
            fontFamily: "outfit-regular",
            textAlign: "center",
            fontSize: fontSize.lg,
          }}
        >
          Persiapkan pendidikan dan edukasi anak menggunakan aplikasi yang kami
          sediakan.
        </Text>
      </View>

      <View style={{ gap: padding.lg }}>
        <Button text={"Login"} filled={true} />
        <Button text={"Register"} filled={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: padding["2xl"],
    justifyContent: "center",
  },
});

export default Login;
