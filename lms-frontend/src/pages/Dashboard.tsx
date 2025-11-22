import { useEffect, useState } from "react";
import { api } from "../services/api";
import { PlayCircle } from "lucide-react";
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
        // Busca os cursos ao carregar a página
        api.get("/courses")
            .then(response => setCourses(response.data))
            .catch(err => console.error("Erro ao buscar cursos", err));
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Bem-vindo, Aluno! 🚀</h1>
            <p className="text-gray-400 mb-8">Continue de onde parou ou inicie um novo curso.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <div key={course.id} className="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition shadow-lg">
                        {/* Imagem do Curso (Fallback se não tiver URL) */}
                        <div className="h-40 bg-gray-700 bg-cover bg-center"
                            style={{ backgroundImage: `url(${course.bannerUrl || 'https://via.placeholder.com/400x200?text=Curso'})` }}>
                        </div>

                        <div className="p-5">
                            <span className="text-xs font-semibold bg-purple-900 text-purple-200 px-2 py-1 rounded">
                                Tecnologia
                            </span>
                            <h3 className="text-xl font-bold mt-2">{course.titulo}</h3>
                            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{course.descricao}</p>

                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-xs text-gray-500">Prof. {course.professorNome}</span>
                                <button
                                    onClick={() => navigate(`/course/${course.id}`)}
                                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold text-sm"
                                >
                                    <PlayCircle size={16} />
                                    Acessar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {courses.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    <p>Nenhum curso disponível no momento.</p>
                    <p className="text-sm">Se você é Admin, use o Postman para criar um curso via POST /courses.</p>
                </div>
            )}
        </div>
    );
}
