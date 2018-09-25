// Packages
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AppSettings from './AppSettings';
import ProfileSettings from './ProfileSettings';
import SecuritySettings from './SecuritySettings';

// Actions
import {
  setAllowRegistration,
  setDisabledBalanceOnAdd,
  setDisabledBalanceOnEdit
} from '../../redux/actions/SettingsActions';
import { firebaseConnect } from 'react-redux-firebase';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.userNameRef = React.createRef();
    this.phoneNumberRef = React.createRef();
    this.emailRef = React.createRef();
    this.photoUrlRef = React.createRef();
    this.firstNameRef = React.createRef();
    this.lastNameRef = React.createRef();
    this.companyRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  state = {
    firstName: '',
    lastName: '',
    userName: '',
    photoUrl: '',
    phoneNumber: '',
    company: '',
    email: '',
    password: '',
    showEmail: false
  };

  componentDidMount() {
    const { profile, auth } = this.props;

    this.setState({
      firstName: profile.firstName,
      lastName: profile.lastName,
      userName: profile.userName,
      photoUrl: profile.photoUrl,
      phoneNumber: profile.phoneNumber,
      company: profile.company,
      email: profile.email,
      password: auth.password
    });
  }

  // update profile
  onSubmitProfile = e => {
    e.preventDefault();

    const { firebase } = this.props;
    const { photoUrl } = this.state;

    const updatedUserProfile = {
      firstName: this.firstNameRef.current.value,
      lastName: this.lastNameRef.current.value,
      userName: this.userNameRef.current.value,
      photoUrl,
      phoneNumber: this.phoneNumberRef.current.value,
      company: this.companyRef.current.value
    };

    firebase.updateProfile(updatedUserProfile);
  };

  // set the photo url from the uploaded file
  setPhotoURL = url => this.setState({ photoUrl: url });

  // update email
  onResetEamil = e => {
    e.preventDefault();
    const { firebase } = this.props;
    firebase.updateEmail(this.emailRef.current.value);
  };

  // reset Password
  onResetPassword = e => {
    const { firebase } = this.props;
    const { email } = this.props.profile;
    firebase.resetPassword(email);
    firebase.logout();
  };

  disableBalanceOnAddChange = e => {
    const { setDisabledBalanceOnAdd } = this.props;
    setDisabledBalanceOnAdd();
  };

  disableBalanceOnEditChange = () => {
    const { setDisabledBalanceOnEdit } = this.props;
    setDisabledBalanceOnEdit();
  };

  allowRegistrationChange = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };

  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = this.props.settings;
    const {
      firstName,
      lastName,
      userName,
      photoUrl,
      phoneNumber,
      company,
      email
    } = this.props.profile;
    return (
      <div>
        <h1>User Settings</h1>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fa fa-arrow-circle-left m-2" />
              Back To Dashboard
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <div className="content-bg">
              <div
                className="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  className="nav-link active"
                  id="v-pills-home-tab"
                  data-toggle="pill"
                  href="#v-pills-home"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                >
                  Application
                </a>
                <a
                  className="nav-link"
                  id="v-pills-profile-tab"
                  data-toggle="pill"
                  href="#v-pills-profile"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  Profile
                </a>
                <a
                  className="nav-link"
                  id="v-pills-profile-tab"
                  data-toggle="pill"
                  href="#v-pills-security"
                  role="tab"
                  aria-controls="v-pills-security"
                  aria-selected="false"
                >
                  Security
                </a>
              </div>
            </div>
          </div>
          <div className="col-10">
            <div className="content-bg">
              <div className="tab-content" id="v-pills-tabContent">
                {/* Pull out application settings in child component */}
                <AppSettings
                  disableBalanceOnAdd={!!disableBalanceOnAdd}
                  disableBalanceOnEdit={!!disableBalanceOnEdit}
                  allowRegistration={!!allowRegistration}
                  disableBalanceOnAddChange={this.disableBalanceOnAddChange}
                  disableBalanceOnEditChange={this.disableBalanceOnEditChange}
                  allowRegistrationChange={this.allowRegistrationChange}
                />
                {/* Pull out user settings in child component */}
                <ProfileSettings
                  onSubmit={this.onSubmitProfile}
                  firstName={firstName}
                  lastName={lastName}
                  userName={userName}
                  phoneNumber={phoneNumber}
                  company={company}
                  photoUrl={photoUrl}
                  firstNameRef={this.firstNameRef}
                  lastNameRef={this.lastNameRef}
                  userNameRef={this.userNameRef}
                  phoneNumberRef={this.phoneNumberRef}
                  companyRef={this.companyRef}
                  photoUrlRef={this.photoUrlRef}
                  setPhotoURL={this.setPhotoURL}
                />
                <SecuritySettings
                  onResetEamil={this.onResetEamil}
                  onResetPassword={this.onResetPassword}
                  email={email}
                  emailRef={this.emailRef}
                  onSubmit={this.onResetEamil}
                  onResetPassword={this.onResetPassword}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Selection.propTypes = {
  firebase: PropTypes.object.isRequired,
  setAllowRegistration: PropTypes.func.isRequired,
  setDisabledBalanceOnAdd: PropTypes.func.isRequired,
  setDisabledBalanceOnEdit: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      settings: state.settings,
      profile: state.firebase.profile,
      auth: state.firebase.auth
    }),
    { setAllowRegistration, setDisabledBalanceOnAdd, setDisabledBalanceOnEdit }
  )
)(Settings);
