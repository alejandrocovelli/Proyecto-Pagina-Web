import { BrowserRouter, Routes, Route } from "react-router-dom"
import Inicio from "./pages/inicio.jsx"
import Catalogo from "./pages/catalogo.jsx"
import Login from "./pages/login.jsx"
import Categorias from "./pages/categorias.jsx"
import Usuario from "./pages/usuario.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/categoria/:idCategoria" element={<Categorias />} />
        <Route path="/usuario" element={<Usuario />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
