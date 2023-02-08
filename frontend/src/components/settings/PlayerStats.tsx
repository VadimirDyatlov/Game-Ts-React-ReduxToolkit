import React, { } from 'react';
import { IPropsPlayerStats } from '../../models/types/propsTypes';
import Th from '../reused/Th';
import Td from '../reused/Td';

function PlayerStats({ playerStats }: IPropsPlayerStats) {
  return (
    <div className="settings-container-2 nes-table-responsive">
      <table className="nes-table is-bordered is-dark">
        <tbody>
          <tr>
            <Th content="Games Played" />
            <Th content="Killings" />
          </tr>
          <tr>
            <Td content={playerStats.gamesPlayed} />
            <Td content={playerStats.killings} />
          </tr>
          <tr>
            <Th content="Gold" />
            <Th content="Time Game" />
          </tr>
          <tr>
            <Td content={playerStats.gold} />
            <Td content={playerStats.time} />
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default PlayerStats;
