import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { rollDice } from "../utils/rollParser";

const styles = StyleSheet.create({
  container: {
    marginTop: "auto",
    marginBottom: "auto",
    padding: 12,
    // elevation: 6,
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
    minHeight: 200,
  },
  rollsContainer: {
    // Width should be determined by the amount of items inside
    maxWidth: 200,
    width: "100%",
  },
  rollGroup: {
    flexDirection: "row",
    padding: 6,
    marginBottom: 6,
    justifyContent: "space-between",
    borderBottomWidth: 2,
    width: "100%",
    alignSelf: "center",
  },
});

export default function Result({ rollQuery }) {
  const [result, setResult] = useState();
  useEffect(() => {
    setResult(rollDice("3d6"));
  }, [rollQuery]);
  return (
    <View style={styles.container}>
      {result && (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 24, textAlign: "center" }}>Result</Text>
          <Text style={{ fontSize: 40, fontWeight: "bold", textAlign: "center" }}>
            {result.sum}
          </Text>
          {/* Eventually, every dice group gets its own roll container */}
          <View style={styles.rollsContainer}>
            <View style={styles.rollGroup}>
              {result.rolls.map((roll, idx) => (
                <Text key={idx} style={{ fontSize: 22 }}>
                  {roll}
                </Text>
              ))}
            </View>
            <Text style={{ textAlign: "center", fontSize: 18 }}>{result.query}</Text>
          </View>
        </View>
      )}
    </View>
  );
}
