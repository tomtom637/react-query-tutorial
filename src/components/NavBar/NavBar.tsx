import { Link } from "react-router-dom";

export default function Navbar(): JSX.Element {
  return (
    <nav style={{ marginBlockEnd: "30px" }}>
      <ul style={{ display: "flex", gap: "15px" }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/basic">Basic</Link>
        </li>
        <li>
          <Link to="/assignment">Assignment</Link>
        </li>
        <li>
          <Link to="/assignment2">Assignment 2</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
