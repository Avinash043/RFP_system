import { useState } from "react";
import { Link } from "react-router";
import Header from "./Header";
import SideleftBar from "./SideleftBar";
import toast, { Toaster } from 'react-hot-toast';

function Addrfp() {
  const [formData, setFormData] = useState({
    item_name: "",
    rfp_no: "",
    quantity: "",
    last_dat: "",
    minimun_price: "",
    maximum_price: "",
    categories: "",
    vendors: "",
    item_description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://rfpdemo.velsof.com/api/createrfp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("res",response);

      const result = await response.json();
      if (result.response == "success") {
       
        console.log("Data submitted successfully:", result);
        toast("Form submitted successfully!");
        setFormData({
          item_name: "",
          rfp_no: "",
          quantity: "",
          last_dat: "",
          minimun_price: "",
          maximum_price: "",
          categories: "",
          vendors: "",
          item_description: "",
        }); 
      } else {
       
        toast("Error submitting form.");
      }
    } catch (error) {
      toast.error("Error:", error);
      
    }
  };

  return (
    <div data-sidebar="dark">
      <div id="layout-wrapper">
      <Toaster />
        {/* Header */}
        <Header />
        {/* <!-- ========== Left Sidebar Start ========== --> */}
        <SideleftBar />
        {/* form */}
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              {/* <!-- start page title --> */}
              <div className="row">
                <div className="col-12">
                  <form
                    className="form-horizontal"
                    action=""
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="item_name">item_name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="item_name"
                            placeholder="Enter item_name"
                            name="item_name"
                            value={formData.item_name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="rfp_no">
                            RFP no<em>*</em>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="rfp_no"
                            placeholder="Enter rfp_no"
                            name="rfp_no"
                            value={formData.rfp_no}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="quantity">quantity*</label>
                          <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            placeholder="Enter quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="last_date">last_date*</label>
                          <input
                            type="Date"
                            className="form-control"
                            id="last_date"
                            placeholder="Enter last_date"
                            name="last_date"
                            value={formData.last_date}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="minimum_price">minimum_price*</label>
                          <input
                            type="number"
                            className="form-control"
                            id="minimum_price"
                            name="minimum_price"
                            value={formData.minimum_price}
                            placeholder="Enter minimum_price"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="maximum_price">maximum_price</label>
                          <input
                            type="number"
                            className="form-control"
                            id="maximum_price"
                            placeholder="Enter maximum_price"
                            name="maximum_price"
                            value={formData.maximum_price}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="vendors">vendors</label>
                          <input
                            type="text"
                            className="form-control"
                            id="vendors"
                            placeholder="No of vendors"
                            name="vendors"
                            value={formData.vendors}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="item_description">
                            item_description
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="item_description"
                            placeholder="Enter item_description"
                            name="item_description"
                            value={formData.item_description}
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
                            <option value="5">Cloth</option>
                          </select>
                        </div>
                      </div>

                      <div className="p-2 mt-3">
                        <button
                          className="btn btn-primary btn-block waves-effect waves-light"
                          type="submit"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div data-simplebar className="h-100">
          {/* <!--- Sidemenu --> */}
          <div id="sidebar-menu">
            {/* <!-- Left Menu Start --> */}
            <ul className="metismenu list-unstyled" id="side-menu">
              <li>
                <Link to="/dashboard" className="waves-effect">
                  <i className="mdi mdi-file-document-box-outline"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/vendors" className="waves-effect">
                  <i className="mdi mdi-receipt"></i>
                  <span>Vendors</span>
                </Link>
              </li>
              <li>
                <Link to="/rfp" className="waves-effect">
                  <i className="mdi mdi-flip-vertical"></i>
                  <span>RFP Lists</span>
                </Link>
              </li>
              <li>
                <Link to="users.html" className="waves-effect">
                  <i className="mdi mdi-apps"></i>
                  <span>User Management</span>
                </Link>
              </li>

              <li>
                <Link to="#" className="waves-effect">
                  <i className="mdi mdi-weather-night"></i>
                  <span>Categories</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Footer */}
        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">2022 &copy; Copyright.</div>
              <div className="col-sm-6">
                <div className="text-sm-right d-none d-sm-block">
                  Support Email:
                  <a href="#" target="_blank" className="text-muted">
                    {" "}
                    support@velsof.com{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      {/* <!-- end main content--> */}
    </div>
  );
}

export default Addrfp;
