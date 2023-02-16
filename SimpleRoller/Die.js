import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  dieContainer: {
    flex: 1,
    backgroundColor: "#B1DBEF",
    marginHorizontal: 2,
    borderRadius: 5,
  },
  dieText: {
    fontSize: 25,
    textAlignVertical: "center",
    paddingVertical: 8,
    marginLeft: "auto",
    marginRight: "auto",
    // textAlign: 'center',
  },
});

export default function Die({ type }) {
  // Add accessibility action 'increment'/'decrement' for the die action
  return (
    <View style={styles.dieContainer}>
      <TouchableOpacity>
        <Text style={styles.dieText} numberOfLines={1}>
          {/* Eventually replace text with images */}
          {type}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
