import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShoppingBag, FiClock, FiStar, FiFilter } from "react-icons/fi";
import { ALL_CONTENT } from "../../data/contentData";

export default function MyLibrary() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("all");

    const rented = ALL_CONTENT.filter(c => c.isRentable && !c.isOwned);
    const purchased = ALL_CONTENT.filter(c => c.isOwned);
    
    const items = activeTab === "all" ? [...rented, ...purchased] : activeTab === "rented" ? rented : purchased;

    return (
        <div className="bg-ott-bg min-h-screen text-white p-4">
            <div className="flex items-center justify-between mb-6 mt-2">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-ott-card border border-white/10 flex items-center justify-center">
                        <FiArrowLeft />
                    </button>
                    <h1 className="text-[18px] font-bold">My Library</h1>
                </div>
                <button className="w-10 h-10 rounded-full bg-ott-card border border-white/10 flex items-center justify-center text-ott-muted">
                    <FiFilter />
                </button>
            </div>

            {/* Transaction Tabs */}
            <div className="flex bg-ott-card p-1 rounded-full border border-white/5 mb-6">
                {["all", "rented", "purchased"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2.5 rounded-full text-[12px] font-bold capitalize transition-all ${
                            activeTab === tab ? "bg-ott-accent text-white shadow-lg" : "text-ott-muted hover:text-white"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                {items.length > 0 ? items.map((item) => (
                    <div 
                        key={item.id} 
                        onClick={() => navigate(item.type === 'movie' ? `/movie/${item.id}` : `/series/${item.id}`)}
                        className="group cursor-pointer"
                    >
                        <div className="relative aspect-[2/3] rounded-[24px] overflow-hidden border border-white/5 mb-2">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md rounded-full px-2 py-0.5 flex items-center gap-1 text-[10px]">
                                <FiStar className="text-yellow-400" /> {item.rating}
                            </div>
                            <div className="absolute bottom-2 left-2 z-10">
                                {item.isOwned ? (
                                    <span className="bg-green-500/90 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Purchased</span>
                                ) : (
                                    <span className="bg-blue-600/90 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Rented</span>
                                )}
                            </div>
                        </div>
                        <h3 className="text-[14px] font-bold truncate px-1">{item.title}</h3>
                        <div className="flex items-center gap-2 text-[11px] text-ott-muted px-1 mt-0.5">
                            <span>{item.year}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><FiClock size={10} /> 24h Left</span>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-2 py-20 flex flex-col items-center opacity-40">
                         <FiShoppingBag size={48} className="mb-4" />
                         <p className="text-[14px]">No items found in your library</p>
                    </div>
                )}
            </div>
        </div>
    );
}
