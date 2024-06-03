import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { colors, fontSize, padding } from "../../../utils/Constant";
import UserStatistics from "../../components/UserStatistics";
import UserSettings from "../../components/UserSettings";

const statistics = [
  { number: "630", tag: "Followers" },
  { number: "1.3k", tag: "Following" },
  { number: "324", tag: "Posts" },
];

const settings = [
  {
    icon: "user",
    title: "Change My Profile",
    subtitle: "Modify Your Preferences Now!",
  },
  {
    icon: "setting",
    title: "Settings",
    subtitle: "Exerting our Technologies.",
  },
  {
    icon: "logout",
    title: "Log Out",
    subtitle: "Sign Out from your account.",
  },
];

export default function UserScreen() {
  const { user } = useUser();
  return (
    <View
      style={{ backgroundColor: colors.white, height: "100%", gap: padding.xl }}
    >
      <Text
        style={{
          fontFamily: "outfit-regular",
          fontSize: fontSize.lg,
          alignItems: "center",
          textAlign: "center",
        }}
      >
        User Profile
      </Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: colors.white,
            borderRadius: 100,
            borderWidth: 3,
            borderColor: colors.purple,
            width: 125,
            height: 125,
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image
            source={{ uri: user.imageUrl }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              backgroundColor: colors.greyMedium,
            }}
          />
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: padding.md,
        }}
      >
        <Text
          style={{
            color: colors.deepPurple,
            fontFamily: "outfit-bold",
            fontSize: fontSize["xl"],
          }}
        >
          {user?.firstName}
        </Text>

        <View style={{ flexDirection: "row", gap: padding.lg }}>
          <Text
            style={{
              color: colors.orange,
              fontFamily: "outfit-medium",
              fontSize: fontSize["lg"],
            }}
          >
            Fullstack JS Dev
          </Text>

          <View
            style={{
              height: "100%",
              width: 2,
              backgroundColor: colors.greyLight,
            }}
          />

          <Text
            style={{
              color: colors.red,
              fontFamily: "outfit-medium",
              fontSize: fontSize["lg"],
            }}
          >
            Full-Time
          </Text>
        </View>

        <Text
          style={{
            color: colors.blueDark,
            fontFamily: "outfit-regular",
            fontSize: fontSize["md"],
          }}
        >
          {user?.emailAddresses?.toString()}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: padding["3xl"],
          paddingHorizontal: padding["3xl"],
          paddingVertical: padding["2xl"],
          backgroundColor: colors.greySuperLight,
          borderRadius: padding.lg,
        }}
      >
        {statistics.map((item, index) => (
          <UserStatistics key={index} number={item.number} tag={item.tag} />
        ))}
      </View>

      <View style={{ gap: padding.xl }}>
        {settings.map((item, index) => (
          <UserSettings
            key={index}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
          />
        ))}
      </View>
    </View>
  );
}
