import React from "react";
import { View } from "react-native";
import { List, Modal, Portal, RadioButton, Text } from "react-native-paper";

export default function PresetSelector() {
  const [modalVisible, setModalVisible] = useState();
  const [selected, setSelected] = useState();

  return (
    <View>
      <Text variant="labelLarge">Preset System Profiles</Text>
      <List.Item onPress={() => setModalVisible(true)}>Preset System Profiles</List.Item>
      <Portal>
        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          {presets.map((preset) => (
            <RadioButton
              key={preset.id}
              value={preset.name}
              status={selected === preset.id ? "checked" : "unchecked"}
              onPress={() => setSelected(preset.id)}
            />
          ))}
        </Modal>
      </Portal>
      <Text>{profile.system}</Text>
      {/* Make into a dropdown of presets */}
    </View>
  );
}
