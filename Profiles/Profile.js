import React, { useReducer, useState } from "react";
import { StyleSheet, View } from "react-native";
import "react-native-get-random-values";
import { List, Modal, Portal, RadioButton, Text, TextInput } from "react-native-paper";
import { v4 as uuid } from "uuid";
import presets from "./presets";
import { useProfiles } from "./ProfileContext";
import SavedRollEdit from "./SavedRollEdit";

// Create copy of profile to safely edit
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "RENAME_PROFILE":
      // {name}
      return { ...state, name: action.payload.name };
    case "ROLL_PUSH":
      // {roll}
      return {
        ...state,
        savedRolls: [...state.savedRolls, { ...action.payload.roll, id: uuid() }],
      };
    case "ROLL_REMOVE":
      // {rollId}
      return {
        ...state,
        savedRolls: state.savedRolls.filter((roll) => roll.id !== action.payload.rollId),
      };
    case "SET_DICE":
      // {dice}
      return { ...state, dice: action.payload.dice };
    default:
      throw `Unknown action type: ${action.type}`;
  }
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "grey",
  },
});

export default function Profile({ profile }) {
  // const [profile, profilesDispatch] = useReducer(reducer, profileToEdit);
  const { profilesDispatch } = useProfiles();
  const [selectedSavedRoll, setSelectedSavedRoll] = useState(null);

  const handleNameChange = (value) =>
    profilesDispatch({ type: "RENAME_PROFILE", payload: { name: value } });

  const handleDiceChange = (value) => {
    profilesDispatch({ type: "SET_DICE", payload: { dice: value } });
  };

  return (
    <View style={{ padding: 16 }}>
      <View>
        <TextInput label="Name" value={profile.name} onChangeText={handleNameChange} />
      </View>
      <View style={{ marginVertical: 16, borderWidth: 1 }}>
        <List.Accordion title="Saved Rolls">
          <List.Item
            title="Add new saved roll"
            onPress={() => setSelectedSavedRoll({ new: true })}
            style={styles.listItem}
            left={(props) => <List.Icon {...props} icon="plus-circle-outline" />}
          />
          {profile.savedRolls.map((savedRoll) => (
            <List.Item
              key={savedRoll.id}
              title={savedRoll.name}
              description={savedRoll.dice}
              onPress={() => setSelectedSavedRoll(savedRoll)}
              style={styles.listItem}
            />
          ))}
        </List.Accordion>
      </View>
      <SavedRollEdit
        visible={Boolean(selectedSavedRoll)}
        savedRoll={selectedSavedRoll}
        handleDismiss={() => setSelectedSavedRoll(null)}
      />
    </View>
  );
}
