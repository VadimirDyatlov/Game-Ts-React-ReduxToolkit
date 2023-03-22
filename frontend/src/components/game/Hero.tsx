import React from 'react';
import useAppSelector from '../../hooks/useAppSelector';

function Hero() {
  const { hero } = useAppSelector((state) => state.game);
  return (
    <div
      className="hero"
      style={{
        transform: ` translate(${hero.x}px, ${hero.y}px) scale(${hero.move}, 1)`,
        width: `${hero.w}px`,
        height: `${hero.h}px`,
        zIndex: `${hero.y + 60}`,
      }}
    >
      <img
        src={`${hero.skin}`} // скин игрока
        alt={`${hero.move}`} // зеркалим скин
        draggable="false"
      />
    </div>
  );
}

export default Hero;
