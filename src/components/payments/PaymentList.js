// Packages
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import classnames from 'classnames';

// Components
import Spinner from '../layout/Spinner';

class PaymentList extends Component {

  render() {
    const { payments, clients } = this.props;

    if (payments) {
      return (
        <div className="content-bg">
          <div className="row">
            <div className="col-md-6">
              <h2 className="float-left">
                <span className="page">Recents Payments</span>
              </h2>
              {/* <h4>
                <span className="badge-primary m-2 px-2 py-1">
                  {payments.length}
                </span>
              </h4> */}
            </div>
          </div>
          <table className="table table-striped">
            <thead className="bg-c-lt">
              <tr>
                <th>Client</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id}>
                  {clients.map(client => (
                    <Fragment key={client.id}>
                      {payment.client === client.id ? (
                        <td>
                          <Link
                            to={`/payment/${payment.id}`}
                            className="btn btn-link"
                          >
                            {client.firstName} {client.lastName} (
                            {client.company})
                          </Link>
                        </td>
                      ) : null}
                    </Fragment>
                  ))}
                  <td>{payment.date}</td>
                  <td>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(payment.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner size="fa-3x" />;
    }
  }
}

PaymentList.propTypes = {
  firestore: PropTypes.object.isRequired,
  payments: PropTypes.array,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect(props => [{ collection: 'payments', limit: 5 }]),
  connect(({ firestore: { ordered: { payments } } }, props) => ({
    payments
  })),
  firestoreConnect(props => [{ collection: 'clients' }]),
  connect(({ firestore: { ordered } }, props) => ({
    clients: ordered.clients
  }))
)(PaymentList);
