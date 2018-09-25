// Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import Spinner from '../layout/Spinner';

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    payment: '',
    balance: ''
  };

  static getDerivedStateFromProps(props, state) {
    const { clientProjects, client, firestore } = props;

    if (clientProjects && clientProjects.length > 0 && client) {
      // TODO: need to check this reduce method to make sure we are actually adding all cost values.
      const projects = clientProjects.filter(clientProject => {
        return clientProject.client == client.id;
      });

      const totalBalance = projects.reduce((total, project) => {
        return total + parseFloat(project.cost.toString());
      }, 0);

      const newClientBalance = {
        balance: totalBalance
      };

      firestore.update(
        { collection: 'clients', doc: props.match.params.id },
        newClientBalance
      );

      return {
        balance: totalBalance
      };
    } else {
      return null;
    }
  }

  onFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitBalance = e => {
    e.preventDefault();

    const { client, firestore } = this.props;
    const { payment, showBalanceUpdate } = this.state;
    let calcBalance = client.balance - payment;

    const clientBalanceUpdate = {
      balance: parseFloat(calcBalance)
    };

    firestore.update(
      { collection: 'clients', doc: client.id },
      clientBalanceUpdate
    );

    this.setState({
      showBalanceUpdate: false,
      payment: ''
    });
  };

  onDeleteClick = () => {
    const { client, firestore, history } = this.props;

    firestore
      .delete({ collection: 'clients', doc: client.id })
      .then(history.push('/'));
  };

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, payment, balance } = this.state;

    let newBalanceForm = '';

    if (showBalanceUpdate) {
      newBalanceForm = (
        <form onSubmit={this.submitBalance}>
          <div className="input-group mb-1">
            <input
              type="text"
              className="form-control"
              name="payment"
              placeholder="$0.00"
              value={payment}
              onChange={this.onFormChange}
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check-circle" />
              </button>
            </div>
          </div>
        </form>
      );
    } else {
      newBalanceForm = null;
    }

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-10">
              <h1>Client Details</h1>
              <Link to="/" className="btn btn-link">
                <i className="fa fa-arrow-circle-left m-2" />
                Back To Dashboard
              </Link>
            </div>
            <div className="col-md-2">
              <div className="btn-group float-right">
                <Link
                  to={`/client/edit/${client.id}`}
                  className="btn btn-secondary"
                >
                  <i className="fa fa-pencil" />
                </Link>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.onDeleteClick}
                >
                  <i className="fa fa-trash" />
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="dropdown"
                >
                  <i className="fa fa-ellipsis-h" />
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <a
                    className="dropdown-item"
                    href="#!"
                    onClick={() =>
                      this.setState({ showBalanceUpdate: !showBalanceUpdate })
                    }
                  > Make Payment
                  </a>
                  <Link
                    to={`/client/${client.id}/project/add`}
                    className="dropdown-item"
                  >
                    {' '}
                    Create Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="content-bg">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="jumbotron bg-c-lt">
                    <div className="row">
                      <div className="col-8 col-lg-10">
                        <h1>
                          <strong>
                            {client.firstName} {client.lastName}
                          </strong>
                        </h1>
                        <h4 className="pl-2">({client.id})</h4>
                        <h3 className="pt-4">
                          <a href={client.website}>{client.website}</a>
                        </h3>
                      </div>
                      <div className="col-4 col-lg-2">
                        {balance != '' ? (
                          <h1
                            className={classnames('text-light p-2 text-right', {
                              'bg-danger': client.balance > 0,
                              'bg-success': client.balance === 0
                            })}
                          >
                            ${parseFloat(client.balance).toFixed(2)}
                          </h1>
                        ) : null}
                        <h4 className="text-uppercase text-center">Balance</h4>
                      </div>
                    </div>
                  </div>
                  <div className="row text-center">
                    <div className="col-md-4">
                      <h3>
                        <strong>{client.company}</strong>
                      </h3>
                      <h4 className="text-uppercase">Company</h4>
                    </div>
                    <div className="col-md-4">
                      <h3>
                        <strong>{client.email}</strong>
                      </h3>
                      <h4 className="text-uppercase">Email</h4>
                    </div>
                    <div className="col-md-4">
                      <h3>
                        <strong>{client.phone}</strong>
                      </h3>
                      <h4 className="text-uppercase">Phone</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-8">
              <div className="content-bg">{/* Add projects */}</div>
            </div>
            <div className="col-md-4">
              <div className="content-bg">{/* Add payments */}</div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner size="fa-3x" />;
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  })),
  firestoreConnect(props => [{ collection: 'projects' }]),
  connect(({ firestore: { ordered } }, props) => ({
    clientProjects: ordered.projects
  }))
)(ClientDetails);
