import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class AppNav extends Component {
  state = {
    isAuth: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuth: true };
    } else {
      return { isAuth: false };
    }
  }

  onLogoutClick = e => {
    e.preventDefault();

    const { firebase } = this.props;

    firebase.logout();
  };

  render() {
    const { isAuth } = this.state;

    const { auth, profile } = this.props;

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-c-lt mb-4">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <strong className="text-primary">CLIENT</strong>
            PORTAL
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mr-auto">
              {isAuth ? (
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    <i className="fa fa-home fa-lg" />
                  </Link>
                </li>
              ) : null}
            </ul>
            {isAuth ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item vhr-light">
                  <Link to="/projects" className="nav-link">
                      <i className="fa fa-tasks mb-1 p-1"></i>
                  </Link>
                </li>
                
                <li className="nav-item dropdown">
                  <img
                    src={profile.photoUrl}
                    alt="profileImage"
                    className="profile-img float-left m-1"
                  />
                  <a
                    href="#!"
                    className="nav-link float-right dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    {profile.displayName}
                  </a>
                  <div className="dropdown-menu dropdown-menu-right mt-2">
                    <Link to="/settings" className="dropdown-item">
                      <i className="fa fa-cog m-2" />
                      Settings
                    </Link>
                    <a
                      href="#!"
                      className="dropdown-item"
                      onClick={this.onLogoutClick}
                    >
                      <i className="fa fa-sign-out m-2" />
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    );
  }
}

AppNav.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth, profile } }, props) => ({
    auth: auth,
    profile: profile
  }))
)(AppNav);
