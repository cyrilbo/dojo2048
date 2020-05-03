import { Dimensions } from 'react-native';

const BOARD_SIZE = Dimensions.get('window').width;

const SPACING_BETWEEN_CELLS = 12;

export const style = {
  BOARD_SIZE,
  SPACING_BETWEEN_CELLS,
  CELL_SIZE: (BOARD_SIZE - 5 * SPACING_BETWEEN_CELLS) / 4,
  CELL_RADIUS: 8,
};
