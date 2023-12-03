import React from 'react';
import PropTypes from 'prop-types';

const Search = ({type, placeholder, className, id, customStyle}) => {
    const inputClasses = [className].join(' ');
    return (
        <input
            type={type}
            id={id}
            className={inputClasses}
            placeholder={placeholder}
            style={customStyle}
        />
    );
};

Search.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    customStyle: PropTypes.object,
    isCompressed: PropTypes.bool,
};

export default Search;
