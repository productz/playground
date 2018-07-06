import { injectGlobal } from "styled-components";

const colors = {
  primary: "#0eb1d2",
  accent: "#02182b",
  error: "#d7263d",
  contrast: "#dee5e5"
};

const margins = {
  bottom: "1.5rem"
};

const paddings = {
  quarter: "0.25rem",
  half: "0.5rem",
  base: "1rem",
  double: "2rem"
};

// Reusable definitions for colors, spacings, etc.
export const theme = {
  colors,
  margins,
  paddings
};

// Inject some global styles that are most likely to be coupled to theme variables.
injectGlobal`
  body {
    font-size: 16px;
    font-weight: normal;
    font-family: sans-serif;
    background-color: ${colors.contrast};
  }
  .card{
    border-radius: 5px;
    background: #FFFFFF;
    margin: 10px;
    padding:0px;
    height:auto;
    -webkit-box-shadow: 0px 3px 5px -2px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 3px 5px -2px rgba(0,0,0,0.75);
    box-shadow: 0px 3px 5px -2px rgba(0,0,0,0.75);
  }
  .card img{
    margin-top:20px;
    width:150px;
    height:215px;
  }
  .card__description{
    min-height:70px;
  }
  .card__title{
    margin-bottom:0px;
    font-size:16px;
  }
  .card__artist{
    margin-bottom:0px;
    margin-top:5px;
    font-size:12px;
  }
`;

// Simple helper function, takes in any number of props mapping to properties within the theme
// object and returns the value.
export const getTheme = (...props) => ({ theme }) =>
  props.reduce((t, p) => t[p], theme);
