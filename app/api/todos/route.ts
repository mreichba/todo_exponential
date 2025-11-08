import { NextResponse } from 'next/server';
import {
  addTodo,
  deleteTodo,
  listTodos,
  toggleTodoStatus,
  updateTodoText
} from '../../../lib/todo-store';

export const dynamic = 'force-dynamic';

const respondWithTodos = async () => {
  const todos = await listTodos();
  return NextResponse.json({ todos });
};

const badRequest = (message: string) => {
  return NextResponse.json({ error: message }, { status: 400 });
};

export async function GET(): Promise<Response> {
  return respondWithTodos();
}

export async function POST(request: Request): Promise<Response> {
  const { text } = await request.json();
  if (typeof text !== 'string' || !text.trim()) {
    return badRequest('Text is required');
  }

  await addTodo(text);
  return respondWithTodos();
}

export async function PUT(request: Request): Promise<Response> {
  const { id, text } = await request.json();
  if (typeof id !== 'string' || typeof text !== 'string' || !text.trim()) {
    return badRequest('Valid id and text are required');
  }

  await updateTodoText(id, text);
  return respondWithTodos();
}

export async function PATCH(request: Request): Promise<Response> {
  const { id } = await request.json();
  if (typeof id !== 'string') {
    return badRequest('Valid id is required');
  }

  await toggleTodoStatus(id);
  return respondWithTodos();
}

export async function DELETE(request: Request): Promise<Response> {
  const { id } = await request.json();
  if (typeof id !== 'string') {
    return badRequest('Valid id is required');
  }

  await deleteTodo(id);
  return respondWithTodos();
}
