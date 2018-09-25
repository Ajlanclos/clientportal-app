import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Components
import FormInputGroup from '../layout/formElements/FormInputGroup';
import FormButton from '../layout/formElements/FormButton';
import Alert from '../layout/Alert';
import './Login.css'

// Actions
import { notifyUser } from '../../redux/actions/NotifyActions';


class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    onFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        const { firebase, notifyUser, auth } = this.props;
        const { email, password } = this.state;

        firebase.login({
            email,
            password
        })
        .catch(err => notifyUser('Invalid Login Credentials', 'error'));

    }

    render() {

        const { email, password } = this.state;

        const { message, messageType } = this.props.notify;

        return (
        <div className="row entry-bg">
            <div className="col-md-6 mx-auto my-c-100">
                <div className="row">
                    <div className="col-md-6 bg-c-md-a text-center d-flex justify-content-center">
                        <div className="d-flex align-self-center flex-column">
                            <h1 className="font-weight-bold"><strong className="text-primary">CLIENT</strong>PORTAL</h1>
                            <br/>
                            <h2>Welcome to your Client Portal!</h2>
                            <h3>Please login to manage your clients...</h3>
                            <br/>
                            <h3>If you are not registered, you can register here. 
                                <Link to="/register" className="btn btn-link">
                                    <i className="fa fa-arrow-circle-right m-1"></i>Register
                                </Link>
                            </h3>
                        </div>
                    </div>
                    <div className="col-md-6 bg-light">
                        <h1 className="pt-2"><i className="fa fa-lock m-2 text-primary"></i>Login</h1>
                        <hr />
                        {message ? (
                            <Alert message={message} messageType={messageType} />
                        ) : null}
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
                                type="password"
                                label="Password"
                                className="form-control"
                                name="password"
                                required="required"
                                onFormChange={this.onFormChange}
                                value={password}
                            />
                            <br />
                            
                            <FormButton 
                                type="Submit"
                                label="Login"
                                className="btn btn-primary float-right mb-2"
                            />
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired,
    notifyUser: PropTypes.func.isRequired,
}

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        notify: state.notify,
        settings: state.settings,
        auth: state.firebase.auth
    }), { notifyUser })
)(Login);