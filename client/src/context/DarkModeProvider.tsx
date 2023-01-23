import { createContext, Dispatch, SetStateAction, useState } from 'react'

interface AppContextInterface {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
}

export const darkModeContextDefaultValue: AppContextInterface = {
  isDarkMode: false,
  setIsDarkMode: () => false
}

export const DarkModeContext = createContext(darkModeContextDefaultValue)


export const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}