
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link } from "react-router";
import Header from "./Header";
import SideleftBar from "./SideleftBar";
import toast, { Toaster } from 'react-hot-toast';

function Rfp() {
  const [rfpList, setRfpList] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      console.log("token", token); 
      if (!token) {
        toast.error("Authentication token not found in cookies");
        return;
      }

      try {
        const response = await fetch(
          "https://rfpdemo.velsof.com/api/rfp/getrfp/5",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, 
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response", response);
        const data = await response.json();
        console.log("data", data);

        if (data.response == "error") {
          toast.error('Action not allowed')
        } 

        

        setRfpList(data);
        
        
      } catch (err) {
        console.error("Error", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div data-sidebar="dark">
      <div id="layout-wrapper">
      <Toaster />
        {/* Header */}
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
                    <h4 className="mb-0 font-size-18">RFP List</h4>

                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Home</a>
                        </li>
                        <li className="breadcrumb-item active">RFP List</li>
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
                            <h4 className="card-title">RFP List</h4>
                          </div>
                          <div className="col-lg-9 text-right">
													<div className="headerButtons">
														<Link to="/addrfp" className="btn btn-sm btn-success "><i className="mdi mdi-plus"></i> Add RFP</Link>
													</div>
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
                              <th>RFP No.</th>
                              <th>RFP Title</th>
                              <th>RFP last Date</th>
                              <th>Min Amount</th>
                              <th>Max Amount</th>
                              <th>State</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rfpList &&
                              rfpList.length > 0 &&
                              rfpList.map((rfp, index) => (
                                <tr key={index}>
                                  <td>{rfp.name}</td>
                                  <td>{rfp.email}</td>
                                  <td>{rfp.mobile}</td>
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

export default Rfp;
