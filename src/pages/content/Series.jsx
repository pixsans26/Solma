import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from '../../components/discovery/Carousel';
import { SERIES } from '../../data/contentData';
import { FiStar } from "react-icons/fi";

const genres = ["All", "Drama", "Crime", "Sci-Fi", "Comedy", "Thriller", "Horror", "Fantasy"];

export default function Series() {
    const navigate = useNavigate();
    const [activeGenre, setActiveGenre] = useState("All");

    const trending = SERIES.slice(0, 6);
    const recommended = [...SERIES].reverse().slice(0, 6);

    return (
        <div className="bg-ott-bg min-h-screen text-white pb-[72px]">
            <Carousel />
            <div className="mb-[22px] px-4 mt-5">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[16px] font-semibold m-0 text-white text-left">Series Genres</h2>
                </div>
                <div className="flex gap-3 overflow-x-auto py-1 no-scrollbar">
                    {genres.map((g) => (
                        <div
                            key={g}
                            onClick={() => {
                                if (g === "All") navigate('/browse/category/Web Series');
                                else navigate(`/browse/genre/${encodeURIComponent(g)}`);
                            }}
                            className="whitespace-nowrap p-[10px_22px] bg-ott-card text-white rounded-full text-[13px] font-medium border-[1.5px] border-white/10 cursor-pointer hover:border-ott-accent/40 hover:bg-ott-accent/10 transition-all"
                        >
                            {g}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-[22px] px-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[16px] font-semibold m-0 text-white text-left">Trending Series</h2>
                    <span
                        onClick={() => navigate('/browse/all/trending')}
                        className="text-[11px] text-ott-accent font-semibold uppercase tracking-[0.5px] p-[4px_12px] bg-ott-accent/10 rounded-full cursor-pointer"
                    >
                        View All
                    </span>
                </div>
                <div className="flex gap-[10px] overflow-x-auto pb-1 snap-x snap-mandatory no-scrollbar">
                    {trending.map((s) => <SeriesCard key={s.id} item={s} />)}
                </div>
            </div>
            <div className="mb-[22px] px-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[16px] font-semibold m-0 text-white text-left">Recommended for You</h2>
                    <span
                        onClick={() => navigate('/browse/category/Web Series')}
                        className="text-[11px] text-ott-accent font-semibold uppercase tracking-[0.5px] p-[4px_12px] bg-ott-accent/10 rounded-full cursor-pointer"
                    >
                        View All
                    </span>
                </div>
                <div className="flex gap-[10px] overflow-x-auto pb-1 snap-x snap-mandatory no-scrollbar">
                    {recommended.map((s) => <SeriesCard key={s.id} item={s} />)}
                </div>
            </div>
        </div>
    );
}

function SeriesCard({ item }) {
    const navigate = useNavigate();
    const [imgError, setImgError] = useState(false);

    return (
        <div
            onClick={() => navigate(`/series/${item.id}`)}
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
                        <span className="text-3xl">📺</span>
                    </div>
                )}
                <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 bg-black/70 rounded px-1 py-0.5">
                    <FiStar className="text-yellow-400 text-[9px]" />
                    <span className="text-yellow-400 text-[10px]">{item.rating}</span>
                </div>
                <span className="absolute top-1.5 left-1.5 bg-ott-card/80 text-ott-muted text-[8px] font-semibold px-1.5 py-0.5 rounded">
                    {item.seasons?.length || 1}S
                </span>
            </div>
        </div>
    );
}
