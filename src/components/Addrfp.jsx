import { useState } from "react";
import Header from "./Header";
import SideleftBar from "./SideleftBar";
import toast, { Toaster } from "react-hot-toast";

function Addrfp() {
  const [formData, setFormData] = useState({
    item_name: "",
    rfp_no: "",
    quantity: "",
    last_date: "",
    minimun_price: "",
    maximum_price: "",
    categories: "",
    vendors: "",
    item_description: "",
  });

  const [errors, setErrors] = useState({});
  //Form Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.item_name) newErrors.item_name = "Item Name is required.";
    if (!formData.rfp_no) newErrors.rfp_no = "RFP No is required.";
    if (!formData.quantity || formData.quantity <= 0)
      newErrors.quantity = "Quantity must be greater than 0.";
    if (!formData.last_date) newErrors.last_date = "Last date is required.";
    if (!formData.minimum_price || formData.minimum_price <= 0)
      newErrors.minimum_price = "Minimum Price must be greater than 0.";
    if (!formData.maximum_price || formData.maximum_price <= 0)
      newErrors.maximum_price = "Maximum Price must be greater than 0.";
    if (Number(formData.minimum_price) >= Number(formData.maximum_price))
      newErrors.maximum_price =
        "Maximum Price must be greater than Minimum Price.";
    if (!formData.vendors) newErrors.vendors = "Vendors field is required.";
    if (!formData.item_description)
      newErrors.item_description = "Item Description is required.";
    if (formData.categories.length === 0) {
      newErrors.categories = "At least one category must be selected.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  //handle changes in input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      const response = await fetch("https://rfpdemo.velsof.com/api/createrfp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("res", response);

      const result = await response.json();
      if (result.response == "success") {
        console.log("Data submitted successfully:", result);
        toast.success("Form submitted successfully!");
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
        toast.error("Error submitting form.");
      }
    } catch (error) {
      console.error("Error:", error);
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
        
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              {/* <!-- start page title --> */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0 font-size-18">Add RFP </h4>
                  </div>
                  {/* form */}
                  <form
                    className="form-horizontal"
                    action=""
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="item_name">Item Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="item_name"
                            placeholder="Enter item_name"
                            name="item_name"
                            value={formData.item_name}
                            onChange={handleChange}
                          />
                          {errors.item_name && (
                            <small className="text-danger">
                              {errors.item_name}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="rfp_no">RFP No</label>
                          <input
                            type="text"
                            className="form-control"
                            id="rfp_no"
                            placeholder="Enter rfp_no"
                            name="rfp_no"
                            value={formData.rfp_no}
                            onChange={handleChange}
                          />
                          {errors.rfp_no && (
                            <small className="text-danger">
                              {errors.rfp_no}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="quantity">Quantity</label>
                          <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            placeholder="Enter quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                          />
                          {errors.quantity && (
                            <small className="text-danger">
                              {errors.quantity}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="last_date">Last date</label>
                          <input
                            type="Date"
                            className="form-control"
                            id="last_date"
                            placeholder="Enter last_date"
                            name="last_date"
                            value={formData.last_date}
                            onChange={handleChange}
                          />
                          {errors.last_date && (
                            <small className="text-danger">
                              {errors.last_date}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="minimum_price">Minimum Price</label>
                          <input
                            type="number"
                            className="form-control"
                            id="minimum_price"
                            name="minimum_price"
                            value={formData.minimum_price}
                            placeholder="Enter minimum_price"
                            onChange={handleChange}
                          />
                          {errors.minimum_price && (
                            <small className="text-danger">
                              {errors.minimum_price}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="maximum_price">Maximun Price</label>
                          <input
                            type="number"
                            className="form-control"
                            id="maximum_price"
                            placeholder="Enter maximum_price"
                            name="maximum_price"
                            value={formData.maximum_price}
                            onChange={handleChange}
                          />
                          {errors.maximum_price && (
                            <small className="text-danger">
                              {errors.maximum_price}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="vendors">Vendor</label>
                          <input
                            type="text"
                            className="form-control"
                            id="vendors"
                            placeholder="No of vendors"
                            name="vendors"
                            value={formData.vendors}
                            onChange={handleChange}
                          />
                          {errors.vendors && (
                            <small className="text-danger">
                              {errors.vendors}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="item_description">
                            Item Description
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="item_description"
                            placeholder="Enter item_description"
                            name="item_description"
                            value={formData.item_description}
                            onChange={handleChange}
                          />
                          {errors.item_description && (
                            <small className="text-danger">
                              {errors.item_description}
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
                            <option value="5">Cloth</option>
                          </select>
                          {errors.categories && (
                            <small className="text-danger">
                              {errors.categories}
                            </small>
                          )}
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
