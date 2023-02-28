import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  content: {
    // flexGrow: 1,
    // backgroundColor: "#B1DBEF",
    // margin: 2,
    // borderRadius: 5,
  },
});

const icon_table = {
  default: "plus",
  d20: "dice-d20",
  d12: "dice-d12",
  d10: "dice-d10",
  d8: "dice-d8",
  d6: "dice-d4",
  d4: "dice-d6"
};

const color_table_protonopia = {
  default: "#ffc33b",
  d20: "#2271b2",
  d12: "#f748a5",
  d10: "#d55e00",
  d8: "#f0e422",
  d6: "#3db7e9",
  d4: "#359b73"
};

const color_table_default = {
  default: "#ffc33b",
  d20: "#ed3737",
  d12: "#5fe85d",
  d10: "#524ff0",
  d8: "#ede737",
  d6: "#ea46f0",
  d4: "#46eaf0"
};

export default function Die({type, selected, handlePress}) {
  const theme = useTheme();
  // Add accessibility action 'increment'/'decrement' for the die action

  const icon = getIcon(type, "p");
  var icon_name = icon_table["default"];
  var icon_color = color_table_default.default;
  if(icon){
    icon_name = icon.name;
    icon_color = icon.color;
  }

  return (
    <Icon.Button
      name={icon_name}
      color={icon_color}
      size={30}
      mode="contained"
      uppercase
      backgroundColor="#312838"
      borderWidth={3}
      borderColor={selected ? icon_color : "#ffffff"}
      buttonColor={selected && theme.colors.primaryContainer}
      onPress={() => handlePress(type)}
      >
      <Text
        variant="titleMedium"
        style={{ color: selected ? icon_color : theme.colors.onPrimary }}>
        {type}
      </Text>
      
    </Icon.Button>
  );
}

//accepts flags for different color tables.
// p = protonopia
function getIcon(type, flag = "none"){
  var color_table = color_table_default
  if(flag == "p"){
    color_table = color_table_protonopia
  }

  if(type in icon_table){
    return({name: icon_table[type],
      color: color_table[type]})
  }
  else{
    return null
  }
  
}
