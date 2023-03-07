import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Appbar, List, Text } from "react-native-paper";
import { useProfiles } from "../Profiles/ProfileContext";

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
  }})

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
  const { profile, profilesDispatch } = useProfiles();
  const clearHistory = () => {
    profilesDispatch({
      type: "HISTORY_CLEAR",
      payload: { profileId: profile.id },
    });
  };
  // Add dropdown to view individual results
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="History" />
        <Appbar.Action
          icon="delete-empty"
          size={28}
          accessibilityLabel="Clear history"
          onPress={clearHistory}
          disabled={!profile.history.length}
        />
      </Appbar.Header>
      <ScrollView>
        {profile.history.length ? (
          <View style={{flexDirection: "column-reverse"}}>
            {profile.history.map((historyItem) => (
              <HistoryItem key={historyItem.id} historyItem={historyItem} />
            ))}
          </View>
        ) : (
          <Text variant="headlineLarge" style={{ textAlign: "center", marginTop: 16 }}>
            History Empty
          </Text>
        )}
      </ScrollView>
    </View>
    
  );
}
