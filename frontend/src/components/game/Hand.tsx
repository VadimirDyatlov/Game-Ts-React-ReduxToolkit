import React from 'react';
import useAppSelector from '../../hooks/useAppSelector';

function Hand() {
  const { hero } = useAppSelector((state) => state.game);
  return (
    <div
    className="hand"
    style={{
      transform: ` translate(${hero.move > 0 ? hero.x - 10 : hero.x + 10}px, ${hero.y}px) scale(${hero.move}, 1)
      rotate(${hero.corner}deg)`,
      width: `${hero.w}px`,
      height: `${hero.h}px`,
      zIndex: `${hero.y + 60}`,
    }}
  >
    <img
      src='/animations/hand1.png' // скин игрока
      alt='hand'
      draggable="false"
    />
  </div>
  );
}

export default Hand;
