import React, { useReducer, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import "react-native-get-random-values";
import {
  Button,
  Checkbox,
  List,
  Modal,
  Portal,
  RadioButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { v4 as uuid } from "uuid";
import presets from "./presets";
import { useProfiles } from "./ProfileContext";
import SavedRollEdit from "./SavedRollEdit";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";

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

const initDice = [
  { type: "d20", checked: false },
  { type: "d12", checked: false },
  { type: "d10", checked: false },
  { type: "d8", checked: false },
  { type: "d6", checked: false },
  { type: "d4", checked: false },
  { type: "d100", checked: false },
  { type: "flat", checked: false },
  { type: "fate", checked: false },
];

export default function Profile({ profile }) {
  // const [profile, profilesDispatch] = useReducer(reducer, profileToEdit);
  const {
    profile: activeProfile,
    profiles,
    profilesDispatch,
    switchCurrentProfile,
  } = useProfiles();
  const [selectedSavedRoll, setSelectedSavedRoll] = useState(null);
  const [name, setName] = useState(profile.name);
  const [system, setSystem] = useState(profile.system);
  const theme = useTheme();
  const [dice, setDice] = useState(() =>
    initDice.map((die) => ({ ...die, checked: profile.dice.includes(die.type) }))
  );

  const handleNameChange = (value) => setName(value);
  const handleSystemChange = (value) => setSystem(value);

  const handleNameBlur = () =>
    profilesDispatch({ type: "UPDATE_PROFILE", payload: { ...profile, name } });
  const handleSystemBlur = () =>
    profilesDispatch({ type: "UPDATE_PROFILE", payload: { ...profile, system } });

  const handleDiceChange = (type) => {
    setDice((prevDice) => {
      const newDice = prevDice.map((die) =>
        die.type === type ? { ...die, checked: !die.checked } : die
      );
      const diceList = [];
      newDice.forEach((die) => die.checked && diceList.push(die.type));
      profilesDispatch({ type: "UPDATE_PROFILE", payload: { ...profile, dice: diceList } });
      return newDice;
    });
  };

  const handleDelete = () => {
    if (profiles.length !== 1) {
      profilesDispatch({ type: "REMOVE_PROFILE", payload: { id: profile.id } });
    }
  };

  const isActiveProfile = activeProfile?.id === profile?.id;

  return (
    <ScrollView style={{ padding: 16 }}>
      <Button
        onPress={() => switchCurrentProfile(profile.id)}
        mode="contained"
        disabled={isActiveProfile}>
        Activate
      </Button>
      <View style={{ marginVertical: 16 }}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={handleNameChange}
          onBlur={handleNameBlur}
        />
      </View>
      <View style={{ marginBottom: 16 }}>
        <TextInput
          label="System"
          value={system}
          onChangeText={handleSystemChange}
          onBlur={handleSystemBlur}
        />
      </View>
      <View style={{ marginBottom: 16, borderWidth: 1 }}>
        <List.Accordion
          title="Saved Rolls"
          accessibilityLabel="Saved rolls accordion"
          accessibilityHint="Hey there">
          <List.Item
            title="Add new saved roll"
            onPress={() => setSelectedSavedRoll({ new: true })}
            style={styles.listItem}
            left={(props) => <List.Icon {...props} icon="plus-circle-outline" />}
            accessibilityLabel="Add new saved roll"
            accessibilityHint="Opens a modal for creating a new saved roll"
          />
          {profile.savedRolls.map((savedRoll) => (
            <List.Item
              key={savedRoll.id}
              title={savedRoll.name}
              description={savedRoll.dice}
              onPress={() => setSelectedSavedRoll(savedRoll)}
              style={styles.listItem}
              accessibilityLabel={`Edit saved roll ${savedRoll.name}`}
            />
          ))}
        </List.Accordion>
      </View>
      <View style={{ borderWidth: 1, marginBottom: 16 }}>
        <List.Accordion title="Dice">
          {dice.map((die) => (
            <List.Item
              key={die.type}
              style={styles.listItem}
              onPress={() => handleDiceChange(die.type)}
              title={die.type}
              right={() => <Checkbox status={die.checked ? "checked" : "unchecked"} />}
              accessibilityLabel={`${die.checked ? "Remove" : "Add"} ${die.type} ${
                die.checked ? "from" : "to"
              } profile`}
            />
          ))}
        </List.Accordion>
      </View>
      <View style={{ marginLeft: "auto", marginRight: "auto" }}>
        <MCIcons.Button
          onPress={handleDelete}
          name="delete"
          size={28}
          backgroundColor={theme.colors.primary}
          accessibilityLabel="Delete profile"
          style={{ marginRight: 4 }}>
          Remove
        </MCIcons.Button>
      </View>
      <SavedRollEdit
        visible={Boolean(selectedSavedRoll)}
        savedRoll={selectedSavedRoll}
        handleDismiss={() => setSelectedSavedRoll(null)}
      />
    </ScrollView>
  );
}
