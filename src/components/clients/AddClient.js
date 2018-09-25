// Packages
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types'

// Components
import InputGroup from '../layout/formElements/FormInputGroup';
import ButtonSubmit from '../layout/formElements/FormButton';

class AddClient extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        website: '',
        phone: '',
        balance: ''
    }

    onFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        const newClient = this.state;

        // If balance is NaN, make it == 0
        if(newClient.balance === '') {
            newClient.balance = 0;
        }

        const { firestore } = this.props;

        firestore.add({ collection: 'clients'}, newClient)
            .then(() => this.props.history.push('/'));


    }

  render() {

    const { disableBalanceOnAdd } = this.props.settings;
    console.log(disableBalanceOnAdd);
    const { 
        firstName, 
        lastName, 
        email, 
        company,
        website, 
        phone, 
        balance } = this.state;

    return (
      <div>
        <h1>Add Client</h1>
        <div className="row">
            <div className="col-md-6">
                <Link to="/" className="btn btn-link">
                    <i className="fa fa-arrow-circle-left m-2"></i>Back To Dashboard
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
                        onFormChange={this.onFormChange}
                        value={firstName}
                    />
                    <InputGroup 
                        label="Last Name"
                        className="form-control"
                        name="lastName"
                        minLength="2"
                        required="required"
                        onFormChange={this.onFormChange}
                        value={lastName}
                    />
                    <InputGroup 
                        type="email"
                        label="Email"
                        className="form-control"
                        name="email"
                        required="required"
                        onFormChange={this.onFormChange}
                        value={email}
                    />
                    <InputGroup 
                        label="Company"
                        className="form-control"
                        name="company"
                        minLength="2"
                        required="required"
                        onFormChange={this.onFormChange}
                        value={company}
                    />
                    <InputGroup 
                        label="Company Website"
                        className="form-control"
                        name="website"
                        onFormChange={this.onFormChange}
                        value={website}
                    />
                    <InputGroup 
                        label="Phone"
                        className="form-control"
                        name="phone"
                        minLength="2"
                        required="required"
                        onFormChange={this.onFormChange}
                        value={phone}
                    />
                    <InputGroup 
                        type="number"
                        label="Balance"
                        className="form-control"
                        name="balance"
                        onFormChange={this.onFormChange}
                        value={balance}
                        disabled={disableBalanceOnAdd}
                    />
                    <ButtonSubmit 
                        type="Submit"
                        label="Add Client"
                        className="btn btn-success"
                    />
                </form>
            </div>
        </div>
      </div>
    )
  }
}

AddClient.propTypes = {
    firestore: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(),
    connect((state, props) => ({
        settings: state.settings
    }))
)(AddClient);