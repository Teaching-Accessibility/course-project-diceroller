import React from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // TODO: More dynamic sizing for different screen sizes/orientations
  navButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    margin: 6,
    backgroundColor: "#0078B4",
    flex: 1,
    justifyContent: "center",
  },
  navButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

const NavigationButton = ({ navigation, name }) => {
  // Replace with custom button so that we can increase height
  return (
    <View style={{ flex: 1 }} accessibilityHint={`Navigate to ${name}`}>
      <TouchableOpacity
        onPress={() => navigation.navigate(name)}
        style={styles.navButtonContainer}
        aria-label={name}
        role="button">
        <Text style={styles.navButtonText}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Home({ navigation }) {
  return (
    <View
      style={{
        flexDirection: "column",
        height: "100%",
      }}>
      <NavigationButton navigation={navigation} name="Simple Roller" />
      <NavigationButton navigation={navigation} name="Advanced Roller" />
      <NavigationButton navigation={navigation} name="History" />
      <NavigationButton navigation={navigation} name="Profiles" />
      <NavigationButton navigation={navigation} name="Settings" />
    </View>
  );
}
