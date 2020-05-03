import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { style } from "../../theme/style";
import { colors } from "../../theme/colors";

export const Cell = ({ value }) => (
  <View
    style={[
      styles.container,
      { backgroundColor: colors.cellBackground[value] },
    ]}
  >
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: style.CELL_SIZE,
    height: style.CELL_SIZE,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: style.CELL_RADIUS,
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.cellText,
  },
});
