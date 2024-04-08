import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { Inicio } from "./pages/Inicio"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Layout } from "./layout/Layout"
import { AboutUs } from "./pages/AboutUs"
import Donantes from "./pages/Donantes"
import { Donar } from "./pages/Donar"
import { Datos } from "./pages/Datos"
import { Login } from "./components/Login/Login"
import { Registro } from "./components/Register/Registro"


function App() {
  return (
    <>
      {/* <AuthProvider> */}
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Inicio />}></Route>
              <Route path="/info" element={<AboutUs />}></Route>
              <Route path="/donantes" element={<Donantes />}></Route>
              <Route path="/donar" element={<Donar />}></Route>
              <Route path="/datos" element={<Datos />}></Route>
            </Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/registro" element={<Registro/>}></Route>
          </Routes>
        </BrowserRouter >
      {/* </AuthProvider> */}

    </>
  )
}

export default App
