import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSuccess = (credentialsResponse) => {
    setFormData((f) => ({ ...f, email: credentialsResponse.email }));
  };

  const handleError = () => {
    toast.error("Google Sign In Error");
  };

  //Form Validation
  const validate = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  //handle changes in input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //handles validation error
    if (!validate()) {
      toast.error("Please enter required fields before submitting.");
      return;
    }
    //Handling API
    try {
      const response = await fetch("https://rfpdemo.velsof.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Set the token in cookies
      const setTokenInCookies = (token) => {
        Cookies.set("token", token, { expires: 1, secure: true });
      };

      setTokenInCookies(data.token);

      console.log("response", data.response);
      if (data.response == "success") {
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      toast.error(error);
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
                    <form className="form-horizontal" onSubmit={handleSubmit}>
                      <div className="form-group form-contr">
                        <label htmlFor="username">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="Enter Email"
                          name="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                        {errors.email && (
                          <p className="error">{errors.email}</p>
                        )}
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
                        />
                        {errors.password && (
                          <p className="error">{errors.password}</p>
                        )}
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
                        {/* SIGN IN WITH GOOGLE */}
                        <div className="flex justify-center items-center h-auto">
                          <GoogleOAuthProvider clientId="272903930813-2ic6ftaosctgcjqlip1n4k1je2m0tfb3.apps.googleusercontent.com">
                            <GoogleLogin
                              onSuccess={handleSuccess}
                              onError={handleError}
                            />
                          </GoogleOAuthProvider>
                        </div>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/register" className="text-muted">
                          <i className="mdi mdi-lock mr-1"></i> Register as
                          Vendor
                        </Link>
                      </div>
                      <div className="mt-4 text-center">
                        <Link to="/registeradmin" className="text-muted">
                          <i className="mdi mdi-lock mr-1"></i> Register as
                          Admin
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

export default Login;
