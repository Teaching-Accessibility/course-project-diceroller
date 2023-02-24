import React, { useReducer, useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import { Button, Text } from "react-native-paper";
import { useProfiles } from "../Profiles/ProfileContext";
import rollParser, { rollDice, rollParserFmt } from "../utils/rollParser";
import Die from "./Die";
import Results from "./Results";
import RollButton from "./RollButton";

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
  },
  clearButton: {
    marginLeft: 8,
    // flex: 0.2,
  },
  rollDisplayContainer: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 8,
    justifyContent: "center",
    width: "100%",
    marginTop: 16,
    marginBottom: 12,
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
  const [selectedDie, setSelectedDie] = useState(profile.dice[0]);
  const initialQuery = profile.dice.map((die) => ({ type: die, count: 0 }));
  const [rollQuery, setRollQuery] = useState(() => initialQuery);
  const [results, setResults] = useState();

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
    const resultsRoll = rollParserFmt(rollString);
    if (resultsRoll !== null) {
      profilesDispatch({
        type: "HISTORY_PUSH",
        payload: { roll: resultsRoll, profileId: profile.id },
      });
      setResults(resultsRoll);
    }
  };
  const handleDiePress = (type) => {
    updateRollQuery(type, 1);
    setSelectedDie(type);
  };
  const handleClear = () => {
    setRollQuery(initialQuery);
    setResults(null);
  };

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
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View style={styles.rollDisplayContainer}>
            <Text variant="titleLarge" aria-label="Roll formula">
              {rollString ? (
                rollString
              ) : (
                <Text variant="titleLarge" style={{ fontStyle: "italic" }}>
                  Enter a formula
                </Text>
              )}
            </Text>
          </View>
          <View style={{ marginBottom: 16, flexDirection: "row", justifyContent: "space-between" }}>
            <Button mode="outlined" uppercase>
              Save Roll
            </Button>
            <Button style={styles.clearButton} mode="outlined" uppercase onPress={handleClear}>
              Clear
            </Button>
          </View>
        </View>
        <Results results={results} />
        <RollButton handlePress={handleRoll} />
        <View>
          <Text variant="labelMedium" style={{ marginVertical: 4, textAlign: "center" }}>
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
