// Packages
import React from 'react';

// Components
import Sidebar from './Sidebar';
import ClientList from '../clients/ClientList';
import ProjectList from '../projects/ProjectList';
import PaymentList from '../payments/PaymentList';
const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-lg-10 order-2 order-lg-1">
          <ClientList />
        </div>
        <div className="col-lg-2 order-1 order-lg-2">
          <Sidebar />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 col-lg-7">
          <ProjectList />
        </div>
        <div className="col-12 col-lg-5">
          <PaymentList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
