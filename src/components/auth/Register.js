import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Login.css';

// Components
import FormInputGroup from '../layout/formElements/FormInputGroup';
import FormButton from '../layout/formElements/FormButton';

// Actions
import { notifyUser } from '../../redux/actions/NotifyActions';

class Register extends Component {
  state = {
    email: '',
    password: ''
  };

  componentWillMount() {
    const { allowRegistration } = this.props.settings;

    if (!allowRegistration) {
      this.props.history.push('/');
      notifyUser('New user registration inactive', 'error');
    }
  }

  onFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onFormSubmit = e => {
    e.preventDefault();

    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;

  
    firebase
      .createUser({
        email,
        password
      })
      .catch(err => notifyUser('Email already in use, try again...', 'error'));

      
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="row entry-bg">
        <div className="col-md-6 mx-auto my-c-100">
          <div className="row">
            <div className="col-md-6 bg-c-md-a text-center d-flex justify-content-center">
              <div className="d-flex align-self-center flex-column">
                <h1 className="font-weight-bold">
                  <strong className="text-primary">CLIENT</strong>
                  PORTAL
                </h1>
                <br />
                <h2>Welcome to your Client Portal!</h2>
                <h3>Please register to manage your clients...</h3>
                <br />
                <h3>
                  If you are already registered, you can login here.
                  <Link to="/login" className="btn btn-link">
                    <i className="fa fa-arrow-circle-right m-1" />
                    Login
                  </Link>
                </h3>
              </div>
            </div>
            <div className="col-md-6 bg-light">
              <h1 className="pt-2">Register</h1>
              <hr />
              <form onSubmit={this.onFormSubmit}>
                <FormInputGroup
                  label="Email"
                  className="form-control"
                  name="email"
                  required="required"
                  onFormChange={this.onFormChange}
                  value={email}
                />
                <FormInputGroup
                  label="Password"
                  className="form-control"
                  name="password"
                  required="required"
                  onFormChange={this.onFormChange}
                  value={password}
                />
                <FormInputGroup
                  label="Confirm Password"
                  className="form-control"
                  name="password"
                  required="required"
                  onFormChange={this.onFormChange}
                  value={password}
                />
                <FormButton
                  type="Submit"
                  label="Register"
                  className="btn btn-primary float-right mb-2"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
      settings: state.settings
    }),
    { notifyUser }
  )
)(Register);
