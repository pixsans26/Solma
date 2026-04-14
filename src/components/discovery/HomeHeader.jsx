import React from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiBell } from "react-icons/fi";

export default function HomeHeader() {
    const navigate = useNavigate();
    
    return (
        <div className="absolute top-0 left-0 w-full z-[100] flex items-center justify-between p-[24px_16px_20px_16px] bg-gradient-to-b from-[rgba(0,0,0,0.7)] via-[rgba(0,0,0,0.3)] to-transparent">
            <div className="flex flex-col cursor-pointer" onClick={() => navigate('/home')}>
                <span className="text-[22px] font-bold text-white tracking-[-1px]">
                    Solma <span className="text-ott-accent">Didi Tv</span>
                </span>
                <span className="text-[11px] text-ott-muted -mt-[2px]">let's stream to the max</span>
            </div>
            <div className="flex items-center gap-4">
                <FiSearch onClick={() => navigate('/search')} className="text-white text-[20px] opacity-[0.85] cursor-pointer hover:text-ott-accent transition-colors" />
                <FiBell onClick={() => navigate('/notifications')} className="text-white text-[20px] opacity-[0.85] cursor-pointer hover:text-ott-accent transition-colors" />
                <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" 
                    alt="Profile" 
                    onClick={() => navigate('/profile')} 
                    className="w-8 h-8 rounded-full object-cover border-[1.5px] border-white/20 cursor-pointer hover:scale-105 transition-transform" 
                />
            </div>
        </div>
    );
}
