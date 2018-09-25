import React from 'react';
import PropTypes from 'prop-types';

const AppSettings = props => {
  const {
    disableBalanceOnAdd,
    disableBalanceOnEdit,
    allowRegistration,
    disableBalanceOnAddChange,
    disableBalanceOnEditChange,
    allowRegistrationChange
  } = props;
  return (
    <div
      className="tab-pane fade show active"
      id="v-pills-home"
      role="tabpanel"
      aria-labelledby="v-pills-home-tab"
    >
      <h2>Application Settings</h2>
      <hr />

      <form>
        <div className="row">
          <div className="col-6">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                name="disableBalanceOnAdd"
                id="disableBalanceOnAdd"
                checked={disableBalanceOnAdd}
                onChange={disableBalanceOnAddChange}
              />
              <label
                className="custom-control-label"
                htmlFor="disableBalanceOnAdd"
              >
                Disable balance when adding new client.
              </label>
            </div>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                name="disableBalanceOnEdit"
                id="disableBalanceOnEdit"
                checked={disableBalanceOnEdit}
                onChange={disableBalanceOnEditChange}
              />
              <label
                className="custom-control-label"
                htmlFor="disableBalanceOnEdit"
              >
                Disable balance when editing client.
              </label>
            </div>
          </div>
          <div className="col-6">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                name="allowRegistration"
                id="allowRegistration"
                checked={allowRegistration}
                onChange={allowRegistrationChange}
              />
              <label
                className="custom-control-label"
                htmlFor="allowRegistration"
              >
                Allow user registration.
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

AppSettings.propTypes = {
  disableBalanceOnAdd: PropTypes.bool.isRequired,
  disableBalanceOnEdit: PropTypes.bool.isRequired,
  allowRegistration: PropTypes.bool.isRequired,
  disableBalanceOnAddChange: PropTypes.func.isRequired,
  disableBalanceOnEditChange: PropTypes.func.isRequired,
  allowRegistrationChange: PropTypes.func.isRequired
};

export default AppSettings;
