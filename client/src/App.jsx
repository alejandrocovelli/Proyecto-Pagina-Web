import { BrowserRouter, Routes, Route } from "react-router-dom"
import Inicio from "./pages/inicio.jsx"
import Catalogo from "./pages/catalogo.jsx"
import Login from "./pages/login.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalogo" element={<Catalogo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
