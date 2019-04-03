import React, { useState, useEffect } from 'react';
import Error from 'next/error';

import Layout from '../components/layout/Layout';
import TodoDetail from '../components/todo-detail/TodoDetail';

import { getTodo } from '../api';

function Home(props) {
  const { initialTodo } = props;

  if (!initialTodo.ok) {
    return <Error statusCode={404} />;
  }

  return (
    <Layout title={initialTodo.result.title}>
      <TodoDetail item={initialTodo.result} />
    </Layout>
  );
}

Home.getInitialProps = async ({ query }) => {
  const { id } = query;

  const todo = await getTodo(id);

  return {
    initialTodo: todo,
  };
}

export default Home
