import React from "react";
import { ScrollView, View } from "react-native";
import { List, Text } from "react-native-paper";
import { useProfiles } from "../Profiles/ProfileContext";

const HistoryItem = ({ historyItem }) => {
  // <ListItem
  //   title={<Text style={{ fontSize: 24 }}>{historyItem.sum}</Text>}
  //   secondaryText={<Text style={{ fontSize: 20 }}>{historyItem.rollQuery}</Text>}
  // />
  return (
    <List.Item
      titleStyle={{ marginBottom: 6 }}
      title={
        <Text variant="headlineSmall" style={{ fontWeight: 600 }}>
          {historyItem.sum}
        </Text>
      }
      description={
        <Text variant="titleLarge" style={{ fontSize: 20 }}>
          {historyItem.rollQuery}
        </Text>
      }
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
