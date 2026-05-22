import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Book, type Author } from '../types';
import { getAllBooks, deleteBook, createBook, updateBook } from '../api/books';
import { getAllAuthors, cascadeDeleteAuthor, createAuthor } from '../api/authors';
import { useNavigate } from 'react-router-dom';

interface LibraryContextType {
  books: Book[];
  authors: Author[];
  addBook: (bookData: Omit<Book, 'id'>) => Promise<void>;
  editBook: (id: string, bookData: Omit<Book, 'id'>) => Promise<void>;
  removeBook: (id: string) => Promise<void>;
  addAuthor: (authorName: string) => Promise<void>;
  removeAuthor: (id: string, books: Book[]) => Promise<void>;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [booksData, authorsData] = await Promise.all([
          getAllBooks(),
          getAllAuthors(),
        ]);
        setBooks(booksData);
        setAuthors(authorsData);
      } catch (err) {
        console.error("Failed to seed library context:", err);
      }
    };
    fetchAllData();
  }, []);

  const addBook = async (bookData: Omit<Book, 'id'>) => {
    const newBook = await createBook(bookData);
    setBooks((prev) => [...prev, newBook]);
    navigate('/')
  };

  const editBook = async (id: string, bookData: Omit<Book, 'id'>) => {
    const updatedBook = await updateBook(id, bookData);
    setBooks((prev) => prev.map((b) => (b.id === id ? updatedBook : b)));
    navigate('/')
  };

  const removeBook = async (id: string) => {
    await deleteBook(id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const addAuthor = async (authorName: string) => {
    const newAuthor = await createAuthor(authorName);
    setAuthors((prev) => [...prev, newAuthor]);
    navigate('/authors')
  };

  const removeAuthor = async (id: string) => {
    try {
      await cascadeDeleteAuthor(id, books);

      setAuthors((prev) => prev.filter((a) => a.id !== id));

      setBooks((prev) => prev.filter((b) => b.authorId !== id));

    } catch (err) {
      console.error("Cascading operation failed:", err);
    }
  };

  return (
    <LibraryContext.Provider value={{ books, authors, addBook, editBook, removeBook, addAuthor, removeAuthor }}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
}