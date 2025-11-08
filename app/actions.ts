'use client';

import type { Todo } from '../types/todo';

const BASE_URL = '/api/todos';

type TodoResponse = {
  todos: Todo[];
};

const handleResponse = async (response: Response): Promise<Todo[]> => {
  const data = (await response.json()) as TodoResponse & { error?: string };
  if (!response.ok) {
    throw new Error(data.error ?? 'Todo request failed');
  }

  return data.todos;
};

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(BASE_URL, { cache: 'no-store' });
  return handleResponse(response);
};

export const createTodo = async (text: string): Promise<Todo[]> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  return handleResponse(response);
};

export const editTodo = async (id: string, text: string): Promise<Todo[]> => {
  const response = await fetch(BASE_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, text })
  });

  return handleResponse(response);
};

export const toggleTodo = async (id: string): Promise<Todo[]> => {
  const response = await fetch(BASE_URL, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });

  return handleResponse(response);
};

export const removeTodo = async (id: string): Promise<Todo[]> => {
  const response = await fetch(BASE_URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });

  return handleResponse(response);
};
