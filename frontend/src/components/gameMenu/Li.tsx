/* eslint-disable import/no-unresolved */
import React, { } from 'react';
import { Link } from 'react-router-dom';
import { IPropsLi } from '../../models/types/propsTypes';

function Li({ path, text, handleClickLogOut }: IPropsLi) {
  return (
    <li>
      <Link to={path} onClick={handleClickLogOut}>
        {text}
      </Link>
    </li>
  );
}
export default Li;
