import * as React from "react";
import type { SVGProps } from "react";
const SvgSc = (props: SVGProps<SVGSVGElement>) => (
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
        d="M8.828 335.724h494.345a8.83 8.83 0 0 0 8.828-8.828V223.907L4.85 334.664c1.209.624 2.523 1.06 3.978 1.06"
      />
      <path
        fill="#41479B"
        d="M170.667.276H8.828A8.83 8.83 0 0 0 0 9.104v317.792c0 1.972.769 3.699 1.862 5.169z"
      />
      <path
        fill="#FFE15A"
        d="M2.613 333.157 341.333.276H170.667L1.862 332.065c.264.356.436.78.751 1.092"
      />
      <path
        fill="#FF4B55"
        d="M503.172.276H341.333L2.613 333.157c.367.364.858.569 1.284.865L512 112.092V9.104a8.83 8.83 0 0 0-8.828-8.828"
      />
      <path
        fill="#F5F5F5"
        d="m4.85 334.664 507.149-110.757V112.092L3.896 334.022c.317.22.609.466.954.642"
      />
    </g>
  </svg>
);
export default SvgSc;
