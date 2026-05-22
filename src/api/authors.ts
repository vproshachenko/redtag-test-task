import { API_URL } from "../../config";
import { deleteBook } from "./books";
import type { Author, Book } from "../types";

export async function getAllAuthors(): Promise<Author[]> {
  const response = await fetch(`${API_URL}authors`);
  if (!response.ok) {
    throw new Error(`Failed to fetch authors: ${response.statusText}`);
  }
  return response.json();
}

export async function createAuthor(name: string): Promise<Author> {
  const response = await fetch(`${API_URL}authors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error(`Failed to create author: ${response.statusText}`);
  }
  return response.json();
}

export async function cascadeDeleteAuthor(authorId: string, allBooks: Book[]): Promise<void> {
  const booksByAuthor = allBooks.filter((book) => book.authorId === authorId);
  const deleteWorkerPool = booksByAuthor.map((book) => deleteBook(book.id));
  await Promise.all(deleteWorkerPool);

  const response = await fetch(`${API_URL}authors/${authorId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete author: ${response.statusText}`);
  }
}