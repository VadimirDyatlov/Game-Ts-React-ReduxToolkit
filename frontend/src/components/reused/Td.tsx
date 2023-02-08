/* eslint-disable import/no-unresolved */
import React, { } from 'react';
import { IPropsTd } from '../../models/types/propsTypes';

function Td({ content }: IPropsTd) {
  return (
    <td><p>{content}</p></td>
  );
}
export default Td;
