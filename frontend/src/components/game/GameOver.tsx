import React from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import { formatTime } from '../../models/functions';
import { IPropsGameOver } from '../../models/types/propsTypes';
import Th from '../reused/Th';
import H1 from '../reused/H1';

function GameOver({ playGame }: IPropsGameOver) {
  const { gameStats } = useAppSelector((state) => state.game);
  return (
    <div className="game-over-box nes-table-responsive">
      {playGame === 'game-over'
        ? (
          <H1 rightText="GAME" leftText="OVER!" />
        )
        : (
          <H1 rightText="YOU" leftText="WON!" />
        )}
      <table className="nes-table is-bordered is-dark">
        <thead>
          <tr>
            <Th content="Убито врагов" />
            <Th content={`${gameStats.killings}`} />
          </tr>
          <tr>
            <Th content="Золота добыто" />
            <Th content={`${gameStats.gold}`} />
          </tr>
          <tr>
            <Th content="Время игры" />
            <Th content={`${formatTime(gameStats.gameTime)}`} />
          </tr>
        </thead>
      </table>
      <a className="nes-btn is-warning" href="/">
        Главное меню
      </a>
    </div>
  );
}

export default GameOver;
