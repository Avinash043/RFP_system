
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
        // type === "select-multiple"
        //   ? Array.from(options)
        //       .filter((option) => option.selected)
        //       .map((option) => option.value)
        //       .join(",") // Join selected values into a single comma-separated string
        //   : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

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
      console.log("response",data.response)
      if (data.response == "success") {
        toast.success('Register as Vendor')
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
                              required
                            />
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
                              required
                            />
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
                              required
                            />
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
                              required
                            />
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
                              required
                            />
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
                              required
                            />
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
                              required
                            />
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
                              required
                            />
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
                              required
                            />
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
                              required
                            />
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
                              required
                            >
                              <option value="">All Categories</option>
                              <option value="1">Software</option>
                              <option value="2">Hardware</option>
                              <option value="3">Office Furniture</option>
                              <option value="4">Stationery</option>
                            </select>
                          </div>
                        </div>

                        <div className="p-2 mt-3">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                          >
                            Register
                          </button>
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
