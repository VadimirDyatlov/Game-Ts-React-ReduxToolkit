import React from 'react';
import { IPropsBullet } from '../../models/types/propsTypes';

function Bullet({ bullet }: IPropsBullet) {
  return (
    <div
      style={{
        transform: `translate(${bullet.x}px, ${bullet.y}px) 
          rotate(${bullet.corner}deg)`,
        zIndex: `${bullet.visibility ? '99999' : '-1'}`,
      }}
      className="bullet"
    />
  );
}

export default Bullet;
