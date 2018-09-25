import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import Spinner from '../layout/Spinner';

class PaymentDetails extends Component {
  state = {
    client: '',
    project: ''
  };
  static getDerivedStateFromProps(props, state) {
    const { clients, projects, payment } = props;

    if (clients && payment && projects) {
      let clientWithPayment = clients.filter(client => {
        return client.id === payment.client;
      });

      console.log(clientWithPayment[0].projects[0]);
      let projectForPayment = projects.filter(project => {
        console.log(clientWithPayment[0].projects[0] === project.id);
        return clientWithPayment[0].projects[0] === project.id;
      });
      console.log(projectForPayment);
      return {
        client: clientWithPayment[0],
        project: projectForPayment[0]
      };
      //   rvUULueWfglBw7ZktKv5
    } else {
      return null;
    }
  }
  render() {
    const { payment } = this.props;
    const { client, project } = this.state;

    let clientInfo = '';

    if (client) {
      clientInfo = (
        <div>
          <div className="jumbotron bg-c-md">
            <h2 className="font-weight-bold">
              {client.firstName} {client.lastName}
            </h2>
            <h3>{client.company}</h3>
            <hr />
          </div>
          <h3>
            <i className="fa fa-envelope m-2 text-primary" />
            {client.email}
          </h3>
          <h3>
            <i className="fa fa-phone m-2 text-primary" />
            {client.phone}
          </h3>
          <h4>
            <i className="fa fa-globe fa-lg m-2 text-primary" />
            <a href={client.website}>{client.website}</a>
          </h4>
        </div>
      );
    } else {
      clientInfo = null;
    }

    // console.log(project);
    if (payment && client && project) {
      return (
        <div>
          <h1>Payment Details</h1>
          <Link to={`/projects`} className="btn btn-link">
            <i className="fa fa-arrow-circle-left m-2" />
            Back To Projects
          </Link>
          <div className="row">
            <div className="col-md-8">
              <div className="content-bg">
                <div className="jumbotron bg-c-md">
                  <div className="row">
                    <div className="col-md-9">
                      <div className="col-2">
                        <h2 className="text-center text-success">
                          <strong>
                            {' '}
                            ${parseFloat(payment.amount).toFixed(2)}
                          </strong>
                        </h2>
                        <h4 className="pl-2 text-uppercase text-center">
                          Payment
                        </h4>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="col-md-12">
                        <h2 className="text-center">{payment.date}</h2>
                        <h4 className="text-center text-uppercase">Date</h4>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mx-4 mt-2">
                      <h4 className="font-weight-bold">Project:</h4>
                      <h4>{project.title}</h4>
                      <hr />
                      <h4 className="font-weight-bold">Project details</h4>
                      <h4>{project.details}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="content-bg">{clientInfo}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="content-bg mt-4">
                {/* Add project payments here */}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner size="fa-3x" />;
    }
  }
}
export default compose(
  firestoreConnect(props => [
    { collection: 'payments', storeAs: 'payment', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    payment: ordered.payment && ordered.payment[0]
  })),
  firestoreConnect(props => [{ collection: 'clients' }]),
  connect(({ firestore: { ordered } }, props) => ({
    clients: ordered.clients
  })),
  firestoreConnect(props => [{ collection: 'projects' }]),
  connect(({ firestore: { ordered } }, props) => ({
    projects: ordered.projects
  }))
)(PaymentDetails);
