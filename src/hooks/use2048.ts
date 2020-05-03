import { useState, useRef } from 'react';
import Game2048 from '../domain/Game2048';
import { Direction } from '../types/Direction';

export const use2048 = () => {
  const game2048Ref = useRef(new Game2048());
  const [cells, setCells] = useState(game2048Ref.current.getCells());
  const [score, setScore] = useState(game2048Ref.current.getScore());
  const [isGameOverModalVisible, setIsGameOverModalVisible] = useState(
    game2048Ref.current.getIsGameOver(),
  );
  const hideGameOverModal = () => {
    setIsGameOverModalVisible(false);
    game2048Ref.current.restart();
    setCells(game2048Ref.current.getCells());
    setScore(game2048Ref.current.getScore());
  };

  const newMove = (direction: Direction) => {
    game2048Ref.current.newMove(direction);
    setCells(game2048Ref.current.getCells());
    setScore(game2048Ref.current.getScore());
    setIsGameOverModalVisible(game2048Ref.current.getIsGameOver());
  };
  return { cells, newMove, isGameOverModalVisible, hideGameOverModal, score };
};
