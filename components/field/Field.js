import PropTypes from 'prop-types';

import css from './Field.css';

export default function Field(props) {
  const { name, value, onChange, label, type = 'text' } = props;

  const checked = type === 'checkbox' && value ? 'checked' : undefined;

  return (
    <div className={css.field}>
      <label className={css.field__label} htmlFor={name}>{label}:</label>
      <input
        className={css.field__input}
        id={name}
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        checked={checked}
      />
    </div>
  );
}

Field.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
}

Field.defaultProps = {
  type: 'text',
  onChange: () => {},
}
