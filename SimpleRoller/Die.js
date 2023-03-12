import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const styles = StyleSheet.create({
  content: {
    // flexGrow: 1,
    // backgroundColor: "#B1DBEF",
    // margin: 2,
    // borderRadius: 5,
  },
});

const icon_table = {
  base: "plus",
  d20: "dice-d20",
  d12: "dice-d12",
  d10: "dice-d10",
  d8: "dice-d8",
  d6: "dice-d6",
  d4: "dice-d4",
};

const color_table_protonopia = {
  base: "#ffc33b",
  d20: "#ffb2fd",
  d12: "#f0e422",
  d10: "#d55e00",
  d8: "#f748a5",
  d6: "#3db7e9",
  d4: "#42c290",
};

const color_table_blank = {
  base: "#ffffff",
  d20: "#ffffff",
  d12: "#ffffff",
  d10: "#ffffff",
  d8: "#ffffff",
  d6: "#ffffff",
  d4: "#ffffff",
};

const color_table_wong = {
  base: "#FFFFFF",
  d20: "#E69F00",
  d12: "#56B4E9",
  d10: "#009E73",
  d8: "#F0E442",
  d6: "#D55E00",
  d4: "#CC79A7",
};

const color_table_default = {
  base: "#ffc33b",
  d20: "#fc5656",
  d12: "#5fe85d",
  d10: "#8c7aff",
  d8: "#ede737",
  d6: "#ea46f0",
  d4: "#46eaf0",
};

export default function Die({ type, count, selected, updateRollQuery, handlePress }) {
  const theme = useTheme();
  // Add accessibility action 'increment'/'decrement' for the die action

  const icon = getIcon(type, "w");
  var icon_name = icon_table["base"];
  var icon_color = color_table_default.base;
  if (icon) {
    icon_name = icon.name;
    icon_color = icon.color;
  }
  
  const handleAccessibilityAction = (event) => {
    switch (event.nativeEvent.actionName) {
      case "increment":
        updateRollQuery(type, 1);
        break;
      case "decrement":
        updateRollQuery(type, -1);
        break;
    }
  };

  return (
    <View>
      <Icon.Button
        name={icon_name}
        color={selected? "#000":icon_color}
        size={30}
        mode="contained"
        uppercase
        backgroundColor={selected ? "#fff" : "#312838"}
        borderWidth={3}
        borderColor={selected ? icon_color : "#ffffff"}
        buttonColor={selected && theme.colors.primaryContainer}
        accessible={true}
        accessibilityValue={{ min: -100, max: 100, now: count }}
        accessibilityActions={[
          { name: "increment", label: "Increment die" },
          { name: "decrement", label: "Decrement die" },
        ]}
        onAccessibilityAction={handleAccessibilityAction}
        onPress={() => handlePress(type)}>
        <Text
          variant="titleMedium"
          style={{ color: selected ? "#000000" : theme.colors.onPrimary}}>
          {type}
        </Text>
      </Icon.Button>
    </View>
  );
}

//accepts flags for different color tables.
// p = protonopia
function getIcon(type, flag = "none") {
  var color_table = color_table_default;
  switch (flag){
    case "p":
      color_table = color_table_protonopia
      break;
    case "b":
      color_table = color_table_blank
      break;
    case "w":
      color_table = color_table_wong
      break;
  }

  if (type in icon_table) {
    return { name: icon_table[type], color: color_table[type] };
  } else {
    return {name: icon_table["base"], color: color_table["base"]};
  }
}
