function BookTable({ books }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>ISBN</th>
          <th>Available</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author_name || "-"}</td>
            <td>{book.category_name || "-"}</td>
            <td>{book.isbn || "-"}</td>
            <td>{book.available_copies}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookTable;
