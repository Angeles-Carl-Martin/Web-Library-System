import { NavLink } from "react-router-dom";

function Sidebar({ links }) {
  return (
    <aside className="sidebar">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to}>
          {link.label}
        </NavLink>
      ))}
    </aside>
  );
}

export default Sidebar;
