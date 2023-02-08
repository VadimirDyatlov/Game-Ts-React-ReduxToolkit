import React, { } from 'react';
import { IPropsLiUp } from '../../models/types/propsTypes';

function Li({
  skillName, refProp, skillValue, handleClickHpDown, priceValueFunc, handleClickHpUp,
}: IPropsLiUp) {
  return (
    <li>
      <p>
        <span ref={refProp}>
          {skillValue}
        </span>
        {` ${skillName}`}
      </p>
      <div>
        <button
          onClick={handleClickHpDown}
          type="button"
          className="nes-btn is-error"
        >
          -
        </button>
        <span className="update">
          {`${priceValueFunc()}`}
        </span>
        <button
          onClick={handleClickHpUp}
          type="button"
          className="nes-btn is-warning"
        >
          +
        </button>
      </div>
    </li>
  );
}
export default Li;
