import React from 'react'
import { Svg, SvgProps } from 'fortcake-uikit-v2'

const SvgComponent: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 500 500" {...props}>
    <defs>
      <linearGradient id="bubbles3" x1={89.3} y1={441.52} x2={410.7} y2={58.48} gradientUnits="userSpaceOnUse">
        <stop offset={0} stopColor="#f18e9e" />
        <stop offset={0.17} stopColor="#e4939f" />
        <stop offset={0.49} stopColor="#c09fa1" />
        <stop offset={0.52} stopColor="#bca0a1" />
        <stop offset={0.99} stopColor="#84cca4" />
      </linearGradient>
    </defs>
    <g data-name="Layer 2">
      <circle
        cx={250}
        cy={250}
        r={250}
        style={{
          fill: 'url(#bubbles3)',
        }}
        data-name="Layer 1"
      />
    </g>
  </Svg>
)

export default SvgComponent
