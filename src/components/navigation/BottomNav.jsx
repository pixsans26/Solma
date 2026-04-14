import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiMusic, FiSearch, FiDownload, FiUser } from "react-icons/fi";

const navItems = [
    { to: "/home", icon: <FiHome />, label: "Home" },
    { to: "/songs", icon: <FiMusic />, label: "Music" },
    { to: "/search", icon: <FiSearch />, label: "Search" },
    { to: "/downloads", icon: <FiDownload />, label: "Download" },
    { to: "/profile", icon: <FiUser />, label: "Profile" },
];

export default function BottomNav() {
    return (
        <nav className="fixed left-1/2 bottom-0 -translate-x-1/2 w-full max-w-[480px] h-[70px] bg-ott-card/95 backdrop-blur-xl flex justify-around items-center rounded-t-[24px] shadow-ott-nav z-[1000] border-t border-white/5">
            {navItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                        `flex-1 flex flex-col items-center justify-center text-[10px] no-underline transition-all duration-200 h-full relative ${
                            isActive 
                            ? "text-ott-accent" 
                            : "text-ott-muted hover:text-white"
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <span className={`text-[22px] transition-transform duration-200 ${isActive ? "scale-110 -translate-y-1" : ""}`}>
                                {item.icon}
                            </span>
                            <span className={`text-[10px] font-medium mt-1 transition-all ${isActive ? "opacity-100" : "opacity-80"}`}>
                                {item.label}
                            </span>
                            {isActive && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-ott-accent rounded-full shadow-ott-glow" />
                            )}
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
    );
}
