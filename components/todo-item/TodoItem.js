import React, { useState } from 'react';
import Link from 'next/link'

import css from './TodoItem.css';

export default function todoItem(props) {
  const { id, title, due, completed, onCompletedChange } = props;

  const [updating, setUpdating] = useState(false);

  function onClick(e) {
    const value = e.target.checked;
    setUpdating(true);
    onCompletedChange(id, value);
  }

  return (
    <li className={css.item}>
      {updating && (
        <span>Uppfæri</span>
      )}
      {!updating && (
        <React.Fragment>
          <input className={css.item__input} type="checkbox" checked={completed} onClick={onClick} />
          <Link href={`/${id}`}>
            <a className={css.item__link}>{title}</a>
          </Link>
          {due && (
            <span className={css.item__due}> Klárist fyrir {due}</span>
          )}
        </React.Fragment>
      )}
    </li>
  );
}
