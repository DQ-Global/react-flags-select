import * as React from "react";
import type { SVGProps } from "react";
const SvgPs = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 512 336"
    {...props}
  >
    <g fill="none">
      <path
        fill="#464655"
        d="M512.001 112.092H0V9.103A8.83 8.83 0 0 1 8.828.275h494.345a8.83 8.83 0 0 1 8.828 8.828z"
      />
      <path
        fill="#73AF00"
        d="M503.172 335.724H8.828A8.83 8.83 0 0 1 0 326.896V223.908h512v102.988a8.83 8.83 0 0 1-8.828 8.828"
      />
      <path fill="#F5F5F5" d="M0 112.088h512V223.9H0z" />
      <path
        fill="#FF4B55"
        d="m3.256 333.59 202.841-161.015c2.946-2.338 2.946-6.812 0-9.151L3.256 2.41C1.311 4.029 0 6.375 0 9.103v317.793c0 2.729 1.311 5.075 3.256 6.694"
      />
    </g>
  </svg>
);
export default SvgPs;
