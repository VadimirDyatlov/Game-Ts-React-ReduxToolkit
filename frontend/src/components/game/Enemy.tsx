import React from 'react';
import { IPropsEnemy } from '../../models/types/propsTypes';

function Enemy({ enemy }: IPropsEnemy) {
  return (
    <div
      className="enemy"
      style={{
        transform: ` translate(${enemy.x}px, ${enemy.y}px) scale(${enemy.move}, 1)`, // зеркалим скин
        width: `${enemy.w}px`,
        height: `${enemy.h}px`,
        zIndex: `${enemy.y}`,
      }}
    >
      <img
        src={`${enemy.skin}`} // скин врака
        alt=""
        draggable="false"
      />
    </div>
  );
}

export default Enemy;
