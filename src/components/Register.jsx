import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";

function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    password: "",
    confirmpassword: "",
    lastname: "",
    email: "",
    revenue: "",
    no_of_employee: "",
    category: "",
    pancard_no: "",
    gst_no: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    // Check required fields
    if (!formData.firstname) newErrors.firstname = "First name is required.";
    if (!formData.lastname) newErrors.lastname = "Last name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.confirmpassword) {
      newErrors.confirmpassword = "Confirm Password is required";
    }
    if (formData.password !== formData.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match.";
    }
    if (!formData.revenue || isNaN(formData.revenue)) {
      newErrors.revenue = "Revenue must be a number.";
    }
    if (!formData.no_of_employees || isNaN(formData.no_of_employees)) {
      newErrors.no_of_employees = "Number of employees must be a number.";
    }
    if (!formData.gst_no) newErrors.gst_no = "GST No is required.";
    if (!formData.pancard_no) newErrors.pancard_no = "PAN No is required.";
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit phone number.";
    }
    if (formData.category.length === 0) {
      newErrors.category = "At least one category must be selected.";
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      toast.error("Please enter required fields before submitting.");
      return;
    }
    try {
      const response = await fetch(
        "https://rfpdemo.velsof.com/api/registervendor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log("formData", formData.category);
      console.log("response", data.response);
      if (data.response == "success") {
        toast.success("Register as Vendor");
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
            <div className="col-md-8 col-lg-6 col-xl-8">
              <div className="card overflow-hidden">
                <div className="bg-soft-primary">
                  <div className="row">
                    <div className="col-12">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome to RFP System!</h5>
                        <p>Regsiter as Vendor</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div className="p-4">
                    <form
                      className="form-horizontal"
                      action=""
                      onSubmit={handleSubmit}
                    >
                      <div className="row">
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="firstname">First name*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="firstname"
                              placeholder="Enter Firstname"
                              name="firstname"
                              value={formData.firstname}
                              onChange={handleChange}
                            />
                            {errors.firstname && (
                              <small className="text-danger">
                                {errors.firstname}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="lastname">
                              Last Name<em>*</em>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastname"
                              placeholder="Enter Lastname"
                              name="lastname"
                              value={formData.lastname}
                              onChange={handleChange}
                            />
                            {errors.lastname && (
                              <small className="text-danger">
                                {errors.lastname}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="email">Email*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              placeholder="Enter Email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                            {errors.email && (
                              <small className="text-danger">
                                {errors.email}
                              </small>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="password">Password*</label>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              placeholder="Enter Password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                            />
                            {errors.password && (
                              <small className="text-danger">
                                {errors.password}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="password">Confirm Password*</label>
                            <input
                              type="password"
                              className="form-control"
                              id="confirmpassword"
                              name="confirmpassword"
                              value={formData.confirmpassword}
                              placeholder="Enter Confirm Password"
                              onChange={handleChange}
                            />
                            {errors.confirmpassword && (
                              <small className="text-danger">
                                {errors.confirmpassword}
                              </small>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="revenue">
                              Revenue (Last 3 Years in Lacks)*
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="revenue"
                              placeholder="Enter Revenue"
                              name="revenue"
                              value={formData.revenue}
                              onChange={handleChange}
                            />
                            {errors.revenue && (
                              <small className="text-danger">
                                {errors.revenue}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="noofemployees">
                              No of Employees*
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="noofemployees"
                              placeholder="No of Employees"
                              name="no_of_employees"
                              value={formData.no_of_employees}
                              onChange={handleChange}
                            />
                            {errors.no_of_employees && (
                              <small className="text-danger">
                                {errors.no_of_employees}
                              </small>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="gstno">GST No*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="gstno"
                              placeholder="Enter GST No"
                              name="gst_no"
                              value={formData.gst_no}
                              onChange={handleChange}
                            />
                            {errors.gst_no && (
                              <small className="text-danger">
                                {errors.gst_no}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="panno">PAN No*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="panno"
                              placeholder="Enter PAN No"
                              name="pancard_no"
                              value={formData.pancard_no}
                              onChange={handleChange}
                            />
                            {errors.pancard_no && (
                              <small className="text-danger">
                                {errors.pancard_no}
                              </small>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="mobile">Phone No*</label>
                            <input
                              type="number"
                              className="form-control"
                              id="mobile"
                              placeholder="Enter Phone No"
                              name="mobile"
                              value={formData.mobile}
                              onChange={handleChange}
                            />
                            {errors.mobile && (
                              <small className="text-danger">
                                {errors.mobile}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="Categories">Categories</label>
                            <select
                              className="form-control"
                              multiple
                              id="Categories"
                              name="category"
                              value={formData.category}
                              onChange={handleChange}
                            >
                              <option value="">All Categories</option>
                              <option value="1">Software</option>
                              <option value="2">Hardware</option>
                              <option value="3">Office Furniture</option>
                              <option value="4">Stationery</option>
                            </select>
                            {errors.category && (
                              <small className="text-danger">
                                {errors.category}
                              </small>
                            )}
                          </div>
                        </div>

                        <div className="p-2 mt-3 flex flex-row flex-wrap gap-2">
                          <button
                            className="btn btn-primary flex-1 waves-effect waves-light mr-2"
                            type="submit"
                          >
                            Register
                          </button>
                          <Link
                            className="btn btn-primary flex-1 waves-effect waves-light"
                            to="/login"
                          >
                            Back to Login
                          </Link>
                        </div>
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
      Name
    </div>
  );
}

export default Register;
