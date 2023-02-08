import React from 'react';
import { IPropsCoin } from '../../models/types/propsTypes';

function GoldCoin({ coin }: IPropsCoin) {
  return (
    <div
      style={{
        transform: `translate(${coin.x}px, ${coin.y}px)`,
        width: `${coin.w}px`,
        height: `${coin.h}px`,
        zIndex: `${coin.y}`,
      }}
      className="coin"
    >
      <img
        src={`${coin.skin}`}
        alt={`${coin.id}`}
      />
    </div>
  );
}

export default GoldCoin;
