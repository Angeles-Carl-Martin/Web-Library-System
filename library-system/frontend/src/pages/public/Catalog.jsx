import { useEffect, useState } from "react";
import api from "../../services/api.js";
import BookCard from "../../components/BookCard.jsx";

function Catalog() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/books")
      .then((response) => setBooks(response.data))
      .catch(() => setBooks([]));
  }, []);

  const filteredBooks = books.filter((book) =>
    [book.title, book.author_name, book.category_name, book.isbn]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="section-header">
        <h1>Book Catalog</h1>
        <input
          type="search"
          placeholder="Search title, author, category, or ISBN"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="grid">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}

export default Catalog;
