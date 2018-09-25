import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileUploader from 'react-firebase-file-uploader';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Components
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';

// Actions
import { notifyUser } from '../../redux/actions/NotifyActions';

class ProfileSettings extends Component {
  state = {
    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: ''
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    const { firebase } = this.props;
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({ avatarURL: url });
        this.props.setPhotoURL(url);
      })
      .then(success =>
        notifyUser('Successfully uploaded new profile picture', 'success')
      );
  };

  render() {
    const {
      onSubmit,
      firstName,
      firstNameRef,
      lastName,
      lastNameRef,
      userName,
      userNameRef,
      phoneNumber,
      phoneNumberRef,
      company,
      companyRef,
      profile
    } = this.props;

    const { isUploading } = this.state;

    const { message, messageType } = this.props.notify;

    return (
      <div
        className="tab-pane fade"
        id="v-pills-profile"
        role="tabpanel"
        aria-labelledby="v-pills-profile-tab"
      >
        {message ? <Alert message={message} messageType={messageType} /> : null}

        <div className="row">
          <div className="col-md-8">
            <h2>Profile Settings</h2>
          </div>
          <div className="col-md-4 text-right">
            <i className="fa fa-pencil m-2" style={{ cursor: 'pointer' }} />
          </div>
        </div>
        <hr />

        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  defaultValue={firstName}
                  ref={firstNameRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  defaultValue={lastName}
                  ref={lastNameRef}
                />
              </div>
              {profile.photoUrl != '' ? (
                <div style={{ maxWidth: '212px', marginBottom: '.5rem' }}>
                  <img style={{ width: '100%' }} src={profile.photoUrl} />
                </div>
              ) : null}
              <label
                className="btn btn-primary text-center d-flex flex-column justify-content-center col-6"
                style={{
                  color: 'white',
                  padding: 10,
                  borderRadius: 4,
                  pointer: 'cursor',
                  margintop: '4rem',
                  float: 'left'
                }}
              >
                Upload Profile Picture
                <FileUploader
                  hidden
                  accept="image/*"
                  storageRef={this.props.firebase.storage().ref('images')}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
                />
              </label>
              <div className="d-flex p-2">
                {isUploading ? <Spinner size="fa-sm" /> : null}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="userName">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="userName"
                  defaultValue={userName}
                  ref={userNameRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  defaultValue={phoneNumber}
                  ref={phoneNumberRef}
                />
              </div>

              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  className="form-control"
                  name="company"
                  defaultValue={company}
                  required
                  ref={companyRef}
                />
              </div>
              <input
                type="submit"
                className="btn btn-success float-right d-flex justify-content-end align-self-end"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ProfileSettings.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValue: PropTypes.string
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
      profile: state.firebase.profile
    }),
    { notifyUser }
  )
)(ProfileSettings);
