import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useProfiles } from "../Profiles/ProfileContext";

export default function History() {
  const { profile } = useProfiles();
  console.log(profile.history);
  return (
    <ScrollView style={{ padding: 12 }}>
      {profile.history.map((historyItem) => (
        <View
          key={historyItem.id}
          style={{
            height: 80,
            padding: 8,
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}>
          <Text style={{ fontSize: 24, flex: 0.8, textAlign: "left" }}>
            {historyItem.rollQuery}
          </Text>
          <View
            style={{
              height: "80%",
              borderLeftWidth: 2,
              marginHorizontal: 4,
              borderLeftColor: "grey",
            }}
          />
          <Text style={{ fontSize: 36, flex: 0.1, flexGrow: 0.2, textAlign: "center" }}>
            {historyItem.sum}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
