import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    FiChevronDown, FiMoreVertical, FiPlay, FiPause,
    FiSkipBack, FiSkipForward, FiRepeat, FiShuffle, FiHeart, FiList
} from "react-icons/fi";
import { useMusic } from "../../context/MusicContext";

// Song database (expand as needed)
const songDb = {
    featured: { id: "featured", title: "Kesariya (Dance Mix)", artist: "Arijit Singh, Pritam", img: "/assets/images/music/music_c0775219ed.jpg", album: "Brahmastra" },
    1:        { id: 1, title: "Kesariya", artist: "Arijit Singh", img: "/assets/images/music/music_3b35addad5.jpg", album: "Brahmastra" },
    2:        { id: 2, title: "Peaches", artist: "The Weeknd", img: "/assets/images/music/music_3e751fee0c.jpg", album: "Dawn FM" },
    3:        { id: 3, title: "Stay", artist: "Justin Bieber", img: "/assets/images/music/music_0dd3ed4a0d.jpg", album: "Justice" },
    101:      { id: 101, title: "Bollywood Hits", artist: "Various Artists", img: "/assets/images/music/music_16b783564f.jpg", album: "Playlist" },
    102:      { id: 102, title: "Punjabi Power", artist: "Various Artists", img: "/assets/images/music/music_c91fc30395.jpg", album: "Playlist" },
};

