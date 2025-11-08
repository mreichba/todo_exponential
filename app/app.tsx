"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Todo } from "../types/todo";
import {
  createTodo,
  editTodo,
  fetchTodos,
  removeTodo,
  toggleTodo,
} from "./actions";

const countLabel = (todos: Todo[]): string => {
  if (todos.length === 0) return "No todos yet";
  if (todos.length === 1) return "1 todo";
  return `${todos.length} todos`;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      const next = await fetchTodos();
      setTodos(next);
      setLoading(false);
    };

    void loadTodos();
  }, []);

  const handleAdd = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    const next = await createTodo(text);
    setTodos(next);
    setDraft("");
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const saveEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingId) return;

    const text = editingText.trim();
    if (!text) return;

    const next = await editTodo(editingId, text);
    setTodos(next);
    setEditingId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const handleToggle = async (id: string) => {
    const next = await toggleTodo(id);
    setTodos(next);
  };

  const handleDelete = async (id: string) => {
    const next = await removeTodo(id);
    if (editingId === id) {
      cancelEdit();
    }
    setTodos(next);
  };

  return (
    <main className="px-4 py-12 sm:py-16">
      <section className="mx-auto w-full max-w-2xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <header className="space-y-1 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Exponential Coding Assignment
          </p>
          <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Todo App
          </h1>
          <p className="text-sm text-slate-500">
            {countLabel(todos)}
          </p>
        </header>

        <form
          className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
          onSubmit={handleAdd}
        >
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="todo-input"
          >
            Add a todo
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="todo-input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Whats next to do?"
              autoComplete="off"
              className="w-full flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2 text-base text-slate-900 outline-none ring-slate-900/10 transition focus:ring-2"
            />
            <button
              type="submit"
              disabled={draft.trim().length === 0}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-slate-200"
            >
              Add
            </button>
          </div>
        </form>

        <ul className="space-y-3">
          {loading ? (
            <li className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
              Loading todos…
            </li>
          ) : todos.length === 0 ? (
            <li className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
              Nothing here yet. Add your first todo above.
            </li>
          ) : (
            todos.map((todo) => {
              const isEditing = editingId === todo.id;
              return (
                <li
                  key={todo.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  {isEditing ? (
                    <form className="space-y-3" onSubmit={saveEdit}>
                      <input
                        value={editingText}
                        onChange={(event) => setEditingText(event.target.value)}
                        autoFocus
                        className="w-full rounded-xl border border-slate-300 px-4 py-2 text-base text-slate-900 outline-none ring-slate-900/10 transition focus:ring-2"
                      />
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <button
                          type="submit"
                          className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <label className="flex flex-1 items-start gap-3">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                          checked={todo.completed}
                          onChange={() => void handleToggle(todo.id)}
                        />
                        <span
                          className={`flex-1 text-base ${
                            todo.completed
                              ? "text-slate-400 line-through"
                              : "text-slate-900"
                          }`}
                        >
                          {todo.text}
                        </span>
                      </label>
                      <div className="flex flex-col gap-2 sm:w-auto sm:flex-row">
                        <button
                          type="button"
                          onClick={() => startEdit(todo)}
                          className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleDelete(todo.id)}
                          className="inline-flex items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })
          )}
        </ul>
      </section>
    </main>
  );
}
