import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter(Boolean);

  if (pathnames.length <= 1) {
    return (
      <nav className="mx-1 my-3 ">
        <Link to="/">Home</Link>
      </nav>
    );
  }

  const parent = pathnames[0];

  return (
    <nav aria-label="breadcrumb" className="mx-1 my-3">
      <ol style={{ display: "flex", gap: "8px" }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <span> / </span>
          <Link className="capitalize" to={`/${parent}`}>
            {parent}
          </Link>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
