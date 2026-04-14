import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft, FiStar, FiPlay, FiDownload, FiPlus,
  FiShare2, FiCheck, FiClock, FiCalendar, FiCreditCard
} from 'react-icons/fi';
import { getContentById, MOVIES } from '../../data/contentData';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const movie = getContentById(id);

  if (!movie) {
    return (
      <div className="bg-ott-bg min-h-screen flex flex-col items-center justify-center gap-4 text-white">
        <span className="text-6xl">🎬</span>
        <p className="text-ott-muted text-[16px]">Movie not found</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-ott-accent text-white px-6 py-2 rounded-full font-semibold"
        >
          Go Back
        </button>
      </div>
    );
  }

  const relatedMovies = MOVIES.filter(
    (m) => m.id !== movie.id && m.genre.some((g) => movie.genre.includes(g))
  ).slice(0, 8);

  const playerPath = movie.type === 'movie'
    ? `/movie-player/${movie.id}`
    : `/series/${movie.id}`;

  return (
    <div className="bg-ott-bg min-h-screen text-white pb-[80px]">
      {/* Hero Image */}
      <div className="relative w-full h-[55vh] overflow-hidden">
        {!imgError ? (
          <img
            src={movie.backdrop || movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-ott-card to-ott-bg flex items-center justify-center">
            <span className="text-8xl opacity-30">🎬</span>
          </div>
        )}
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-ott-bg via-ott-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ott-bg/60 via-transparent to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-ott-accent/70 transition-colors z-10"
        >
          <FiArrowLeft className="text-[18px]" />
        </button>

        {/* Share */}
        <button className="absolute top-12 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10">
          <FiShare2 className="text-[17px]" />
        </button>

        {/* Trending badge */}
        {movie.trending && (
          <div className="absolute bottom-[240px] left-4 bg-ott-accent/90 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full z-10">
            🔥 Trending
          </div>
        )}
      </div>

      {/* Content starts overlapping hero */}
      <div className="px-4 -mt-[60px] relative z-10">
        {/* Title + Meta */}
        <h1 className="text-[26px] font-bold text-white mb-2 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
          {movie.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* Rating */}
          <div className="flex items-center gap-1 bg-yellow-500/15 rounded-full px-2.5 py-1">
            <FiStar className="text-yellow-400 text-[13px]" />
            <span className="text-yellow-400 text-[13px] font-bold">{movie.rating}</span>
          </div>
          {/* Year */}
          <div className="flex items-center gap-1 text-ott-muted text-[12px]">
            <FiCalendar className="text-[12px]" />
            {movie.year}
          </div>
          {/* Duration */}
          <div className="flex items-center gap-1 text-ott-muted text-[12px]">
            <FiClock className="text-[12px]" />
            {movie.duration}
          </div>
          {/* Quality badge */}
          <span className="bg-ott-accent/20 text-ott-accent text-[11px] font-bold px-2 py-0.5 rounded border border-ott-accent/30">
            {movie.quality}
          </span>
          {/* Language */}
          <span className="text-ott-muted text-[12px] bg-ott-card px-2 py-0.5 rounded border border-white/10">
            {movie.language}
          </span>
        </div>

        {/* Genres */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {movie.genre.map((g) => (
            <span
              key={g}
              onClick={() => navigate(`/browse/genre/${encodeURIComponent(g)}`)}
              className="text-[11px] text-ott-accent bg-ott-accent/10 px-3 py-1 rounded-full cursor-pointer hover:bg-ott-accent/20 transition-colors"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-5">
          {movie.isOwned ? (
            <button
              onClick={() => navigate(`/movie-player/${movie.id}`)}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-ott-grad-start to-ott-grad-end text-white rounded-full py-3 text-[15px] font-bold  hover:brightness-110 transition-all active:scale-95"
            >
              <FiPlay className="text-[16px]" />
              Watch Now
            </button>
          ) : (movie.isRentable || movie.isBuyable) ? (
            <button
              onClick={() => navigate(`/checkout`, { state: { plan: { name: movie.title, price: movie.isBuyPrice || movie.rentPrice, features: [movie.isBuyable ? 'Permanent Access' : '48h Rental', 'HD/4K Quality'] } } })}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full py-3 text-[15px] font-bold  hover:brightness-110 transition-all active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              <FiCreditCard className="text-[16px]" />
              {movie.isBuyable ? `Buy for ${movie.buyPrice}` : `Rent for ${movie.rentPrice}`}
            </button>
          ) : (
            <button
              onClick={() => navigate(`/movie-player/${movie.id}`)}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-ott-grad-start to-ott-grad-end text-white rounded-full py-3 text-[15px] font-bold  hover:brightness-110 transition-all active:scale-95"
            >
              <FiPlay className="text-[16px]" />
              Watch Now
            </button>
          )}
          <button
            onClick={() => setInWatchlist(!inWatchlist)}
            className={`w-12 h-12 rounded-full flex items-center justify-center border-[1.5px] transition-all active:scale-95 ${
              inWatchlist
                ? 'bg-ott-accent border-ott-accent text-white'
                : 'bg-ott-card border-white/20 text-white hover:border-ott-accent/50'
            }`}
          >
            {inWatchlist ? <FiCheck className="text-[17px]" /> : <FiPlus className="text-[17px]" />}
          </button>
          <button className="w-12 h-12 rounded-full bg-ott-card border-[1.5px] border-white/20 flex items-center justify-center text-white hover:border-ott-accent/50 transition-all active:scale-95">
            <FiDownload className="text-[17px]" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-4" />

        {/* Description */}
        <div className="mb-5">
          <h2 className="text-[14px] font-semibold text-ott-muted mb-2 uppercase tracking-wide">Synopsis</h2>
          <p className={`text-[13px] text-ott-text leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
            {movie.description}
          </p>
          {movie.description && movie.description.length > 120 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-ott-accent text-[12px] font-semibold mt-1"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Director */}
        {movie.director && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-ott-muted text-[12px]">Director:</span>
            <span className="text-white text-[13px] font-semibold">{movie.director}</span>
          </div>
        )}

        {/* Cast */}
        {movie.cast && movie.cast.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[14px] font-semibold text-ott-muted mb-3 uppercase tracking-wide">Cast</h2>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {movie.cast.map((name, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0 w-[72px]">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-[22px] border-2 border-white/10"
                    style={{
                      background: `hsl(${(i * 60 + 200) % 360}, 60%, 25%)`,
                    }}
                  >
                    {name.charAt(0)}
                  </div>
                  <span className="text-ott-text text-[10px] text-center leading-tight line-clamp-2">{name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trailer section */}
        <div className="mb-6">
          <h2 className="text-[14px] font-semibold text-ott-muted mb-3 uppercase tracking-wide">Trailer</h2>
          <div
            onClick={() => navigate(`/movie-player/${movie.id}`)}
            className="relative w-full h-[180px] rounded-2xl overflow-hidden cursor-pointer group"
          >
            {!imgError ? (
              <img
                src={movie.image}
                alt="trailer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-ott-card" />
            )}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-ott-accent/90 backdrop-blur-sm flex items-center justify-center shadow-ott-glow group-hover:scale-110 transition-transform">
                <FiPlay className="text-white text-[22px] ml-1" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 bg-black/60 rounded-md px-2 py-0.5">
              <span className="text-white text-[11px] font-medium">Official Trailer</span>
            </div>
          </div>
        </div>

        {/* More Like This */}
        {relatedMovies.length > 0 && (
          <div className="mb-4">
            <h2 className="text-[16px] font-semibold text-white mb-3">More Like This</h2>
            <div className="flex gap-[10px] overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory">
              {relatedMovies.map((m) => (
                <SmallCard key={m.id} item={m} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SmallCard({ item }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const path = item.type === 'movie' ? `/movie/${item.id}` : `/series/${item.id}`;

  return (
    <div
      onClick={() => navigate(path)}
      className="w-[110px] flex-shrink-0 snap-start cursor-pointer group"
    >
      <div className="relative w-full h-[155px] rounded-xl overflow-hidden bg-ott-card">
        {!imgError ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-ott-bg">
            <span className="text-3xl">🎬</span>
          </div>
        )}
        <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 bg-black/70 rounded px-1 py-0.5">
          <FiStar className="text-yellow-400 text-[9px]" />
          <span className="text-yellow-400 text-[10px]">{item.rating}</span>
        </div>
      </div>
      <p className="text-white text-[11px] font-medium mt-1.5 line-clamp-1">{item.title}</p>
    </div>
  );
}
