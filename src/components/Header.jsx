import { Link } from "react-router";

function Header() {
  return (
    <header id="page-topbar">
      <div className="">
        <div className="d-flex">
          {/* LOGO */}
          <div className="navbar-brand-box">
            <Link to="/" className="">
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
            Welcome Henry
          </span>
          &nbsp;&nbsp;
          <Link class="" href="#">
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
