import React, { useState } from "react";
import {
    FiPlay, FiPlusCircle, FiHeart, FiShare2, FiDownload,
    FiX, FiRadio, FiList, FiUser, FiFlag, FiCheck
} from "react-icons/fi";
import { useMusic } from "../../context/MusicContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function SongOptionsSheet() {
    const { optionsSheet: song, closeOptions, playSong } = useMusic();
    const navigate = useNavigate();
    const location = useLocation();
    const [tapped, setTapped] = useState(null); // tracks which option was tapped (for feedback)

    if (!song) return null;

    // Give brief visual confirmation then close
    const handleAction = (label, callback) => {
        setTapped(label);
        setTimeout(() => {
            setTapped(null);
            callback?.();
            closeOptions();
        }, 350);
    };

    // Play Now: start playing and navigate to the player
    // If already ON the player screen, just close the sheet (song is already playing)
    const handlePlayNow = () => {
        const alreadyOnPlayer = location.pathname.startsWith("/music-player");
        if (alreadyOnPlayer) {
            playSong(song); // re-register in case it changed
            handleAction("Play Now");
        } else {
            handleAction("Play Now", () => {
                playSong(song);
                navigate(`/music-player/${song.id}`);
            });
        }
    };

    const menuItems = [
        {
            icon: FiPlay,
            label: "Play Now",
            accent: true,
            onClick: handlePlayNow,
        },
        {
            icon: FiPlusCircle,
            label: "Add to Queue",
            onClick: () => handleAction("Add to Queue"),
        },
        {
            icon: FiHeart,
            label: "Save to Liked Songs",
            onClick: () => handleAction("Save to Liked Songs"),
        },
        {
            icon: FiList,
            label: "Add to Playlist",
            onClick: () => handleAction("Add to Playlist"),
        },
        {
            icon: FiRadio,
            label: "Go to Radio",
            onClick: () => handleAction("Go to Radio"),
        },
        {
            icon: FiUser,
            label: "View Artist",
            onClick: () => handleAction("View Artist"),
        },
        {
            icon: FiShare2,
            label: "Share",
            onClick: () => handleAction("Share"),
        },
        {
            icon: FiDownload,
            label: "Download",
            onClick: () => handleAction("Download"),
        },
        {
            icon: FiFlag,
            label: "Report",
            danger: true,
            onClick: () => handleAction("Report"),
        },
    ];

    return (
        <div
            className="fixed inset-0 z-[3000] flex items-end justify-center"
            onClick={closeOptions}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

            {/* Sheet panel */}
            <div
                className="relative z-10 w-full max-w-[480px] rounded-t-3xl border-t border-white/10 overflow-hidden"
                style={{
                    background: "linear-gradient(160deg, #1e1e32 0%, #141422 100%)",
                    animation: "slideUp 0.22s cubic-bezier(0.22,1,0.36,1)",
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Drag handle */}
                <div className="flex justify-center pt-3 pb-2">
                    <div className="w-9 h-1 rounded-full bg-white/20" />
                </div>

                {/* Song preview header */}
                <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.07]">
                    <div className="w-[50px] h-[50px] rounded-xl overflow-hidden flex-shrink-0 border border-white/10 shadow-lg">
                        <img
                            src={song.img || `https://picsum.photos/seed/${song.id || "song"}/200/200`}
                            alt={song.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-[15px] font-bold truncate text-white leading-tight">{song.title}</h4>
                        <p className="text-[12px] text-white/50 truncate mt-0.5">{song.artist}</p>
                    </div>
                    <button
                        onClick={closeOptions}
                        aria-label="Close"
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/60 flex-shrink-0"
                    >
                        <FiX size={16} />
                    </button>
                </div>

                {/* Menu options */}
                <div className="py-2 pb-10">
                    {menuItems.map((item) => {
                        const isTapped = tapped === item.label;
                        return (
                            <button
                                key={item.label}
                                onClick={item.onClick}
                                className={`
                                    w-full flex items-center gap-4 px-5 py-3.5
                                    transition-colors text-left
                                    ${isTapped ? "bg-white/10" : "hover:bg-white/[0.05] active:bg-white/10"}
                                    ${item.danger ? "text-red-400" : "text-white"}
                                `}
                            >
                                {/* Icon — shows checkmark briefly when tapped */}
                                <div className={`
                                    w-9 h-9 flex items-center justify-center rounded-2xl flex-shrink-0
                                    ${item.accent ? "bg-ott-accent/20" : item.danger ? "bg-red-500/10" : "bg-white/[0.06]"}
                                `}>
                                    {isTapped
                                        ? <FiCheck size={18} className={item.accent ? "text-ott-accent" : item.danger ? "text-red-400" : "text-white/70"} />
                                        : <item.icon size={18} className={item.accent ? "text-ott-accent" : item.danger ? "text-red-400" : "text-white/70"} />
                                    }
                                </div>
                                <span className={`text-[14px] font-medium ${item.accent ? "text-ott-accent font-semibold" : ""}`}>
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to   { transform: translateY(0);    opacity: 1; }
                }
            `}</style>
        </div>
    );
}
