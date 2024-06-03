import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Game from "../../components/Game";
import { colors, fontSize, padding } from "../../../utils/Constant";
import GlobalApi from "../../../utils/GlobalApi";

export default function GameScreen() {
  const [games, setGames] = useState();
  useEffect(() => {
    const fetchGames = () => {
      GlobalApi.getGames()
        .then((res) => setGames(res.games))
        .catch((err) => console.log(err));
    };
    fetchGames();
  }, []);
  return (
    <View style={{ gap: padding.lg }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontFamily: "outfit-regular", fontSize: fontSize.lg }}>
          Top Games
        </Text>
        <Text style={{ fontFamily: "outfit-bold", fontSize: fontSize["2xl"] }}>
          This Month
        </Text>
      </View>

      <FlatList
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        data={games}
        horizontal
        contentContainerStyle={{ gap: padding["3xl"] }}
        renderItem={({ item, index }) => {
          return (
            <Game
              key={index}
              uri={item.gameImage.url}
              title={item.title}
              subtitle={item.subtitle}
              index={index}
            />
          );
        }}
      />
    </View>
  );
}
