import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, AuthContext } from './contexts/AuthContext'
import { useContext } from 'react'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { CoursePlayer } from './pages/CoursePlayer'
import { AppLayout } from './layouts/AppLayout'

function PrivateRoutes() {
  const { isAuthenticated } = useContext(AuthContext)
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas Protegidas */}
          <Route element={<PrivateRoutes />}>
            {/* Envelopando com o Layout Visual */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Futuros routes: /cursos, /aulas, etc */}
            </Route>

            {/* Player de Vídeo (sem layout, tela cheia) */}
            <Route path="/course/:courseId" element={<CoursePlayer />} />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
