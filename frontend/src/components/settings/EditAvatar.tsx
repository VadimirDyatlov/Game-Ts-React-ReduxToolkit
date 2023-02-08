/* eslint-disable import/no-unresolved */
import React, { } from 'react';
import { IEditAvatar } from '../../models/types/propsTypes';

function editAvatar({ ifAvatar, name }: IEditAvatar) {
  return (
    <div className="edit-avatar">
      {ifAvatar === 'false' ? <span><h1>{name[0]}</h1></span>
        : (
          <>
            <img
              src=""
              alt="Ash"
            />
            <div>{name}</div>
          </>
        )}
      <button className="nes-btn" type="button">
        выбрать
      </button>
    </div>
  );
}
export default editAvatar;
