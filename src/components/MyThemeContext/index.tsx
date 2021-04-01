import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'
import { MyThemeContext } from './context'
import { IMyThemeContext, IThemeType } from './types'
import { DARK_THEME, THEME_STORAGE_KEY } from './constants'

export const MyThemeContextProvider: React.FC = React.memo(({ children }) => {
  const themeFromStorage = localStorage.getItem(THEME_STORAGE_KEY) as IThemeType | null

  const [theme, setTheme] = useState<IThemeType>(themeFromStorage || DARK_THEME)

  const updateTheme = useCallback(
    (newTheme: IThemeType) => {
      setTheme(newTheme)
      localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    },
    [setTheme],
  )

  const value = useMemo((): IMyThemeContext => {
    return {
      theme,
      updateTheme,
    }
  }, [theme, updateTheme])

  return <MyThemeContext.Provider value={value}>{children}</MyThemeContext.Provider>
})
