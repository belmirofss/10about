/**
 * Open Trivia DB returns HTML-encoded text (e.g. `&quot;`, `&#039;`).
 * Decode it to plain text once, so it can be rendered without innerHTML.
 */
export const decodeHtml = (encoded: string): string =>
    new DOMParser().parseFromString(encoded, 'text/html').documentElement.textContent ?? encoded;
