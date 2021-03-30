import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset-advanced'
export const GlobalStyle = createGlobalStyle`
  ${reset}
  
  * {
    user-select: text;
  }

  html {
    background-color: #292636;
    font-family: 'Proxima Nova';
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    height: 100%;
  }

  body {
    background-color: #292636;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`
