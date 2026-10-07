import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
    colors: {
        background: '#07112B',
        surface: '#0E1D4A',
        surfaceAlt: '#0B1840',
        surfaceRaised: '#13265C',
        border: '#22356E',
        borderStrong: '#3A4E8C',
        primary: '#004AAD',
        accent: '#FFC23D',
        accentSoft: '#FFE3A0',
        onAccent: '#07112B',
        text: '#F3F5FB',
        textMuted: '#A9B4D6',
        textFaint: '#7F8CB8',
        success: '#3BE38F',
        successText: '#8AF0BF',
        error: '#FF7A66',
        errorText: '#FFB3A8'
    },
    fonts: {
        body: "'Bricolage Grotesque', system-ui, -apple-system, 'Segoe UI', sans-serif",
        logo: "'Lobster', cursive"
    },
    radii: {
        sm: '10px',
        md: '14px',
        lg: '24px',
        xl: '32px',
        pill: '999px'
    },
    breakpoints: {
        md: '800px',
        sm: '480px'
    }
};

/** Media query prefix for phone-sized layouts. */
export const onMobile = `@media (max-width: ${theme.breakpoints.md})`;
