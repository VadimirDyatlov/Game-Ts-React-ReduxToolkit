import React, { } from 'react';
import { Link } from 'react-router-dom';

function BackButton() {
  return (
    <Link className="back-button" to="/">
      <p>&lt;&lt; НАЗАД</p>
    </Link>
  );
}
export default BackButton;
