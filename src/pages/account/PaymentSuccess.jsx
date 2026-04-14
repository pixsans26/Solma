import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiCheck, FiArrowRight } from "react-icons/fi";

export default function PaymentSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const plan = location.state?.plan || { name: "Premium" };

    return (
        <div className="bg-ott-bg min-h-screen text-white flex flex-col items-center justify-center p-6 text-center">
            {/* Added a subtle glow animation background */}
            <div className="absolute inset-0 bg-gradient-to-b from-ott-accent/20 via-transparent to-transparent pointer-events-none animate-pulse" />
            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)] animate-bounce relative z-10">
                <FiCheck size={48} className="text-white" />
            </div>
            
            <h1 className="text-[28px] font-bold mb-2">Payment Successful!</h1>
            <p className="text-ott-muted text-[15px] max-w-[280px] mb-8">
                Welcome to the <span className="text-white font-bold">{plan.name}</span> family. Your premium experience starts now.
            </p>

            <div className="bg-ott-card w-full rounded-[24px] p-6 border border-white/10 mb-8 space-y-4">
                <div className="flex justify-between text-[14px]">
                    <span className="text-ott-muted">Order ID</span>
                    <span className="font-mono">#OTT-88294-X</span>
                </div>
                <div className="flex justify-between text-[14px]">
                    <span className="text-ott-muted">Plan</span>
                    <span className="font-bold">{plan.name}</span>
                </div>
                <div className="flex justify-between text-[14px]">
                    <span className="text-ott-muted">Duration</span>
                    <span>1 Month</span>
                </div>
                <div className="h-[1px] bg-white/5" />
                <div className="flex justify-between text-[16px] font-bold text-ott-accent">
                    <span>Total Paid</span>
                    <span>{plan.price || "₹299"}</span>
                </div>
            </div>

            <button 
                onClick={() => navigate("/")}
                className="w-full bg-white text-black py-4 rounded-full font-bold text-[16px] flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
                Start Watching <FiArrowRight />
            </button>
        </div>
    );
}
