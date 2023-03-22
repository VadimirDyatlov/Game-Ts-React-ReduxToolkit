import React from 'react';
import { IPropsDeadBody } from '../../models/types/propsTypes';

function DeadBody({ deadBody }: IPropsDeadBody) {
  return (
    <div
      className="dead-body"
      style={{
        transform: ` translate(${deadBody.x}px, ${deadBody.y}px) scale(${deadBody.move}, 1)`,
        width: `${deadBody.w}px`,
        height: `${deadBody.h}px`,
        zIndex: `${deadBody.y + 99}`,
      }}
    >
      <img
        src={`${deadBody.skin}`}
        alt=""
        draggable="false"
      />
    </div>
  );
}

export default DeadBody;
