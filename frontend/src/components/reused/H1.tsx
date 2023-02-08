/* eslint-disable import/no-unresolved */
import React, { } from 'react';
import { IPropsH1 } from '../../models/types/propsTypes';

function H1({ rightText, leftText }: IPropsH1) {
  return (
    <h1>
      <span className="blue">{rightText}</span>
      {' '}
      <span className="yellow">{leftText}</span>
    </h1>
  );
}
export default H1;
