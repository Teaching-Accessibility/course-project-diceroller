import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  dieContainer: {
    minWidth: "22%",
    backgroundColor: "#B1DBEF",
    margin: 2,
    borderRadius: 5,
  },
  dieText: {
    fontSize: 25,
    textAlignVertical: "center",
    paddingVertical: 8,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default function Die({ type, selected, handlePress }) {
  // Add accessibility action 'increment'/'decrement' for the die action

  return (
    <View style={styles.dieContainer}>
      <TouchableOpacity onPress={() => handlePress(type)}>
        <Text
          style={{ ...styles.dieText, color: selected === type ? "white" : undefined }}
          numberOfLines={1}>
          {/* Eventually replace text with images */}
          {type}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
