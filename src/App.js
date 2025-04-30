import "./App.css";
import { useState, useEffect } from "react";
import { getAll, update } from "./BooksAPI";
import BookList from "./components/BookList";
import SearchBooks from "./components/SearchBooks";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
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
      {showSearchPage ? (
        <SearchBooks
          onCloseSearch={() => setShowSearchpage(false)}
          myBooks={books}
          onMoveBook={moveBook}
        />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <BookList books={books} onMoveBook={moveBook} />
          <div className="open-search">
            <a onClick={() => setShowSearchpage(true)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;