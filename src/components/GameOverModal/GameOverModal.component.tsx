import React, { FC } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  onCloseButtonPressed: () => void;
}

export const GameOverModal: FC<Props> = ({ visible, onCloseButtonPressed }) => (
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFFAA',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
  },
});
