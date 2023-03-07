import React, { useState } from "react";
import { View } from "react-native";
import { Button, List, Modal, Portal, RadioButton, Text } from "react-native-paper";
import presets from "./presets";
import { useProfiles } from "./ProfileContext";

export default function PresetSelector({ selectedPreset, setSelectedPreset }) {
  const { profile } = useProfiles();

  return (
    <View style={{ paddingVertical: 8 }}>
      <Text variant="labelLarge">Preset System Profiles</Text>
      <RadioButton.Group
        value={selectedPreset}
        onValueChange={(newValue) => setSelectedPreset(newValue)}>
        {presets.map((preset) => (
          <RadioButton.Item
            key={preset.system}
            label={preset.system}
            value={preset.system}
            accessibilityState={{ checked: selectedPreset === preset.system }}
          />
        ))}
      </RadioButton.Group>
    </View>
  );
}
