import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { ChevronDown, ChevronRight, PlayCircle, CheckCircle, Clock, BookOpen } from "lucide-react";

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
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p>Carregando curso...</p>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                <div className="text-center">
                    <p className="text-xl mb-4">Curso não encontrado</p>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded transition"
                    >
                        Voltar ao Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Área do Vídeo */}
            <div className="flex-1 flex flex-col">
                {/* Player de Vídeo */}
                <div className="bg-black aspect-video w-full">
                    {currentLesson ? (
                        <iframe
                            src={currentLesson.videoEmbedUrl}
                            title={currentLesson.titulo}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full bg-gray-800">
                            <div className="text-center">
                                <PlayCircle size={64} className="mx-auto mb-4 text-gray-600" />
                                <p className="text-gray-400">Selecione uma aula para começar</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Informações da Aula Atual */}
                <div className="p-6 bg-gray-800 border-t border-gray-700">
                    <h1 className="text-2xl font-bold mb-2">
                        {currentLesson ? currentLesson.titulo : "Nenhuma aula selecionada"}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                            <BookOpen size={16} />
                            {course.titulo}
                        </span>
                        {currentLesson && (
                            <span className="flex items-center gap-1">
                                <Clock size={16} />
                                {formatDuration(currentLesson.duracaoSegundos)}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar - Lista de Módulos e Aulas */}
            <aside className="w-96 bg-gray-800 border-l border-gray-700 overflow-y-auto">
                <div className="p-4 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
                    <h2 className="text-lg font-bold">Conteúdo do Curso</h2>
                    <p className="text-sm text-gray-400 mt-1">
                        {course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0)} aulas
                    </p>
                </div>

                <div className="p-2">
                    {course.modules.map((module, moduleIndex) => (
                        <div key={module.id} className="mb-2">
                            {/* Cabeçalho do Módulo */}
                            <button
                                onClick={() => toggleModule(module.id)}
                                className="w-full flex items-center justify-between p-3 bg-gray-700 hover:bg-gray-650 rounded transition text-left"
                            >
                                <div className="flex items-center gap-2">
                                    {expandedModules.includes(module.id) ? (
                                        <ChevronDown size={20} />
                                    ) : (
                                        <ChevronRight size={20} />
                                    )}
                                    <span className="font-semibold">
                                        Módulo {moduleIndex + 1}: {module.titulo}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {module.lessons.length} aulas
                                </span>
                            </button>

                            {/* Lista de Aulas */}
                            {expandedModules.includes(module.id) && (
                                <div className="mt-1 ml-4 space-y-1">
                                    {module.lessons.map((lesson, lessonIndex) => (
                                        <button
                                            key={lesson.id}
                                            onClick={() => setCurrentLesson(lesson)}
                                            className={`w-full flex items-center gap-3 p-3 rounded transition text-left ${currentLesson?.id === lesson.id
                                                    ? "bg-purple-600 text-white"
                                                    : "bg-gray-750 hover:bg-gray-700 text-gray-300"
                                                }`}
                                        >
                                            <div className="flex-shrink-0">
                                                {currentLesson?.id === lesson.id ? (
                                                    <PlayCircle size={20} className="text-white" />
                                                ) : (
                                                    <CheckCircle size={20} className="text-gray-500" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">
                                                    {lessonIndex + 1}. {lesson.titulo}
                                                </p>
                                                <p className="text-xs opacity-75">
                                                    {formatDuration(lesson.duracaoSegundos)}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
}
