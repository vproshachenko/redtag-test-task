import { API_URL } from "../../config";
import type { Book } from "../types";

export async function getAllBooks(): Promise<Book[]> {
  const response = await fetch(`${API_URL}books`);
  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.statusText}`);
  }
  return response.json();
}

export async function getBookById(id: string): Promise<Book> {
  const response = await fetch(`${API_URL}books/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch book with ID ${id}: ${response.statusText}`);
  }

  return response.json();
}

export async function createBook(bookData: Omit<Book, 'id'>): Promise<Book> {
  const response = await fetch(`${API_URL}books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });
  if (!response.ok) {
    throw new Error(`Failed to create book: ${response.statusText}`);
  }
  return response.json();
}

export async function updateBook(id: string, updatedData: Partial<Omit<Book, 'id'>>): Promise<Book> {
  const response = await fetch(`${API_URL}books/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error(`Failed to update book: ${response.statusText}`);
  }
  return response.json();
}

export async function deleteBook(id: string): Promise<void> {
  const response = await fetch(`${API_URL}books/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete book: ${response.statusText}`);
  }
}