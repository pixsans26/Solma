import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft, FiPlay, FiPause, FiVolume2, FiVolumeX,
  FiMaximize, FiSkipBack, FiSkipForward, FiStar, FiList,
} from 'react-icons/fi';
import { getContentById, MOVIES } from '../../data/contentData';

export default function MoviePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('4K');
  const [audioLang, setAudioLang] = useState('English');
  const [subtitle, setSubtitle] = useState('English (CC)');
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('quality'); // quality, audio, subtitle
  const controlsTimerRef = useRef(null);

  const movie = getContentById(id);

  const relatedMovies = MOVIES.filter(
    (m) => m.id !== Number(id) && movie && m.genre.some((g) => movie.genre.includes(g))
  ).slice(0, 6);

  // Auto-hide controls
  const resetControlsTimer = () => {
    setShowControls(true);
    clearTimeout(controlsTimerRef.current);
    if (isPlaying) {
      controlsTimerRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.3));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => () => clearTimeout(controlsTimerRef.current), []);

  const qualities = ['Auto', '4K', '1080p', '720p', '480p'];
  const audioLangs = ['English', 'Hindi', 'Spanish', 'Korean'];
  const subtitles = ['Off', 'English (CC)', 'Hindi', 'Spanish', 'Korean'];

  const formatTime = (percent, totalMins = 149) => {
    const totalSecs = Math.floor((percent / 100) * totalMins * 60);
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!movie) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center gap-4 text-white">
        <span className="text-6xl">🎬</span>
        <p className="text-white/60 text-[16px]">Content not found</p>
        <button onClick={() => navigate(-1)} className="bg-ott-accent px-6 py-2 rounded-full font-semibold">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-ott-bg min-h-screen text-white pb-[80px]">
      {/* ─── VIDEO PLAYER ────────────────────────────────────────────── */}
      <div
        className="relative w-full bg-black overflow-hidden select-none"
        style={{ height: '56vw', maxHeight: '340px' }}
        onClick={resetControlsTimer}
        onMouseMove={resetControlsTimer}
      >
        {/* Poster/backdrop as "video" */}
        <img
          src={movie.backdrop || movie.image}
          alt={movie.title}
          className={`w-full h-full object-cover transition-all duration-500 ${isPlaying ? 'brightness-75' : 'brightness-50'}`}
          style={{ filter: isPlaying ? 'brightness(0.7) saturate(0.9)' : 'brightness(0.5)' }}
        />

        {/* Big play indicator overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-ott-accent/20 backdrop-blur-sm border border-ott-accent/40 flex items-center justify-center">
              <FiPlay className="text-white text-[28px] ml-1" />
            </div>
          </div>
        )}

        {/* Scanlines effect for premium feel */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 2px)',
          }}
        />

        {/* Controls overlay */}
        <div
          className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-b from-black/70 to-transparent">
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center"
            >
              <FiArrowLeft className="text-white text-[16px]" />
            </button>
            <div className="flex-1 mx-3">
              <p className="text-white text-[13px] font-semibold text-center line-clamp-1">{movie.title}</p>
            </div>
            {/* Settings Button */}
            <div className="relative">
              <button
                onClick={() => { setShowSettings(!showSettings); resetControlsTimer(); }}
                className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center"
              >
                <FiList className="text-white text-[16px]" />
              </button>

              {showSettings && (
                <div 
                  className="absolute right-0 top-10 bg-ott-card border border-white/10 rounded-2xl overflow-hidden z-50 w-[200px] shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Tabs */}
                  <div className="flex border-b border-white/5 bg-white/5">
                    {['Quality', 'Audio', 'Subs'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider transition-all ${
                          activeTab === tab.toLowerCase() ? 'text-ott-accent border-b-2 border-ott-accent' : 'text-ott-muted'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Options List */}
                  <div className="max-h-[180px] overflow-y-auto no-scrollbar py-1">
                    {activeTab === 'quality' && qualities.map((q) => (
                      <button
                        key={q}
                        onClick={() => { setQuality(q); setShowSettings(false); }}
                        className={`w-full text-left px-4 py-2.5 text-[12px] transition-colors flex items-center justify-between ${quality === q ? 'text-ott-accent bg-ott-accent/10' : 'text-white hover:bg-white/5'}`}
                      >
                        {q}
                        {quality === q && <div className="w-1.5 h-1.5 rounded-full bg-ott-accent shadow-ott-glow" />}
                      </button>
                    ))}
                    {activeTab === 'audio' && audioLangs.map((l) => (
                      <button
                        key={l}
                        onClick={() => { setAudioLang(l); setShowSettings(false); }}
                        className={`w-full text-left px-4 py-2.5 text-[12px] transition-colors flex items-center justify-between ${audioLang === l ? 'text-ott-accent bg-ott-accent/10' : 'text-white hover:bg-white/5'}`}
                      >
                        {l}
                        {audioLang === l && <div className="w-1.5 h-1.5 rounded-full bg-ott-accent shadow-ott-glow" />}
                      </button>
                    ))}
                    {activeTab === 'subs' && subtitles.map((s) => (
                      <button
                        key={s}
                        onClick={() => { setSubtitle(s); setShowSettings(false); }}
                        className={`w-full text-left px-4 py-2.5 text-[12px] transition-colors flex items-center justify-between ${subtitle === s ? 'text-ott-accent bg-ott-accent/10' : 'text-white hover:bg-white/5'}`}
                      >
                        {s}
                        {subtitle === s && <div className="w-1.5 h-1.5 rounded-full bg-ott-accent shadow-ott-glow" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center controls */}
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => setProgress(Math.max(0, progress - 5))}
              className="flex flex-col items-center gap-0.5 opacity-90 hover:opacity-100"
            >
              <FiSkipBack className="text-white text-[22px]" />
              <span className="text-white text-[9px]">-10s</span>
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-ott-accent/90 backdrop-blur-sm flex items-center justify-center shadow-ott-glow hover:bg-ott-accent transition-all active:scale-90"
            >
              {isPlaying ? (
                <FiPause className="text-white text-[24px]" />
              ) : (
                <FiPlay className="text-white text-[24px] ml-1" />
              )}
            </button>
            <button
              onClick={() => setProgress(Math.min(100, progress + 5))}
              className="flex flex-col items-center gap-0.5 opacity-90 hover:opacity-100"
            >
              <FiSkipForward className="text-white text-[22px]" />
              <span className="text-white text-[9px]">+10s</span>
            </button>
          </div>

          {/* Bottom controls */}
          <div className="p-3 bg-gradient-to-t from-black/80 to-transparent">
            {/* Progress bar */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white text-[10px] w-[36px]">{formatTime(progress)}</span>
              <div
                className="flex-1 h-[3px] bg-white/20 rounded-full relative cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = ((e.clientX - rect.left) / rect.width) * 100;
                  setProgress(Math.min(100, Math.max(0, pct)));
                }}
              >
                <div
                  className="h-full bg-ott-accent rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md" />
                </div>
              </div>
              <span className="text-white text-[10px] w-[36px] text-right">{movie.duration}</span>
            </div>

            {/* Control icons row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? (
                    <FiVolumeX className="text-white text-[18px]" />
                  ) : (
                    <FiVolume2 className="text-white text-[18px]" />
                  )}
                </button>
              </div>
              <button>
                <FiMaximize className="text-white text-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MOVIE INFO BELOW PLAYER ─────────────────────────────────── */}
      <div className="px-4 pt-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h1 className="text-[18px] font-bold text-white leading-tight flex-1">{movie.title}</h1>
          <div className="flex items-center gap-1 bg-yellow-500/15 rounded-full px-2.5 py-1 flex-shrink-0">
            <FiStar className="text-yellow-400 text-[12px]" />
            <span className="text-yellow-400 text-[12px] font-bold">{movie.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-ott-muted text-[12px]">{movie.year}</span>
          <span className="text-ott-muted text-[11px]">•</span>
          <span className="text-ott-muted text-[12px]">{movie.duration}</span>
          <span className="text-ott-muted text-[11px]">•</span>
          <span className="bg-ott-accent/20 text-ott-accent text-[11px] font-bold px-2 py-0.5 rounded">{movie.quality}</span>
        </div>
        <p className="text-ott-text text-[13px] leading-relaxed mb-4 line-clamp-3">{movie.description}</p>

        {/* Genre Tags */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {movie.genre.map((g) => (
            <span key={g} className="text-[11px] text-ott-accent bg-ott-accent/10 px-3 py-1 rounded-full">
              {g}
            </span>
          ))}
        </div>

        {/* Related */}
        {relatedMovies.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiList className="text-ott-accent text-[16px]" />
              <h2 className="text-[15px] font-semibold text-white">Related Movies</h2>
            </div>
            <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
              {relatedMovies.map((m) => (
                <RelatedCard key={m.id} item={m} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RelatedCard({ item }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => navigate(`/movie/${item.id}`)}
      className="w-[100px] flex-shrink-0 snap-start cursor-pointer group"
    >
      <div className="relative w-full h-[140px] rounded-xl overflow-hidden bg-ott-card">
        {!imgError ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-ott-bg">
            <span className="text-2xl">🎬</span>
          </div>
        )}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
          <div className="flex items-center gap-0.5">
            <FiStar className="text-yellow-400 text-[9px]" />
            <span className="text-yellow-400 text-[10px]">{item.rating}</span>
          </div>
        </div>
      </div>
      <p className="text-white text-[11px] font-medium mt-1.5 line-clamp-1">{item.title}</p>
    </div>
  );
}
