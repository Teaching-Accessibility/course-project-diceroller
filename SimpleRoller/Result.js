import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  rollsContainer: {
    // minWidth: "25%",
    flexGrow: 1,
    marginHorizontal: 6,
  },
  rollGroupDie: {
    width: "auto",
    flexDirection: "row",
    padding: 6,
    marginBottom: 6,
    justifyContent: "space-evenly",
    borderBottomWidth: 2,
    alignItems: "center",
    // alignSelf: "center",
  },
  rollGroupNumber: {
    width: "auto",
    flexDirection: "row",
    padding: 6,
    marginBottom: 6,
    justifyContent: "space-evenly",
    // borderBottomWidth: 2,
    alignItems: "center",
  },
});

export default function Result({ rollGroup, groupIdx }) {
  return (
    <View style={styles.rollsContainer}>
      {rollGroup.type === "die" ? (
        <>
          <View style={styles.rollGroupDie}>
            {rollGroup.rolls.map((roll, rollIdx) => (
              <Text key={"roll" + groupIdx + rollIdx} style={{ fontSize: 22, marginHorizontal: 4 }}>
                {roll.value}
                {rollIdx !== rollGroup.rolls.length - 1 && ", "}
              </Text>
            ))}
          </View>
          <Text style={{ textAlign: "center", fontSize: 20, width: "100%" }}>
            {rollGroup.query}
          </Text>
        </>
      ) : (
        <View style={styles.rollGroupNumber}>
          <Text style={{ fontSize: 28 }}>{rollGroup.sum}</Text>
        </View>
      )}
    </View>
  );
}
