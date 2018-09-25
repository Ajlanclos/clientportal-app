// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import classnames from 'classnames';

// Components
import Spinner from '../layout/Spinner';

class ClientList extends Component {
  state = {
    totalOwed: null
  };

  componentDidMount() {
    const { firebase, auth } = this.props;
    const setId = {
        id: auth.uid
    }
    firebase.updateProfile(setId);
}

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;

    if (clients) {
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);

      return { totalOwed: total };
    } else {
      return null;
    }
  }

  render() {
    const { clients } = this.props;

    const { totalOwed } = this.state;

    if (clients) {
      return (
        <div className="content-bg">
          <div className="row">
            <div className="col-md-6">
              <h2 className="float-left">
                <span className="page">Clients</span>
              </h2>
              {/* <h4>
                  <span className="badge-primary m-2 px-2 py-1">{clients.length}</span>
              </h4> */}
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Incoming:{' '}
                <span
                  className={classnames({
                    'text-success font-weight-bold p-1': totalOwed > 0,
                    'text-dark font-weight-bold p-1': totalOwed === 0
                  })}
                >
                  {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(totalOwed)}
                </span>
              </h5>
            </div>
          </div>
          <table className="table table-striped">
            <thead className="bg-c-lt">
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.lastName}, {client.firstName}
                  </td>
                  <td>{client.company}</td>
                  <td>{client.email}</td>
                  <td
                    className={classnames({
                      'text-success': client.balance > 0,
                      '': client.balance === 0
                    })}
                  > {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(client.balance)}
                  </td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-link btn-sm float-right btn-block"
                    > Details
                      <i className="fa fa-arrow-circle-right m-2" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner size="fa-3x"/>;
    }
  }
}



ClientList.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array,
  firebase: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect(({firestore: { ordered }}) => ({
    clients: ordered.clients
  })),
  firebaseConnect(),
  connect(({firebase: { auth, profile }}) => ({
    auth,
    profile
  }))
)(ClientList);
