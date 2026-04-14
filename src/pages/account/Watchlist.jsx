import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft, FiBookmark, FiTrash2, FiPlay,
  FiStar, FiSearch,
} from "react-icons/fi";

const TABS = ["All", "Movies", "Web Series", "Short Films"];

const WATCHLIST = [
  {
    id: 1, type: "Movies", title: "Oppenheimer",
    image: "/assets/images/posters/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
    rating: 8.5, year: 2023, quality: "4K",
    playerPath: "/movie-player/7", detailPath: "/movie/7",
  },
  {
    id: 2, type: "Movies", title: "Dune: Part Two",
    image: "/assets/images/posters/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    rating: 8.7, year: 2024, quality: "4K",
    playerPath: "/movie-player/8", detailPath: "/movie/8",
  },
  {
    id: 3, type: "Movies", title: "The Batman",
    image: "/assets/images/posters/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    rating: 7.8, year: 2022, quality: "1080p",
    playerPath: "/movie-player/6", detailPath: "/movie/6",
  },
  {
    id: 4, type: "Web Series", title: "Stranger Things",
    image: "/assets/images/posters/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    rating: 8.8, year: 2023, quality: "4K",
    playerPath: "/series-player/101/1/1", detailPath: "/series/101",
  },
  {
    id: 5, type: "Web Series", title: "Breaking Bad",
    image: "/assets/images/posters/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    rating: 9.5, year: 2013, quality: "1080p",
    playerPath: "/series-player/102/1/1", detailPath: "/series/102",
  },
  {
    id: 6, type: "Web Series", title: "Wednesday",
    image: "/assets/images/posters/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    rating: 8.1, year: 2022, quality: "4K",
    playerPath: "/series-player/104/1/1", detailPath: "/series/104",
  },
  {
    id: 7, type: "Short Films", title: "The Silent Hour",
    image: "/assets/images/posters/qom1SZSENdmHFNZBXbtTFY5VzuS.jpg",
    rating: 7.4, year: 2023, quality: "1080p",
    playerPath: "/movie-player/9", detailPath: "/movie/9",
  },
  {
    id: 8, type: "Short Films", title: "Neon Drift",
    image: "/assets/images/posters/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
    rating: 7.9, year: 2024, quality: "4K",
    playerPath: "/movie-player/10", detailPath: "/movie/10",
  },
];

export default function Watchlist() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");
  const [list, setList] = useState(WATCHLIST);

  const remove = (id) => setList((l) => l.filter((i) => i.id !== id));

  const filtered = list
    .filter((i) => tab === "All" || i.type === tab)
    .filter((i) => i.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="bg-ott-bg min-h-screen text-white pb-[88px]">

      {/* ── Sticky Header ─────────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-ott-bg/95 backdrop-blur-md border-b border-white/5 px-4 pt-12 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-ott-card border border-white/10 flex items-center justify-center shrink-0"
          >
            <FiArrowLeft className="text-white text-[17px]" />
          </button>
          <h1 className="text-[18px] font-bold flex-1 flex items-center gap-2">
            <FiBookmark className="text-ott-accent" /> My Watchlist
          </h1>
          <span className="bg-ott-accent/15 text-ott-accent text-[12px] font-bold px-3 py-1 rounded-full border border-ott-accent/30">
            {list.length}
          </span>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2 bg-ott-card border border-white/8 rounded-2xl px-3 py-2.5 mb-3">
          <FiSearch className="text-ott-muted text-[15px] shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search watchlist…"
            className="flex-1 bg-transparent text-white text-[13px] outline-none placeholder:text-ott-muted/60"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap shrink-0 px-4 py-1.5 rounded-full text-[12px] font-medium transition-all outline-none ${
                tab === t
                  ? "bg-ott-accent text-white"
                  : "bg-ott-card text-ott-muted border border-white/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="px-4 pt-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <div className="w-20 h-20 rounded-full bg-ott-card border border-white/5 flex items-center justify-center">
              <FiBookmark className="text-ott-muted text-[36px]" />
            </div>
            <p className="text-ott-muted text-[14px]">Nothing here yet</p>
            <button
              onClick={() => navigate("/")}
              className="bg-ott-accent text-white px-6 py-2.5 rounded-full text-[13px] font-bold active:scale-95 transition-transform"
            >
              Browse Content
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((item) => (
              <WatchCard
                key={item.id}
                item={item}
                onRemove={remove}
                onDetail={() => navigate(item.detailPath)}
                onPlay={() => navigate(item.playerPath)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WatchCard({ item, onRemove, onDetail, onPlay }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="relative bg-ott-card rounded-2xl border border-white/5 overflow-hidden group cursor-pointer">
      {/* Poster */}
      <div className="relative w-full h-[180px]" onClick={onDetail}>
        {!imgErr ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full bg-ott-bg flex items-center justify-center">
            <span className="text-4xl">🎬</span>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ott-card via-transparent to-transparent" />

        {/* Quality badge */}
        <span className="absolute top-2 left-2 bg-ott-accent/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
          {item.quality}
        </span>

        {/* Rating badge */}
        <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-black/70 rounded px-1.5 py-0.5">
          <FiStar className="text-yellow-400 text-[10px]" />
          <span className="text-yellow-400 text-[10px] font-bold">{item.rating}</span>
        </div>

        {/* Play overlay */}
        <button
          onClick={(e) => { e.stopPropagation(); onPlay(); }}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30"
        >
          <div className="w-12 h-12 rounded-full bg-ott-accent/90 flex items-center justify-center shadow-lg">
            <FiPlay className="text-white text-[18px] ml-0.5" />
          </div>
        </button>
      </div>

      {/* Info row */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex-1 min-w-0" onClick={onDetail}>
          <p className="text-white text-[12px] font-semibold line-clamp-1">{item.title}</p>
          <p className="text-ott-muted text-[10px] mt-0.5">{item.year} · {item.type}</p>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="w-7 h-7 rounded-full flex items-center justify-center text-ott-muted hover:text-red-400 transition-colors shrink-0 ml-1"
        >
          <FiTrash2 className="text-[13px]" />
        </button>
      </div>
    </div>
  );
}
