import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";

const styles = StyleSheet.create({
  rollButtonContainer: {
    borderRadius: 10,
    padding: 8,
    marginVertical: 12,
    flex: 1,
    justifyContent: "center",
  },
  button: {
    fontSize: 30,
    color: "#fff",
    // height: "100%",
  },
});

export default function RollButton({ handlePress }) {
  return (
    <View style={styles.rollButtonContainer}>
      <Button
        mode="contained"
        uppercase
        onPress={handlePress}
        labelStyle={{ fontSize: 24, paddingTop: 12, paddingBottom: 4 }}>
        Roll
      </Button>
    </View>
  );
  return (
    <View
      accessibilityHint="Execute current dice formula"
      style={{ marginTop: "auto", marginBottom: "auto" }}>
      <TouchableOpacity
        onPress={handlePress}
        style={styles.rollButtonContainer}
        aria-label="Roll"
        role="button">
        <Text style={styles.rollButtonText}>Roll</Text>
      </TouchableOpacity>
    </View>
  );
}
