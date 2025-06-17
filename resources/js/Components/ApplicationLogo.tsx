import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 600 75"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g>
                <rect x="6.25" y="6.25" width="62.5" height="62.5" rx="12.5" ry="12.5" fill="#096FC6" />

                <g fill="white">
                    <rect x="21.25" y="18.75" width="32.5" height="8.75" />
                    <rect x="33.125" y="18.75" width="8.75" height="37.5" />
                </g>
            </g>

            <text x="80" y="58.75" font-family="Arial, sans-serif" font-size="62.5" font-weight="bold" fill="#096FC6" dominant-baseline="text-bottom">TANOSHIKA APP</text>
        </svg>
    );
}
