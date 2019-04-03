import React, { useState } from 'react';

import { addTodo } from '../../api';

import Button from '../button/Button';
import Field from '../field/Field';
import Errors from '../errors/Errors';

import css from './Form.css';

export default function Form(props) {
  const { onCreated } = props;

  const [data, setData] = useState({ title: '', date: undefined });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  async function onSubmit(e) {
    e.preventDefault();

    setLoading(true);
    const created = await addTodo(data.title, data.date);

    if (!created.ok) {
      setErrors(created.result);
    } else {
      setData({ title: '', date: undefined });
      onCreated(created.result);
    }

    setLoading(false);
  }

  function onChange(e) {
    const newData = Object.assign({}, data);
    newData[e.target.name] = e.target.value;
    setData(newData);
  }

  if (loading) {
    return (<p>Bý til todo...</p>)
  }

  return (
    <form className={css.form} onSubmit={onSubmit}>
      <h2 className={css.form__header}>Nýtt verkefni</h2>
      {errors.length > 0 && (
        <Errors errors={errors} />
      )}

      <Field
        name="title"
        label="Titill"
        value={data.title}
        onChange={onChange}
      />
      <Field
        name="date"
        label="Klárast fyrir"
        value={data.date}
        type="datetime-local"
        onChange={onChange}
      />
      <Button>Búa til</Button>
    </form>
  )
}
