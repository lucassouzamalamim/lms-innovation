import { useState, useEffect } from 'react'
import { api } from '../services/api'
import { Plus, Trash, Edit, ChevronDown, ChevronUp, Video, FileText } from 'lucide-react'

type Lesson = {
    id: number
    titulo: string
    descricao: string
    videoEmbedUrl: string
    duracaoSegundos: number
    ordem: number
    materialApoioUrl: string
}

type Module = {
    id: number
    titulo: string
    ordem: number
    lessons: Lesson[]
}

type CourseContentManagerProps = {
    courseId: number
}

export function CourseContentManager({ courseId }: CourseContentManagerProps) {
    const [modules, setModules] = useState<Module[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [expandedModuleId, setExpandedModuleId] = useState<number | null>(null)

    // Modal states
    const [isModuleModalOpen, setIsModuleModalOpen] = useState(false)
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false)
    const [editingModule, setEditingModule] = useState<Module | null>(null)
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
    const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null)

    // Form states
    const [moduleTitle, setModuleTitle] = useState('')
    const [lessonTitle, setLessonTitle] = useState('')
    const [lessonDescription, setLessonDescription] = useState('')
    const [lessonVideoUrl, setLessonVideoUrl] = useState('')
    const [lessonMaterialUrl, setLessonMaterialUrl] = useState('')
    const [lessonDuration, setLessonDuration] = useState(0)

    useEffect(() => {
        loadModules()
    }, [courseId])

    async function loadModules() {
        try {
            const response = await api.get(`/courses/${courseId}`)
            // The course details endpoint returns modules with lessons
            // We need to sort them by order
            const sortedModules = response.data.modules.sort((a: Module, b: Module) => a.ordem - b.ordem)

            // Sort lessons within modules
            sortedModules.forEach((mod: Module) => {
                mod.lessons.sort((a: Lesson, b: Lesson) => a.ordem - b.ordem)
            })

            setModules(sortedModules)
        } catch (error) {
            console.error('Erro ao carregar módulos', error)
        } finally {
            setIsLoading(false)
        }
    }

    function openModuleModal(module?: Module) {
        if (module) {
            setEditingModule(module)
            setModuleTitle(module.titulo)
        } else {
            setEditingModule(null)
            setModuleTitle('')
        }
        setIsModuleModalOpen(true)
    }

    function openLessonModal(moduleId: number, lesson?: Lesson) {
        setSelectedModuleId(moduleId)
        if (lesson) {
            setEditingLesson(lesson)
            setLessonTitle(lesson.titulo)
            setLessonDescription(lesson.descricao)
            setLessonVideoUrl(lesson.videoEmbedUrl)
            setLessonMaterialUrl(lesson.materialApoioUrl)
            setLessonDuration(lesson.duracaoSegundos)
        } else {
            setEditingLesson(null)
            setLessonTitle('')
            setLessonDescription('')
            setLessonVideoUrl('')
            setLessonMaterialUrl('')
            setLessonDuration(0)
        }
        setIsLessonModalOpen(true)
    }

    async function handleSaveModule(e: React.FormEvent) {
        e.preventDefault()
        try {
            if (editingModule) {
                await api.put(`/modules/${editingModule.id}`, {
                    titulo: moduleTitle,
                    ordem: editingModule.ordem,
                    courseId
                })
            } else {
                await api.post('/modules', {
                    titulo: moduleTitle,
                    ordem: modules.length + 1,
                    courseId
                })
            }
            setIsModuleModalOpen(false)
            loadModules()
        } catch (error) {
            console.error('Erro ao salvar módulo', error)
            alert('Erro ao salvar módulo')
        }
    }

    async function handleDeleteModule(id: number) {
        if (!confirm('Tem certeza que deseja excluir este módulo e todas as suas aulas?')) return
        try {
            await api.delete(`/modules/${id}`)
            loadModules()
        } catch (error) {
            console.error('Erro ao excluir módulo', error)
            alert('Erro ao excluir módulo')
        }
    }

    async function handleSaveLesson(e: React.FormEvent) {
        e.preventDefault()
        try {
            const data = {
                titulo: lessonTitle,
                descricao: lessonDescription,
                videoEmbedUrl: lessonVideoUrl,
                duracaoSegundos: lessonDuration,
                materialApoioUrl: lessonMaterialUrl,
                moduleId: selectedModuleId,
                ordem: editingLesson ? editingLesson.ordem : (modules.find(m => m.id === selectedModuleId)?.lessons.length || 0) + 1
            }

            if (editingLesson) {
                await api.put(`/lessons/${editingLesson.id}`, data)
            } else {
                await api.post('/lessons', data)
            }
            setIsLessonModalOpen(false)
            loadModules()
        } catch (error) {
            console.error('Erro ao salvar aula', error)
            alert('Erro ao salvar aula')
        }
    }

    async function handleDeleteLesson(id: number) {
        if (!confirm('Tem certeza que deseja excluir esta aula?')) return
        try {
            await api.delete(`/lessons/${id}`)
            loadModules()
        } catch (error) {
            console.error('Erro ao excluir aula', error)
            alert('Erro ao excluir aula')
        }
    }

    function toggleModule(id: number) {
        setExpandedModuleId(expandedModuleId === id ? null : id)
    }

    if (isLoading) return <div className="text-white">Carregando conteúdo...</div>

    return (
        <div className="mt-8 border-t border-gray-800 pt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Conteúdo do Curso</h2>
                <button
                    onClick={() => openModuleModal()}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} />
                    Novo Módulo
                </button>
            </div>

            <div className="space-y-4">
                {modules.map(module => (
                    <div key={module.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                        <div
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-800 transition-colors"
                            onClick={() => toggleModule(module.id)}
                        >
                            <div className="flex items-center gap-4">
                                {expandedModuleId === module.id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                                <h3 className="text-lg font-bold text-white">{module.titulo}</h3>
                                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">{module.lessons.length} aulas</span>
                            </div>
                            <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                <button
                                    onClick={() => openModuleModal(module)}
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                    title="Editar Módulo"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDeleteModule(module.id)}
                                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                                    title="Excluir Módulo"
                                >
                                    <Trash size={18} />
                                </button>
                            </div>
                        </div>

                        {expandedModuleId === module.id && (
                            <div className="border-t border-gray-800 bg-black/20 p-4">
                                <div className="space-y-2">
                                    {module.lessons.map(lesson => (
                                        <div key={lesson.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-purple-500/10 flex items-center justify-center text-purple-400">
                                                    <Video size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{lesson.titulo}</p>
                                                    <p className="text-xs text-gray-500">{Math.floor(lesson.duracaoSegundos / 60)} min</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openLessonModal(module.id, lesson)}
                                                    className="p-1.5 text-gray-400 hover:text-white transition-colors"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteLesson(lesson.id)}
                                                    className="p-1.5 text-red-400 hover:text-red-300 transition-colors"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => openLessonModal(module.id)}
                                        className="w-full py-3 border-2 border-dashed border-gray-700 rounded-lg text-gray-500 hover:border-purple-500 hover:text-purple-500 transition-all flex items-center justify-center gap-2 text-sm font-medium mt-4"
                                    >
                                        <Plus size={16} />
                                        Adicionar Aula
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {modules.length === 0 && (
                    <div className="text-center py-12 text-gray-500 bg-gray-900/50 rounded-xl border border-dashed border-gray-800">
                        <p>Nenhum módulo criado ainda.</p>
                    </div>
                )}
            </div>

            {/* Module Modal */}
            {isModuleModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-white mb-4">{editingModule ? 'Editar Módulo' : 'Novo Módulo'}</h3>
                        <form onSubmit={handleSaveModule}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-400 mb-2">Título</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500"
                                    value={moduleTitle}
                                    onChange={e => setModuleTitle(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModuleModalOpen(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Lesson Modal */}
            {isLessonModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold text-white mb-4">{editingLesson ? 'Editar Aula' : 'Nova Aula'}</h3>
                        <form onSubmit={handleSaveLesson} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Título</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500"
                                    value={lessonTitle}
                                    onChange={e => setLessonTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Descrição</label>
                                <textarea
                                    rows={3}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500 resize-none"
                                    value={lessonDescription}
                                    onChange={e => setLessonDescription(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">URL do Vídeo (Embed)</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500"
                                    value={lessonVideoUrl}
                                    onChange={e => setLessonVideoUrl(e.target.value)}
                                    placeholder="https://player.vimeo.com/video/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Duração (segundos)</label>
                                <input
                                    type="number"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500"
                                    value={lessonDuration}
                                    onChange={e => setLessonDuration(Number(e.target.value))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Material de Apoio (URL)</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500"
                                    value={lessonMaterialUrl}
                                    onChange={e => setLessonMaterialUrl(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsLessonModalOpen(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
