import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useProfile } from "../Profiles/ProfileContext";
import Die from "./Die";
import Result from "./Result";
import RollButton from "./RollButton";

const styles = StyleSheet.create({
  container: {
    padding: 8,
    height: "100%",
  },
  rollDisplayContainer: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 8,
    height: 80,
    marginTop: 12,
    justifyContent: "center",
    // alignSelf: 'center',
  },
  rollDisplayText: {
    fontSize: 28,
    textAlign: "center",
    includeFontPadding: false,
  },

  diceContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default function SimpleRoller() {
  // rollFormula is what is displayed
  const [rollFormula, setRollFormula] = useState("3d6");
  // rollQuery is what is actually confirmed
  const [rollQuery, setRollQuery] = useState("");
  const { profile } = useProfile();

  const dice = ["d4", "d6", "d8", "d10", "d12", "d20", "flat"];
  const handlePress = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.rollDisplayContainer}>
        <Text style={styles.rollDisplayText} aria-label="Roll formula">
          {rollFormula}
        </Text>
      </View>
      <Result rollQuery={rollQuery} />
      <RollButton handlePress={handlePress} />
      <View>
        <Text style={{ fontSize: 18, marginVertical: 4, textAlign: "center" }}>{profile.name}</Text>
        <View style={styles.diceContainer}>
          {dice.map((die) => (
            <Die key={die} type={die} />
          ))}
        </View>
      </View>
    </View>
  );
}
