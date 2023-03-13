import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useProfiles } from "../Profiles/ProfileContext";
import Results from "../SimpleRoller/Results";
import { rollParserFmt } from "../utils/rollParser";

export default function SavedRoller() {
  const { profile, profilesDispatch } = useProfiles();
  const [results, setResults] = useState();

  const handleRoll = (rollQuery) => {
    const resultsRoll = rollParserFmt(rollQuery);
    if (resultsRoll !== null) {
      profilesDispatch({
        type: "HISTORY_PUSH",
        payload: { roll: resultsRoll, profileId: profile.id },
      });
      setResults(resultsRoll);
    }
  };

  return (
    <View style={{ flex: 1, padding: 8 }}>
      <View style={{ flex: 0.5 }}>
        <Results results={results} />
      </View>
      <Button
        onPress={() => setResults()}
        mode="contained"
        style={{ marginHorizontal: 24, marginVertical: 8 }}>
        Clear
      </Button>
      <ScrollView style={{ flex: 0.7 }}>
        {profile.savedRolls.map((savedRoll) => (
          <Card key={savedRoll.id} mode="outlined" style={{ marginVertical: 4 }}>
            <Card.Title title={savedRoll.name} titleVariant="titleLarge" />
            <Card.Content>
              <Text style={{ fontSize: 20 }}>Dice: {savedRoll.dice}</Text>
            </Card.Content>
            <Card.Actions style={{ paddingTop: 20 }}>
              <Button style={{ flex: 1 }}>Edit</Button>
              <Button
                style={{ flex: 4 }}
                onPress={() => handleRoll(savedRoll.dice)}
                accessibilityLabel={`Roll {savedRoll.name}`}>
                Roll
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
