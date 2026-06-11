import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <img src={logo} alt="SystemDrawn" className="navbar-logo" />
    </nav>
  );
}

export default Navbar;
