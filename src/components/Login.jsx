import { useState } from "react";
import { Link, useNavigate } from "react-router";
//import { useForm } from "react-hook-form"
import Cookies from "js-cookie";
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, 
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch("https://rfpdemo.velsof.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      const setTokenInCookies = (token) => {
        // Set the token in cookies
        Cookies.set("token", token, { expires: 1, secure: true }); 
      };
      
      
      setTokenInCookies(data.token); 

      console.log("response",data.response)
      if (data.response == "success") {
        toast.success('Login successful')
        navigate("/dashboard")
      } else {
        toast.error("Invalid Credentials")
      }
    } catch (error) {
      toast.error(error)
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
                      <div className="form-group form-contr">
                        <label htmlFor="username">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="Enter Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          // {...register("email",{required:{value:true, message:"Enter password"}})}
                          
                        />
                        {/* <p className="error">{errors.email?.message}</p> */}
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
                          // {...register("password",{required:{value:true, message:"Enter password"}})}
                          
                        />
                        {/* <p className="error">{errors.password?.message}</p> */}
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