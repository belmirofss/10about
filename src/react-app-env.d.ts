/// <reference types="react-scripts" />

import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {  
      colors: {
        primary: string;
        success: string;
        error: string;
      },
      spacing: {
        xl: string;
        lg: string;
        md: string;
        sm: string;
        xs: string;
      },
      breakpoints: {
        lg: string;
        md: string;
        sm: string;
      }
    }
}
