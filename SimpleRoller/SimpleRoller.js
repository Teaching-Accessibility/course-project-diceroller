import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import { useProfile } from "../Profiles/ProfileContext";
import { rollDice } from "../utils/rollParser";
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
  const dice = ["d4", "d6", "d8", "d10", "d12", "d20", "flat"];
  const [selectedDie, setSelectedDie] = useState(null);
  const [roll, setRoll] = useState(() => {
    const values = {};
    dice.forEach((die) => {
      values[die] = 0;
    });
    return values;
  });
  // const [rollFormula, setRollFormula] = useState("3d6");
  const [result, setResult] = useState();
  const { profile } = useProfile();

  const exampleRoll = [
    { die: "d6", count: 3 },
    { die: "d20", count: 2, preModifiers: ["advantage"] },
    { die: "d4", count: -1, preModifiers: ["reroll-lowest"] },
  ];
  const rollFormula = (() => {})();

  const swipeUp = Gesture.Fling()
    .direction(Directions.UP)
    .onEnd((e) => {
      if (e.numberOfPointers === 1) {
      } else {
      }
    });
  const swipeDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .numberOfPointers(2)
    .onEnd((e) => {
      if (e.numberOfPointers === 1) {
      } else {
      }
    });

  const handlePress = () => {
    setResult(rollDice(rollFormula));
  };
  const handleDiePress = (type) => {
    setSelectedDie(type);
  };

  const gesture = Gesture.Exclusive(swipeUp, swipeDown);

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container} onResponderStart={() => console.log("Hey there")}>
        <View style={styles.rollDisplayContainer}>
          <Text style={styles.rollDisplayText} aria-label="Roll formula">
            {"3d6 + 4 + 6d12"}
          </Text>
        </View>
        <Result result={result} />
        <RollButton handlePress={handlePress} />
        <View>
          <Text style={{ fontSize: 18, marginVertical: 4, textAlign: "center" }}>
            {profile.name}
          </Text>
          <View style={styles.diceContainer}>
            {dice.map((die) => (
              <Die key={die} type={die} selected={selectedDie} handlePress={handleDiePress} />
            ))}
          </View>
        </View>
      </View>
    </GestureDetector>
  );
}
