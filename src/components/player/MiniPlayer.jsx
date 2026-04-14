import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiPlay, FiPause, FiX, FiChevronUp } from "react-icons/fi";
import { useMusic } from "../../context/MusicContext";

export default function MiniPlayer() {
    const { currentSong, isPlaying, showMiniPlayer, togglePlay, closeMiniPlayer } = useMusic();
    const navigate = useNavigate();
    const location = useLocation();

    // Don't show mini player on the full player screen
    if (!showMiniPlayer || !currentSong) return null;
    if (location.pathname.startsWith("/music-player")) return null;

    const handleExpand = () => {
        navigate(`/music-player/${currentSong.id || "now"}`);
    };

    return (
        <div
            className="fixed bottom-[56px] left-1/2 -translate-x-1/2 w-full max-w-[480px] z-[900] px-2"
        >
            <div className="relative flex items-center gap-3 bg-ott-card/95 backdrop-blur-xl border border-white/10 rounded-2xl mx-1 px-3 py-2.5 shadow-ott-hero overflow-hidden">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-ott-accent/10 to-transparent pointer-events-none" />

                {/* Progress bar at top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-ott-accent rounded-full"
                        style={{ width: "35%", transition: "width 1s linear" }}
                    />
                </div>

                {/* Album Art — click to expand */}
                <button onClick={handleExpand} className="flex-shrink-0 w-[44px] h-[44px] rounded-xl overflow-hidden border border-white/10 shadow-lg">
                    <img
                        src={currentSong.img || `https://picsum.photos/seed/${currentSong.id}/200/200`}
                        alt={currentSong.title}
                        className="w-full h-full object-cover"
                    />
                </button>

                {/* Song Info — click to expand */}
                <button onClick={handleExpand} className="flex-1 min-w-0 text-left">
                    <h4 className="text-[13px] font-bold truncate leading-tight">{currentSong.title}</h4>
                    <p className="text-[11px] text-ott-muted truncate">{currentSong.artist}</p>
                </button>

                {/* Expand icon */}
                <button onClick={handleExpand} className="p-1.5 text-ott-muted hover:text-white transition-colors flex-shrink-0">
                    <FiChevronUp size={18} />
                </button>

                {/* Play / Pause */}
                <button
                    onClick={togglePlay}
                    className="w-[38px] h-[38px] rounded-full bg-ott-accent flex items-center justify-center shadow-ott-glow active:scale-90 transition-transform flex-shrink-0"
                >
                    {isPlaying
                        ? <FiPause size={16} />
                        : <FiPlay size={16} className="ml-[2px]" />
                    }
                </button>

                {/* Close */}
                <button
                    onClick={closeMiniPlayer}
                    className="p-1.5 text-ott-muted hover:text-white transition-colors flex-shrink-0"
                >
                    <FiX size={18} />
                </button>
            </div>
        </div>
    );
}
