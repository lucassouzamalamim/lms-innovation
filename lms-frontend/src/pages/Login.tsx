import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const { signIn } = useContext(AuthContext)
  const navigate = useNavigate()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(false)

    if (!email.trim() || !password.trim()) {
      setError(true)
      return
    }

    try {
      await signIn({ email, password })
      navigate('/dashboard')
    } catch (err) {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-400">Innovation LMS</h2>

        <form onSubmit={handleLogin} noValidate className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                className="w-full bg-gray-700 border border-gray-600 rounded py-2 pl-10 pr-3 focus:outline-none focus:border-purple-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                className="w-full bg-gray-700 border border-gray-600 rounded py-2 pl-10 pr-3 focus:outline-none focus:border-purple-500"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="******"
              />
            </div>
          </div>

          {error && <span className="text-red-500 text-sm block text-center">Credenciais inválidas. Tente novamente.</span>}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded transition duration-200"
          >
            Entrar na Plataforma
          </button>
        </form>
      </div>
    </div>
  )
}
