// Packages
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

// Components
import InputGroup from '../layout/formElements/FormInputGroup';
import ButtonSubmit from '../layout/formElements/FormButton';
import Spinner from '../layout/Spinner';

class EditClient extends Component {
  constructor(props) {
    super(props);

    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.companyInput = React.createRef();
    this.websiteInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onFormSubmit = e => {
    e.preventDefault();

    const updateClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      company: this.companyInput.current.value,
      website: this.websiteInput.current.value,
      phone: this.phoneInput.current.value,
      balance:
        this.balanceInput.current.value === ''
          ? 0
          : this.balanceInput.current.value
    };

    // If balance is NaN, make it == 0
    if (updateClient.balance === '') {
      updateClient.balance = 0;
    }

    const { client, firestore, history } = this.props;

    firestore
      .update({ collection: 'clients', doc: client.id }, updateClient)
      .then(history.push('/'));
  };

  render() {
    const { client } = this.props;
    
    const { disableBalanceOnEdit } = this.props.settings;

    if (client) {
      return (
        <div>
          <h1>Edit Client</h1>
          <div className="row">
            <div className="col-md-6">
              <Link to={`/client/${client.id}`} className="btn btn-link">
                <i className="fa fa-arrow-circle-left m-2" />
                Back To Client Details
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <form onSubmit={this.onFormSubmit}>
                <InputGroup
                  label="First Name"
                  className="form-control"
                  name="firstName"
                  minLength="2"
                  required="required"
                  reff={this.firstNameInput}
                  value={client.firstName}
                />
                <InputGroup
                  label="Last Name"
                  className="form-control"
                  name="lastName"
                  minLength="2"
                  required="required"
                  reff={this.lastNameInput}
                  value={client.lastName}
                />
                <InputGroup
                  type="email"
                  label="Email"
                  className="form-control"
                  name="email"
                  required="required"
                  reff={this.emailInput}
                  value={client.email}
                />
                <InputGroup
                  label="Company"
                  className="form-control"
                  name="company"
                  minLength="2"
                  required="required"
                  reff={this.companyInput}
                  value={client.company}
                />
                <InputGroup
                  label="Company Website"
                  className="form-control"
                  name="website"
                  reff={this.websiteInput}
                  value={client.website}
                />
                <InputGroup
                  label="Phone"
                  className="form-control"
                  name="phone"
                  minLength="2"
                  required="required"
                  reff={this.phoneInput}
                  value={client.phone}
                />
                <InputGroup
                  type="number"
                  label="Balance"
                  className="form-control"
                  name="balance"
                  reff={this.balanceInput}
                  value={client.balance}
                  disabled={disableBalanceOnEdit}
                />
                <ButtonSubmit
                  type="Submit"
                  label="Edit Client"
                  className="btn btn-success"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner size="fa-3x"/>;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings
  }))
)(EditClient);
