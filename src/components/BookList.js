import React from "react";
import BookShelf from "./BookShelf";

function BookList({ books, onMoveBook }) {
  const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
  const wantToRead = books.filter((book) => book.shelf === "wantToRead");
  const read = books.filter((book) => book.shelf === "read");

  return (
    <div className="list-books-content">
      <div>
        <BookShelf
          title="Currently Reading"
          books={currentlyReading}
          onMoveBook={onMoveBook}
        />
        <BookShelf
          title="Want to Read"
          books={wantToRead}
          onMoveBook={onMoveBook}
        />
        <BookShelf title="Read" books={read} onMoveBook={onMoveBook} />
      </div>
    </div>
  );
}

export default BookList;