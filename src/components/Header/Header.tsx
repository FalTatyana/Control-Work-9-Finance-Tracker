import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Finance Tracker
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-3">
              <NavLink className="nav-link" to="/tracker/categories">
                Categories
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/add" className="btn btn-outline-success">
                Add transaction
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
 