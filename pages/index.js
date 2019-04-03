import React, { useState, useEffect } from 'react';

import Layout from '../components/layout/Layout';
import Todos from '../components/todos/Todos';
import Form from '../components/form/Form';

import { getTodos, updateTodo } from '../api';

function Home(props) {
  const { initialItems } = props;

  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hideCompleted, setHideCompleted] = useState(false);

  async function onCreated(item) {
    setLoading(true);
    const todos = await getTodos(hideCompleted);
    setItems(todos.result);
    setLoading(false);
  }

  async function onToggleShowHidden() {
    setLoading(true);
    const todos = await getTodos(!hideCompleted);
    setItems(todos.result);
    setHideCompleted(!hideCompleted);
    setLoading(false);
  }

  async function onCompletedChange(id, completed) {
    await updateTodo(id, { completed });
    const todos = await getTodos(hideCompleted);
    setItems(todos.result);
  }

  return (
    <Layout title="Verkefni">
      <Todos
        items={items || initialItems}
        loading={loading}
        hideCompleted={hideCompleted}
        onToggleShowHidden={onToggleShowHidden}
        onCompletedChange={onCompletedChange}
      />
      <Form onCreated={onCreated} />
    </Layout>
  );
}

Home.getInitialProps = async ({ req }) => {
  const todos = await getTodos();

  return { initialItems: todos.result };
}

export default Home
