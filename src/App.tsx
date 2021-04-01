import * as React from 'react'
import { useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { theme, themeColorsMap } from './theme/dark'
import { GlobalStyle } from './layouts/GlobalStyle'
import { DataContextProvider } from './components/DataContext'
import { PictureModalContextProvider } from './components/PictureModalContext'
import { Routes } from './routes'
import { LikesContextProvider } from './components/LikesContext'
import { MyThemeContextProvider } from './components/MyThemeContext'
import { MyThemeContext } from './components/MyThemeContext/context'

const ThemeProviderContainer: React.FC = ({ children }) => {
  const { theme: themeLabel } = useContext(MyThemeContext)

  const newTheme = {
    ...theme,
    colors: themeColorsMap[themeLabel],
  }

  return <ThemeProvider theme={newTheme}>{children}</ThemeProvider>
}

function App() {
  return (
    <>
      <GlobalStyle />
      <MyThemeContextProvider>
        <ThemeProviderContainer>
          <DataContextProvider>
            <PictureModalContextProvider>
              <LikesContextProvider>
                <Routes />
              </LikesContextProvider>
            </PictureModalContextProvider>
            {/*<CoreLayout>*/}
            {/*  <DefaultContent header="Trending images">*/}
            {/*    <PictureGrid category={undefined} />*/}
            {/*  </DefaultContent>*/}
            {/*</CoreLayout>*/}
          </DataContextProvider>
          <ToastContainer />
        </ThemeProviderContainer>
      </MyThemeContextProvider>
    </>
  )
}

export default App
