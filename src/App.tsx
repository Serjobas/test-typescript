import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { theme } from './theme/dark'
import { GlobalStyle } from './layouts/GlobalStyle'
import { DataContextProvider } from './components/DataContext'
import { PictureModalContextProvider } from './components/PictureModalContext'
import { Routes } from './routes'
import { LikesContextProvider } from './components/LikesContext'

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </>
  )
}

export default App
