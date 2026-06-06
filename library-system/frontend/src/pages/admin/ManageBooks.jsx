import { useEffect, useState } from "react";
import BookTable from "../../components/BookTable.jsx";
import api from "../../services/api.js";

function ManageBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get("/books")
      .then((response) => setBooks(response.data))
      .catch(() => setBooks([]));
  }, []);

  return (
    <section>
      <h1>Manage Books</h1>
      <BookTable books={books} />
    </section>
  );
}

export default ManageBooks;
