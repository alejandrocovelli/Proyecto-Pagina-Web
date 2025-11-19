import { BrowserRouter, Routes, Route } from "react-router-dom"
import Inicio from "./pages/inicio.jsx"
import Catalogo from "./pages/catalogo.jsx"
import Login from "./pages/login.jsx"
import Categorias from "./pages/categorias.jsx"
import Usuario from "./pages/usuario.jsx"
import Producto from "./pages/producto.js"
import { RequireAuth } from "./utils/RequireAuth.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"
import { ToastProvider } from "./context/ToastContext.jsx"
import Carrito from "./pages/carrito.jsx"

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <RequireAuth>
              <Inicio />
            </RequireAuth>
          } />
          <Route path="/catalogo" element={
            <RequireAuth>
              <Catalogo />
            </RequireAuth>
          } />
          <Route path="/categoria/:idCategoria" element={
            <RequireAuth>
              <Categorias />
            </RequireAuth>
          } />
          <Route path="/product/:idProducto" element={
            <RequireAuth>
              <Producto />
            </RequireAuth>
          } />
          <Route path="/carrito" element={
            <RequireAuth>
              <Carrito />
            </RequireAuth>
          } />
          <Route path="/usuario" element={
            <RequireAuth>
              <Usuario />
            </RequireAuth>
          } />
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  )
}

export default App
