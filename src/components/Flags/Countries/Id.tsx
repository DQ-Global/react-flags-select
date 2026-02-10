import * as React from "react";
import type { SVGProps } from "react";
const SvgId = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 512 336"
    {...props}
  >
    <g fill="none">
      <path
        fill="#C8414B"
        d="M512.001 168H0V9.103A8.83 8.83 0 0 1 8.828.275h494.345a8.83 8.83 0 0 1 8.828 8.828z"
      />
      <path
        fill="#F5F5F5"
        d="M0 168h512v158.897a8.83 8.83 0 0 1-8.828 8.828H8.828A8.83 8.83 0 0 1 0 326.897z"
      />
    </g>
  </svg>
);
export default SvgId;
