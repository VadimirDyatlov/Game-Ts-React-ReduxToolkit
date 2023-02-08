/* eslint-disable import/no-unresolved */
import React, { } from 'react';
import { IPropsTr } from '../../models/types/propsTypes';

function Tr({ i, player, formatTime }: IPropsTr) {
  return (
    <tr key={player['User.id']}>
      <td className="first-td">{i + 1}</td>
      <td>{player['User.name']}</td>
      <td>{player.gamesPlayed}</td>
      <td>{player.killings}</td>
      <td>{player.gold}</td>
      <td>{formatTime(player.time)}</td>
    </tr>
  );
}
export default Tr;
