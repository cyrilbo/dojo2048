import React, { FC } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { colors } from "../../theme/colors";

const BUTTON_SIZE = 40;

export const Button = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    backgroundColor: colors.cellPlaceholderBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.cellText,
    textAlign: "center",
  },
});
