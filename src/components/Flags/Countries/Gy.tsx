import * as React from "react";
import type { SVGProps } from "react";
const SvgMv = (props: SVGProps<SVGSVGElement>) => (
<svg 
xmlns="http://www.w3.org/2000/svg" 
    width="1em"
    height="1em"
    viewBox="0 0 100 60" 
    {...props}
>
 	<defs>
		<clipPath id="a">
			<path d="m0 0 100 30L0 60z"/>
		</clipPath>
		<clipPath id="b">
			<path d="m0 0 50 30L0 60z"/>
		</clipPath>
	</defs>
	<path fill="#2A936A" d="m0 0h100v60H0z"/>
	<path clip-path="url(#a)" fill="#FFC20E" stroke="#fff" stroke-width="4" d="m0 0 100 30L0 60"/>
	<path clip-path="url(#b)" fill="#BE1E2D" stroke="#000" stroke-width="4" d="m0 0 50 30L0 60"/>
</svg>
);
export default SvgMv;
