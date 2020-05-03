import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '../Button';

interface Props {
  onClickLeft: () => void;
  onClickRight: () => void;
  onClickUp: () => void;
  onClickDown: () => void;
}

export const Controller: FC<Props> = ({
  onClickDown,
  onClickLeft,
  onClickRight,
  onClickUp,
}) => (
  <>
    <View style={styles.row}>
      <Button title="↑" onPress={onClickUp} />
    </View>

    <View style={[styles.row, { justifyContent: 'space-around' }]}>
      <Button title="←" onPress={onClickLeft} />
      <Button title="→" onPress={onClickRight} />
    </View>

    <View style={styles.row}>
      <Button title="↓" onPress={onClickDown} />
    </View>
  </>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
});
