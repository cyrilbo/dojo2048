import React, { useState } from "react";
import { Animated } from "react-native";

import { style } from "../../theme/style";

import { Cell } from "./Cell.component";

const getInitialAnimatedMargin = (initialValue) => {
  return new Animated.Value(
    style.SPACING_BETWEEN_CELLS +
      initialValue * (style.CELL_SIZE + style.SPACING_BETWEEN_CELLS)
  );
};

const getInitialOpacity = (cell) =>
  new Animated.Value(cell.previousPosition ? 1 : 0);

export const AnimatedCell = ({ cell }) => {
  const [opacity] = useState(getInitialOpacity(cell));
  const [x] = useState(
    getInitialAnimatedMargin(
      (cell.previousPosition && cell.previousPosition.x) || cell.x
    )
  );
  const [y] = useState(
    getInitialAnimatedMargin(
      (cell.previousPosition && cell.previousPosition.y) || cell.y
    )
  );

  const nextX =
    style.SPACING_BETWEEN_CELLS +
    cell.x * (style.CELL_SIZE + style.SPACING_BETWEEN_CELLS);

  const nextY =
    style.SPACING_BETWEEN_CELLS +
    cell.y * (style.CELL_SIZE + style.SPACING_BETWEEN_CELLS);

  React.useEffect(() => {
    if (!cell.previousPosition) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        delay: 300,
      }).start();
    }
  }, []);

  React.useEffect(() => {
    Animated.timing(x, {
      toValue: nextX,
      duration: 300,
    }).start();
    Animated.timing(y, {
      toValue: nextY,
      duration: 300,
    }).start();
  }, [nextX, nextY]);
  return (
    <Animated.View
      style={{
        transform: [{ translateX: x }, { translateY: y }],
        position: "absolute",
        zIndex: cell.status === "MERGED" ? 0 : 100,
        opacity,
      }}
    >
      <Cell value={cell.value} />
    </Animated.View>
  );
};
