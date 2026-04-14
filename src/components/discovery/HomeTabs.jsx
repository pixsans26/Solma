import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
    { label: "All",         to: "/"                           },
    { label: "TV Shows",    to: "/series"                     },
    { label: "Movies",      to: "/movies"                     },
    { label: "Short Films", to: "/short-films"                },
    { label: "News",        to: "/browse/category/News"       },
    { label: "Music",       to: "/songs"                      },
    { label: "Kids",        to: "/browse/category/Kids"       },
    { label: "Sports",      to: "/browse/category/Sports"     },
    { label: "Documentary", to: "/browse/category/Documentary"},
];

export default function HomeTabs() {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    // Determine which tab is active — each tab has a unique `to` so only one matches
    const isActive = (tab) => {
        if (tab.to === "/") return path === "/";
        return path === tab.to || path.startsWith(tab.to + "/");
    };

    return (
        <div className="absolute top-[75px] left-0 w-full z-[100] flex gap-[10px] p-[10px_0_10px_16px] bg-transparent overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
                <button
                    key={tab.label}
                    onClick={() => navigate(tab.to)}
                    className={`text-[12px] font-normal px-4 py-0.5 rounded-full cursor-pointer transition-all duration-200 relative no-underline flex-shrink-0 border-none outline-none ${
                        isActive(tab)
                            ? "bg-ott-accent text-white shadow-ott-card"
                            : "bg-ott-bg/50 text-ott-text backdrop-blur-md saturate-[60%] border-[1.5px] border-white/10 hover:bg-opacity-75 hover:text-white hover:border-ott-accent/30"
                    }`}
                    style={!isActive(tab) ? { border: '1.5px solid rgba(255,255,255,0.1)' } : {}}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
