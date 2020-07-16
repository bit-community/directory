import React from 'react'
import { Image, ImageProps } from '@chakra-ui/core'

interface IFlagIconProps extends ImageProps {
  country: string
  role?: string
  size?: number
  style?: React.CSSProperties
}

export const FlagIcon: React.FC<IFlagIconProps> = (props): JSX.Element => {
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

FlagIcon.defaultProps = {
  role: 'img',
  size: 24,
}
