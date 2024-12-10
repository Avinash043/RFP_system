import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

function RegisterAdmin() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    mobile: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  
  //Form validation

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "First name is required.";
    if (!formData.lastname) newErrors.lastname = "Last name is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
   
    if (!formData.password) {
      newErrors.password = "Password is required";
    } 
    if (!formData.confirmpassword) {
      newErrors.confirmpassword = "Confirm Password is required";
    } 
    if (formData.password !== formData.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match.";
    }
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit phone number.";
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

    if (!validate()) {
      toast.error("Please enter required fields before submitting.");
      return;
    }
 //handling API
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
        toast.success("Register as Admin");
        navigate("/dashboard");
      } else {
        toast.error("Invalid Credentials");
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
                          
                        />
                        {errors.firstname && (
                          <p className="error">{errors.firstname}</p>
                        )}
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
                          
                        />
                        {errors.lastname && (
                          <p className="error">{errors.lastname}</p>
                        )}
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
                          
                        />
                        {errors.email && (
                          <p className="error">{errors.email}</p>
                        )}
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
                          
                        />
                        {errors.mobile && (
                          <p className="error">{errors.mobile}</p>
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
                          
                        />
                        {errors.confirmpassword && (
                          <p className="error">{errors.confirmpassword}</p>
                        )}
                      </div>

                      <div className="mt-3">
                        <button
                          className="btn btn-primary btn-block waves-effect waves-light"
                          type="submit"
                        >
                         Register As Admin
                        </button>
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
