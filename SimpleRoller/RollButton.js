import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  rollButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    padding: 8,
    backgroundColor: "#0078B4",
    height: 180,
    justifyContent: "center",
  },
  rollButtonText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

export default function RollButton({ handlePress }) {
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
