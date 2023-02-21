import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import theme from "../theme";
import CheckBox from "@react-native-community/checkbox";
import { useProfiles } from "./ProfileContext";

export default function ProfileCard({ id, name, system, handlePress }) {
  const { profile, switchCurrentProfile } = useProfiles();

  return (
    <View
      style={{
        flex: 1,
        minHeight: 120,
        padding: 12,
        backgroundColor: theme.main.primary,
      }}>
      <TouchableOpacity onPress={handlePress}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={{ color: theme.main.contrastText, fontSize: 30, marginBottom: 8 }}>
              {name}
            </Text>
            <Text style={{ color: theme.main.contrastText, fontSize: 24 }}>
              System: <Text style={{ fontWeight: "bold" }}>{system}</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
