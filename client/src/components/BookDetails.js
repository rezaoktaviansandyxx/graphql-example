import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ bookId }) => {
  const { loading, data } = useQuery(getBookQuery, {
    variables: { id: bookId },
  });

  let display;
  if (loading) {
    display = <div>Loading book details...</div>;
  } else if (data) {
    display = (
      <div>
        <h2>{data.book.name}</h2>
        <p>{data.book.genre}</p>
        <p>{data.book.author.name}</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          {data.book.author.books.map((book) => (
            <li key={book.id}>{book.name}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    display = <div>No book selected</div>;
  }

  return <div id="book-details">{display}</div>;
};

export default BookDetails;
