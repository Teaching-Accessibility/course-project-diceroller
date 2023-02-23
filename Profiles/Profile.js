import React, { useReducer } from "react";
import { Text, View } from "react-native";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import SavedRoll from "../AdvancedRoller/SavedRoll";

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

export default function Profile({ profileToEdit }) {
  const [profile, profileDispatch] = useReducer(reducer, profileToEdit);

  return (
    <View>
      <View>
        <Text>{profile.name}</Text>
      </View>
      <View>
        <Text>Preset System Profiles</Text>
        <Text>{profile.system}</Text>
        {/* Make into a dropdown of presets */}
      </View>
      <View>
        <Text>Saved Rolls</Text>
        {profile.savedRolls.map((savedRoll) => (
          <SavedRoll key={savedRoll.id} {...savedRoll} />
        ))}
      </View>
    </View>
  );
}
