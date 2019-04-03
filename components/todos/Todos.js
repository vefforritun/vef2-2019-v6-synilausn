import React from 'react';

import TodoItem from '../todo-item/TodoItem';
import Button from '../button/Button';

import css from './Todos.css';

export default function Todos(props) {
  const { items, loading, hideCompleted, onToggleShowHidden, onCompletedChange } = props;
  const buttonText = hideCompleted ? 'Sýna allt' : 'Fela búið';

  return (
    <React.Fragment>
      <Button onClick={onToggleShowHidden}>{buttonText}</Button>
      <ul className={css.todos}>
        {items.map((item, i) => (
          <TodoItem
            key={`${item.id}-${item.completed}` || i}
            id={item.id}
            title={item.title}
            due={item.due}
            completed={item.completed}
            onCompletedChange={onCompletedChange}
          />
        ))}
      </ul>
    </React.Fragment>
  )
}
