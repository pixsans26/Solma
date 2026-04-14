import React, { createContext, useContext, useState, useCallback } from "react";

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showMiniPlayer, setShowMiniPlayer] = useState(false);
    const [optionsSheet, setOptionsSheet] = useState(null); // song to show options for

    const playSong = useCallback((song) => {
        setCurrentSong(song);
        setIsPlaying(true);
        setShowMiniPlayer(true);
    }, []);

    const togglePlay = useCallback(() => {
        setIsPlaying(p => !p);
    }, []);

    const closeMiniPlayer = useCallback(() => {
        setShowMiniPlayer(false);
        setIsPlaying(false);
        setCurrentSong(null);
    }, []);

    const minimizePlayer = useCallback(() => {
        setShowMiniPlayer(true);
    }, []);

    const openOptions = useCallback((song) => {
        setOptionsSheet(song);
    }, []);

    const closeOptions = useCallback(() => {
        setOptionsSheet(null);
    }, []);

    return (
        <MusicContext.Provider value={{
            currentSong, isPlaying, showMiniPlayer,
            optionsSheet,
            playSong, togglePlay, closeMiniPlayer, minimizePlayer,
            openOptions, closeOptions,
        }}>
            {children}
        </MusicContext.Provider>
    );
}

export function useMusic() {
    const ctx = useContext(MusicContext);
    if (!ctx) throw new Error("useMusic must be used within MusicProvider");
    return ctx;
}
