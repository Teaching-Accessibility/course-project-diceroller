import React from "react";
import { Text, View } from "react-native";
import { v4 as uuid } from "uuid";
import { useProfiles } from "./ProfileContext";

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

export default function Profiles() {
  const { profiles } = useProfiles();
  return (
    <View>
      <Text>Profiles</Text>
    </View>
  );
}
