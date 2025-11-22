import { Outlet, Link, useNavigate } from "react-router-dom";
import { BookOpen, LogOut, LayoutDashboard, Trophy } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function AppLayout() {
    const { signOut } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
        signOut();
        navigate("/");
    }

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
                <div className="p-6 text-center border-b border-gray-700">
                    <h1 className="text-xl font-bold text-purple-500">Innovation LMS</h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link to="/meus-cursos" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition">
                        <BookOpen size={20} />
                        Meus Cursos
                    </Link>
                    <Link to="/conquistas" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition">
                        <Trophy size={20} />
                        Conquistas
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-3 w-full text-left text-red-400 hover:bg-gray-700 rounded transition"
                    >
                        <LogOut size={20} />
                        Sair
                    </button>
                </div>
            </aside>

            {/* Área de Conteúdo */}
            <main className="flex-1 overflow-y-auto bg-gray-900 p-8">
                <Outlet /> {/* Aqui é onde as páginas (Dashboard, Cursos) serão renderizadas */}
            </main>
        </div>
    );
}
