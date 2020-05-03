import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { style } from '../../theme/style';

interface Props {
  score: number;
}

export const Header: FC<Props> = ({ score }) => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>2048</Text>
    </View>
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreTitle}>SCORE</Text>
      <Text style={styles.score}>{score}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  scoreContainer: {
    width: style.CELL_SIZE,
    height: style.CELL_SIZE,
    borderRadius: style.CELL_RADIUS,
    backgroundColor: colors.boardBackground,
    alignItems: 'center',
    paddingVertical: 8,
  },
  scoreTitle: {
    color: colors.white,
    fontWeight: '600',
  },
  score: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
