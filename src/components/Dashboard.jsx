import SideleftBar from "./SideleftBar";
import Header from "./Header";

function Dashboard() {
  return (
    <div data-sidebar="dark">
      <div id="layout-wrapper">

        {/* Header */}
        <Header />
        {/* SideLeftBar */}
        <SideleftBar />
        {/* Rightcontent */}
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0 font-size-18">Dashborad</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Home</a>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div>Welcome to RFP System.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* footer */}
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
      </div>
    </div>
  );
}

export default Dashboard;
