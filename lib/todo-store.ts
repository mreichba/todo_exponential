import type { Todo } from '../types/todo';

const seedEntries = ['Read the AGENT spec', 'Sketch the UI', 'Ship the Todo app'];

let nextId = 1;
const createId = () => `todo-${nextId++}`;

let todos: Todo[] = seedEntries.map((text, index) => ({
  id: createId(),
  text,
  completed: index === seedEntries.length - 1,
  createdAt: Date.now() - index * 1000
}));

const clean = (text: string): string => text.trim();

export const listTodos = async (): Promise<Todo[]> => {
  return [...todos].sort((a, b) => b.createdAt - a.createdAt);
};

export const addTodo = async (rawText: string): Promise<void> => {
  const text = clean(rawText);
  if (!text) return;

  todos = [
    {
      id: createId(),
      text,
      completed: false,
      createdAt: Date.now()
    },
    ...todos
  ];
};

export const updateTodoText = async (id: string, rawText: string): Promise<void> => {
  const text = clean(rawText);
  if (!text) return;

  todos = todos.map((todo) => (todo.id === id ? { ...todo, text } : todo));
};

export const toggleTodoStatus = async (id: string): Promise<void> => {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
};

export const deleteTodo = async (id: string): Promise<void> => {
  todos = todos.filter((todo) => todo.id !== id);
};
