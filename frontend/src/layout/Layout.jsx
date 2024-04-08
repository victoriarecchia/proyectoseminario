import { Outlet } from "react-router-dom"
import { MenuNavbar } from "./MenuNavbar"


export const Layout = () => {
  return (
    <div>
      <MenuNavbar/>
      <Outlet />
    </div>
  )
}
