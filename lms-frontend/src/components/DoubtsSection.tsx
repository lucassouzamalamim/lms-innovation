import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Send, MessageCircle, Reply } from 'lucide-react';

interface Reply {
    id: number;
    text: string;
    createdAt: string;
    userName: string;
}

interface Question {
    id: number;
    text: string;
    createdAt: string;
    userName: string;
    replies: Reply[];
}

interface DoubtsSectionProps {
    lessonId: number;
}

export function DoubtsSection({ lessonId }: DoubtsSectionProps) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [loading, setLoading] = useState(true);
    const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
    const [replyingTo, setReplyingTo] = useState<number | null>(null);

    useEffect(() => {
        fetchQuestions();
    }, [lessonId]);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/lessons/${lessonId}/questions`);
            setQuestions(response.data);
        } catch (error) {
            console.error("Failed to fetch questions", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePostQuestion = async () => {
        if (!newQuestion.trim()) return;

        try {
            const response = await api.post(`/lessons/${lessonId}/questions`, {
                text: newQuestion
            });
            setQuestions([response.data, ...questions]);
            setNewQuestion('');
        } catch (error) {
            console.error("Failed to post question", error);
        }
    };

    const handlePostReply = async (questionId: number) => {
        const text = replyText[questionId];
        if (!text?.trim()) return;

        try {
            const response = await api.post(`/questions/${questionId}/replies`, {
                text: text
            });

            setQuestions(questions.map(q => {
                if (q.id === questionId) {
                    return {
                        ...q,
                        replies: [...q.replies, response.data]
                    };
                }
                return q;
            }));

            setReplyText({ ...replyText, [questionId]: '' });
            setReplyingTo(null);
        } catch (error) {
            console.error("Failed to post reply", error);
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg mt-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MessageCircle className="text-purple-500" />
                Dúvidas e Comentários
            </h3>

            {/* Post new question */}
            <div className="mb-8">
                <div className="flex gap-4">
                    <textarea
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="Tem alguma dúvida sobre esta aula?"
                        className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none h-24"
                    />
                    <button
                        onClick={handlePostQuestion}
                        disabled={!newQuestion.trim()}
                        className="self-end bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Enviar dúvida"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>

            {/* List of questions */}
            <div className="space-y-6">
                {questions.map((question) => (
                    <div key={question.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold text-purple-300">{question.userName}</span>
                            <span className="text-xs text-gray-500">
                                {new Date(question.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-gray-200 mb-4 whitespace-pre-wrap">{question.text}</p>

                        {/* Replies */}
                        {question.replies.length > 0 && (
                            <div className="ml-8 mt-4 space-y-3 border-l-2 border-gray-600 pl-4">
                                {question.replies.map((reply) => (
                                    <div key={reply.id} className="bg-gray-800/50 p-3 rounded-md">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-medium text-purple-400 text-sm">{reply.userName}</span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(reply.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-gray-300 text-sm">{reply.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Reply Action */}
                        <div className="mt-4 pt-3 border-t border-gray-700/50">
                            {replyingTo === question.id ? (
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        value={replyText[question.id] || ''}
                                        onChange={(e) => setReplyText({ ...replyText, [question.id]: e.target.value })}
                                        placeholder="Escreva uma resposta..."
                                        className="flex-1 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handlePostReply(question.id);
                                        }}
                                    />
                                    <button
                                        onClick={() => handlePostReply(question.id)}
                                        className="bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700"
                                    >
                                        <Send size={16} />
                                    </button>
                                    <button
                                        onClick={() => setReplyingTo(null)}
                                        className="text-gray-400 p-2 hover:text-white"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setReplyingTo(question.id)}
                                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors"
                                >
                                    <Reply size={14} />
                                    Responder
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {questions.length === 0 && !loading && (
                    <div className="text-center text-gray-500 py-8">
                        <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
                        <p>Nenhuma dúvida encontrada. Seja o primeiro a perguntar!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
