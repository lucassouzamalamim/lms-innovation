import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, AuthContext } from './contexts/AuthContext'
import { useContext } from 'react'
import { Login } from './pages/Login'

function PrivateRoutes() {
  const { isAuthenticated } = useContext(AuthContext)
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

function Dashboard() {
  return <h1 className="text-2xl p-10">Bem-vindo ao Dashboard! 🚀</h1>
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Rotas Protegidas */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Futuros routes: /cursos, /aulas, etc */}
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
