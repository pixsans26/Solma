import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiChevronLeft, FiPlay, FiSearch, FiMoreVertical } from "react-icons/fi";
import { useMusic } from "../../context/MusicContext";

const mockTracks = [
    { id: 1, title: "Kesariya", artist: "Arijit Singh", duration: "4:28", img: "/assets/images/music/music_7d1dc5a5a4.jpg" },
    { id: 2, title: "Tum Hi Ho", artist: "Arijit Singh", duration: "4:10", img: "/assets/images/music/music_d7b6ba4c63.jpg" },
    { id: 3, title: "Channa Mereya", artist: "Arijit Singh", duration: "5:00", img: "/assets/images/music/music_b5f5c23d42.jpg" },
    { id: 4, title: "Galti Se Mistake", artist: "Arijit Singh", duration: "3:45", img: "/assets/images/music/music_9c1018ce0a.jpg" },
    { id: 5, title: "First Class", artist: "Arijit Singh", duration: "3:55", img: "/assets/images/music/music_adaec1b8ba.jpg" },
    { id: 6, title: "Enna Sonna", artist: "Arijit Singh", duration: "4:02", img: "/assets/images/music/music_1f2e0266e8.jpg" },
    { id: 7, title: "Ae Dil Hai Mushkil", artist: "Arijit Singh", duration: "4:30", img: "/assets/images/music/music_590f276976.jpg" },
];

export default function MusicListPage() {
    const { type, name } = useParams();
    const navigate = useNavigate();
    const { openOptions, playSong } = useMusic();

    return (
        <div className="bg-ott-bg min-h-screen text-white pb-[140px]">
            {/* Self-contained Header */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-[100] px-4 py-3 bg-ott-bg/90 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                        <FiChevronLeft size={22} />
                    </button>
                    <div>
                        <span className="text-[10px] uppercase font-bold text-ott-accent tracking-widest block">{type}</span>
                        <h1 className="text-[16px] font-bold leading-tight truncate max-w-[180px]">{decodeURIComponent(name)}</h1>
                    </div>
                </div>
                <FiSearch size={20} className="text-white/60" />
            </div>

            {/* Hero Summary */}
            <div className="pt-[72px] px-4">
                <div className="flex items-center gap-4 my-6">
                    <div className="w-[96px] h-[96px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex-shrink-0">
                        <img
                            src={mockTracks[0].img}
                            className="w-full h-full object-cover"
                            onError={e => { e.target.src = "/assets/images/music/music_85effe10db.jpg"; }}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-[18px] font-bold leading-snug truncate">{decodeURIComponent(name)} Mix</h2>
                        <p className="text-[12px] text-ott-muted mt-1">{mockTracks.length} Songs • ~28 min</p>
                        <button
                            onClick={() => { playSong(mockTracks[0]); navigate(`/music-player/${mockTracks[0].id}`); }}
                            className="mt-3 bg-ott-accent text-white px-5 py-2 rounded-full text-[12px] font-bold flex items-center gap-2 shadow-ott-glow"
                        >
                            <FiPlay size={13} /> Play All
                        </button>
                    </div>
                </div>

                {/* Track List */}
                <div className="flex flex-col gap-1 mt-2">
                    {mockTracks.map((song, i) => (
                        <div key={song.id} className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-colors group">
                            <div className="w-4 text-[12px] font-bold text-white/25 text-center flex-shrink-0 group-hover:text-ott-accent transition-colors">
                                {i + 1}
                            </div>

                            <Link
                                to={`/music-player/${song.id}`}
                                onClick={() => playSong(song)}
                                className="flex-shrink-0 w-[46px] h-[46px] rounded-xl overflow-hidden bg-ott-card block"
                            >
                                <img
                                    src={song.img}
                                    alt={song.title}
                                    className="w-full h-full object-cover"
                                    onError={e => { e.target.src = '/assets/images/placeholder.jpg'; }}
                                />
                            </Link>

                            <Link
                                to={`/music-player/${song.id}`}
                                onClick={() => playSong(song)}
                                className="flex-1 min-w-0"
                            >
                                <h4 className="text-[13px] font-bold truncate group-hover:text-ott-accent transition-colors">{song.title}</h4>
                                <p className="text-[11px] text-ott-muted truncate">{song.artist}</p>
                            </Link>

                            <span className="text-[11px] text-ott-muted flex-shrink-0">{song.duration}</span>

                            {/* 3-dot — opens global options sheet */}
                            <button
                                onClick={() => openOptions(song)}
                                className="p-1.5 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors flex-shrink-0 text-ott-muted hover:text-white"
                            >
                                <FiMoreVertical size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
