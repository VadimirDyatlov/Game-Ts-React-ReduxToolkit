import React, { useEffect, useState } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import { findNum, getLvl } from '../../models/functions';

function GameBar() {
  const [startHp, setStartHp] = useState(0);
  const {
    hero, gameStats,
  } = useAppSelector((state) => state.game);

  useEffect(() => {
    setStartHp(hero.hp);
  }, []);

  return (
    <div className="game-bar-box nes-container is-rounded is-dark">
      <div className="gamebar-left">
        <p>{`damage ${Math.floor(hero.damage)}`}</p>
        <p>{`speed ${hero.speed}`}</p>
      </div>
      <div className="gamebar-center">
        <div
          className="progress-hp"
          style={{ width: `${findNum(startHp, hero.hp)}%` }}
        >
          <p>{`hp ${Math.floor(hero.hp)}`}</p>
        </div>
        <div
          className="progress-lvl"
          style={{ width: `${findNum(getLvl(hero.lvl)[1], hero.lvl)}%` }}
        >
          <p>{`lvl ${getLvl(hero.lvl)[0]}`}</p>
        </div>
      </div>
      <div className="gamebar-right">
        <p>{`gold ${gameStats.gold}`}</p>
        <p>{`kill ${gameStats.killings}`}</p>
      </div>
    </div>
  );
}

export default GameBar;
