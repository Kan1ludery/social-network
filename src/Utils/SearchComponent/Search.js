import React from 'react';
import PropTypes from 'prop-types';

const Search = ({type, placeholder, className, id, isDisabled = false, onChange}) => {
    const inputClasses = [className].join(' ');
    return (
        <input
            type={type}
            id={id}
            className={inputClasses}
            placeholder={placeholder}
            onChange={onChange}
            disabled={isDisabled}
        />
    );
};

Search.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    isCompressed: PropTypes.bool,
};

export default Search;
