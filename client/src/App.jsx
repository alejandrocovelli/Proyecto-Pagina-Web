import { BrowserRouter, Routes, Route } from "react-router-dom"
import PaginaInicio from "./pages/paginaInicio.jsx"
import PaginaCatalogo from "./pages/PaginaCatalogo.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/catalogo" element={<PaginaCatalogo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
