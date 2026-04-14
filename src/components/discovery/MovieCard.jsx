import React from "react";

export default function MovieCard({ image, title }) {
    return (
        <div className="w-[115px] bg-ott-card rounded-md shadow-ott-card overflow-hidden flex flex-col relative transition-all duration-200 snap-start shrink-0 hover:shadow-ott-glow hover:-translate-y-0.5 hover:scale-105">
            <img src={image} alt={title} className="w-full h-[165px] object-cover block" />
        </div>
    );
}
