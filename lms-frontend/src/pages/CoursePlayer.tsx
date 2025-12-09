import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { ChevronDown, ChevronRight, PlayCircle, Clock, BookOpen, Menu, LogOut } from "lucide-react";
import { DoubtsSection } from "../components/DoubtsSection";

interface Lesson {
    id: number;
    titulo: string;
    videoEmbedUrl: string;
    duracaoSegundos: number;
}

interface Module {
    id: number;
    titulo: string;
    lessons: Lesson[];
}

interface CourseDetails {
    id: number;
    titulo: string;
    descricao: string;
    modules: Module[];
}

export function CoursePlayer() {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();

    const [course, setCourse] = useState<CourseDetails | null>(null);
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const [expandedModules, setExpandedModules] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        if (!courseId) return;

        api.get(`/courses/${courseId}`)
            .then(response => {
                const courseData = response.data;
                setCourse(courseData);

                // Expande o primeiro módulo e seleciona a primeira aula
                if (courseData.modules.length > 0) {
                    setExpandedModules([courseData.modules[0].id]);
                    if (courseData.modules[0].lessons.length > 0) {
                        setCurrentLesson(courseData.modules[0].lessons[0]);
                    }
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar curso", err);
                setLoading(false);
            });
    }, [courseId]);

    const toggleModule = (moduleId: number) => {
        setExpandedModules(prev =>
            prev.includes(moduleId)
                ? prev.filter(id => id !== moduleId)
                : [...prev, moduleId]
        );
    };

    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-300 animate-pulse">Carregando conteúdo do curso...</p>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                <div className="text-center max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LogOut className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Curso não encontrado</h2>
                    <p className="text-gray-400 mb-6">O curso que você está procurando não existe ou você não tem permissão para acessá-lo.</p>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium shadow-lg shadow-purple-600/20"
                    >
                        Voltar ao Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-900 text-white overflow-hidden font-sans">
            {/* Área Principal */}
            <div className="flex-1 h-full overflow-y-auto relative bg-gray-900 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {/* Header Mobile / Toggle Sidebar */}
                <div className="absolute top-4 left-4 z-30 md:hidden">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 bg-gray-800/90 backdrop-blur rounded-lg shadow-lg text-gray-300 hover:text-white border border-gray-700"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* Player de Vídeo */}
                <div className="w-full aspect-video bg-black relative flex items-center justify-center shadow-2xl z-20 flex-shrink-0">
                    {currentLesson ? (
                        <div className="w-full h-full relative group">
                            <iframe
                                src={currentLesson.videoEmbedUrl}
                                title={currentLesson.titulo}
                                className="w-full h-full shadow-2xl"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <div className="text-center p-8">
                            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                <PlayCircle size={48} className="text-purple-500 opacity-80" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-300 mb-2">Pronto para começar?</h3>
                            <p className="text-gray-500">Selecione uma aula no menu ao lado para iniciar seus estudos.</p>
                        </div>
                    )}
                </div>

                {/* Informações da Aula Atual */}
                <div className="bg-gray-800 border-t border-gray-700 p-6 md:p-8 shadow-lg z-20">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                                    {currentLesson ? currentLesson.titulo : "Bem-vindo ao curso"}
                                </h1>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <span className="flex items-center gap-1.5 bg-gray-700/50 px-3 py-1 rounded-full">
                                        <BookOpen size={14} className="text-purple-400" />
                                        {course.titulo}
                                    </span>
                                    {currentLesson && (
                                        <span className="flex items-center gap-1.5 bg-gray-700/50 px-3 py-1 rounded-full">
                                            <Clock size={14} className="text-blue-400" />
                                            {formatDuration(currentLesson.duracaoSegundos)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/dashboard')}
                                className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-700"
                            >
                                <LogOut size={16} />
                                Sair do Curso
                            </button>
                        </div>
                    </div>

                    {/* Doubts Section */}
                    {currentLesson && (
                        <div className="max-w-5xl mx-auto mt-8">
                            <DoubtsSection lessonId={currentLesson.id} />
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar - Lista de Módulos e Aulas */}
            <aside
                className={`
                    fixed md:relative top-0 right-0 h-full w-80 md:w-96 bg-gray-850 border-l border-gray-700 
                    transform transition-transform duration-300 ease-in-out z-30 shadow-2xl flex flex-col
                    ${sidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0 md:w-0 md:border-none md:overflow-hidden'}
                `}
            >
                <div className="p-5 border-b border-gray-700 bg-gray-850 sticky top-0 z-10 shadow-md flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-white tracking-wide">Conteúdo do Curso</h2>
                        <p className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-wider">
                            {course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0)} aulas disponíveis
                        </p>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden p-1 text-gray-400 hover:text-white"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
                    {course.modules.map((module) => (
                        <div key={module.id} className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50">
                            {/* Cabeçalho do Módulo */}
                            <button
                                onClick={() => toggleModule(module.id)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-800 transition-colors duration-200 text-left group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`
                                        p-1 rounded-md transition-colors duration-200
                                        ${expandedModules.includes(module.id) ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-700/50 text-gray-400 group-hover:text-gray-300'}
                                    `}>
                                        {expandedModules.includes(module.id) ? (
                                            <ChevronDown size={18} />
                                        ) : (
                                            <ChevronRight size={18} />
                                        )}
                                    </div>
                                    <span className="font-semibold text-sm text-gray-200 group-hover:text-white transition-colors">
                                        {module.titulo}
                                    </span>
                                </div>
                                <span className="text-xs font-medium text-gray-500 bg-gray-800 px-2 py-1 rounded border border-gray-700">
                                    {module.lessons.length}
                                </span>
                            </button>

                            {/* Lista de Aulas */}
                            <div className={`
                                transition-all duration-300 ease-in-out overflow-hidden
                                ${expandedModules.includes(module.id) ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
                            `}>
                                <div className="p-2 space-y-1 bg-black/20">
                                    {module.lessons.map((lesson, lessonIndex) => {
                                        const isActive = currentLesson?.id === lesson.id;
                                        return (
                                            <button
                                                key={lesson.id}
                                                onClick={() => setCurrentLesson(lesson)}
                                                className={`
                                                    w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left group relative
                                                    ${isActive
                                                        ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-sm"
                                                        : "text-gray-400 hover:bg-gray-700/50 hover:text-gray-200"
                                                    }
                                                `}
                                            >
                                                {isActive && (
                                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-500 rounded-r-full"></div>
                                                )}

                                                <div className="flex-shrink-0 ml-1">
                                                    {isActive ? (
                                                        <PlayCircle size={18} className="text-purple-400 animate-pulse" />
                                                    ) : (
                                                        <div className="w-4 h-4 rounded-full border-2 border-gray-600 group-hover:border-gray-400 transition-colors"></div>
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm font-medium truncate ${isActive ? 'text-purple-200' : ''}`}>
                                                        {lessonIndex + 1}. {lesson.titulo}
                                                    </p>
                                                    <p className="text-xs opacity-60 mt-0.5 font-mono">
                                                        {formatDuration(lesson.duracaoSegundos)}
                                                    </p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
}
