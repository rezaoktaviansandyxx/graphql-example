import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";

// components
import BookDetails from "./BookDetails";

const BookList = () => {
  const { loading, data } = useQuery(getBooksQuery);
  const [selected, setSelected] = useState(null);

  const displayBooks = (loading, data) => {
    if (loading) {
      return <option disabled>Loading books</option>;
    } else {
      return data.books.map((book) => {
        return (
          <li key={book.id} onClick={() => setSelected(book.id)}>
            {book.name}
          </li>
        );
      });
    }
  };

  return (
    <div>
      <ul id="book-list">{displayBooks(loading, data)}</ul>
      {selected ? (
        <BookDetails bookId={selected} />
      ) : (
        <div>No Book Selected</div>
      )}
    </div>
  );
};

export default BookList;
