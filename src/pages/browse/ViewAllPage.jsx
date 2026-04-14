import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiStar, FiPlay } from 'react-icons/fi';
import { TRENDING, POPULAR, CONTINUE_WATCHING } from '../../data/contentData';

const SECTIONS = {
  trending: {
    label: 'Trending Now',
    emoji: '🔥',
    data: TRENDING,
    desc: 'What everyone is watching right now',
  },
  popular: {
    label: 'Popular on Solma',
    emoji: '⭐',
    data: POPULAR,
    desc: 'Top-rated content on the platform',
  },
  'continue-watching': {
    label: 'Continue Watching',
    emoji: '▶️',
    data: CONTINUE_WATCHING,
    desc: 'Pick up where you left off',
  },
};

export default function ViewAllPage() {
  const { section } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const config = SECTIONS[section] || {
    label: 'All Content',
    emoji: '🎬',
    data: TRENDING,
    desc: '',
  };

  const isContinue = section === 'continue-watching';

  return (
    <div className="bg-ott-bg min-h-screen text-white pb-[80px]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-ott-bg/95 backdrop-blur-md border-b border-white/5 px-4 pt-12 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full bg-ott-card border border-white/10 flex items-center justify-center text-white hover:bg-ott-accent/20 transition-colors"
            >
              <FiArrowLeft className="text-[18px]" />
            </button>
            <div>
              <h1 className="text-[20px] font-bold text-white leading-tight">
                {config.emoji} {config.label}
              </h1>
              <p className="text-[11px] text-ott-muted">{config.desc}</p>
            </div>
          </div>
          {/* View mode toggle */}
          <div className="flex gap-1 bg-ott-card rounded-lg p-1 border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all ${viewMode === 'grid' ? 'bg-ott-accent text-white' : 'text-ott-muted'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all ${viewMode === 'list' ? 'bg-ott-accent text-white' : 'text-ott-muted'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Count bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        <span className="text-ott-muted text-[12px]">{config.data.length} titles</span>
        {isContinue && (
          <button className="text-[12px] text-ott-accent font-semibold bg-ott-accent/10 px-3 py-1 rounded-full">
            Clear All
          </button>
        )}
      </div>

      {/* Content */}
      <div className="px-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-3 gap-2">
            {config.data.map((item) => (
              <GridCard key={item.id} item={item} isContinue={isContinue} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {config.data.map((item) => (
              <ListCard key={item.id} item={item} isContinue={isContinue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function GridCard({ item, isContinue }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const path = item.type === 'movie' ? `/movie/${item.id}` : `/series/${item.id}`;

  return (
    <div
      onClick={() => navigate(path)}
      className="bg-ott-card rounded-xl overflow-hidden cursor-pointer group transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
    >
      <div className="relative w-full aspect-[2/3]">
        {!imgError ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-ott-card to-ott-bg gap-1">
            <span className="text-3xl">🎬</span>
            <span className="text-ott-muted text-[10px] text-center px-1 line-clamp-2">{item.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        {/* Rating */}
        <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 bg-black/70 rounded px-1 py-0.5">
          <FiStar className="text-yellow-400 text-[9px]" />
          <span className="text-yellow-400 text-[10px] font-semibold">{item.rating}</span>
        </div>
        {/* Progress bar for continue watching */}
        {isContinue && item.progress && (
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/20">
            <div
              className="h-full bg-ott-accent"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        )}
      </div>
      <div className="px-2 py-1.5">
        <p className="text-white text-[11px] font-semibold line-clamp-1">{item.title}</p>
      </div>
    </div>
  );
}

function ListCard({ item, isContinue }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const path = item.type === 'movie' ? `/movie/${item.id}` : `/series/${item.id}`;

  return (
    <div
      onClick={() => navigate(path)}
      className="flex gap-3 bg-ott-card rounded-xl overflow-hidden cursor-pointer group transition-all duration-200 hover:bg-ott-card/80 active:scale-95 p-2"
    >
      <div className="relative w-[80px] h-[110px] rounded-lg overflow-hidden flex-shrink-0">
        {!imgError ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-ott-bg">
            <span className="text-2xl">🎬</span>
          </div>
        )}
        {isContinue && item.progress && (
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/20">
            <div className="h-full bg-ott-accent" style={{ width: `${item.progress}%` }} />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center gap-1.5 flex-1 min-w-0">
        <p className="text-white text-[14px] font-semibold line-clamp-1">{item.title}</p>
        <div className="flex items-center gap-2">
          <FiStar className="text-yellow-400 text-[12px]" />
          <span className="text-yellow-400 text-[12px] font-semibold">{item.rating}</span>
          <span className="text-ott-muted text-[11px]">• {item.year}</span>
          <span className="text-ott-muted text-[11px]">• {item.duration}</span>
        </div>
        <div className="flex gap-1 flex-wrap">
          {item.genre.slice(0, 2).map((g) => (
            <span key={g} className="text-[10px] text-ott-accent bg-ott-accent/10 px-2 py-0.5 rounded-full">
              {g}
            </span>
          ))}
        </div>
        {isContinue && item.progress && (
          <p className="text-ott-muted text-[11px]">{item.progress}% watched</p>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); navigate(path); }}
          className="flex items-center gap-1.5 bg-ott-accent text-white rounded-lg px-3 py-1 text-[12px] font-semibold w-fit mt-1 hover:brightness-110 transition-all active:scale-95"
        >
          <FiPlay className="text-[11px]" />
          {isContinue ? 'Resume' : 'Watch'}
        </button>
      </div>
    </div>
  );
}
