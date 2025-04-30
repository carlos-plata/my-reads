import React, { useState, useCallback } from "react";
import { search } from "../BooksAPI";
import Book from "./Book";

function SearchBooks({ onCloseSearch, myBooks, onMoveBook }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = useCallback(async (newQuery) => {
    setQuery(newQuery); // Update the query state immediately

    if (newQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = await search(newQuery, 20);
    if (results) {
      const updatedResults = results.map((book) => {
        const existingBook = myBooks.find((b) => b.id === book.id);
        if (existingBook) {
          book.shelf = existingBook.shelf;
        }
        return book;
      });
      setSearchResults(updatedResults);
    } else {
      setSearchResults([]);
    }
  }, [myBooks]);

  const debouncedSearch = useCallback((event) => {
    setTimeout(() => {
      handleSearch(event.target.value);
    }, 300); // Adjust the delay (in milliseconds) as needed
  }, [handleSearch]);

  // Directly update the query state on input change, and then debounce the search
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    debouncedSearch(event);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={onCloseSearch}>
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={handleInputChange} // Use the new handleInputChange
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
