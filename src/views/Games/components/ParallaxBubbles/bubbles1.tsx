import React from 'react'
import { Svg, SvgProps } from 'fortcake-uikit-v2'

const SvgComponent: React.FC<SvgProps> = (props) => (
  <Svg {...props} width={527} height={977} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx={38.5} cy={488.5} r={488.5} fill="url(#bubbles1)" fillOpacity={0.8} />
    <defs>
      <linearGradient id="bubbles1" x1={-337} y1={937.5} x2={311} y2={241.5} gradientUnits="userSpaceOnUse">
        <stop offset={0.432} stopColor="#0F8173" />
        <stop offset={1} stopColor="#97004E" />
      </linearGradient>
    </defs>
  </Svg>
)

export default SvgComponent
