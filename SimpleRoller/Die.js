import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  content: {
    // flexGrow: 1,
    // backgroundColor: "#B1DBEF",
    // margin: 2,
    // borderRadius: 5,
  },
});

export default function Die({ type, selected, handlePress }) {
  const theme = useTheme();
  // Add accessibility action 'increment'/'decrement' for the die action

  return (
    <Button
      mode="contained"
      uppercase
      buttonColor={selected && theme.colors.primaryContainer}
      onPress={() => handlePress(type)}
      style={[styles.content, { borderRadius: 5, width: "23%" }]}>
      <Text
        variant="titleMedium"
        style={{ color: selected ? theme.colors.onPrimaryContainer : theme.colors.onPrimary }}>
        {type}
      </Text>
    </Button>
  );
}
