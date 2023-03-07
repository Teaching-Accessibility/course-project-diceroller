import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { rollDice } from "../utils/rollParser";
import Result from "./Result";

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 10,
    flex: 1,
    flexGrow: 4,
  },
});

//input: RollBase output from DiceRoller
export default function Results({ results }) {
  // TODO: Add clear function
  return (
    <View style={styles.container}>
      <Text
        variant="headlineMedium"
        role="heading"
        style={{ textAlign: "center", marginBottom: 12 }}>
        Result
      </Text>
      {results && (
        <>
          <Text
            variant="displaySmall"
            style={{ textAlign: "center", fontWeight: "bold" }}
            aria-live="assertive"
            accessibilityLiveRegion="assertive">
            {results.sum}
          </Text>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
              flex: 1,
            }}>
            {results.diceGroups.map((rollGroup, groupIdx) => (
              <React.Fragment key={"rollGroup" + groupIdx}>
                <Result rollGroup={rollGroup} groupIdx={groupIdx} />
                {results.ops && groupIdx < results.diceGroups.length - 1 && (
                  <Text variant="titleLarge">{results.ops[groupIdx]}</Text>
                )}
              </React.Fragment>
            ))}
          </View>
        </>
      )}
    </View>
  );
}
