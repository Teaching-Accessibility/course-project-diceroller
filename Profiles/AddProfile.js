import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";
import presets from "./presets";
import PresetSelector from "./PresetSelector";
import { useProfiles } from "./ProfileContext";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 24,
    borderRadius: 4,
  },
});

export default function AddProfile({ visible, handleAddProfile, handleDismiss }) {
  const { profilesDispatch } = useProfiles();
  const [selectedPreset, setSelectedPreset] = useState("Custom");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const modalRef = useRef();

  const handleNameChange = (value) => {
    console.log(value);
    setName(value);
  };

  useEffect(() => {
    if (visible) {
      // modalRef.current?.focus();
    }
    setSelectedPreset("Custom");
    setName("");
    setError(false);
  }, [visible]);

  const handleProfileCreate = () => {
    if (name === "") {
      return setError(true);
    } else {
      setError(false);
    }
    const preset = presets.find((preset) => preset.system === selectedPreset);
    profilesDispatch({ type: "ADD_PROFILE", payload: { ...preset, name } });
    handleDismiss();
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={handleDismiss} contentContainerStyle={styles.container}>
        <Text variant="titleLarge" role="heading" style={{ paddingBottom: 8 }}>
          Add a New Profile
        </Text>
        <TextInput
          autoFocus
          label="Name"
          placeholder={error && "Enter a name"}
          value={name}
          ref={modalRef}
          error={error}
          onChangeText={handleNameChange}
        />
        <PresetSelector selectedPreset={selectedPreset} setSelectedPreset={setSelectedPreset} />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Button onPress={handleDismiss}>Cancel</Button>
          <Button onPress={handleProfileCreate} mode="contained">
            Create
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
