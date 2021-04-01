import * as React from 'react'
import { IMyThemeContext } from './types'
import { DARK_THEME } from './constants'

export const MyThemeContext = React.createContext<IMyThemeContext>({
  theme: DARK_THEME,
  updateTheme: () => {},
})
