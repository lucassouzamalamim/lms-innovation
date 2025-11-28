import { Plus, Video, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

export function AdminDashboard() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-8">Painel Administrativo</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card: Gerenciar Cursos */}
                <Link to="/admin/courses" className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500 transition-colors cursor-pointer group block">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                        <BookOpen className="text-purple-500" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Gerenciar Cursos</h3>
                    <p className="text-gray-400 text-sm mb-4">Adicione novos cursos, módulos e aulas.</p>
                    <button className="text-purple-400 text-sm font-semibold flex items-center gap-2 group-hover:text-purple-300">
                        Acessar <Plus size={16} />
                    </button>
                </Link>

                {/* Card: Aulas ao Vivo */}
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-red-500 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                        <Video className="text-red-500" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Aulas ao Vivo</h3>
                    <p className="text-gray-400 text-sm mb-4">Agende e gerencie suas transmissões ao vivo.</p>
                    <button className="text-red-400 text-sm font-semibold flex items-center gap-2 group-hover:text-red-300">
                        Gerenciar <Plus size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}
