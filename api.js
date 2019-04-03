import 'isomorphic-fetch';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { apiUrl } = publicRuntimeConfig;

export async function deleteTodo(id) {
  const options = {
    method: 'DELETE',
  };

  const url = new URL(`/${id}`, apiUrl);
  const response = await fetch(url.href, options);

  const result = await response.text();

  return {
    ok: response.ok,
    result,
  };
}

export async function addTodo(title, due) {
  const options = {
    body: JSON.stringify({
      title,
      due,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  };

  const url = new URL('/', apiUrl);
  const response = await fetch(url.href, options);

  const result = await response.json();

  return {
    ok: response.ok,
    result,
  };
}

export async function updateTodo(id, { title, completed, due } = {}) {
  const data = {};

  if (title) {
    data.title = title;
  }

  data.completed = completed;

  if (due) {
    data.due = due;
  }

  console.log('UPDATE', data)

  const options = {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'PATCH',
  };

  const url = new URL(`/${id}`, apiUrl);
  const response = await fetch(url.href, options);

  const result = await response.json();

  return {
    ok: response.ok,
    result,
  };
}

export async function getTodos(hideCompleted = undefined) {
  const completed = hideCompleted ? false : null

  const url = new URL(`/?order=desc&completed=${completed}`, apiUrl);
  const res = await fetch(url.href);
  const result = await res.json();

  return {
    ok: res.ok,
    result,
  };
}

export async function getTodo(id) {

  const url = new URL(`/${id}`, apiUrl);
  const res = await fetch(url.href);
  const item = await res.json();

  return {
    ok: res.ok,
    result: item,
  };

  return item;
}
