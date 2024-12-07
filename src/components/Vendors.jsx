
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Header from "./Header";
import SideleftBar from "./SideleftBar";

function Vendors() {
  const [vendorList, setVendorList] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      // Get Cookies
      const token = Cookies.get("token");
      console.log("token", token); 
      if (!token) {
        toast.error("Authentication token not found in cookies");
        return;
      }
      // API fetch
      try {
        const response = await fetch(
          "https://rfpdemo.velsof.com/api/vendorlist",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, 
              "Content-Type": "application/json",
            },
          }
        );
        console.log("res",response)
        const data = await response.json();
        console.log("data",data)

        if (data.response == "error") {
          toast.error('Action not allowed')
        } 

       

        setVendorList(data.vendors);
        
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div data-sidebar="dark">
      <Toaster />
      <div id="layout-wrapper">
        <Header/>

        {/* <!-- ========== Left Sidebar Start ========== --> */}
        <SideleftBar/>
        {/* <!-- Left Sidebar End -->

<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== --> */}
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              {/* <!-- start page title --> */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0 font-size-18">Vendors List</h4>

                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Home</a>
                        </li>
                        <li className="breadcrumb-item active">Vendors</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end page title -->

            <!-- end row --> */}

              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="TableHeader">
                        <div className="row">
                          <div className="col-lg-3">
                            <h4 className="card-title">Vendors</h4>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table
                          className="table mb-0 listingData dt-responsive"
                          id="datatable"
                        >
                          <thead>
                            <tr>
                              <th>S. No.</th>
                              <th>Full name</th>
                              <th>Email</th>
                              <th>Contact No</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody  >
                            {vendorList.map((vendor, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{vendor.name}</td>
                                <td>{vendor.email}</td>
                                <td>{vendor.mobile}</td>
                                <td>
                                  <span className="badge badge-pill badge-success">
                                    {vendor.status}
                                  </span>
                                </td>
                                <td>
                                  <a
                                    href="editvendor.html"
                                    className="text-primary mr-2"
                                    title="Edit"
                                  >
                                    <i className="mdi mdi-pencil"></i>
                                  </a>
                                  <a href="#" className="text-danger">
                                    <i className="mdi mdi-circle-off-outline"></i>
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="row pt-3">
                        <div className="col-sm-12 col-md-5">
                          <div
                            className="dataTables_info"
                            id="datatable_info"
                            role="status"
                            aria-live="polite"
                          >
                            Showing 1 to 5 of 5 entries
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-7 dataTables_wrapper ">
                          <div
                            className="dataTables_paginate paging_simple_numbers"
                            id="datatable_paginate"
                          >
                            <ul className="pagination">
                              <li
                                className="paginate_button page-item previous disabled"
                                id="datatable_previous"
                              >
                                <a
                                  href="#"
                                  aria-controls="datatable"
                                  data-dt-idx="0"
                                  tabIndex="0"
                                  className="page-link"
                                >
                                  Previous
                                </a>
                              </li>
                              <li className="paginate_button page-item active">
                                <a
                                  href="#"
                                  aria-controls="datatable"
                                  data-dt-idx="1"
                                  tabIndex="0"
                                  className="page-link"
                                >
                                  1
                                </a>
                              </li>
                              <li
                                className="paginate_button page-item next disabled"
                                id="datatable_next"
                              >
                                <a
                                  href="#"
                                  aria-controls="datatable"
                                  data-dt-idx="2"
                                  tabIndex="0"
                                  className="page-link"
                                >
                                  Next
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- end row --> */}
            </div>
          </div>
          {/* <!-- End Page-content --> */}

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
    </div>
  );
}

export default Vendors;
