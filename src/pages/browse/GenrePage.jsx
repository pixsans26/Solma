import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSearch, FiStar } from 'react-icons/fi';
import { ALL_CONTENT, GENRES } from '../../data/contentData';

export default function GenrePage() {
  const { genre } = useParams();
  const navigate = useNavigate();
  const [activeGenre, setActiveGenre] = useState(decodeURIComponent(genre));
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = ALL_CONTENT.filter((c) => {
    const matchGenre = c.genre.some(
      (g) => g.toLowerCase() === activeGenre.toLowerCase()
    );
    const matchSearch =
      !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGenre && matchSearch;
  });

  const allGenres = GENRES.map((g) => g.label);

  return (
    <div className="bg-ott-bg min-h-screen text-white pb-[80px]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-ott-bg/95 backdrop-blur-md border-b border-white/5 px-4 pt-12 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-ott-card border border-white/10 flex items-center justify-center text-white hover:bg-ott-accent/20 transition-colors"
          >
            <FiArrowLeft className="text-[18px]" />
          </button>
          <div>
            <h1 className="text-[20px] font-bold text-white leading-tight">
              {activeGenre}
            </h1>
            <p className="text-[11px] text-ott-muted">
              {filtered.length} titles found
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ott-muted text-[16px]" />
          <input
            type="text"
            placeholder={`Search in ${activeGenre}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-ott-card border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[13px] text-white placeholder-ott-muted outline-none focus:border-ott-accent/50 transition-colors"
          />
        </div>

        {/* Genre pills — all genres horizontal */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {allGenres.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGenre(g)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 flex-shrink-0 ${
                activeGenre.toLowerCase() === g.toLowerCase()
                  ? 'bg-ott-accent text-white'
                  : 'bg-ott-card text-ott-muted border border-white/10 hover:border-ott-accent/40'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Genre hero strip */}
      <div className="mx-4 mt-4 mb-4 rounded-2xl bg-gradient-to-r from-ott-grad-start to-ott-grad-end p-4 flex items-center gap-3 overflow-hidden relative">
        <div className="absolute -right-4 -top-4 text-[80px] opacity-10 select-none">
          {GENRES.find((g) => g.label.toLowerCase() === activeGenre.toLowerCase())?.icon || '🎬'}
        </div>
        <span className="text-[36px]">
          {GENRES.find((g) => g.label.toLowerCase() === activeGenre.toLowerCase())?.icon || '🎬'}
        </span>
        <div>
          <p className="text-white font-bold text-[18px]">{activeGenre}</p>
          <p className="text-white/70 text-[12px]">{filtered.length} titles · Movies & Series</p>
        </div>
      </div>

      {/* Grid */}
      <div className="px-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="text-5xl">🔍</span>
            <p className="text-ott-muted text-[14px]">No content found for "{activeGenre}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ContentCard({ item }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const path = item.type === 'movie' ? `/movie/${item.id}` : `/series/${item.id}`;

  return (
    <div
      onClick={() => navigate(path)}
      className="bg-ott-card rounded-xl overflow-hidden cursor-pointer group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-ott-glow active:scale-95"
    >
      <div className="relative w-full aspect-[2/3] bg-ott-card">
        {!imgError ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-ott-card to-ott-bg gap-2">
            <span className="text-4xl">🎬</span>
            <span className="text-ott-muted text-[11px] text-center px-2">{item.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute top-2 left-2 bg-ott-accent/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase">
          {item.type === 'movie' ? 'Movie' : 'Series'}
        </span>
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 rounded-md px-1.5 py-0.5">
          <FiStar className="text-yellow-400 text-[10px]" />
          <span className="text-yellow-400 text-[11px] font-semibold">{item.rating}</span>
        </div>
      </div>
      <div className="p-2.5">
        <p className="text-white text-[13px] font-semibold leading-tight line-clamp-1">{item.title}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-ott-muted text-[11px]">{item.year}</span>
          <span className="text-ott-muted text-[10px]">•</span>
          <span className="text-ott-muted text-[11px]">{item.duration}</span>
        </div>
      </div>
    </div>
  );
}
