import React, { } from 'react';
import { IPropsTh } from '../../models/types/propsTypes';

function Th({ content }: IPropsTh) {
  return (
    <th>
      <p>{content}</p>
    </th>
  );
}
export default Th;
