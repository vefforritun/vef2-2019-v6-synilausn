import React from 'react';
import PropTypes from 'prop-types';

import css from './Button.css';

export default function Button(props) {
  const { children, onClick } = props;

  return (
    <button className={css.button} onClick={onClick}>
      {children}
    </button>
  );
}

Error.propTypes = {
  onClick: PropTypes.func,
};
