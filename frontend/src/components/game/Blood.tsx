import React from 'react';
import { IPropsBlood } from '../../models/types/propsTypes';

function Blood({ blood }: IPropsBlood) {
  return (
    <div
      className="blood"
      style={{
        transform: ` translate(${blood.x}px, ${blood.y}px) scale(${blood.move}, 1)`, // зеркалим скин
        width: `${blood.w}px`,
        height: `${blood.h}px`,
        zIndex: '999',
      }}
    >
      <img
        src={`${blood.skin}`} // скин врака
        alt=""
        draggable="false"
      />
    </div>
  );
}

export default Blood;
