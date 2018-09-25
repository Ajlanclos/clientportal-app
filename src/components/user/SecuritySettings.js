import React, { Component } from 'react';

class SecuritySettings extends Component {
  state = {
    disableForm: 'disabled'
  };
  toggleEmail = e => {
    const { disableForm } = this.state;
    if (disableForm === 'disabled') {
      this.setState({
        disableForm: ''
      });
    } else {
      this.setState({
        disableForm: 'disabled'
      });
    }
  };
  render() {
    const { disableForm } = this.state;
    const { email, emailRef, onResetPassword, onSubmit } = this.props;
    return (
      <div
        className="tab-pane fade"
        id="v-pills-security"
        role="tabpanel"
        aria-labelledby="v-pills-security-tab"
      >
        <div className="row">
          <div className="col-md-8">
            <h2>Security Settings</h2>
          </div>
          <div className="col-md-4 text-right">
            <i
              className="fa fa-pencil m-2 text-danger"
              style={{ cursor: 'pointer' }}
              onClick={this.toggleEmail}
            />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-6 vhr-dark pr-5">
            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="form-inline">
                      <input
                        type="text"
                        name="email"
                        className="form-control col-6"
                        defaultValue={email}
                        ref={emailRef}
                        disabled={disableForm}
                      />
                      <input
                        className="btn btn-success ml-2 col-4"
                        type="submit"
                        value="Update Email"
                        disabled={disableForm}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-6 text-center d-flex flex-column justify-content-center ">
            <label>
              Reseting your email will send a link to the email on file.
            </label>
            <input
              className="btn btn-success align-self-center col-6"
              value="Reset Password"
              onClick={onResetPassword}
              disabled={disableForm}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SecuritySettings;
