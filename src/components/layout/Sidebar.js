// Packages
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
      <div className="content-bg">
            <div className="row">
                <div className="col-md-4 col-sm-4 col-lg-12 mb-2">
                    <Link to="/client/add" className="btn btn-primary btn-block">
                        <i className="fa fa-plus m-2"></i>New Client
                    </Link>
                </div>
                <div className="col-md-4 col-sm-4 col-lg-12 mb-2">
                    <a href="/project/add" className="btn btn-primary btn-block">
                        <i className="fa fa-plus m-2"></i>New Project
                    </a>
                </div>
                <div className="col-md-4 col-sm-4 col-lg-12 mb-2">
                    <Link to="/payments/add" className="btn btn-primary btn-block">
                        <i className="fa fa-plus m-2"></i>New Payment
                    </Link>
                </div>
            </div>
      </div>
    
  )
}

export default Sidebar;
