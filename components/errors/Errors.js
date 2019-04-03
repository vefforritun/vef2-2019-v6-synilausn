import React from 'react';
import PropTypes from 'prop-types';

import css from './Errors.css';

export default function Errors(props) {
  const { errors } = props;

  return (
    <React.Fragment>
      <ul className={css.errors}>
        {errors.map((error, i) => (
          <li
            className={css.errors__item}
            key={i}
          >
            {error.message}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string,
    message: PropTypes.string,
  })),
};
