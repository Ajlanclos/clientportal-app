import React, { Component } from 'react';
import PropTypes from 'prop-types'


class FormTextAreaGroup extends Component {
  render() {

    const {
        label, 
        className,
        name,
        required,
        onFormChange,
        value,
        disabled,
        reff
    } = this.props;

    return (
        <div className="form-group">
            <label htmlFor="firstName">{label}</label>
            <textarea 
                className={className}
                name={name}
                required={required}
                onChange={onFormChange}
                defaultValue={value}
                disabled={disabled}
                ref={reff}
                />
    </div>
    )
  }
}

FormTextAreaGroup.propTypes - {
    label: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.string,
    onFormChange: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    reff: PropTypes.object
}

export default FormTextAreaGroup;



