import React from 'react';
import { IPropsBullet } from '../../models/types/propsTypes';

function Bullet({ bullet }: IPropsBullet) {
  return (
    <div
      style={{
        transform: `translate(${bullet.x.toString()}px, ${bullet.y.toString()}px) 
          rotate(${bullet.corner.toString()}deg)`,
        zIndex: '99999',
      }}
      className="bullet"
    />
  );
}

export default Bullet;
