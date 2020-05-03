import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { Board } from "./src/components/Board";
import { Controller } from "./src/components/Controller";
import { use2048 } from "./src/hooks/use2048";
import { Direction } from "./src/types/Direction";
import { Header } from "./src/components/Header";
import { GameOverModal } from "./src/components/GameOverModal";

const App = () => {
  const {
    cells,
    newMove,
    isGameOverModalVisible,
    hideGameOverModal,
    score,
  } = use2048();
  const getClickHandler = (direction) => () => newMove(direction);
  return (
    <SafeAreaView style={styles.container}>
      <Header score={score} />
      <Board cells={cells} />
      <Controller
        onClickDown={getClickHandler(Direction.Down)}
        onClickUp={getClickHandler(Direction.Up)}
        onClickLeft={getClickHandler(Direction.Left)}
        onClickRight={getClickHandler(Direction.Right)}
      />
      <GameOverModal
        visible={isGameOverModalVisible}
        onCloseButtonPressed={hideGameOverModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
