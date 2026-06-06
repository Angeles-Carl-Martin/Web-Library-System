import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api.js";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    api.get(`/books/${id}`)
      .then((response) => setBook(response.data))
      .catch(() => setBook(null));
  }, [id]);

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <section className="details">
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author_name || "Unknown"}</p>
      <p><strong>Category:</strong> {book.category_name || "Uncategorized"}</p>
      <p><strong>ISBN:</strong> {book.isbn || "-"}</p>
      <p><strong>Publisher:</strong> {book.publisher || "-"}</p>
      <p><strong>Year:</strong> {book.publication_year || "-"}</p>
      <p><strong>Available copies:</strong> {book.available_copies}</p>
      <p>{book.description || "No description available."}</p>
    </section>
  );
}

export default BookDetails;
