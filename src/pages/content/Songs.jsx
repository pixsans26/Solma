import React from "react";
import { Link } from "react-router-dom";
import { FiPlay, FiMoreVertical } from "react-icons/fi";
import { useMusic } from "../../context/MusicContext";

const artists = [
    { name: "Arijit Singh", image: "/assets/images/music/arijit.jpg" },
    { name: "Diljit Dosanjh", image: "/assets/images/music/diljit.jpg" },
    { name: "The Weeknd", image: "/assets/images/music/weeknd.jpg" },
    { name: "Taylor Swift", image: "/assets/images/music/taylor.jpg" },
    { name: "Badshah", image: "/assets/images/music/badshah.jpg" },
    { name: "Sidhu Moose Wala", image: "/assets/images/music/sidhu.jpg" },
];

const languages = [
    { name: "Hindi", image: "/assets/images/music/music_6efbc1ea70.jpg" },
    { name: "Punjabi", image: "/assets/images/music/music_4e0db0cf29.jpg" },
    { name: "English", image: "/assets/images/music/music_9ad063dd0f.jpg" },
    { name: "Tamil", image: "/assets/images/music/music_0c841b18c3.jpg" },
    { name: "Spanish", image: "/assets/images/music/music_adaec1b8ba.jpg" },
    { name: "Korean", image: "/assets/images/music/music_558d597908.jpg" },
];

const moods = [
    { name: "Relax", image: "/assets/images/music/music_7d1dc5a5a4.jpg" },
    { name: "Workout", image: "/assets/images/music/music_d7b6ba4c63.jpg" },
    { name: "Party", image: "/assets/images/music/music_b5f5c23d42.jpg" },
    { name: "Study", image: "/assets/images/music/music_590f276976.jpg" },
];

const playlists = [
    { id: 101, title: "Bollywood Hits", image: "/assets/images/music/music_6efbc1ea70.jpg", desc: "Top Hindi chartbusters" },
    { id: 102, title: "Punjabi Power", image: "/assets/images/music/music_4e0db0cf29.jpg", desc: "Latest Bhangra tracks" },
    { id: 103, title: "Global Top 50", image: "/assets/images/music/music_9ad063dd0f.jpg", desc: "World's most played" },
    { id: 104, title: "Indie Gems", image: "/assets/images/music/music_0c841b18c3.jpg", desc: "Best of independent music" },
];

