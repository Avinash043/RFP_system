import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import Header from "./Header";
import SideleftBar from "./SideleftBar";

function Vendors() {
  const [vendorList, setVendorList] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Page state
  const itemsPerPage = 5; // Items per page

  // Filter vendors by search
  const SearchedVendors = vendorList.filter((vendor) =>
    vendor.name.toLowerCase().includes(search.toLowerCase())
  );

  // Get current page's vendors (pagination logic)
  const currentVendors = SearchedVendors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page changes
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(SearchedVendors.length / itemsPerPage);

  // Calculate the range of pages to display (3 pages at a time)
  const pageNumbers = [];
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchData = async () => {
      // Get Cookies
      const token = Cookies.get("token");
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

        const data = await response.json();
        if (data.response === "error") {
          toast.error("Action not allowed");
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
        <Header />
        <SideleftBar />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
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
                  <div className="d-flex flex-wrap justify-content-between mt-3">
                    <div className="form-group d-flex w-full sm:w-auto">
                      <input
                        type="text"
                        className="form-control flex-grow"
                        id="search"
                        name="search"
                        value={search}
                        placeholder="Enter vendor's name"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <button className="btn btn-sm btn-primary ml-2">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>

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
                          <tbody>
                            {currentVendors.map((vendor, index) => (
                              <tr key={index}>
                                <th scope="row">
                                  {index + 1 + (currentPage - 1) * itemsPerPage}
                                </th>
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

                      {/* Pagination */}
                      <div className="pagination-container">
                        <nav aria-label="Page navigation example">
                          <ul className="pagination justify-content-center">
                            <li
                              className={`page-item ${
                                currentPage === 1 ? "disabled" : ""
                              }`}
                            >
                              <a
                                className="page-link"
                                href="#"
                                onClick={() =>
                                  handlePageChange(currentPage - 1)
                                }
                              >
                                Previous
                              </a>
                            </li>
                            {pageNumbers.map((page) => (
                              <li
                                key={page}
                                className={`page-item ${
                                  currentPage === page ? "active" : ""
                                }`}
                              >
                                <a
                                  className="page-link"
                                  href="#"
                                  onClick={() => handlePageChange(page)}
                                >
                                  {page}
                                </a>
                              </li>
                            ))}
                            <li
                              className={`page-item ${
                                currentPage === totalPages ? "disabled" : ""
                              }`}
                            >
                              <a
                                className="page-link"
                                href="#"
                                onClick={() =>
                                  handlePageChange(currentPage + 1)
                                }
                              >
                                Next
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">2022 &copy; Copyright.</div>
                <div className="col-sm-6">
                  <div className="text-sm-right d-none d-sm-block">
                    Support Email:{" "}
                    <a href="#" target="_blank" className="text-muted">
                      support@velsof.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Vendors;
