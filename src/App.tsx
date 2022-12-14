import Router from "./Router";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import reset from "styled-reset";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {darkTheme, lightTheme} from "./theme";
import {useRecoilValue} from "recoil";
import {isDarkAtom} from "./atoms";

const GlobalStyle = createGlobalStyle`
  ${reset} // reset css
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Source+Sans+Pro&display=swap'); // font install
  * {
    box-sizing: border-box;
  }
  body {
    font-weight: 300;
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
    line-height: 1.2;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
function App() {
    const isDark = useRecoilValue(isDarkAtom);
    return (
        <>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                <GlobalStyle/>
                <Router />
                <ReactQueryDevtools initialIsOpen={true} />
            </ThemeProvider>
        </>
    );
}

export default App;
