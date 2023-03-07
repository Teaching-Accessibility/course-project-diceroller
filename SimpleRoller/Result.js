import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const styles = StyleSheet.create({
  rollsContainer: {
    marginHorizontal: 6,
  },
  rollGroupDie: {
    width: "auto",
    flexDirection: "row",
    padding: 6,
    marginBottom: 6,
    justifyContent: "center",
    borderBottomWidth: 2,
    alignItems: "center",
    // alignSelf: "center",
  },
  rollGroupNumber: {
    width: "auto",
    flexDirection: "row",
    padding: 6,
    justifyContent: "space-evenly",
    // borderBottomWidth: 2,
    alignItems: "center",
  },
});

export default function Result({ rollGroup, groupIdx }) {
  return (
    <View
      style={[styles.rollsContainer, { flexGrow: rollGroup.type === "die" ? 5 : 1 }]}
      accessible>
      {rollGroup.type === "die" ? (
        <>
          <View style={styles.rollGroupDie}>
            {rollGroup.rolls.map((roll, rollIdx) => (
              <Text
                variant="titleLarge"
                key={"roll" + groupIdx + rollIdx}
                style={{ marginHorizontal: 4 }}>
                {roll.value}
                {rollIdx !== rollGroup.rolls.length - 1 && ", "}
              </Text>
            ))}
          </View>
          <Text variant="titleMedium" style={{ textAlign: "center" }}>
            {rollGroup.query}
          </Text>
        </>
      ) : (
        <View style={styles.rollGroupNumber}>
          <Text variant="headlineSmall">{rollGroup.sum}</Text>
        </View>
      )}
    </View>
  );
}
