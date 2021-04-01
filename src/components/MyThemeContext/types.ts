import { DARK_THEME, WHITE_THEME } from './constants'

export type IThemeType = typeof WHITE_THEME | typeof DARK_THEME;

export interface IMyThemeContext {
  theme: IThemeType
  updateTheme: (theme: IThemeType) => void
}