export default function MusicPlayer() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Pull what we need from context — named clearly
    const {
        isPlaying,
        togglePlay,
        playSong,
        minimizePlayer,
        openOptions,
    } = useMusic();

    const song = songDb[id] || songDb.featured;

    // When this screen mounts, register the song in global context
    // so the mini player knows what's playing when we minimize
    useEffect(() => {
        playSong(song);
        // playSong also sets isPlaying=true and showMiniPlayer=true in context
    }, [id]); // re-run if the song id changes

    const [isFav, setIsFav] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [showQueue, setShowQueue] = useState(false);

    // ── Minimize: keep song playing in background, go back ────────────────
    const handleMinimize = () => {
        minimizePlayer(); // ensures showMiniPlayer=true in context
        navigate(-1);     // go back to previous page (mini player will appear)
    };

    // ── 3-dots: open the global options sheet for THIS song ───────────────
    const handleOptions = () => {
        openOptions(song); // sets optionsSheet = song in context → sheet renders
    };

    return (
        <div className="fixed inset-0 z-[2000] bg-ott-bg text-white flex flex-col overflow-hidden select-none">

            {/* ── Blurred album art background ── */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src={song.img}
                    alt=""
                    className="w-full h-full object-cover scale-150 blur-[70px] opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-ott-bg/50 to-ott-bg" />
            </div>

            {/* ── Header row: minimize  |  album title  |  3-dots ── */}
            <div className="relative z-10 flex items-center justify-between px-5 pt-12 pb-2">
                {/* LEFT: minimize → shrinks to mini player bar */}
                <button
                    onClick={handleMinimize}
                    aria-label="Minimize player"
                    className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-md border border-white/10 active:scale-90 transition-transform"
                >
                    <FiChevronDown size={22} />
                </button>

                {/* CENTER: context label */}
                <div className="text-center">
                    <span className="text-[10px] uppercase tracking-widest text-ott-muted font-bold block">
                        Now Playing
                    </span>
                    <span className="text-[13px] font-semibold text-white truncate block max-w-[160px]">
                        {song.album}
                    </span>
                </div>

                {/* RIGHT: 3-dots → opens options bottom sheet */}
                <button
                    onClick={handleOptions}
                    aria-label="Song options"
                    className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-md border border-white/10 active:scale-90 transition-transform"
                >
                    <FiMoreVertical size={20} />
                </button>
            </div>

            {/* ── Album art (scales when paused) ── */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-8 py-2">
                <div
                    className="w-full aspect-square max-w-[300px] rounded-[36px] overflow-hidden shadow-2xl border border-white/10"
                    style={{
                        transform: isPlaying ? "scale(1.0)" : "scale(0.88)",
                        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                >
                    <img src={song.img} alt={song.title} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* ── Song info + favourite ── */}
            <div className="relative z-10 px-7 flex items-center justify-between mb-5">
                <div className="min-w-0 flex-1 pr-4">
                    <h2 className="text-[22px] font-bold truncate leading-tight">{song.title}</h2>
                    <p className="text-[14px] text-ott-accent font-medium mt-1">{song.artist}</p>
                </div>
                <button
                    onClick={() => setIsFav(f => !f)}
                    aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
                    className={`flex-shrink-0 p-2 transition-all active:scale-90 ${isFav ? "text-ott-accent" : "text-white/40"}`}
                >
                    <FiHeart size={24} fill={isFav ? "currentColor" : "none"} />
                </button>
            </div>

            {/* ── Progress bar ── */}
            <div className="relative z-10 px-7 mb-6">
                <div className="relative h-[4px] w-full bg-white/15 rounded-full cursor-pointer">
                    <div
                        className="absolute top-0 left-0 h-full bg-ott-accent rounded-full"
                        style={{ width: "35%" }}
                    />
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-lg border-2 border-ott-accent"
                        style={{ left: "calc(35% - 7px)" }}
                    />
                </div>
                <div className="flex justify-between mt-2 text-[11px] text-ott-muted font-semibold">
                    <span>1:24</span>
                    <span>4:15</span>
                </div>
            </div>

            {/* ── Playback controls ── */}
            <div className="relative z-10 px-6 mb-6">
                <div className="flex items-center justify-between">
                    {/* Shuffle */}
                    <button
                        onClick={() => setShuffle(s => !s)}
                        aria-label="Shuffle"
                        className={`p-2 rounded-full transition-colors active:scale-90 ${shuffle ? "text-ott-accent" : "text-white/40"}`}
                    >
                        <FiShuffle size={22} />
                    </button>

                    <div className="flex items-center gap-7">
                        {/* Skip back */}
                        <button
                            aria-label="Previous"
                            className="p-1 text-white active:scale-90 transition-transform"
                        >
                            <FiSkipBack size={30} />
                        </button>

                        {/* Play / Pause — THE primary action */}
                        <button
                            onClick={togglePlay}
                            aria-label={isPlaying ? "Pause" : "Play"}
                            className="w-[68px] h-[68px] rounded-full bg-ott-accent flex items-center justify-center shadow-ott-glow active:scale-90 transition-transform"
                        >
                            {isPlaying
                                ? <FiPause size={28} />
                                : <FiPlay size={28} className="ml-1" />
                            }
                        </button>

                        {/* Skip forward */}
                        <button
                            aria-label="Next"
                            className="p-1 text-white active:scale-90 transition-transform"
                        >
                            <FiSkipForward size={30} />
                        </button>
                    </div>

                    {/* Repeat */}
                    <button
                        onClick={() => setRepeat(r => !r)}
                        aria-label="Repeat"
                        className={`p-2 rounded-full transition-colors active:scale-90 ${repeat ? "text-ott-accent" : "text-white/40"}`}
                    >
                        <FiRepeat size={22} />
                    </button>
                </div>
            </div>

            {/* ── Up Next hint ── */}
            <div className="relative z-10 flex justify-center pb-10">
                <button 
                  onClick={() => setShowQueue(true)}
                  className="flex items-center gap-2 text-[12px] text-white/40 hover:text-white transition-colors"
                >
                    <FiList size={14} /> Up Next
                </button>
            </div>

            {/* ── Up Next Popup Overlay ── */}
            {showQueue && (
              <div 
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={() => setShowQueue(false)}
              >
                <div 
                  className="absolute bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-ott-card rounded-t-[32px] p-6 pb-12 animate-in slide-in-from-bottom duration-500 overflow-hidden"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[18px] font-bold">Up Next</h3>
                    <span className="text-[12px] text-ott-muted">{Object.keys(songDb).length - 1} songs in queue</span>
                  </div>
                  <div className="space-y-4 max-h-[40vh] overflow-y-auto no-scrollbar pr-1">
                    {Object.values(songDb).map((s, i) => (
                      <div 
                        key={s.id} 
                        onClick={() => {
                          navigate(`/music-player/${s.id}`);
                          setShowQueue(false);
                        }}
                        className={`flex items-center gap-3 p-2 rounded-2xl transition-all ${s.id === song.id ? "bg-ott-accent/10 border border-ott-accent/20" : "active:bg-white/5"}`}
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden relative">
                          <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                          {s.id === song.id && (
                            <div className="absolute inset-0 bg-ott-accent/40 flex items-center justify-center">
                              <div className="flex gap-0.5 items-end h-3">
                                <span className="w-0.5 h-full bg-white animate-bounce-short" />
                                <span className="w-0.5 h-1/2 bg-white animate-bounce-short [animation-delay:0.1s]" />
                                <span className="w-0.5 h-[80%] bg-white animate-bounce-short [animation-delay:0.2s]" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-[14px] font-bold truncate ${s.id === song.id ? "text-ott-accent" : "text-white"}`}>{s.title}</h4>
                          <p className="text-[11px] text-ott-muted truncate">{s.artist} • {s.album}</p>
                        </div>
                        {s.id === song.id && <FiPlay className="text-ott-accent" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
        </div>
    );
}
