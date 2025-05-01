import React, { useState, useCallback } from "react";
import { search } from "../BooksAPI";
import Book from "./Book";
import { Link } from 'react-router-dom'; 

function SearchBooks({ myBooks, onMoveBook }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = useCallback(async (newQuery) => {
    setQuery(newQuery);

    if (newQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = await search(newQuery, 20);
    console.log("Search Results:", results);

    if (results && Array.isArray(results)) {
      const updatedResults = results.map((book) => {
        const existingBook = myBooks.find((b) => b.id === book.id);
        if (existingBook) {
          book.shelf = existingBook.shelf;
        } else {
          book.shelf = 'none';
        }
        return book;
      });
      setSearchResults(updatedResults);
    } else {
      setSearchResults([]);
    }
  }, [myBooks]);

  const debouncedSearch = useCallback((newQuery) => {
    setTimeout(() => {
      handleSearch(newQuery);
    }, 300);
  }, [handleSearch]);

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        {searchResults.length > 0 ? (
          <ol className="books-grid">
            {searchResults.map((book) => (
              <Book key={book.id} book={book} onMoveBook={onMoveBook} />
            ))}
          </ol>
        ) : (
          query.trim() !== "" && <p>No books found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default SearchBooks;