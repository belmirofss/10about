/// <reference types="react-scripts" />

import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
      colors: {
        background: string;
        surface: string;
        surfaceAlt: string;
        surfaceRaised: string;
        border: string;
        borderStrong: string;
        primary: string;
        accent: string;
        accentSoft: string;
        onAccent: string;
        text: string;
        textMuted: string;
        textFaint: string;
        success: string;
        successText: string;
        error: string;
        errorText: string;
      },
      fonts: {
        body: string;
        logo: string;
      },
      radii: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        pill: string;
      },
      breakpoints: {
        md: string;
        sm: string;
      }
    }
}
