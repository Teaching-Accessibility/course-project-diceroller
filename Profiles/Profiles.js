import React from "react";
import { Text, View } from "react-native";

// Create copy of profile to safely edit
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "RENAME_PROFILE":
      return { ...state, name: action.payload.name };
    case "ADD_SAVED_ROLL":
      const newRoll = { ...action.payload.newRoll, id: uuid() };
      return { ...state, savedRolls: [...state.savedRolls, newRoll] };
    case "REMOVED_SAVED_ROLL":
      const newSavedRolls = state.savedRolls.filter((roll) => roll.id !== action.payload.id);
      return { ...state, savedRolls: newSavedRolls };
    case "ADD_HISTORY":
      const newHistoryEl = { ...action.payload.roll, id: uuid() };
      return { ...state, history: [...state.history, newHistoryEl] };
    case "REMOVED_SAVED_ROLL":
      const newHistory = state.history.filter((el) => el.id !== action.payload.id);
      return { ...state, history: newHistory };
    case "SET_DICE":
      return { ...state, dice: action.payload.dice };
    default:
      throw `Unknown action type: ${action.type}`;
  }
};

export default function Profiles() {
  return (
    <View>
      <Text>Profiles</Text>
    </View>
  );
}
