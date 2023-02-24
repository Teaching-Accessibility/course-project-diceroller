import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { rollDice } from "../utils/rollParser";
import Result from "./Result";

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    padding: 12,
    borderWidth: 2,
    borderRadius: 10,
    flex: 1,
    flexGrow: 2,
    justifyContent: "space-between",
  },
});

//input: RollBase output from DiceRoller
export default function Results({ results }) {
  // TODO: Add clear function
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" role="heading" style={{ textAlign: "center" }}>
        Result
      </Text>
      {results && (
        <View style={{ alignItems: "center" }}>
          <Text variant="displayMedium" style={{ textAlign: "center", fontWeight: "bold" }}>
            {results.sum}
          </Text>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
            }}>
            {results.diceGroups.map((rollGroup, groupIdx) => (
              <React.Fragment key={"rollGroup" + groupIdx}>
                <Result rollGroup={rollGroup} groupIdx={groupIdx} />
                {results.ops && groupIdx < results.diceGroups.length - 1 && (
                  <Text variant="headlineMedium">{results.ops[groupIdx]}</Text>
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      )}
      <Button mode="contained">History</Button>
    </View>
  );
}
