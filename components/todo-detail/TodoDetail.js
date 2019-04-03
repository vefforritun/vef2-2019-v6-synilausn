import React, { useState } from 'react';
import Link from 'next/link';

import Field from '../field/Field';
import Errors from '../errors/Errors';
import Button from '../button/Button';

import { updateTodo, deleteTodo } from '../../api';

import css from './TodoDetail.css';

function fixDue(str) {
  if (typeof str === 'string' && str[str.length - 1].toLowerCase() === 'z') {
    return str.substr(0, str.length - 1);
  }

  return str;
}

export default function todoDetail(props) {
  const { item } = props;

  const [deleted, setDeleted] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: item.title,
    due: fixDue(item.due),
    completed: item.completed,
    created: item.created,
    updated: item.updated,
  });

  async function onSubmit(e) {
    e.preventDefault();

    setLoading(true);
    const update = {
      title: data.title,
      due: data.due,
      completed: data.completed,
    };
    const updated = await updateTodo(item.id, update);

    if (!updated.ok) {
      setErrors(updated.result);
    } else {
      setData(updated.result);
    }

    setLoading(false);
  }

  function onChange(e) {
    const newData = Object.assign({}, data);
    newData[e.target.name] = e.target.type === 'checkbox'
      ? e.target.checked : e.target.value;
    setData(newData);
  }

  async function onClickDelete(e) {
    e.preventDefault();

    setLoading(true);
    const deleted = await deleteTodo(item.id);

    if (!deleted.ok) {
      setErrors(deleted.result);
    } else {
      setDeleted(true);
    }

    setLoading(false);
  }

  if (deleted) {
    return (
      <React.Fragment>
        <p>Verkefni eytt</p>
        <Link href="/"><a className={css.todoDetail__back}>Til baka</a></Link>
      </React.Fragment>
    );
  }

  return (
    <form onSubmit={onSubmit}>
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
        name="completed"
        label="Lokið"
        value={data.completed}
        type="checkbox"
        onChange={onChange}
      />
      <Field
        name="due"
        label="Klárast fyrir"
        value={data.due}
        type="datetime-local"
        onChange={onChange}
      />

      <dl className={css.todoDetail__list}>
        <dt className={css.todoDetail__term}>Uppfært:</dt>
        <dd className={css.todoDetail__definition}>{data.updated}</dd>

        <dt className={css.todoDetail__term}>Búið til:</dt>
        <dd className={css.todoDetail__definition}>{data.created}</dd>
      </dl>

      <div className={css.todoDetail__buttons}>
        <Button>Uppfæra</Button>
        <Button onClick={onClickDelete}>Eyða</Button>
      </div>

      <Link href="/"><a className={css.todoDetail__back}>Til baka</a></Link>
    </form>
  );
}
