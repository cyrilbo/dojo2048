import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import { style } from '../../theme/style';
import { colors } from '../../theme/colors';
import { CellType } from '../../types/Cell';
import { AnimatedCell } from '../Cell';

interface Props {
  cells: CellType[];
}

export const Board: FC<Props> = ({ cells }) => (
  <View>
    <View style={styles.backgroundContainer}>
      <View style={styles.cellPlaceholdersContainer}>
        {Array(16)
          .fill(0)
          .map((_, i) => (
            <View key={i} style={styles.cellPlaceholder} />
          ))}
      </View>
    </View>
    <View style={styles.cellsContainer}>
      {cells.map(cell => (
        <AnimatedCell cell={cell} key={cell.id} />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  cellPlaceholdersContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    width: style.BOARD_SIZE,
    height: style.BOARD_SIZE,
    backgroundColor: colors.boardBackground,
    padding: style.SPACING_BETWEEN_CELLS,
  },
  cellPlaceholder: {
    width: style.CELL_SIZE,
    height: style.CELL_SIZE,
    backgroundColor: colors.cellPlaceholderBackground,
    borderRadius: style.CELL_RADIUS,
  },
  cellsContainer: {
    width: style.BOARD_SIZE,
    height: style.BOARD_SIZE,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
