import { Link } from "react-router";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Header() {
  const navigate = useNavigate();

  const token = Cookies.get("token");;
const decoded = jwtDecode(token);

console.log("decoded",decoded)
  const handleLogout = () => {
    // Clear token from cookies
    Cookies.remove("token");

    // Redirect to login page
    navigate("/login"); 
  };


  return (
    <header id="page-topbar">
      <div className="">
        <div className="d-flex">
          {/* LOGO */}
          <div className="navbar-brand-box">
            <Link to="/dashboard" className="">
              <span className="">
                <img
                  src="assets/images/velocity_logo.png"
                  alt="logo"
                  height="40"
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="d-flex pr-2">
        <div className="dropdown d-inline-block">
          <span className="d-none d-xl-inline-block ml-1 text-white mr-2" key="t-henry">
            Welcome User 
          </span>
          &nbsp;&nbsp;
          <button onClick={handleLogout}>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
