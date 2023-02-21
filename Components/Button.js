import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent: "center",
    color: "white",
  },
});

export default Button = ({
  onPress,
  ViewProps,
  TouchProps,
  TextProps,
  style,
  children,
  ...props
}) => {
  // Replace with custom button so that we can increase height
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} role="button">
        <Text
          style={{
            fontSize: 24,
            color: "#fff",
            textAlign: "center",
            textAlignVertical: "center",
          }}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
