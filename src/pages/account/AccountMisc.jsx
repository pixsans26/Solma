import React, { useState } from "react";
import { FiSettings, FiCheckCircle, FiChevronRight, FiCreditCard, FiActivity, FiShield, FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function Settings() {
    const navigate = useNavigate();
    const [preferences, setPreferences] = useState({
        notifications: true,
        dataSaver: false,
        autoplay: true,
        wifiOnly: true,
        smartDownloads: true
    });

    const handleToggle = (key) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const sections = [
        {
            title: "Account Settings",
            items: [
                { name: "Personal Information", sub: "Name, Email, Phone", to: "/settings/personal-info" },
                { name: "Password & Security", sub: "Two-factor authentication", to: "/settings/security" },
                { name: "Payment Methods", sub: "Visa ending in 4242", to: "/settings/payment" }
            ]
        },
        {
            title: "App Preferences",
            items: [
                { name: "Notification Preferences", toggle: true, active: preferences.notifications, onToggle: () => handleToggle('notifications') },
                { name: "Data Saver Mode", toggle: true, active: preferences.dataSaver, onToggle: () => handleToggle('dataSaver') },
                { name: "Autoplay Next Episode", toggle: true, active: preferences.autoplay, onToggle: () => handleToggle('autoplay') },
                { name: "App Language", value: "English (US)", to: "/settings/language" }
            ]
        },
        {
            title: "Downloads & Storage",
            items: [
                { name: "Download Over Wi-Fi Only", toggle: true, active: preferences.wifiOnly, onToggle: () => handleToggle('wifiOnly') },
                { name: "Smart Downloads", sub: "Auto-delete watched episodes", toggle: true, active: preferences.smartDownloads, onToggle: () => handleToggle('smartDownloads') },
                { name: "Clear Cache", value: "1.2 GB", action: true }
            ]
        }
    ];

    return (
        <div className="bg-ott-bg min-h-screen text-white p-4 pb-20">
            <h1 className="text-[20px] font-bold mb-6 flex items-center gap-2">
                 Settings
            </h1>

            {sections.map((sec, i) => (
                <div key={i} className="mb-8">
                    <h2 className="text-[12px] uppercase tracking-widest text-ott-muted font-bold mb-3 ml-2">{sec.title}</h2>
                    <div className="bg-ott-card rounded-[24px] border border-white/5 overflow-hidden">
                        {sec.items.map((item, j) => (
                            <div 
                                key={j} 
                                onClick={() => item.to && navigate(item.to)}
                                className={`flex items-center justify-between p-4 ${j !== sec.items.length - 1 ? "border-b border-white/5" : ""} ${item.to ? "active:bg-white/5 cursor-pointer" : ""} transition-colors`}
                            >
                                <div className="flex-1">
                                    <p className="text-[14px] font-semibold">{item.name}</p>
                                    {item.sub && <p className="text-[11px] text-ott-muted mt-0.5">{item.sub}</p>}
                                </div>
                                <div className="flex items-center gap-3">
                                    {item.value && <span className="text-[12px] text-ott-muted">{item.value}</span>}
                                    {item.toggle && (
                                        <div 
                                            onClick={(e) => { e.stopPropagation(); item.onToggle(); }}
                                            className={`w-10 h-5 rounded-full relative transition-all cursor-pointer ${item.active ? "bg-ott-accent" : "bg-white/10"}`}
                                        >
                                            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${item.active ? "left-[22px]" : "left-0.5"}`} />
                                        </div>
                                    )}
                                    {item.to && <FiChevronRight className="text-ott-muted" />}
                                    {item.action && <button className="text-[11px] font-bold text-ott-accent bg-ott-accent/10 px-4 py-1.5 rounded-full hover:bg-ott-accent/20 transition-colors">Clear</button>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="mt-4 px-2">
                <button className="w-full py-4 text-red-500 font-bold border border-red-500/20 rounded-full active:bg-red-500/10 transition-all text-[14px]">
                    Delete My Account
                </button>
            </div>
        </div>
    );
}

export function Subscriptions() {
    const navigate = useNavigate();
    const plans = [
        { name: "Basic", price: "₹149/mo", color: "from-blue-500/20 to-blue-600/20", features: ["720p Quality", "1 Device", "Ads Included"] },
        { name: "Premium", price: "₹299/mo", color: "from-ott-accent/20 to-ott-accent/40", features: ["1080p Quality", "2 Devices", "Ad Free"], active: true },
        { name: "Ultimate", price: "₹499/mo", color: "from-amber-500/20 to-orange-600/20", features: ["4K + HDR", "4 Devices", "Ad Free", "Offline Viewing"] },
    ];

    return (
        <div className="bg-ott-bg min-h-screen text-white p-4 pb-20">
            <div className="text-center mb-8 mt-4">
                <h1 className="text-[24px] font-bold">Choose your plan</h1>
                <p className="text-ott-muted text-[13px] mt-1">Unlock 10,000+ movies & originals</p>
            </div>

            <div className="space-y-4">
                {plans.map((p, i) => (
                    <div 
                        key={i} 
                        className={`p-6 rounded-[28px] border-[1.5px] relative overflow-hidden transition-all group ${p.active ? "bg-ott-card border-ott-accent shadow-[0_0_20px_rgba(231,31,105,0.1)]" : "bg-ott-card border-white/5"}`}
                    >
                        {p.active && (
                            <div className="absolute top-0 right-0 bg-ott-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
                                Recommended
                            </div>
                        )}
                        <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-20 pointer-events-none`} />
                        
                        <h2 className="text-[20px] font-bold relative z-10">{p.name}</h2>
                        <div className="flex items-baseline gap-1 relative z-10 mt-1">
                            <span className="text-[24px] font-bold text-ott-accent">{p.price.split('/')[0]}</span>
                            <span className="text-ott-muted text-[13px]">/month</span>
                        </div>

                        <ul className="mt-6 space-y-3 relative z-10">
                            {p.features.map((f, j) => (
                                <li key={j} className="flex items-center gap-3 text-[13px] text-ott-muted">
                                    <div className="w-5 h-5 rounded-full bg-ott-accent/10 flex items-center justify-center">
                                        <FiCheckCircle className="text-ott-accent size-3" />
                                    </div>
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <button 
                            onClick={() => !p.active && navigate("/checkout", { state: { plan: p } })}
                            className={`w-full mt-8 py-4 rounded-full font-bold text-[15px] transition-all relative z-10 ${
                                p.active 
                                    ? "bg-white/5 text-ott-muted border border-white/10 cursor-default" 
                                    : "bg-ott-accent text-white shadow-ott-glow hover:scale-[1.02] active:scale-95"
                            }`}
                        >
                            {p.active ? "Currently Active" : "Get Started"}
                        </button>
                    </div>
                ))}
            </div>

            <p className="text-center text-ott-muted text-[11px] mt-8 px-8">
                By subscribing, you agree to our Terms of Use and Privacy Policy. Subscriptions automatically renew.
            </p>
        </div>
    );
}
