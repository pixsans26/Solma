import React, { useState } from "react";
import {
    FiDownload, FiPlay, FiTrash2, FiChevronDown, FiChevronUp,
    FiCheckCircle, FiClock, FiHardDrive, FiAlertCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const FILTER_TABS = ["All", "Movies", "Web Series", "TV Shows", "Music"];

const DOWNLOADS = [
    // ── Movies ──────────────────────────────────────────────────────
    {
        id: 1, type: "Movies",
        title: "Oppenheimer",
        image: "/assets/images/posters/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
        quality: "4K", size: "5.1 GB", progress: 100,
        duration: "3h 0m", year: 2023,
        playerPath: "/movie-player/7",
    },
    {
        id: 2, type: "Movies",
        title: "Avatar: The Way of Water",
        image: "/assets/images/posters/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        quality: "1080p", size: "3.4 GB", progress: 100,
        duration: "3h 12m", year: 2022,
        playerPath: "/movie-player/4",
    },
    {
        id: 3, type: "Movies",
        title: "The Little Mermaid",
        image: "/assets/images/posters/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg",
        quality: "720p", size: "1.2 GB", progress: 72,
        duration: "2h 15m", year: 2023,
        playerPath: "/movie-player/1",
    },
    {
        id: 4, type: "Movies",
        title: "John Wick: Chapter 4",
        image: "/assets/images/posters/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        quality: "4K", size: "4.8 GB", progress: 38,
        duration: "2h 49m", year: 2023,
        playerPath: "/movie-player/5",
    },
    // ── Web Series ───────────────────────────────────────────────────
    {
        id: 5, type: "Web Series",
        title: "Stranger Things",
        image: "/assets/images/posters/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
        quality: "4K", size: "8.6 GB", progress: 100,
        year: 2023,
        playerPath: "/series-player/101/1/1",
        episodes: [
            { ep: 1, title: "The Vanishing of Will Byers", duration: "49m", size: "1.1 GB", progress: 100 },
            { ep: 2, title: "The Weirdo on Maple Street",   duration: "56m", size: "1.3 GB", progress: 100 },
            { ep: 3, title: "Holly, Jolly",                 duration: "51m", size: "1.2 GB", progress: 100 },
            { ep: 4, title: "The Body",                     duration: "55m", size: "1.3 GB", progress: 65  },
            { ep: 5, title: "The Flea and the Acrobat",     duration: "50m", size: "1.1 GB", progress: 0   },
        ],
    },
    {
        id: 6, type: "Web Series",
        title: "Breaking Bad",
        image: "/assets/images/posters/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
        quality: "1080p", size: "4.2 GB", progress: 100,
        year: 2022,
        playerPath: "/series-player/102/1/1",
        episodes: [
            { ep: 1, title: "Pilot",                      duration: "58m", size: "800 MB", progress: 100 },
            { ep: 2, title: "Cat's in the Bag",           duration: "48m", size: "650 MB", progress: 100 },
            { ep: 3, title: "And the Bag's in the River", duration: "48m", size: "650 MB", progress: 48  },
        ],
    },
    {
        id: 7, type: "Web Series",
        title: "Wednesday",
        image: "/assets/images/posters/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
        quality: "4K", size: "2.1 GB", progress: 42,
        year: 2022,
        playerPath: "/series-player/104/1/1",
        episodes: [
            { ep: 1, title: "Wednesday's Child Is Full of Woe", duration: "50m", size: "700 MB", progress: 100 },
            { ep: 2, title: "Woe What a Night",                 duration: "44m", size: "650 MB", progress: 42  },
            { ep: 3, title: "Friend or Woe",                    duration: "47m", size: "600 MB", progress: 0   },
        ],
    },
    // ── TV Shows ─────────────────────────────────────────────────────
    {
        id: 8, type: "TV Shows",
        title: "The Crown",
        image: "/assets/images/posters/1M876KPjulVwppinAt7KRBjMrma.jpg",
        quality: "1080p", size: "2.8 GB", progress: 100,
        year: 2020,
        playerPath: "/series/103",
        episodes: [
            { ep: 1, title: "Wolferton Splash",  duration: "57m", size: "700 MB", progress: 100 },
            { ep: 2, title: "Hyde Park Corner",  duration: "56m", size: "680 MB", progress: 100 },
            { ep: 3, title: "Windsor",           duration: "56m", size: "680 MB", progress: 100 },
        ],
    },
    // ── Music ────────────────────────────────────────────────────────
    {
        id: 9, type: "Music",
        title: "Kesariya (Dance Mix)",
        artist: "Arijit Singh, Pritam",
        image: "/assets/images/music/music_c0775219ed.jpg",
        quality: "Hi-Res", size: "45 MB", progress: 100,
        playerPath: "/music-player/featured",
    },
    {
        id: 10, type: "Music",
        title: "Stay",
        artist: "The Kid LAROI, Justin Bieber",
        image: "/assets/images/music/music_0dd3ed4a0d.jpg",
        quality: "320kbps", size: "12 MB", progress: 100,
        playerPath: "/music-player/3",
    },
    {
        id: 11, type: "Music",
        title: "Peaches",
        artist: "The Weeknd",
        image: "/assets/images/music/music_3e751fee0c.jpg",
        quality: "Hi-Res", size: "38 MB", progress: 65,
        playerPath: "/music-player/2",
    },
];

const statusInfo = (progress) => {
    if (progress === 100) return { label: "Downloaded", color: "text-green-400",   icon: <FiCheckCircle className="text-green-400 text-[13px]" /> };
    if (progress === 0)   return { label: "Queued",     color: "text-ott-muted",   icon: <FiClock className="text-ott-muted text-[13px]" /> };
    return                       { label: `${progress}%`, color: "text-ott-accent", icon: <FiAlertCircle className="text-ott-accent text-[13px]" /> };
};

export default function Downloads() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("All");
    const [expanded, setExpanded] = useState({});

    const filtered = activeTab === "All" ? DOWNLOADS : DOWNLOADS.filter((d) => d.type === activeTab);
    const hasEpisodes = (item) => item.episodes && item.episodes.length > 0;

    const totalSize = DOWNLOADS
        .filter((d) => d.progress === 100)
        .reduce((acc, d) => acc + parseFloat(d.size), 0)
        .toFixed(1);

    const toggleExpand = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <div className="bg-ott-bg min-h-screen text-white pb-[80px]">
            {/* ─── Header ────────────────────────────────────────── */}
            <div className="sticky top-0 z-50 bg-ott-bg/95 backdrop-blur-md border-b border-white/5 px-4 pt-14 pb-3">
                <div className="flex items-center justify-between mb-1">
                    <h1 className="text-[20px] font-bold text-white flex items-center gap-2">
                        <FiDownload className="text-ott-accent" />
                        My Downloads
                    </h1>
                    <div className="flex items-center gap-1.5 bg-ott-card px-3 py-1.5 rounded-full border border-white/10">
                        <FiHardDrive className="text-ott-accent text-[13px]" />
                        <span className="text-ott-muted text-[11px]">{totalSize} GB used</span>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar mt-3">
                    {FILTER_TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`whitespace-nowrap flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-medium transition-all border-none outline-none ${
                                activeTab === tab
                                    ? "bg-ott-accent text-white"
                                    : "bg-ott-card text-ott-muted border border-white/10 hover:text-white"
                            }`}
                            style={activeTab !== tab ? { border: "1.5px solid rgba(255,255,255,0.1)" } : {}}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── List ──────────────────────────────────────────── */}
            <div className="px-4 pt-4">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <FiDownload className="text-ott-muted text-[48px]" />
                        <p className="text-ott-muted text-[14px]">No downloads in this category</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {filtered.map((item) => {
                            const isOpen = expanded[item.id];
                            const st = statusInfo(item.progress);

                            return (
                                <div
                                    key={item.id}
                                    className="bg-ott-card rounded-2xl border border-white/5 overflow-hidden"
                                >
                                    {/* ── Main Row ── */}
                                    <div className="flex gap-3 p-3">
                                        {/* Thumbnail */}
                                        <div className="relative w-[72px] h-[100px] rounded-xl overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => { e.target.style.display = "none"; }}
                                            />
                                            {item.progress === 100 && (
                                                <div
                                                    onClick={() => navigate(item.playerPath)}
                                                    className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer hover:bg-black/60 transition-colors"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-ott-accent/90 flex items-center justify-center">
                                                        <FiPlay className="text-white text-[13px] ml-0.5" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                                            <div>
                                                <p className="text-white text-[14px] font-semibold line-clamp-1">{item.title}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    {item.artist ? (
                                                        <span className="text-ott-accent text-[11px] font-bold truncate max-w-[120px]">{item.artist}</span>
                                                    ) : (
                                                        item.year && <span className="text-ott-muted text-[11px]">{item.year}</span>
                                                    )}
                                                    <span className="text-ott-muted text-[10px]">•</span>
                                                    <span className="bg-ott-accent/20 text-ott-accent text-[10px] font-bold px-1.5 py-0.5 rounded">{item.quality}</span>
                                                    <span className="text-ott-muted text-[10px]">•</span>
                                                    <span className="text-ott-muted text-[11px]">{item.size}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    {st.icon}
                                                    <span className={`text-[11px] font-medium ${st.color}`}>{st.label}</span>
                                                    {item.duration && (
                                                        <span className="text-ott-muted text-[11px] ml-1">· {item.duration}</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Progress bar */}
                                            {item.progress < 100 && item.progress > 0 && (
                                                <div className="w-full h-[3px] bg-white/10 rounded-full mt-2 overflow-hidden">
                                                    <div
                                                        className="h-full bg-ott-accent rounded-full transition-all"
                                                        style={{ width: `${item.progress}%` }}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col items-center justify-between gap-2 flex-shrink-0">
                                            <button className="w-7 h-7 rounded-full flex items-center justify-center text-ott-muted hover:text-red-400 transition-colors">
                                                <FiTrash2 className="text-[15px]" />
                                            </button>
                                            {/* Expand toggle for series/tv shows */}
                                            {hasEpisodes(item) && (
                                                <button
                                                    onClick={() => toggleExpand(item.id)}
                                                    className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-ott-muted hover:text-white transition-colors"
                                                >
                                                    {isOpen
                                                        ? <FiChevronUp className="text-[14px]" />
                                                        : <FiChevronDown className="text-[14px]" />
                                                    }
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* ── Episodes List (expandable) ── */}
                                    {hasEpisodes(item) && isOpen && (
                                        <div className="border-t border-white/5 px-3 pb-2">
                                            <p className="text-ott-muted text-[11px] font-semibold uppercase tracking-wide py-2">
                                                Episodes · {item.episodes.length}
                                            </p>
                                            <div className="flex flex-col gap-1.5">
                                                {item.episodes.map((ep) => {
                                                    const epSt = statusInfo(ep.progress);
                                                    return (
                                                        <div
                                                            key={ep.ep}
                                                            className="flex items-center gap-3 py-2 px-2 rounded-xl hover:bg-white/5 transition-colors"
                                                        >
                                                            {/* Ep number */}
                                                            <div className="w-8 h-8 rounded-lg bg-ott-bg flex items-center justify-center flex-shrink-0">
                                                                <span className="text-ott-muted text-[11px] font-bold">E{ep.ep}</span>
                                                            </div>

                                                            {/* Title + meta */}
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-white text-[12px] font-medium line-clamp-1">{ep.title}</p>
                                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                                    {epSt.icon}
                                                                    <span className={`text-[10px] ${epSt.color}`}>{epSt.label}</span>
                                                                    <span className="text-ott-muted text-[10px]">· {ep.duration}</span>
                                                                    <span className="text-ott-muted text-[10px]">· {ep.size}</span>
                                                                </div>
                                                                {ep.progress > 0 && ep.progress < 100 && (
                                                                    <div className="w-full h-[2px] bg-white/10 rounded-full mt-1.5">
                                                                        <div
                                                                            className="h-full bg-ott-accent rounded-full"
                                                                            style={{ width: `${ep.progress}%` }}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* Play / delete */}
                                                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                                                {ep.progress === 100 && (
                                                                    <button
                                                                        onClick={() => navigate(item.playerPath)}
                                                                        className="w-7 h-7 rounded-full bg-ott-accent/20 flex items-center justify-center hover:bg-ott-accent/40 transition-colors"
                                                                    >
                                                                        <FiPlay className="text-ott-accent text-[11px] ml-0.5" />
                                                                    </button>
                                                                )}
                                                                <button className="w-7 h-7 rounded-full flex items-center justify-center text-ott-muted hover:text-red-400 transition-colors">
                                                                    <FiTrash2 className="text-[12px]" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Expand hint for series (when collapsed) */}
                                    {hasEpisodes(item) && !isOpen && (
                                        <button
                                            onClick={() => toggleExpand(item.id)}
                                            className="w-full flex items-center justify-center gap-1 py-2 border-t border-white/5 text-ott-muted text-[11px] hover:text-white transition-colors"
                                        >
                                            <span>{item.episodes.length} episodes</span>
                                            <FiChevronDown className="text-[13px]" />
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
