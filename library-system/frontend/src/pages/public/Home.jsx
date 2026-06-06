import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Library Management</p>
        <h1>Find, borrow, reserve, and manage library books.</h1>
        <p>
          A React and Node.js library system for members, admins, and super admins.
        </p>
        <div className="actions">
          <Link className="button-link" to="/catalog">Browse Catalog</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
