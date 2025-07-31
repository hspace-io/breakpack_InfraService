import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Orbitron', sans-serif;
    color: white;
  }
  body{
    background-color: black;
    overflow: hidden;
  }
`;

export default GlobalStyle;
