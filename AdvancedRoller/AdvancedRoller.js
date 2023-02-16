import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from "react-native";
import { useProfile } from "../Profiles/ProfileContext";
import RollButton from "../SimpleRoller/RollButton";
import SavedRoll from "./SavedRoll";

const styles = StyleSheet.create({
  container: {
    padding: 8,
    // height: '100%',
  },
});

export default function AdvancedRoller() {
  const { profile } = useProfile();
  const [rollFormula, setRollFormula] = useState("3d6");
  const [rollQuery, setRollQuery] = useState("");

  // Use below to track what is activated and what isn't
  // const [preRollModifiers, setPreRollModifiers] = useState(profile.preRollModifiers);
  if (!profile) {
    return (
      <View>
        <Text style={{ fontSize: 30 }}>Loading...</Text>
      </View>
    );
  }

  const handleRollModPress = () => {};
  const handleDPress = () => {
    setRollFormula((prev) => (prev += "d"));
  };
  const onChangeRollFormula = (text) => {
    // Prevent certain inputs when it doesn't make sense, like can't do 2 d in a row
    setRollFormula(text);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          marginBottom: 8,
          height: 80,
        }}>
        <TextInput
          value={rollFormula}
          onChangeText={onChangeRollFormula}
          inputMode="numeric"
          style={{ fontSize: 24, marginRight: "auto" }}
        />
        <TouchableOpacity
          onPress={handleDPress}
          style={{
            // flex: 0.1,
            backgroundColor: "#2196F3",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            height: 60,
            width: 60,
          }}>
          <Text style={{ color: "white", fontSize: 40 }}>D</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {profile?.preRollModifiers.map((rollMod) => (
          <View key={rollMod} style={{ flex: 1, marginHorizontal: 2 }}>
            <Button title={rollMod} onPress={handleRollModPress} />
          </View>
        ))}
      </View>
      <View style={{ marginVertical: 16 }}>
        <Text role="heading" style={{ fontSize: 30, textAlign: "center" }}>
          Saved Rolls
        </Text>
        {profile?.savedRolls?.map((savedRoll) => (
          <SavedRoll key={savedRoll.id} {...savedRoll} />
        ))}
      </View>
      <RollButton />
    </View>
  );
}
