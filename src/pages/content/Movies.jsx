import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from '../../components/discovery/Carousel';
import { MOVIES, GENRES } from '../../data/contentData';
import { FiStar } from "react-icons/fi";

const categories = ["All", "Action", "Sci-Fi", "Drama", "Animation", "Horror", "Comedy"];

export default function Movies() {
    const navigate = useNavigate();
    const [activeGenre, setActiveGenre] = useState("All");

    const filtered = activeGenre === "All"
        ? MOVIES
        : MOVIES.filter((m) => m.genre.includes(activeGenre));

    const discover = MOVIES.slice(0, 8);
    const recent = [...MOVIES].reverse().slice(0, 8);

    return (
        <div className="bg-ott-bg min-h-screen text-white pb-[72px]">
            <Carousel />

            <div className="mb-[22px] px-4 mt-5">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[16px] font-semibold m-0 text-white text-left">Movie Genres</h2>
                </div>
                <div className="flex gap-3 overflow-x-auto py-1 no-scrollbar">
                    {categories.map((c) => (
                        <div
                            key={c}
                            onClick={() => {
                                if (c === "All") setActiveGenre("All");
                                else navigate(`/browse/genre/${encodeURIComponent(c)}`);
                            }}
                            className={`whitespace-nowrap p-[10px_22px] rounded-full text-[13px] font-medium border-[1.5px] cursor-pointer transition-all ${
                                activeGenre === c
                                    ? 'bg-ott-accent text-white border-ott-accent'
                                    : 'bg-ott-card text-white border-white/10 hover:border-ott-accent/40'
                            }`}
                        >
                            {c}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-[22px] px-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[16px] font-semibold m-0 text-white text-left">Discover Movies</h2>
                    <span
                        onClick={() => navigate('/browse/category/Movies')}
                        className="text-[11px] text-ott-accent font-semibold uppercase tracking-[0.5px] p-[4px_12px] bg-ott-accent/10 rounded-full cursor-pointer"
                    >
                        View All
                    </span>
                </div>
                <div className="flex gap-[10px] overflow-x-auto pb-1 snap-x snap-mandatory no-scrollbar">
                    {discover.map((m) => <MovieCard key={m.id} item={m} />)}
                </div>
            </div>

            <div className="mb-[22px] px-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[16px] font-semibold m-0 text-white text-left">Recently Added</h2>
                    <span
                        onClick={() => navigate('/browse/all/trending')}
                        className="text-[11px] text-ott-accent font-semibold uppercase tracking-[0.5px] p-[4px_12px] bg-ott-accent/10 rounded-full cursor-pointer"
                    >
                        View All
                    </span>
                </div>
                <div className="flex gap-[10px] overflow-x-auto pb-1 snap-x snap-mandatory no-scrollbar">
                    {recent.map((m) => <MovieCard key={m.id} item={m} />)}
                </div>
            </div>
        </div>
    );
}

function MovieCard({ item }) {
    const navigate = useNavigate();
    const [imgError, setImgError] = useState(false);

    return (
        <div
            onClick={() => navigate(`/movie/${item.id}`)}
            className="w-[115px] bg-ott-card rounded-md shadow-ott-card overflow-hidden flex flex-col relative transition-all duration-200 snap-start shrink-0 hover:shadow-ott-glow hover:-translate-y-0.5 hover:scale-105 cursor-pointer"
        >
            <div className="relative w-full h-[165px]">
                {!imgError ? (
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover block"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-ott-bg">
                        <span className="text-3xl">🎬</span>
                    </div>
                )}
                <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 bg-black/70 rounded px-1 py-0.5">
                    <FiStar className="text-yellow-400 text-[9px]" />
                    <span className="text-yellow-400 text-[10px]">{item.rating}</span>
                </div>
            </div>
        </div>
    );
}
