import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../services/api'
import { ArrowLeft, Save, Upload } from 'lucide-react'
import { CourseContentManager } from '../components/CourseContentManager'

export function CourseForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditing = !!id

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [description, setDescription] = useState('')
    const [bannerUrl, setBannerUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isEditing) {
            loadCourse()
        }
    }, [id])

    async function loadCourse() {
        try {
            const response = await api.get(`/courses/${id}`)
            const course = response.data
            setTitle(course.titulo)
            setSlug(course.slug)
            setDescription(course.descricao)
            setBannerUrl(course.bannerUrl)
        } catch (error) {
            console.error('Erro ao carregar curso', error)
            alert('Erro ao carregar dados do curso')
            navigate('/admin/courses')
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        const data = {
            titulo: title,
            slug,
            descricao: description,
            bannerUrl
        }

        try {
            if (isEditing) {
                await api.put(`/courses/${id}`, data)
            } else {
                await api.post('/courses', data)
            }
            navigate('/admin/courses')
        } catch (error) {
            console.error('Erro ao salvar curso', error)
            alert('Erro ao salvar curso')
        } finally {
            setIsLoading(false)
        }
    }

    // Auto-generate slug from title
    useEffect(() => {
        if (!isEditing) {
            setSlug(title.toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
                .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
                .replace(/\s+/g, '-') // Replace spaces with hyphens
            )
        }
    }, [title, isEditing])

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <button
                onClick={() => navigate('/admin/courses')}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
            >
                <ArrowLeft size={20} />
                Voltar para Cursos
            </button>

            <h1 className="text-3xl font-bold text-white mb-8">
                {isEditing ? 'Editar Curso' : 'Novo Curso'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Título do Curso</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Ex: Desenvolvimento Web Completo"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Slug (URL Amigável)</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-gray-300 focus:outline-none focus:border-purple-500 transition-colors font-mono text-sm"
                            value={slug}
                            onChange={e => setSlug(e.target.value)}
                            placeholder="ex: desenvolvimento-web-completo"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Descrição</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Uma breve descrição sobre o que será ensinado no curso..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">URL do Banner</label>
                        <div className="flex gap-4">
                            <input
                                type="url"
                                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                value={bannerUrl}
                                onChange={e => setBannerUrl(e.target.value)}
                                placeholder="https://exemplo.com/imagem.jpg"
                            />
                            {/* Placeholder for future upload button */}
                            <button type="button" className="bg-gray-800 hover:bg-gray-700 text-gray-300 p-3 rounded-lg border border-gray-700 transition-colors" title="Upload (Em breve)">
                                <Upload size={20} />
                            </button>
                        </div>
                        {bannerUrl && (
                            <div className="mt-4 h-48 rounded-lg overflow-hidden border border-gray-700">
                                <img src={bannerUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Save size={20} />
                                Salvar Curso
                            </>
                        )}
                    </button>
                </div>
            </form>

            {isEditing && <CourseContentManager courseId={Number(id)} />}
        </div>
    )
}
