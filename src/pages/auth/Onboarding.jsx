import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/onboarding");
        }, 2000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="fixed inset-0 z-[5000] bg-ott-bg flex flex-col items-center justify-center animate-out fade-out duration-1000 delay-1500">
            <div className="relative group">
                <div className="absolute inset-0 bg-ott-accent blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-ott-grad-start to-ott-grad-end rounded-[22px] flex items-center justify-center shadow-ott-hero mb-4 animate-bounce">
                        <span className="text-white text-[32px] font-bold tracking-tighter">S</span>
                    </div>
                    <h1 className="text-[28px] font-bold text-white tracking-[-1px]">
                        Solma <span className="text-ott-accent">Didi Tv</span>
                    </h1>
                </div>
            </div>
            <div className="absolute bottom-12 flex flex-col items-center gap-2">
                <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-ott-accent w-full animate-progress-fast" />
                </div>
                <span className="text-ott-muted text-[11px] uppercase tracking-widest font-bold">Initializing Premium Experience</span>
            </div>
        </div>
    );
}

export function Onboarding() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "Unlimited Entertainment",
            desc: "Watch the latest movies, web series, and live TV shows anywhere, anytime.",
            img: "/assets/images/backdrops/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
        },
        {
            title: "Immersive Music",
            desc: "Listen to high-quality audio and watch original music videos from top artists.",
            img: "/assets/images/music/music_c0775219ed.jpg"
        },
        {
            title: "Rent or Buy",
            desc: "Access blockbuster titles right after their theatre release with easy rental options.",
            img: "/assets/images/backdrops/ptpr0kGAckfQkJeJIt8st5dglvd.jpg"
        }
    ];

    const next = () => {
        if (step < steps.length - 1) setStep(step + 1);
        else navigate("/login");
    };

    return (
        <div className="bg-ott-bg min-h-screen text-white flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img src={steps[step].img} className="w-full h-full object-cover transition-all duration-1000 opacity-40 scale-110" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-ott-bg via-ott-bg/40 to-transparent" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-end p-8 pb-12">
                <div className="flex gap-2 mb-6">
                    {steps.map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? "w-8 bg-ott-accent" : "w-3 bg-white/20"}`} />
                    ))}
                </div>
                
                <h1 className="text-[32px] font-bold leading-tight mb-3 animate-in fade-in slide-in-from-bottom duration-500">
                    {steps[step].title}
                </h1>
                <p className="text-ott-muted text-[15px] mb-10 max-w-[90%] leading-relaxed animate-in fade-in slide-in-from-bottom duration-700">
                    {steps[step].desc}
                </p>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/login")}
                        className="flex-1 py-4 bg-white/10 backdrop-blur-md rounded-full font-bold text-[15px] border border-white/10 active:scale-95 transition-all"
                    >
                        Skip
                    </button>
                    <button 
                        onClick={next}
                        className="flex-1 py-4 bg-gradient-to-r from-ott-grad-start to-ott-grad-end border-none rounded-full font-bold text-[15px] shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        {step === steps.length - 1 ? "Get Started" : "Next"} <FiArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

export function ContentPreferences() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);
    const languages = [
        "Hindi", "English", "Punjabi", "Marathi", "Bengali", "Tamil", "Telugu", "Kannada", "Malayalam", "Bhojpuri"
    ];

    const toggle = (l) => {
        if (selected.includes(l)) setSelected(selected.filter(i => i !== l));
        else setSelected([...selected, l]);
    };

    return (
        <div className="bg-ott-bg min-h-screen text-white p-6 flex flex-col">
            <div className="mb-10 mt-10">
                <h1 className="text-[28px] font-bold mb-2">Content Languages</h1>
                <p className="text-ott-muted text-[14px]">Select your preferred languages to personalize your home feed.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto no-scrollbar pb-10">
                {languages.map((l) => (
                    <div 
                        key={l}
                        onClick={() => toggle(l)}
                        className={`p-4 rounded-[24px] border-[1.5px] transition-all relative flex flex-col gap-3 group ${
                            selected.includes(l) ? "bg-ott-accent/10 border-ott-accent" : "bg-ott-card border-white/5 active:border-white/20"
                        }`}
                    >
                        <div className={`w-6 h-6 rounded-full border-[1.5px] flex items-center justify-center transition-all ${
                            selected.includes(l) ? "bg-ott-accent border-ott-accent text-white" : "border-white/20 text-transparent"
                        }`}>
                            <FiCheck size={14} />
                        </div>
                        <span className={`text-[15px] font-bold ${selected.includes(l) ? "text-white" : "text-ott-muted"}`}>{l}</span>
                    </div>
                ))}
            </div>

            <div className="pt-4">
                <button 
                    disabled={selected.length === 0}
                    onClick={() => navigate("/home")}
                    className={`w-full py-4 rounded-full font-bold text-[16px] transition-all ${
                        selected.length > 0 ? "bg-gradient-to-r from-ott-grad-start to-ott-grad-end text-white border-none shadow-md active:scale-95" : "bg-white/5 text-ott-muted cursor-not-allowed"
                    }`}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
