import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <article className="card">
      <h3>{book.title}</h3>
      <p>{book.author_name || "Unknown author"}</p>
      <p>{book.category_name || "Uncategorized"}</p>
      <span className="status">{book.available_copies} available</span>
      <Link to={`/books/${book.id}`}>View Details</Link>
    </article>
  );
}

export default BookCard;
