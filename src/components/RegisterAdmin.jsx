import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast, { Toaster } from 'react-hot-toast';

function RegisterAdmin() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    mobile: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Dynamically update the property using the name attribute
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch(
        "https://rfpdemo.velsof.com/api/registeradmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.response == "success") {
        toast.success('Register as Admin')
        navigate("/dashboard")
      } else {
        toast.error("Invalid Credentials")
      }
    } catch (error) {
      toast.error("Network error:", error);
    }
  };
  return (
    <div>
      <Toaster />
      <div className="account-pages my-5 pt-sm-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card overflow-hidden">
                <div className="bg-soft-primary">
                  <div className="row">
                    <div className="col-12">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome to RFP System!</h5>
                        <p>Sign in to continue</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div className="p-2">
                    <form
                      className="form-horizontal"
                      action="index.html"
                      onSubmit={handleSubmit}
                    >
                      <div className="form-group">
                        <label htmlFor="firstname">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstname"
                          placeholder="First Name"
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastname"
                          name="lastname"
                          placeholder="Last Name"
                          value={formData.lastname}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="mobile">Mobile</label>
                        <input
                          type="number"
                          className="form-control"
                          id="mobile"
                          name="mobile"
                          placeholder="Enter mobile number"
                          value={formData.mobile}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="userPassword">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="userPassword"
                          name="password"
                          placeholder="Enter password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          name="confirmpassword"
                          placeholder="Enter password"
                          value={formData.confirmpassword}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mt-3">
                        <button
                          className="btn btn-primary btn-block waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <h5 className="font-size-14 mb-3">Sign in with</h5>

                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <a
                              href="javascript::void()"
                              className="social-list-item bg-primary text-white border-primary"
                            >
                              <i className="mdi mdi-facebook"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              href="javascript::void()"
                              className="social-list-item bg-info text-white border-info"
                            >
                              <i className="mdi mdi-twitter"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              href="javascript::void()"
                              className="social-list-item bg-danger text-white border-danger"
                            >
                              <i className="mdi mdi-google"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-4 text-center">
                        <Link to="/register" className="text-muted">
                          <i className="mdi mdi-lock mr-1"></i> Register as
                          Vendor
                        </Link>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/login" className="text-muted">
                          <i className="mdi mdi-lock mr-1"></i> Forgot your
                          password?
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                <div>
                  <p>
                    &copy; Copyright{" "}
                    <i className="mdi mdi-heart text-danger"></i> RFP System
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterAdmin;
