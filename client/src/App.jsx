import { BrowserRouter, Routes, Route } from "react-router-dom"
import PaginaInicio from "./pages/paginaInicio.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
