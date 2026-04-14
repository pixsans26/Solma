import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Carousel from '../../components/discovery/Carousel';
import MovieCard from '../../components/discovery/MovieCard';
import { MOVIES, SERIES, CATEGORIES, GENRES, TRENDING, POPULAR, CONTINUE_WATCHING } from '../../data/contentData';
import { FiStar, FiPlay } from "react-icons/fi";

// Merged trending, popular, continue-watching with rich data
const TREND_DISPLAY = TRENDING.slice(0, 8);
const POP_DISPLAY = POPULAR.slice(0, 8);
const CW_DISPLAY = CONTINUE_WATCHING.slice(0, 6);

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="bg-ott-bg p-0  mb-20">
            <Carousel />

            {/* ─── Watch by Category ─── */}
            <div className="mb-[22px] px-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[16px] font-semibold m-0 text-white text-left">Watch by Category</h2>
                </div>
                <div className="flex gap-3 overflow-x-auto py-1 no-scrollbar">
                    {CATEGORIES.map((c, i) => {
                        const bgImages = [
                            '/assets/images/thumbnails/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg',
                            '/assets/images/thumbnails/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
                            '/assets/images/thumbnails/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
                            '/assets/images/thumbnails/9PFonBhy4cQy7Jz20NpMygczOkv.jpg',
                            '/assets/images/thumbnails/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
                            '/assets/images/thumbnails/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
                            '/assets/images/thumbnails/ptpr0kGAckfQkJeJIt8st5dglvd.jpg',
                        ];
                        return (
                            <div
                                key={c.label}
                                onClick={() => navigate(`/browse/category/${encodeURIComponent(c.label)}`)}
                                className="relative flex-shrink-0 w-[110px] h-[70px] rounded-xl overflow-hidden cursor-pointer active:scale-95 transition-all duration-200 hover:-translate-y-0.5"
                            >
                                <img
                                    src={bgImages[i % bgImages.length]}
                                    alt={c.label}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/55" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white text-[13px] font-semibold text-center px-2 leading-tight">{c.label}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ─── Trending Now ─── */}
            <div className="mb-[22px] px-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[16px] font-semibold m-0 text-white text-left">Trending Now</h2>
                    <span
                        onClick={() => navigate('/browse/all/trending')}
                        className="text-[11px] text-ott-accent font-semibold uppercase tracking-[0.5px] p-[4px_12px] bg-ott-accent/10 rounded-full cursor-pointer hover:bg-ott-accent/20 transition-colors"
                    >
                        View All
                    </span>
                </div>
                <div className="flex gap-[10px] overflow-x-auto pb-1 snap-x snap-mandatory no-scrollbar">
                    {TREND_DISPLAY.map((m) => (
                        <RichCard key={m.id} item={m} />
                    ))}
                </div>
            </div>

            {/* ─── Explore by Genre ─── */}
            <div className="mb-[22px] px-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[16px] font-semibold m-0 text-white text-left">Explore by Genre</h2>
                </div>
                <div className="flex gap-3 overflow-x-auto py-1 no-scrollbar">
                    {GENRES.map((g, i) => {
                        const genreImages = [
                            '/assets/images/thumbnails/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
                            '/assets/images/thumbnails/9TGHDvWrqKBzwDxDodHYXEmOE6J.jpg',
                            '/assets/images/thumbnails/9lFKBtaVIhP7E2Pk0IY1CwTKTMZ.jpg',
                            '/assets/images/thumbnails/1M876KPjulVwppinAt7KRBjMrma.jpg',
                            '/assets/images/thumbnails/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',
                            '/assets/images/thumbnails/9PFonBhy4cQy7Jz20NpMygczOkv.jpg',
                            '/assets/images/thumbnails/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
                            '/assets/images/thumbnails/ptpr0kGAckfQkJeJIt8st5dglvd.jpg',
                            '/assets/images/thumbnails/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
                            '/assets/images/thumbnails/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
                            '/assets/images/thumbnails/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg',
                            '/assets/images/thumbnails/z2yahl2uefxDCl0nogcRBstwruJ.jpg',
                        ];
                        return (
                            <div
                                key={g.label}
                                onClick={() => navigate(`/browse/genre/${encodeURIComponent(g.label)}`)}
                                className="relative flex-shrink-0 w-[110px] h-[70px] rounded-xl overflow-hidden cursor-pointer active:scale-95 transition-all duration-200 hover:-translate-y-0.5"
                            >
                                <img
                                    src={genreImages[i % genreImages.length]}
                                    alt={g.label}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/55" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white text-[13px] font-semibold text-center px-2 leading-tight">{g.label}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ─── Popular on Solma ─── */}
            <div className="mb-[22px] px-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[16px] font-semibold m-0 text-white text-left">Popular on Solma</h2>
                    <span
                        onClick={() => navigate('/browse/all/popular')}
                        className="text-[11px] text-ott-accent font-semibold uppercase tracking-[0.5px] p-[4px_12px] bg-ott-accent/10 rounded-full cursor-pointer hover:bg-ott-accent/20 transition-colors"
                    >
                        View All
                    </span>
                </div>
                <div className="flex gap-[10px] overflow-x-auto pb-1 snap-x snap-mandatory no-scrollbar">
                    {POP_DISPLAY.map((m) => (
                        <RichCard key={m.id} item={m} />
                    ))}
                </div>
            </div>

            {/* ─── Continue Watching ─── */}
            <div className="mb-[22px] px-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[16px] font-semibold m-0 text-white text-left">Continue Watching</h2>
                    <span
                        onClick={() => navigate('/browse/all/continue-watching')}
                        className="text-[11px] text-ott-accent font-semibold uppercase tracking-[0.5px] p-[4px_12px] bg-ott-accent/10 rounded-full cursor-pointer hover:bg-ott-accent/20 transition-colors"
                    >
                        View All
                    </span>
                </div>
                <div className="flex gap-[10px] overflow-x-auto pb-1 snap-x snap-mandatory no-scrollbar">
                    {CW_DISPLAY.map((m) => (
                        <ContinueCard key={m.id} item={m} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Rich card with inline rating + tap-to-detail
function RichCard({ item }) {
    const navigate = useNavigate();
    const [imgError, setImgError] = useState(false);
    const path = item.type === 'movie' ? `/movie/${item.id}` : `/series/${item.id}`;

    return (
        <div
            onClick={() => navigate(path)}
            className="w-[115px] bg-ott-card rounded-xl overflow-hidden flex flex-col relative transition-all duration-200 snap-start shrink-0 hover:shadow-ott-glow hover:-translate-y-0.5 hover:scale-105 cursor-pointer"
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
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-ott-card to-ott-bg gap-1">
                        <span className="text-3xl">🎬</span>
                        <span className="text-ott-muted text-[10px] text-center px-1 line-clamp-2">{item.title}</span>
                    </div>
                )}
                {/* Rating badge */}
                <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 bg-black/70 rounded px-1 py-0.5">
                    <FiStar className="text-yellow-400 text-[9px]" />
                    <span className="text-yellow-400 text-[10px] font-semibold">{item.rating}</span>
                </div>
                {item.trending && (
                    <span className="absolute top-1.5 left-1.5 bg-ott-accent/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md z-10">
                        🔥
                    </span>
                )}
                {/* Transactional Label */}
                {!item.isOwned && (item.isRentable || item.isBuyable) && (
                    <div className="absolute bottom-1.5 left-1.5 z-10">
                        {item.isBuyable ? (
                            <span className="bg-amber-600/90 backdrop-blur-sm text-white text-[7px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">Buy</span>
                        ) : (
                            <span className="bg-blue-600/90 backdrop-blur-sm text-white text-[7px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">Rent</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Continue watching card with progress bar
function ContinueCard({ item }) {
    const navigate = useNavigate();
    const [imgError, setImgError] = useState(false);
    const path = item.type === 'movie' ? `/movie-player/${item.id}` : `/series-player/${item.id}/1/1`;

    return (
        <div
            onClick={() => navigate(path)}
            className="w-[145px] bg-ott-card rounded-md shadow-ott-card overflow-hidden flex flex-col relative transition-all duration-200 snap-start shrink-0 hover:shadow-ott-glow hover:-translate-y-0.5 cursor-pointer"
        >
            <div className="relative w-full h-[85px]">
                {!imgError ? (
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover block"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-ott-bg">
                        <span className="text-2xl">🎬</span>
                    </div>
                )}
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-8 h-8 rounded-full bg-ott-accent/80 flex items-center justify-center">
                        <FiPlay className="text-white text-[12px] ml-0.5" />
                    </div>
                </div>
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/20">
                    <div
                        className="h-full bg-ott-accent"
                        style={{ width: `${item.progress || 40}%` }}
                    />
                </div>
            </div>
            <div className="p-1.5">
                <p className="text-white text-[10px] font-medium line-clamp-1">{item.title}</p>
                <p className="text-ott-muted text-[9px] mt-0.5">{item.progress || 40}% watched</p>
            </div>
        </div>
    );
}
