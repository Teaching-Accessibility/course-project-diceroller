import React, { useReducer, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import { useProfiles } from "../Profiles/ProfileContext";
import rollParser, { rollDice, rollParserFmt } from "../utils/rollParser";
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
    flexWrap: "wrap",
    width: "100%",
  },
});

export default function SimpleRoller() {
  const { profile, profilesDispatch } = useProfiles();
  const [selectedDie, setSelectedDie] = useState(null);
  const initialQuery = profile.dice.map((die) => ({ type: die, count: 0 }));
  const [rollQuery, setRollQuery] = useState(() => initialQuery);
  const [result, setResult] = useState();

  // Die is an element from dice, amount is a positive or negative #
  const updateRollQuery = (die, amount) => {
    setRollQuery((prev) =>
      prev.map((queryDie) => {
        if (queryDie.type === die) {
          const newCount = queryDie.count + amount;
          return { ...queryDie, count: newCount };
        } else {
          return queryDie;
        }
      })
    );
  };

  // Get dice to the left and right of current
  const getAdjacentDie = () => {
    const dice = profile.dice;
    const idx = dice.findIndex((die) => die === selectedDie);
    const leftIdx = idx === 0 ? dice.length - 1 : idx - 1;
    const rightIdx = idx === dice.length - 1 ? 0 : idx + 1;
    return { left: dice[leftIdx], right: dice[rightIdx] };
  };

  // Handle increment / decrement
  const increment1 = Gesture.Fling()
    .direction(Directions.UP)
    .numberOfPointers(1)
    .onEnd(() => {
      updateRollQuery(selectedDie, 1);
    });
  const increment5 = Gesture.Fling()
    .direction(Directions.UP)
    .numberOfPointers(2)
    .onEnd(() => {
      updateRollQuery(selectedDie, 5);
    });
  const decrement1 = Gesture.Fling()
    .direction(Directions.DOWN)
    .numberOfPointers(1)
    .onEnd((e) => {
      updateRollQuery(selectedDie, -1);
    });
  const decrement5 = Gesture.Fling()
    .direction(Directions.DOWN)
    .numberOfPointers(2)
    .onEnd((e) => {
      updateRollQuery(selectedDie, -5);
    });

  // Handle die switching
  const navigateLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      setSelectedDie(getAdjacentDie().left);
    });
  const navigateRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      setSelectedDie(getAdjacentDie().right);
    });

  const handleRoll = () => {
    const resultRoll = rollParserFmt(rollString);
    if (resultRoll !== null) {
      profilesDispatch({
        type: "HISTORY_PUSH",
        payload: { roll: resultRoll, profileId: profile.id },
      });
      setResult(resultRoll);
    }
  };
  const handleDiePress = (type) => {
    setSelectedDie(type);
  };
  // console.log(profile.history);

  const gesture = Gesture.Race(
    increment5,
    decrement5,
    increment1,
    decrement1,
    navigateLeft,
    navigateRight
  );

  // Create string to display in text field
  const rollString = (() => {
    let rollStr = "";

    rollQuery.forEach((die, idx) => {
      if (die.count) {
        // Add +/- sign to start
        if (rollStr !== "" || die.count < 0) {
          rollStr += die.count < 0 ? " - " : " + ";
        }
        rollStr += Math.abs(die.count) + (die.type === "flat" ? "" : die.type);
      }
    });
    return rollStr;
  })();

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container} onResponderStart={() => console.log("Hey there")}>
        <View style={styles.rollDisplayContainer}>
          <Text style={styles.rollDisplayText} aria-label="Roll formula">
            {rollString}
          </Text>
        </View>
        <Result result={result} />
        <RollButton handlePress={handleRoll} />
        <View>
          <Text style={{ fontSize: 18, marginVertical: 4, textAlign: "center" }}>
            {profile.name}
          </Text>
          <View style={styles.diceContainer}>
            {profile.dice.map((die) => (
              <Die key={die} type={die} selected={selectedDie} handlePress={handleDiePress} />
            ))}
          </View>
        </View>
      </View>
    </GestureDetector>
  );
}
