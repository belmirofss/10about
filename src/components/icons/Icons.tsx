import React, { ReactNode } from 'react';

interface Props {
    size?: number;
    strokeWidth?: number;
}

const Svg = ({ size = 20, strokeWidth = 2.5, children }: Props & { children: ReactNode }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false">
        {children}
    </svg>
);

export const ArrowRightIcon = (props: Props) => (
    <Svg {...props}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></Svg>
);

export const ArrowLeftIcon = (props: Props) => (
    <Svg {...props}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></Svg>
);

export const CloseIcon = (props: Props) => (
    <Svg {...props}><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></Svg>
);

export const CheckIcon = (props: Props) => (
    <Svg {...props}><polyline points="20 6 9 17 4 12" /></Svg>
);

export const ShuffleIcon = (props: Props) => (
    <Svg {...props}>
        <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" />
    </Svg>
);

export const ReplayIcon = (props: Props) => (
    <Svg {...props}><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></Svg>
);

export const ShareIcon = (props: Props) => (
    <Svg {...props}>
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
    </Svg>
);
