import React, { useState } from "react";
import { FiStar } from "react-icons/fi";

const movies = [
    {
        id: 1,
        title: "The Little Mermaid",
        image: "/assets/images/backdrops/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg",
        duration: "2 hrs 15 mins",
        language: "English",
        quality: "1400mp",
        rating: 4.4,
        votes: 532,
        trending: true,
        description: "A magical underwater adventure.",
    },
    {
        id: 2,
        title: "Incredibles 2",
        image: "/assets/images/backdrops/9lFKBtaVIhP7E2Pk0IY1CwTKTMZ.jpg",
        duration: "1h 15m",
        language: "English",
        quality: "1080p",
        rating: 8.1,
        votes: 1200,
        trending: false,
        description: "The superhero family returns for more action.",
    },
    {
        id: 3,
        title: "The Matrix Reloaded",
        image: "/assets/images/backdrops/9TGHDvWrqKBzwDxDodHYXEmOE6J.jpg",
        duration: "2h 18m",
        language: "English",
        quality: "1080p",
        rating: 8.1,
        votes: 900,
        trending: false,
        description: "Neo and the rebels continue their fight.",
    },
    {
        id: 4,
        title: "Avatar: The Way of Water",
        image: "/assets/images/backdrops/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        duration: "2h 42m",
        language: "English",
        quality: "4K",
        rating: 7.9,
        votes: 2100,
        trending: false,
        description: "Return to Pandora in this epic sequel.",
    },
    {
        id: 5,
        title: "John Wick: Chapter 4",
        image: "/assets/images/backdrops/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        duration: "2h 49m",
        language: "English",
        quality: "4K",
        rating: 8.2,
        votes: 1800,
        trending: false,
        description: "John Wick faces new enemies in a global fight.",
    },
    {
        id: 6,
        title: "Spider-Man: Across the Spider-Verse",
        image: "/assets/images/backdrops/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        duration: "2h 20m",
        language: "English",
        quality: "4K",
        rating: 8.7,
        votes: 2500,
        trending: false,
        description: "Miles Morales swings into a new multiverse adventure.",
    },
    {
        id: 7,
        title: "Oppenheimer",
        image: "/assets/images/backdrops/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
        duration: "3h 0m",
        language: "English",
        quality: "4K",
        rating: 8.5,
        votes: 3000,
        trending: false,
        description: "The story of the father of the atomic bomb.",
    },
];

export default function Carousel() {
    const [active, setActive] = useState(0);
    const movie = movies[active];

    const goNext = () => setActive((prev) => (prev + 1) % movies.length);
    const goPrev = () => setActive((prev) => (prev - 1 + movies.length) % movies.length);

    return (
        <div className="w-full mx-auto relative overflow-hidden">
            <div className="relative w-full h-[60vh] overflow-hidden">
                <img src={movie.image} alt={movie.title} className="w-full h-full object-cover block" />
                <div className="absolute inset-0 bg-gradient-to-t from-ott-bg via-transparent to-transparent opacity-100 z-[1]" />
                <div className="absolute inset-x-0 bottom-0 z-[3] text-white p-[0_20px_18px_20px] flex flex-col items-start text-left gap-0.5">
                    <div className="text-[12px] font-medium opacity-90">
                        {movie.trending && <span className="bg-ott-accent text-white rounded-full px-2.5 py-0.5 text-[12px] font-semibold mb-1 inline-block">Trending 🔥</span>}
                    </div>
                    <div className="text-[22px] font-bold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.62)]">{movie.title}</div>
                    <div className="text-[13px] text-ott-text opacity-90 flex items-center gap-2">
                        <span>{movie.duration}</span>
                        <span>• {movie.language}</span>
                        <span>• {movie.quality}</span>
                        <div className="inline-flex items-center gap-1 bg-black/40 rounded-full px-2 py-0.5">
                            <FiStar className="text-yellow-400 text-[15px]" />
                            <span className="text-[13px] font-semibold text-yellow-400">{movie.rating}</span>
                            <span className="text-ott-muted text-[12px] ml-0.5">({movie.votes})</span>
                        </div>
                    </div>
                    <div className="text-[13px] text-ott-text opacity-90 my-1 max-w-[90%] line-clamp-2">{movie.description}</div>

                    <div className="flex gap-3 mt-2">
                        <button className="bg-gradient-to-r from-ott-grad-start to-ott-grad-end text-white border-none rounded-full px-[22px] py-2 text-[14px] font-bold shadow-md cursor-pointer transition-all hover:brightness-110 active:scale-95">Watch Now</button>
                        <button className="bg-ott-bg/70 text-white border-[1.5px] border-white/20 rounded-full px-[18px] py-2 text-[14px] font-semibold cursor-pointer transition-all hover:bg-ott-accent">Watch Trailer</button>
                    </div>
                </div>
                <button className="absolute top-1/2 left-3 -translate-y-1/2 bg-ott-bg/70 text-white border-none rounded-full w-9 h-9 text-[22px] flex items-center justify-center z-[4] cursor-pointer transition-colors hover:bg-ott-accent" onClick={goPrev} aria-label="Previous">&#8592;</button>
                <button className="absolute top-1/2 right-3 -translate-y-1/2 bg-ott-bg/70 text-white border-none rounded-full w-9 h-9 text-[22px] flex items-center justify-center z-[4] cursor-pointer transition-colors hover:bg-ott-accent" onClick={goNext} aria-label="Next">&#8594;</button>
                <div className="absolute inset-x-0 bottom-[160px] flex justify-center gap-[7px] z-[5] pointer-events-auto">
                    {movies.map((_, i) => (
                        <span
                            key={i}
                            className={`w-2 h-2 rounded-full cursor-pointer transition-all ${i === active ? "bg-ott-accent scale-125" : "bg-white/20"}`}
                            onClick={() => setActive(i)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
