import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft, FiPlay, FiPause, FiVolume2, FiVolumeX,
  FiMaximize, FiSkipBack, FiSkipForward, FiStar, FiList,
  FiChevronRight, FiChevronLeft,
} from 'react-icons/fi';
import { getContentById } from '../../data/contentData';

export default function SeriesPlayer() {
  const { id, season: seasonParam, episode: episodeParam } = useParams();
  const navigate = useNavigate();

  const series = getContentById(id);
  const currentSeasonIdx = (Number(seasonParam) || 1) - 1;
  const currentEpIdx = (Number(episodeParam) || 1) - 1;

  const [activeSeason, setActiveSeason] = useState(currentSeasonIdx);
  const [activeEp, setActiveEp] = useState(currentEpIdx);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('4K');
  const [audioLang, setAudioLang] = useState('English');
  const [subtitle, setSubtitle] = useState('English (CC)');
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('quality'); // quality, audio, subtitle
  const [showEpisodeList, setShowEpisodeList] = useState(false);
  const controlsTimerRef = useRef(null);

  const currentSeason = series?.seasons?.[activeSeason];
  const currentEpisode = currentSeason?.episodes?.[activeEp];
  const qualities = ['Auto', '4K', '1080p', '720p', '480p'];
  const audioLangs = ['English', 'Hindi', 'Spanish', 'Korean'];
  const subtitles = ['Off', 'English (CC)', 'Hindi', 'Spanish', 'Korean'];

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
        setProgress((p) => (p >= 100 ? 0 : p + 0.5));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const goNextEp = () => {
    if (activeEp < (currentSeason?.episodes?.length || 1) - 1) {
      setActiveEp(activeEp + 1);
      setProgress(0);
      setIsPlaying(false);
    } else if (activeSeason < (series?.seasons?.length || 1) - 1) {
      setActiveSeason(activeSeason + 1);
      setActiveEp(0);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const goPrevEp = () => {
    if (activeEp > 0) {
      setActiveEp(activeEp - 1);
      setProgress(0);
      setIsPlaying(false);
    } else if (activeSeason > 0) {
      setActiveSeason(activeSeason - 1);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  useEffect(() => () => clearTimeout(controlsTimerRef.current), []);

  if (!series || series.type !== 'series') {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center gap-4 text-white">
        <span className="text-6xl">📺</span>
        <p className="text-white/60 text-[16px]">Series not found</p>
        <button onClick={() => navigate(-1)} className="bg-ott-accent px-6 py-2 rounded-full font-semibold">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-ott-bg min-h-screen text-white pb-[80px]">
      {/* ─── VIDEO PLAYER ───────────────────────────────── */}
      <div
        className="relative w-full bg-black overflow-hidden select-none"
        style={{ height: '56vw', maxHeight: '340px' }}
        onClick={resetControlsTimer}
        onMouseMove={resetControlsTimer}
      >
        {/* Backdrop/poster as video frame */}
        <img
          src={series.backdrop || series.image}
          alt={currentEpisode?.title || series.title}
          className="w-full h-full object-cover"
          style={{ filter: isPlaying ? 'brightness(0.7) saturate(0.9)' : 'brightness(0.45)' }}
        />

        {/* Not playing indicator */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-ott-accent/20 backdrop-blur-sm border border-ott-accent/40 flex items-center justify-center">
              <FiPlay className="text-white text-[28px] ml-1" />
            </div>
          </div>
        )}

        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 2px)',
          }}
        />

        {/* Controls */}
        <div className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {/* Top */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-b from-black/70 to-transparent">
            <button
              onClick={() => navigate(`/series/${id}`)}
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center"
            >
              <FiArrowLeft className="text-white text-[16px]" />
            </button>
            <div className="flex-1 mx-3 min-w-0">
              <p className="text-white text-[12px] font-semibold text-center line-clamp-1">{series.title}</p>
              {currentEpisode && (
                <p className="text-white/60 text-[10px] text-center">
                  S{activeSeason + 1} E{activeEp + 1} · {currentEpisode.title}
                </p>
              )}
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

          {/* Center */}
          <div className="flex items-center justify-center gap-7">
            <button onClick={goPrevEp} className="flex flex-col items-center gap-0.5 opacity-80 hover:opacity-100">
              <FiChevronLeft className="text-white text-[22px]" />
              <span className="text-white text-[9px]">Prev</span>
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
            <button onClick={goNextEp} className="flex flex-col items-center gap-0.5 opacity-80 hover:opacity-100">
              <FiChevronRight className="text-white text-[22px]" />
              <span className="text-white text-[9px]">Next</span>
            </button>
          </div>

          {/* Bottom */}
          <div className="p-3 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white text-[10px] w-[30px]">
                {Math.floor((progress / 100) * 45)}:{String(Math.floor(((progress / 100) * 45 * 60) % 60)).padStart(2, '0')}
              </span>
              <div
                className="flex-1 h-[3px] bg-white/20 rounded-full cursor-pointer"
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
              <span className="text-white text-[10px] w-[30px] text-right">{currentEpisode?.duration || '45m'}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <button onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <FiVolumeX className="text-white text-[18px]" /> : <FiVolume2 className="text-white text-[18px]" />}
                </button>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowEpisodeList(!showEpisodeList)}>
                  <FiList className="text-white text-[18px]" />
                </button>
                <button>
                  <FiMaximize className="text-white text-[18px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── NOW PLAYING INFO ─────────────────────────── */}
      <div className="px-4 pt-4 mb-4">
        <div className="bg-ott-card rounded-2xl p-3.5 border border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-ott-accent text-[11px] font-bold bg-ott-accent/10 px-2 py-0.5 rounded">
              NOW PLAYING
            </span>
            <span className="text-ott-muted text-[11px]">
              S{activeSeason + 1} · E{activeEp + 1}
            </span>
          </div>
          <p className="text-white text-[15px] font-semibold">{currentEpisode?.title || 'Episode'}</p>
          <p className="text-ott-muted text-[12px] mt-0.5">{series.title} · {currentEpisode?.duration}</p>
          {currentEpisode?.description && (
            <p className="text-ott-text text-[12px] mt-2 leading-relaxed line-clamp-2">{currentEpisode.description}</p>
          )}
        </div>
      </div>

      {/* ─── SEASON TABS + EPISODE LIST ────────────────── */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-semibold text-white">Episodes</h2>
          {/* Season tabs */}
          <div className="flex gap-1.5">
            {series.seasons?.map((s, i) => (
              <button
                key={i}
                onClick={() => { setActiveSeason(i); setActiveEp(0); setProgress(0); setIsPlaying(false); }}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  activeSeason === i
                    ? 'bg-ott-accent text-white'
                    : 'bg-ott-card text-ott-muted border border-white/10'
                }`}
              >
                S{s.season}
              </button>
            ))}
          </div>
        </div>

        {/* Episode cards */}
        <div className="flex flex-col gap-2">
          {currentSeason?.episodes?.map((ep, i) => {
            const isActive = i === activeEp;
            return (
              <div
                key={ep.ep}
                onClick={() => { setActiveEp(i); setProgress(0); setIsPlaying(false); }}
                className={`flex gap-3 rounded-xl p-2.5 cursor-pointer transition-all active:scale-95 ${
                  isActive
                    ? 'bg-ott-accent/15 border border-ott-accent/30'
                    : 'bg-ott-card border border-white/5 hover:bg-white/5'
                }`}
              >
                {/* Thumbnail */}
                <div className="relative w-[110px] h-[65px] rounded-lg overflow-hidden flex-shrink-0 bg-ott-bg">
                  <img
                    src={ep.thumb}
                    alt={ep.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  {isActive ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-ott-accent/50">
                      {isPlaying ? (
                        <FiPause className="text-white text-[18px]" />
                      ) : (
                        <FiPlay className="text-white text-[18px] ml-0.5" />
                      )}
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                      <FiPlay className="text-white text-[14px] ml-0.5" />
                    </div>
                  )}
                  <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] font-bold px-1 py-0.5 rounded">
                    E{ep.ep}
                  </span>
                  {/* Progress for active */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/20">
                      <div className="h-full bg-ott-accent" style={{ width: `${progress}%` }} />
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <p className={`text-[13px] font-semibold line-clamp-1 ${isActive ? 'text-ott-accent' : 'text-white'}`}>
                    {ep.title}
                  </p>
                  <p className="text-ott-muted text-[11px]">{ep.duration}</p>
                  <p className="text-ott-text text-[11px] line-clamp-1 opacity-70 mt-0.5">{ep.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
