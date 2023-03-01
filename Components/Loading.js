import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function Loading() {
  return (
    <View style={{ top: "45%" }}>
      <ActivityIndicator size={70} animating={true} />
    </View>
  );
}
