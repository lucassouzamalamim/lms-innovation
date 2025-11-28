import { useState, useEffect } from 'react'
import { api } from '../services/api'
import { Plus, Edit, Trash, Search, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

type Course = {
    id: number
    titulo: string
    slug: string
    descricao: string
    bannerUrl: string
    professorNome: string
}

export function CourseManagement() {
    const [courses, setCourses] = useState<Course[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        loadCourses()
    }, [])

    async function loadCourses() {
        try {
            const response = await api.get('/courses')
            setCourses(response.data)
        } catch (error) {
            console.error('Erro ao carregar cursos', error)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleDelete(id: number) {
        if (!confirm('Tem certeza que deseja excluir este curso?')) return

        try {
            await api.delete(`/courses/${id}`)
            setCourses(courses.filter(course => course.id !== id))
        } catch (error) {
            console.error('Erro ao excluir curso', error)
            alert('Erro ao excluir curso')
        }
    }

    const filteredCourses = courses.filter(course =>
        course.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Gerenciar Cursos</h1>
                <Link
                    to="/admin/courses/new"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} />
                    Novo Curso
                </Link>
            </div>

            <div className="mb-6 relative">
                <Search className="absolute left-3 top-3 text-gray-500" size={20} />
                <input
                    type="text"
                    placeholder="Buscar cursos..."
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            {isLoading ? (
                <div className="text-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map(course => (
                        <div key={course.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors group">
                            <div className="h-40 bg-gray-800 relative">
                                {course.bannerUrl ? (
                                    <img src={course.bannerUrl} alt={course.titulo} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-700">
                                        <BookOpen size={48} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Link
                                        to={`/admin/courses/${course.id}`}
                                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                                        title="Editar"
                                    >
                                        <Edit size={20} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(course.id)}
                                        className="p-2 bg-red-500/80 hover:bg-red-600/80 rounded-full text-white transition-colors"
                                        title="Excluir"
                                    >
                                        <Trash size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-white mb-1 truncate">{course.titulo}</h3>
                                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{course.descricao}</p>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>{course.professorNome}</span>
                                    <span className="bg-gray-800 px-2 py-1 rounded">ID: {course.id}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