export default function Songs() {
    const { openOptions, playSong } = useMusic();
    return (
        <div className="bg-ott-bg min-h-screen text-white pb-[90px]">
            {/* Featured Header */}
            <div className="px-4 pt-6">
                <Link to="/music-player/featured" className="block relative h-[180px] w-full rounded-[24px] overflow-hidden bg-[#2c3e50] border border-white/10 flex items-center p-6 mb-8 mt-[70px] active:scale-[0.98] transition-all">
                    <img src="/assets/images/music/music_558d597908.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent" />
                    <div className="z-[1]">
                        <span className="text-ott-accent text-[12px] font-bold uppercase tracking-widest">New Release</span>
                        <h1 className="text-[24px] font-bold mt-1">Kesariya (Dance Mix)</h1>
                        <p className="text-ott-muted text-[13px] mt-1">Arijit Singh • Pritam</p>
                        <div className="mt-4 bg-ott-accent text-white p-[10px_24px] w-fit rounded-full text-[13px] font-bold flex items-center gap-2 shadow-ott-glow">
                            <FiPlay /> Play Now
                        </div>
                    </div>
                </Link>
            </div>

            {/* Top Artists */}
            <div className="mb-8 pl-4">
                <h2 className="text-[17px] font-bold mb-4">Top Artists</h2>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pr-4">
                    {artists.map((artist, i) => (
                        <Link to={`/music/artist/${artist.name}`} key={i} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group w-[80px]">
                            <div className="w-[75px] h-[75px] rounded-full border-[2px] border-white/5 p-1 group-active:scale-95 transition-transform flex-shrink-0">
                                <img src={artist.image} alt={artist.name} className="w-full h-full rounded-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all border border-white/10" />
                            </div>
                            <span className="text-[11px] font-medium text-ott-muted group-hover:text-white truncate w-full text-center">{artist.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Music by Language */}
            <div className="mb-8 pl-4">
                <h2 className="text-[17px] font-bold mb-4">Music by Language</h2>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pr-4">
                    {languages.map((lang, i) => (
                        <Link to={`/music/language/${lang.name}`} key={i} className="relative w-[110px] h-[65px] rounded-[16px] flex-shrink-0 flex items-center justify-center cursor-pointer active:scale-95 transition-transform border border-white/10 overflow-hidden shadow-lg group">
                            <img src={lang.image} alt={lang.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20" />
                            <span className="relative z-10 text-[13px] font-bold text-white uppercase tracking-wider">{lang.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Moods Grid */}
            <div className="px-4 mb-8">
                <h2 className="text-[17px] font-bold mb-4">Genres & Moods</h2>
                <div className="grid grid-cols-2 gap-3">
                    {moods.map((mood, i) => (
                        <Link to={`/music/genre/${mood.name}`} key={i} className="relative h-[85px] rounded-2xl overflow-hidden cursor-pointer group active:scale-95 transition-transform">
                            <img src={mood.image} alt={mood.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20" />
                            <div className="absolute inset-0 p-4 flex items-end">
                                <span className="font-bold text-[15px] text-white">{mood.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Featured Playlists */}
            <div className="mb-8 pl-4">
                <div className="flex items-center justify-between pr-4 mb-4">
                    <h2 className="text-[17px] font-bold m-0">Top Playlists</h2>
                    <span className="text-[12px] text-ott-accent font-semibold">View All</span>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pr-4">
                    {playlists.map((p, i) => (
                        <Link to={`/music-player/${p.id}`} key={i} className="w-[140px] flex-shrink-0 cursor-pointer active:scale-95 transition-transform">
                            <div className="relative aspect-square rounded-[20px] overflow-hidden mb-2 border border-white/5">
                                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                                    <FiPlay className="text-white text-[12px] ml-[2px]" />
                                </div>
                            </div>
                            <h3 className="text-[13px] font-bold truncate m-0">{p.title}</h3>
                            <p className="text-[11px] text-ott-muted mt-0.5 truncate">{p.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recently Played */}
            <div className="px-4 mb-10">
                <h2 className="text-[17px] font-bold mb-4">Recently Played</h2>
                <div className="flex flex-col gap-3">
                    {[
                        { id: 1, title: "Kesariya", artist: "Arijit Singh", img: "/assets/images/music/music_53ba5e69ec.jpg" },
                        { id: 2, title: "Peaches", artist: "The Weeknd", img: "/assets/images/music/music_7a24c0baae.jpg" },
                        { id: 3, title: "Stay", artist: "Justin Bieber", img: "/assets/images/music/music_89024afb27.jpg" }
                    ].map((song, i) => (
                        <Link to={`/music-player/${song.id}`} onClick={() => playSong(song)} key={i} className="flex items-center gap-3 bg-ott-card/50 p-2.5 rounded-2xl border border-white/5 cursor-pointer active:scale-[0.98] transition-all">
                            <div className="w-[45px] h-[45px] rounded-[10px] overflow-hidden bg-ott-card flex-shrink-0">
                                <img src={song.img} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-[13px] font-bold truncate m-0">{song.title}</h4>
                                <p className="text-[11px] text-ott-muted truncate m-0">{song.artist}</p>
                            </div>
                            <button
                                onClick={e => { e.preventDefault(); openOptions(song); }}
                                className="p-1.5 text-ott-muted hover:text-white flex-shrink-0"
                            >
                                <FiMoreVertical size={18} />
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
