import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft, FiStar, FiPlay, FiPlus, FiCheck,
  FiDownload, FiShare2, FiClock, FiCalendar, FiChevronDown, FiCreditCard
} from 'react-icons/fi';
import { getContentById, SERIES } from '../../data/contentData';

export default function SeriesDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeSeason, setActiveSeason] = useState(0);

  const series = getContentById(id);

  if (!series || series.type !== 'series') {
    // Check if it's actually a movie redirect
    const content = getContentById(id);
    if (content && content.type === 'movie') {
      navigate(`/movie/${id}`, { replace: true });
      return null;
    }
    return (
      <div className="bg-ott-bg min-h-screen flex flex-col items-center justify-center gap-4 text-white">
        <span className="text-6xl">📺</span>
        <p className="text-ott-muted text-[16px]">Series not found</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-ott-accent text-white px-6 py-2 rounded-full font-semibold"
        >
          Go Back
        </button>
      </div>
    );
  }

  const currentSeason = series.seasons?.[activeSeason];
  const relatedSeries = SERIES.filter(
    (s) => s.id !== series.id && s.genre.some((g) => series.genre.includes(g))
  ).slice(0, 6);

  return (
    <div className="bg-ott-bg min-h-screen text-white pb-[80px]">
      {/* Hero */}
      <div className="relative w-full h-[52vh] overflow-hidden">
        {!imgError ? (
          <img
            src={series.backdrop || series.image}
            alt={series.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-ott-card to-ott-bg flex items-center justify-center">
            <span className="text-8xl opacity-30">📺</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ott-bg via-ott-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ott-bg/60 via-transparent to-transparent" />

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-ott-accent/70 transition-colors z-10"
        >
          <FiArrowLeft className="text-[18px]" />
        </button>

        {/* Share */}
        <button className="absolute top-12 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white z-10">
          <FiShare2 className="text-[17px]" />
        </button>

        {/* Series badge */}
        <div className="absolute bottom-[230px] left-4 bg-ott-card/80 backdrop-blur-sm text-ott-accent text-[11px] font-bold px-3 py-1 rounded-full border border-ott-accent/30 z-10">
          📺 Web Series
        </div>
      </div>

      <div className="px-4 -mt-[56px] relative z-10">
        {/* Title */}
        <h1 className="text-[26px] font-bold text-white mb-2 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
          {series.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-yellow-500/15 rounded-full px-2.5 py-1">
            <FiStar className="text-yellow-400 text-[13px]" />
            <span className="text-yellow-400 text-[13px] font-bold">{series.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-ott-muted text-[12px]">
            <FiCalendar className="text-[12px]" /> {series.year}
          </div>
          <div className="flex items-center gap-1 text-ott-muted text-[12px]">
            <FiClock className="text-[12px]" /> {series.duration}
          </div>
          <span className="bg-ott-accent/20 text-ott-accent text-[11px] font-bold px-2 py-0.5 rounded border border-ott-accent/30">
            {series.quality}
          </span>
          <span className="text-ott-muted text-[12px] bg-ott-card px-2 py-0.5 rounded border border-white/10">
            {series.seasons?.length || 1} Season{series.seasons?.length > 1 ? 's' : ''}
          </span>
        </div>

        {/* Genres */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {series.genre.map((g) => (
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
          {series.isOwned ? (
            <button
              onClick={() => navigate(`/series-player/${series.id}/1/1`)}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-ott-grad-start to-ott-grad-end text-white rounded-full py-3 text-[15px] font-bold hover:brightness-110 transition-all active:scale-95 shadow-ott-glow"
            >
              <FiPlay className="text-[16px]" />
              Watch Now
            </button>
          ) : (series.isRentable || series.isBuyable) ? (
            <button
              onClick={() => navigate(`/checkout`, { state: { plan: { name: series.title, price: series.buyPrice || series.rentPrice, features: [series.isBuyable ? 'Permanent Access' : '30-day Access', 'Full HD Quality'] } } })}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full py-3 text-[15px] font-bold hover:brightness-110 transition-all active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              <FiCreditCard className="text-[16px]" />
              {series.isBuyable ? `Buy for ${series.buyPrice}` : `Rent for ${series.rentPrice}`}
            </button>
          ) : (
            <button
              onClick={() => navigate(`/series-player/${series.id}/1/1`)}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-ott-grad-start to-ott-grad-end text-white rounded-full py-3 text-[15px] font-bold hover:brightness-110 transition-all active:scale-95 shadow-ott-glow"
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

        <div className="h-px bg-white/5 mb-4" />

        {/* Description */}
        <div className="mb-5">
          <h2 className="text-[14px] font-semibold text-ott-muted mb-2 uppercase tracking-wide">Synopsis</h2>
          <p className={`text-[13px] text-ott-text leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
            {series.description}
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-ott-accent text-[12px] font-semibold mt-1"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        </div>

        {/* Cast */}
        {series.cast?.length > 0 && (
          <div className="mb-5">
            <h2 className="text-[14px] font-semibold text-ott-muted mb-3 uppercase tracking-wide">Cast</h2>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {series.cast.map((name, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0 w-[72px]">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-[22px] border-2 border-white/10"
                    style={{ background: `hsl(${(i * 60 + 280) % 360}, 55%, 25%)` }}
                  >
                    {name.charAt(0)}
                  </div>
                  <span className="text-ott-text text-[10px] text-center leading-tight line-clamp-2">{name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="h-px bg-white/5 mb-5" />

        {/* ─── EPISODES SECTION ─────────────────────────────────────── */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px] font-semibold text-white">Episodes</h2>
            {series.seasons && series.seasons.length > 1 && (
              <div className="flex gap-1.5">
                {series.seasons.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSeason(i)}
                    className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-all ${
                      activeSeason === i
                        ? 'bg-ott-accent text-white'
                        : 'bg-ott-card text-ott-muted border border-white/10 hover:border-ott-accent/40'
                    }`}
                  >
                    S{s.season}
                  </button>
                ))}
              </div>
            )}
          </div>

          {currentSeason ? (
            <div className="flex flex-col gap-2">
              {currentSeason.episodes.map((ep) => (
                <EpisodeCard
                  key={ep.ep}
                  ep={ep}
                  seriesId={series.id}
                  season={currentSeason.season}
                />
              ))}
            </div>
          ) : (
            <p className="text-ott-muted text-[13px]">No episodes available.</p>
          )}
        </div>

        {/* More Like This */}
        {relatedSeries.length > 0 && (
          <div>
            <h2 className="text-[16px] font-semibold text-white mb-3">More Like This</h2>
            <div className="flex gap-[10px] overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory">
              {relatedSeries.map((s) => (
                <SmallCard key={s.id} item={s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EpisodeCard({ ep, seriesId, season }) {
  const navigate = useNavigate();
  const [thumbError, setThumbError] = useState(false);

  return (
    <div
      onClick={() => navigate(`/series-player/${seriesId}/${season}/${ep.ep}`)}
      className="flex gap-3 bg-ott-card rounded-xl p-2.5 cursor-pointer group hover:bg-white/5 transition-colors active:scale-95"
    >
      {/* Thumbnail */}
      <div className="relative w-[120px] h-[72px] rounded-lg overflow-hidden flex-shrink-0 bg-ott-bg">
        {!thumbError ? (
          <img
            src={ep.thumb}
            alt={ep.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={() => setThumbError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ott-card to-ott-bg">
            <span className="text-2xl">📺</span>
          </div>
        )}
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-ott-accent/90 flex items-center justify-center">
            <FiPlay className="text-white text-[13px] ml-0.5" />
          </div>
        </div>
        {/* Ep number */}
        <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
          E{ep.ep}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center flex-1 min-w-0 gap-0.5">
        <p className="text-white text-[13px] font-semibold line-clamp-1">{ep.title}</p>
        <p className="text-ott-muted text-[11px]">{ep.duration}</p>
        <p className="text-ott-text text-[11px] line-clamp-2 opacity-80">{ep.description}</p>
      </div>

      <button className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-ott-muted hover:text-white transition-colors self-center">
        <FiDownload className="text-[15px]" />
      </button>
    </div>
  );
}

function SmallCard({ item }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => navigate(`/series/${item.id}`)}
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
            <span className="text-3xl">📺</span>
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
