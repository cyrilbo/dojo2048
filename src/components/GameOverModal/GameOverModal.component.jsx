import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const GameOverModal = ({ visible, onCloseButtonPressed }) => (
  <Modal visible={visible} transparent={true}>
    <View style={styles.container}>
      <Text style={styles.title}>Game Over</Text>
      <TouchableOpacity onPress={onCloseButtonPressed}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFFAA",
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
  },
});
