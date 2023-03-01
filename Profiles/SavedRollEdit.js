import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper";
import rollParser, { rollParserFmt } from "../utils/rollParser";
import { useProfiles } from "./ProfileContext";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    marginHorizontal: 24,
    borderRadius: 4,
  },
  wrapper: {
    justifyContent: "space-between",
  },
  inputs: {
    rowGap: 12,
    marginVertical: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 8,
  },
});

export default function SavedRollEdit({ savedRoll, visible, handleDismiss }) {
  // savedRoll is an optional parameter, if omitted, will be creating a new saved roll
  const [name, setName] = useState(savedRoll?.name ?? "");
  const [diceQuery, setDiceQuery] = useState(savedRoll?.dice ?? "");
  const [error, setError] = useState(false);
  const { profile, profilesDispatch } = useProfiles();
  const isNew = Boolean(savedRoll?.new);

  const handleSave = () => {
    profilesDispatch({
      type: "ROLL_UPDATE",
      payload: {
        rollId: savedRoll.id,
        profileId: profile.id,
        roll: { id: savedRoll.id, name, dice: diceQuery },
      },
    });
  };

  const handleCreate = () => {
    profilesDispatch({
      type: "ROLL_ADD",
      payload: {
        profileId: profile.id,
        roll: { name, dice: diceQuery },
      },
    });
  };

  const handleConfirm = () => {
    if (!name) {
      return setError(true);
    }
    setError(false);
    isNew ? handleCreate() : handleSave();
    handleDismiss();
  };

  const handleDelete = () => {
    profilesDispatch({
      type: "ROLL_REMOVE",
      payload: {
        rollId: savedRoll.id,
        profileId: profile.id,
      },
    });
    handleDismiss();
  };

  useEffect(() => {
    setName(savedRoll?.name ?? "");
    setDiceQuery(savedRoll?.dice ?? "");
    setError(false);
  }, [savedRoll]);

  return (
    <Portal>
      <Modal visible={visible} onDismiss={handleDismiss} contentContainerStyle={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Text variant="headlineSmall" style={{ marginBottom: 8 }}>
            {isNew ? "Create New Saved Roll" : "Edit Saved Roll"}
          </Text>
          {!isNew && <IconButton icon="delete" size={26} onPress={handleDelete} />}
        </View>
        <View style={styles.inputs}>
          <TextInput
            label="Name"
            value={name}
            error={error}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            label="Dice Query"
            value={diceQuery}
            onChangeText={(text) => setDiceQuery(text)}
          />
        </View>
        <View style={styles.buttons}>
          <Button onPress={handleDismiss}>Cancel</Button>
          <Button mode="contained" onPress={handleConfirm}>
            Confirm
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
