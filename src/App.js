import "./App.css";
import { useState, useEffect } from "react";
import { getAll, update } from "./BooksAPI";
import BookList from "./components/BookList";
import SearchBooks from "./components/SearchBooks";
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const allBooks = await getAll();
      setBooks(allBooks);
    };

    fetchBooks();
  }, []);

  const moveBook = async (book, newShelf) => {
    await update(book, newShelf);
    setBooks((prevBooks) => {
      const bookExists = prevBooks.some((b) => b.id === book.id);
      if (bookExists) {
        return prevBooks.map((b) => (b.id === book.id ? { ...b, shelf: newShelf } : b));
      } else {
        return [...prevBooks, { ...book, shelf: newShelf }];
      }
    });
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookList books={books} onMoveBook={moveBook} />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        } />
        <Route path="/search" element={
          <SearchBooks
            myBooks={books}
            onMoveBook={moveBook}
            onCloseSearch={() => {}}
          />
        } />
      </Routes>
    </div>
  );
}

export default App;