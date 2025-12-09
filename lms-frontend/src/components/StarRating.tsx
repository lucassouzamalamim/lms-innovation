import { Star } from "lucide-react";
import { useState } from "react";
import { api } from "../services/api";

interface StarRatingProps {
    lessonId: number;
    initialStars?: number;
    initialAverage?: number;
    totalRatings?: number;
}

export function StarRating({ lessonId, initialStars = 0, initialAverage = 0, totalRatings = 0 }: StarRatingProps) {
    const [userRating, setUserRating] = useState(initialStars);
    const [hoverRating, setHoverRating] = useState(0);
    const [average, setAverage] = useState(initialAverage);
    const [count, setCount] = useState(totalRatings);
    const [loading, setLoading] = useState(false);

    const handleRate = async (stars: number) => {
        setLoading(true);
        try {
            const response = await api.post(`/lessons/${lessonId}/rate`, stars, {
                headers: { 'Content-Type': 'application/json' }
            });
            const data = response.data;
            setUserRating(data.userRating);
            setAverage(data.averageRating);
            setCount(data.totalRatings);
        } catch (error) {
            console.error("Erro ao avaliar aula", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        disabled={loading}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => handleRate(star)}
                        className={`transition-all duration-200 ${loading ? 'cursor-wait' : 'cursor-pointer hover:scale-110'}`}
                    >
                        <Star
                            size={20}
                            className={`
                                ${star <= (hoverRating || userRating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-600 fill-transparent"
                                }
                            `}
                        />
                    </button>
                ))}
            </div>
            <div className="text-xs text-gray-400 font-medium">
                {average > 0 ? (
                    <span>
                        {average.toFixed(1)} <span className="text-gray-600 mx-1">•</span> {count} avaliações
                    </span>
                ) : (
                    "Seja o primeiro a avaliar"
                )}
            </div>
        </div>
    );
}
