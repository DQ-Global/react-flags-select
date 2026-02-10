import * as React from "react";
import type { SVGProps } from "react";
const SvgNe = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 512 336"
    {...props}
  >
    <g fill="none">
      <path
        fill="#73AF00"
        d="M0 223.908h512v102.988a8.83 8.83 0 0 1-8.828 8.828H8.828A8.83 8.83 0 0 1 0 326.896z"
      />
      <path
        fill="#FF9B55"
        d="M8.828.276h494.345a8.83 8.83 0 0 1 8.828 8.828v102.988H0V9.103A8.83 8.83 0 0 1 8.828.276"
      />
      <path fill="#F5F5F5" d="M0 112.088h512V223.9H0z" />
      <circle cx={256} cy={168} r={44.138} fill="#FF9B55" />
    </g>
  </svg>
);
export default SvgNe;
