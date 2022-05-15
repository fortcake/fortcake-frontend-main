import React from 'react'
import { Svg, SvgProps } from 'fortcake-uikit-v2'

const SvgComponent: React.FC<SvgProps> = (props) => (
  <Svg {...props} width={413} height={413} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx={206.573}
      cy={206.573}
      r={205.574}
      transform="rotate(97.8 206.573 206.573)"
      fill="url(#bubbles2)"
      fillOpacity={0.41}
    />
    <defs>
      <linearGradient id="bubbles2" x1={48.552} y1={395.524} x2={321.248} y2={102.629} gradientUnits="userSpaceOnUse">
        <stop offset={0.124} stopColor="#18FFE3" />
        <stop offset={1} stopColor="#EF5DA8" />
      </linearGradient>
    </defs>
  </Svg>
)

export default SvgComponent
