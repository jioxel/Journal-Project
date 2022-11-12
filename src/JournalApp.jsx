import { AppRoute } from "./routes/AppRoute"
import { Route, Routes } from "react-router-dom"
import { AppTheme } from "./theme"


export const JournalApp = () => {
  return <>
  <AppTheme>
      <AppRoute/>
  </AppTheme>
  </>
}
