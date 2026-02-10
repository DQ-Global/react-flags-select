import * as React from "react";
import type { SVGProps } from "react";
const SvgGm = (props: SVGProps<SVGSVGElement>) => (
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
        d="M0 220.966h512v105.931a8.83 8.83 0 0 1-8.828 8.828H8.828A8.83 8.83 0 0 1 0 326.897z"
      />
      <path
        fill="#FF4B55"
        d="M8.828.276h494.345a8.83 8.83 0 0 1 8.828 8.828v105.931H0V9.103A8.83 8.83 0 0 1 8.828.276"
      />
      <path fill="#41479B" d="M0 115.034h512v105.931H0z" />
      <path
        fill="#F5F5F5"
        d="M0 115.034h512v17.655H0zm0 88.276h512v17.655H0z"
      />
    </g>
  </svg>
);
export default SvgGm;
