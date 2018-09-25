import React from 'react'
import PropTypes from 'prop-types'

class TextInputGroup extends React.Component {

   render() {

    const {
        type,
        label,
        className,
        name,
        minLength,
        required,
        onFormChange,
        value,
        disabled,
        reff,
        onKeyDownTab
    } = this.props;

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                type={type}
                className={className}
                name={name}
                minLength={minLength}
                required={required}
                onChange={onFormChange}
                defaultValue={value}
                disabled={disabled}
                ref={reff}
                onKeyDown={onKeyDownTab}
                />
        </div>
    );
    }
};

TextInputGroup.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    minLength: PropTypes.string,
    required: PropTypes.string,
    onFormChange: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    reff: PropTypes.object,
    onKeyDownTab: PropTypes.func
};

TextInputGroup.defaultProps = {
    type: 'text',
    minLength: '2'
}

export default TextInputGroup;
