import { injectGlobal } from "styled-components";

const colors = {
  primary: "#0eb1d2",
  accent: "#02182b",
  error: "#d7263d",
  contrast: "#dee5e5"
};

// Reusable definitions for colors, spacings, etc.
export const theme = {
  colors
};

// Inject some global styles that are most likely to be coupled to theme variables.
injectGlobal`
  body {
    font-size: 16px;
    font-weight: normal;
    font-family: sans-serif;
    background-color: ${colors.contrast};
    background: #00c9ff; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #00c9ff, #92fe9d); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #00c9ff, #92fe9d); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .App {
    text-align: center;
  }
  .App-header {
    background-color: rgba(0, 0, 0, 0.5);
    height: 50px;
    padding: 20px;
    color: white;
  }
  .App-title {
   font-size: 1.5em;
  }
`;

// Simple helper function, takes in any number of props mapping to properties within the theme
// object and returns the value.
export const getTheme = (...props) => ({ theme }) =>
  props.reduce((t, p) => t[p], theme);
