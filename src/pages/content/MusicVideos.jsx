import React from "react";
import Carousel from '../../components/discovery/Carousel';
import MovieCard from '../../components/discovery/MovieCard';

export default function MusicVideos() {
    const musicVids = [
        { image: '/assets/images/posters/ptpr0kGAckfQkJeJIt8st5dglvd.jpg', title: 'Dance Hits' },
        { image: '/assets/images/posters/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', title: 'Latest Tracks' },
        { image: '/assets/images/posters/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', title: 'Retro Vibes' },
    ];

    return (
        <div className="bg-ott-bg min-h-screen text-white pb-[72px]">
            <Carousel />
            <div className="mb-[22px] px-4 mt-5">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[16px] font-semibold m-0 text-white text-left">Top Music Videos</h2>
                    <span className="text-[11px] text-ott-accent font-semibold uppercase tracking-[0.5px] p-[4px_12px] bg-ott-accent/10 rounded-full cursor-pointer">View All</span>
                </div>
                <div className="flex gap-[10px] overflow-x-auto pb-1 snap-x snap-mandatory no-scrollbar">
                    {musicVids.map((m, i) => <MovieCard key={i} {...m} />)}
                </div>
            </div>
            <div className="mb-[22px] px-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[16px] font-semibold m-0 text-white text-left">Genres</h2>
                </div>
                <div className="flex gap-3 overflow-x-auto py-1 no-scrollbar">
                    {["Pop", "Hip Hop", "Electronic", "Rock", "Classical", "Jazz"].map((c, i) => (
                        <div key={i} className="whitespace-nowrap p-[10px_22px] bg-ott-card text-white rounded-xl text-[13px] font-medium border-[1.5px] border-white/10 cursor-pointer">{c}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}
