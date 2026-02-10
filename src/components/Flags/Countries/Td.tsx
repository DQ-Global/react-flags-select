import * as React from "react";
import type { SVGProps } from "react";
const SvgTd = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 512 336"
    {...props}
  >
    <g fill="none">
      <path
        fill="#41479B"
        d="M170.667 335.724H8.828A8.83 8.83 0 0 1 0 326.896V9.104A8.83 8.83 0 0 1 8.828.276h161.839z"
      />
      <path fill="#FFE15A" d="M170.67.276h170.67v335.448H170.67z" />
      <path
        fill="#FF4B55"
        d="M503.172 335.724H341.333V.276h161.839A8.83 8.83 0 0 1 512 9.104v317.792a8.83 8.83 0 0 1-8.828 8.828"
      />
    </g>
  </svg>
);
export default SvgTd;
