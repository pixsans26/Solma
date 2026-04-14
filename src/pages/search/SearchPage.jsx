import React, { useState, useEffect } from "react";
import { FiSearch, FiMic, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/discovery/MovieCard";
import { ALL_CONTENT } from "../../data/contentData";

export default function SearchPage() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const browseCategories = [
        { label: "Action", image: "/assets/images/thumbnails/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg" },
        { label: "Comedy", image: "/assets/images/thumbnails/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg" },
        { label: "Horror", image: "/assets/images/thumbnails/9PFonBhy4cQy7Jz20NpMygczOkv.jpg" },
        { label: "Romance", image: "/assets/images/thumbnails/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg" },
        { label: "Sci-Fi", image: "/assets/images/thumbnails/9TGHDvWrqKBzwDxDodHYXEmOE6J.jpg" },
        { label: "Drama", image: "/assets/images/thumbnails/ptpr0kGAckfQkJeJIt8st5dglvd.jpg" },
        { label: "Kids", image: "/assets/images/thumbnails/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg" }, // Using Spiderverse as kids fallback
        { label: "Music", image: "/assets/images/thumbnails/49WJfeN0moxb9IPfGn8AIqMGskD.jpg" }
    ];

    const trendingSearches = [
        "Avatar: The Way of Water",
        "John Wick: Chapter 4",
        "Oppenheimer",
        "Stranger Things",
        "Breaking Bad"
    ];

    useEffect(() => {
        if (query.trim().length > 0) {
            const filtered = ALL_CONTENT.filter(item => 
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
            );
            setResults(filtered);
        } else {
            setResults([]);
        }
    }, [query]);

    const handleItemClick = (item) => {
        const path = item.type === 'movie' ? `/movie/${item.id}` : `/series/${item.id}`;
        navigate(path);
    };

    return (
        <div className="bg-ott-bg min-h-screen pb-24">
            {/* Search Header */}
            <div className="p-[20px_16px_10px_16px] sticky top-0 bg-ott-bg/95 backdrop-blur-xl z-20">
                <div className="relative flex items-center">
                    <FiSearch className="absolute left-[15px] text-ott-muted text-[18px]" />
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for movies, series, stars..." 
                        className="w-full bg-ott-card border-[1.5px] border-white/10 rounded-[14px] p-[12px_45px] text-white text-[14px] outline-none transition-all focus:border-ott-accent/20 focus:bg-white/5"
                    />
                    {query ? (
                        <FiX 
                            className="absolute right-[15px] text-ott-muted text-[18px] cursor-pointer" 
                            onClick={() => setQuery("")}
                        />
                    ) : (
                        <FiMic className="absolute right-[15px] text-ott-accent text-[18px]" />
                    )}
                </div>
            </div>

            {query.trim().length > 0 ? (
                /* Search Results Grid */
                <div className="px-4 mt-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[16px] font-semibold m-0 text-white">Results for "{query}"</h2>
                        <span className="text-[12px] text-ott-muted">{results.length} found</span>
                    </div>
                    {results.length > 0 ? (
                        <div className="grid grid-cols-3 gap-3">
                            {results.map((item) => (
                                <div key={item.id} onClick={() => handleItemClick(item)} className="cursor-pointer">
                                    <MovieCard image={item.image} title={item.title} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-ott-muted">
                            <FiSearch className="text-4xl mb-4 opacity-20" />
                            <p className="text-[14px]">No results found for your search</p>
                        </div>
                    )}
                </div>
            ) : (
                /* Default View (Categories & Trending) */
                <>
                    {/* Browse Categories */}
                    <div className="px-4 mt-4">
                        <h2 className="text-[16px] font-semibold mb-4 text-white">Browse Categories</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {browseCategories.map((cat, i) => (
                                <div 
                                    key={i} 
                                    onClick={() => navigate(`/browse/genre/${cat.label}`)}
                                    className="relative h-[90px] rounded-[14px] overflow-hidden cursor-pointer active:scale-95 transition-transform group"
                                >
                                    <img 
                                        src={cat.image} 
                                        alt={cat.label} 
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                                    <div className="absolute inset-x-0 bottom-3 px-3">
                                        <span className="text-white text-[14px] font-bold tracking-wide">{cat.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trending Searches */}
                    <div className="px-4 mt-8">
                        <h2 className="text-[16px] font-semibold mb-3 text-white">Trending Searches</h2>
                        <div className="flex flex-col gap-1">
                            {trendingSearches.map((term, i) => (
                                <div 
                                    key={i} 
                                    className="flex items-center gap-3 py-3 border-b border-white/5 active:bg-white/5 transition-colors cursor-pointer"
                                    onClick={() => setQuery(term)}
                                >
                                    <FiSearch className="text-ott-muted text-[14px]" />
                                    <span className="text-ott-text text-[14px]">{term}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

