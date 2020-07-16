import React from 'react';
import PropTypes from 'prop-types';
import { Image } from '@chakra-ui/core';
export default function Flag(props) {
    const { country, role, size, style, ...otherProps } = props;
    return (<div style={style}>
      <Image role={role} src={`/img/country-flags/${country}.svg`} alt={`${country} Flag`} height={size} width={size} {...otherProps}/>
    </div>);
}
Flag.propTypes = {
    country: PropTypes.string.isRequired,
    role: PropTypes.string,
    size: PropTypes.number,
    style: PropTypes.object,
};
Flag.defaultProps = {
    role: 'img',
    size: 24,
};
