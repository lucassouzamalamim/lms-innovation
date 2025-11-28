import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, Mail, User, ArrowRight } from 'lucide-react'
import { api } from '../services/api'

export function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault()
        setError(false)

        if (!name.trim() || !email.trim() || !password.trim()) {
            setError(true)
            return
        }

        setIsLoading(true)

        try {
            await api.post('/auth/register', {
                nome: name,
                email,
                password,
                role: 'ALUNO'
            })
            navigate('/')
        } catch (err) {
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10 transform transition-all hover:scale-[1.01]">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 mb-4 shadow-lg shadow-purple-500/30">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Crie sua conta</h2>
                    <p className="text-gray-400 text-sm">Comece sua jornada de aprendizado hoje</p>
                </div>

                <form onSubmit={handleRegister} noValidate className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Nome Completo</label>
                        <div className="relative group">
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                            <input
                                type="text"
                                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2.5 pl-10 pr-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Seu nome"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">E-mail</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                            <input
                                type="email"
                                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2.5 pl-10 pr-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Senha</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                            <input
                                type="password"
                                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2.5 pl-10 pr-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center animate-pulse">
                            Erro ao criar conta. Verifique os dados e tente novamente.
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-purple-600/20 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Criar Conta
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-500 text-xs">
                        Já tem uma conta? <Link to="/" className="text-purple-400 hover:text-purple-300 transition-colors">Faça login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
