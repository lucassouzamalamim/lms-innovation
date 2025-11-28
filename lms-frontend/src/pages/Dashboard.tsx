import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Play, Info, ChevronRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Course {
    id: number;
    titulo: string;
    descricao: string;
    bannerUrl: string;
    professorNome: string;
}

export function Dashboard() {
    const [courses, setCourses] = useState<Course[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/courses")
            .then(response => setCourses(response.data))
            .catch(err => console.error("Erro ao buscar cursos", err));
    }, []);

    // Mock de progresso para "Continue de onde parou"
    const continueWatching = [
        { id: 1, title: "Matemática: Geometria Espacial", progress: 75, image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop", timeLeft: "45min" },
        { id: 2, title: "História: Revolução Francesa", progress: 30, image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2074&auto=format&fit=crop", timeLeft: "50min" },
        { id: 3, title: "Física: Termodinâmica", progress: 10, image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1974&auto=format&fit=crop", timeLeft: "1h 20min" },
    ];

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Hero Section */}
            <div className="relative w-full h-[85vh]">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')`
                    }}
                >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 h-full flex flex-col justify-center px-12 max-w-3xl space-y-6">
                    <div className="inline-flex items-center px-3 py-1 rounded bg-red-600 text-white text-xs font-bold tracking-wider w-fit">
                        INTENSIVÃO ENEM
                    </div>

                    <h1 className="text-6xl font-bold leading-tight tracking-tight">
                        A Reta Final Começou
                    </h1>

                    <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                        Prepare-se para a prova mais importante do ano com nosso cronograma intensivo.
                        Aulas ao vivo todos os dias, exercícios focados nas competências e correção de redação com IA.
                    </p>

                    <div className="flex items-center gap-4 pt-4">
                        <button
                            onClick={() => navigate('/course/1')}
                            className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition-colors"
                        >
                            <Play size={24} fill="currentColor" />
                            Começar Agora
                        </button>

                        <button className="flex items-center gap-3 bg-gray-600/80 text-white px-8 py-3 rounded font-bold hover:bg-gray-600/60 transition-colors backdrop-blur-sm">
                            <Info size={24} />
                            Mais Informações
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Sections - Negative Margin to pull up over hero gradient */}
            <div className="relative z-20 -mt-32 px-12 space-y-12">

                {/* Section: Continue Watching */}
                <div>
                    <h2 className="text-xl font-bold mb-4 text-gray-100 flex items-center gap-2">
                        Continue de onde parou
                        <ChevronRight size={20} className="text-gray-500" />
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {continueWatching.map((item) => (
                            <div key={item.id} className="group cursor-pointer relative">
                                <div className="relative aspect-video rounded-md overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:z-10 shadow-lg">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />

                                    {/* Play Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50">
                                            <Play size={20} fill="white" className="text-white ml-1" />
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                                        <div
                                            className="h-full bg-red-600"
                                            style={{ width: `${item.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <h3 className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">{item.title}</h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                        <Clock size={12} />
                                        <span>{item.timeLeft} restantes</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section: Available Courses */}
                <div>
                    <h2 className="text-xl font-bold mb-4 text-gray-100 flex items-center gap-2">
                        Cursos Disponíveis
                        <ChevronRight size={20} className="text-gray-500" />
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {courses.length > 0 ? courses.map((course) => (
                            <div
                                key={course.id}
                                onClick={() => navigate(`/course/${course.id}`)}
                                className="group cursor-pointer relative"
                            >
                                <div className="aspect-[2/3] rounded-md overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:z-10 shadow-lg relative">
                                    <img
                                        src={course.bannerUrl || 'https://via.placeholder.com/300x450?text=Curso'}
                                        alt={course.titulo}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>

                                    <div className="absolute bottom-0 left-0 p-4 w-full">
                                        <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider mb-1 block">Novo</span>
                                        <h3 className="text-sm font-bold text-white leading-tight">{course.titulo}</h3>
                                        <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">{course.professorNome}</p>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <p className="text-gray-500 col-span-full">Carregando cursos...</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
