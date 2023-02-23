import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { rollDice } from "../utils/rollParser";
import Result from "./Result";

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 12,
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
    flex: 1,
  },
});

//input: RollBase output from DiceRoller
export default function Results({ results }) {
  // TODO: Add clear function
  return (
    <ScrollView style={styles.container} aria-label="Result">
      <Text role="heading" style={{ fontSize: 24, textAlign: "center" }}>
        Result
      </Text>
      {results && (
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ fontSize: 40, fontWeight: "bold", textAlign: "center" }}>
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
                  <Text style={{ fontSize: 24 }}>{results.ops[groupIdx]}</Text>
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
