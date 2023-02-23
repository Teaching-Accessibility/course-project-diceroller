import { ListItem } from "@react-native-material/core";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useProfiles } from "../Profiles/ProfileContext";

const HistoryItem = ({ historyItem }) => {
  return (
    <ListItem
      title={<Text style={{ fontSize: 24 }}>{historyItem.sum}</Text>}
      secondaryText={<Text style={{ fontSize: 20 }}>{historyItem.rollQuery}</Text>}
    />
  );
};

export default function History() {
  const { profile } = useProfiles();
  // Add dropdown to view individual results
  return (
    <ScrollView>
      {profile.history.map((historyItem) => (
        <HistoryItem key={historyItem.id} historyItem={historyItem} />
      ))}
    </ScrollView>
  );
}
