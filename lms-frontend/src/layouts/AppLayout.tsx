import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { BookOpen, LogOut, LayoutDashboard, Trophy, MonitorPlay, Cpu, Sun } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function AppLayout() {
    const { signOut, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    function handleLogout() {
        signOut();
        navigate("/");
    }

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-black border-r border-gray-800 flex flex-col flex-shrink-0 z-20">
                {/* Logo */}
                <div className="p-6 flex items-center gap-2">
                    <div className="bg-white text-black font-bold p-1 rounded text-xs">RV</div>
                    <span className="font-bold text-lg tracking-wide">REVERSO</span>
                </div>

                {/* User Stats Card */}
                <div className="mx-4 mb-6 p-4 bg-gray-900 rounded-xl border border-gray-800">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2 text-yellow-500">
                            <Trophy size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">Nível 5</span>
                        </div>
                        <span className="text-xs text-gray-500">#15 Ranking</span>
                    </div>

                    <div className="flex justify-between items-end mb-1">
                        <span className="text-xs text-gray-400">XP Atual</span>
                        <span className="text-xs font-medium">3420 / 5000</span>
                    </div>

                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 w-[68%] rounded-full"></div>
                    </div>

                    <p className="text-[10px] text-gray-500 mt-2 text-center">Vestibulando Mestre</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 space-y-1 overflow-y-auto custom-scrollbar">
                    <Link
                        to="/dashboard"
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${isActive('/dashboard') ? 'bg-white text-black font-medium' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}
                    >
                        <LayoutDashboard size={20} className={isActive('/dashboard') ? 'text-black' : 'text-gray-500 group-hover:text-white'} />
                        Início
                    </Link>

                    <Link
                        to="/aulas-ao-vivo"
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${isActive('/aulas-ao-vivo') ? 'bg-white text-black font-medium' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}
                    >
                        <MonitorPlay size={20} className={isActive('/aulas-ao-vivo') ? 'text-black' : 'text-gray-500 group-hover:text-white'} />
                        Aulas ao Vivo
                    </Link>

                    <Link
                        to="/meus-cursos"
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${isActive('/meus-cursos') ? 'bg-white text-black font-medium' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}
                    >
                        <BookOpen size={20} className={isActive('/meus-cursos') ? 'text-black' : 'text-gray-500 group-hover:text-white'} />
                        Aulas Gravadas
                    </Link>

                    <div className="pt-4 pb-2 px-3">
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Ferramentas</p>
                    </div>

                    {user?.role === 'ADMIN' && (
                        <Link
                            to="/admin"
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${isActive('/admin') ? 'bg-white text-black font-medium' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}
                        >
                            <LayoutDashboard size={20} className={isActive('/admin') ? 'text-black' : 'text-gray-500 group-hover:text-white'} />
                            Administração
                        </Link>
                    )}

                    <Link
                        to="/gerador-ia"
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${isActive('/gerador-ia') ? 'bg-white text-black font-medium' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}
                    >
                        <Cpu size={20} className={isActive('/gerador-ia') ? 'text-black' : 'text-gray-500 group-hover:text-white'} />
                        Gerador IA
                    </Link>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-800 space-y-2">
                    <div className="flex items-center justify-between px-2 py-2 text-gray-500 hover:text-white cursor-pointer transition-colors">
                        <span className="text-xs font-medium">Modo Escuro</span>
                        <Sun size={16} />
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-2 w-full text-left text-red-500 hover:bg-red-500/10 rounded-lg transition-colors text-sm font-medium"
                    >
                        <LogOut size={18} />
                        Sair
                    </button>
                </div>
            </aside>

            {/* Área de Conteúdo */}
            <main className="flex-1 overflow-y-auto bg-black relative">
                {/* Header Fixo Transparente (opcional, para perfil) */}
                <header className="absolute top-0 right-0 p-6 z-10 flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-white">João Estudante</p>
                        <p className="text-xs text-gray-400">Student</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold border-2 border-gray-600">
                        JO
                    </div>
                </header>

                <Outlet />
            </main>
        </div>
    );
}
