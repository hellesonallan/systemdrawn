import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <img src={logo} alt="SystemDrawn" className="navbar-logo" />
      <button className="navbar-button" onClick={() => navigate("/login")}>
        Começar agora
      </button>
    </nav>
  );
}

export default Navbar;