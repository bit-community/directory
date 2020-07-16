import React from 'react'
import PropTypes from 'prop-types'
import { Image, ImageProps } from '@chakra-ui/core'

interface IFlagIconProps extends ImageProps {
  country: string
  style: React.CSSProperties
}

export default function Flag(props: IFlagIconProps): JSX.Element {
  const { country, role, size, style, ...otherProps } = props
  return (
    <div style={style}>
      <Image
        role={role}
        src={`/img/country-flags/${country}.svg`}
        alt={`${country} Flag`}
        height={size}
        width={size}
        {...otherProps}
      />
    </div>
  )
}

Flag.propTypes = {
  country: PropTypes.string.isRequired,
  role: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object,
}

Flag.defaultProps = {
  role: 'img',
  size: 24,
}
