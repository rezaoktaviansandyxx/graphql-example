import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

const displayAuthors = (loading, data) => {
  if (loading) {
    return <option disabled>Loading authors</option>;
  } else {
    return data.authors.map((author) => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  }
};

const AddBook = () => {
  const { loading, data } = useQuery(getAuthorQuery);
  const [addBook, { newData }] = useMutation(addBookMutation);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <form id="add-book" onSubmit={submitForm.bind(this)}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {displayAuthors(loading, data)}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
