import Router from "./Router";
import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset} // reset css
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Source+Sans+Pro&display=swap'); // font install
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor}
  }
  a {
    text-decoration: none;
  }
`;
function App() {
    return (
        <>
            <GlobalStyle/>
            <Router/>
        </>
    );
}

export default App;
