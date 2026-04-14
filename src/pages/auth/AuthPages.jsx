import React from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiSmartphone, FiArrowRight } from "react-icons/fi";
import { FaGoogle, FaApple } from "react-icons/fa";

export function Login() {
    const navigate = useNavigate();
    return (
        <div className="bg-ott-bg min-h-screen text-white p-8 flex flex-col justify-center animate-in fade-in duration-500">
            <div className="mb-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-ott-grad-start to-ott-grad-end rounded-2xl flex items-center justify-center shadow-ott-glow mx-auto mb-6">
                    <span className="text-white text-[24px] font-bold">S</span>
                </div>
                <h1 className="text-[28px] font-bold tracking-tight">Welcome Back</h1>
                <p className="text-ott-muted text-[14px] mt-1">Sign in to continue your premium experience</p>
            </div>

            <div className="space-y-4 max-w-[360px] mx-auto w-full">
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ott-muted group-focus-within:text-ott-accent transition-colors">
                        <FiMail size={18} />
                    </div>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full bg-ott-card border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[14px] outline-none focus:border-ott-accent/50 focus:bg-ott-card/80 transition-all"
                    />
                </div>

                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ott-muted group-focus-within:text-ott-accent transition-colors">
                        <FiLock size={18} />
                    </div>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full bg-ott-card border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[14px] outline-none focus:border-ott-accent/50 focus:bg-ott-card/80 transition-all"
                    />
                </div>

                <div className="flex justify-end">
                    <button className="text-[12px] font-bold text-ott-accent hover:text-white transition-colors">Forgot Password?</button>
                </div>

                <button 
                    onClick={() => navigate("/otp")}
                    className="w-full py-4 bg-gradient-to-r from-ott-grad-start to-ott-grad-end text-white border-none rounded-full font-bold text-[16px] shadow-md active:scale-95 transition-all mt-4"
                >
                    Login
                </button>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/5"></div>
                    </div>
                    <div className="relative flex justify-center text-[11px] uppercase tracking-widest text-ott-muted transition-all">
                        <span className="bg-ott-bg px-4">Or sign in with</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all active:scale-95">
                        <FaGoogle size={18} />
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all active:scale-95">
                        <FaApple size={20} />
                    </button>
                </div>

                <p className="text-center text-[13px] text-ott-muted mt-8">
                    Don't have an account? 
                    <button onClick={() => navigate("/signup")} className="text-ott-accent font-bold ml-1 hover:underline">Sign Up</button>
                </p>
                
                <div className="text-center mt-2">
                    <button onClick={() => navigate("/otp")} className="text-[12px] text-ott-muted font-bold hover:text-white transition-colors">Login with Mobile Number</button>
                </div>
            </div>
        </div>
    );
}

export function Signup() {
    const navigate = useNavigate();
    return (
        <div className="bg-ott-bg min-h-screen text-white p-8 flex flex-col justify-center animate-in fade-in duration-500">
            <div className="mb-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-ott-grad-start to-ott-grad-end rounded-2xl flex items-center justify-center shadow-ott-glow mx-auto mb-6">
                    <span className="text-white text-[24px] font-bold">S</span>
                </div>
                <h1 className="text-[28px] font-bold tracking-tight">Create Account</h1>
                <p className="text-ott-muted text-[14px] mt-1">Join Solma Didi Tv for ultimate entertainment</p>
            </div>

            <div className="space-y-4 max-w-[360px] mx-auto w-full">
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ott-muted group-focus-within:text-ott-accent transition-colors">
                        <FiMail size={18} />
                    </div>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full bg-ott-card border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[14px] outline-none focus:border-ott-accent/50 focus:bg-ott-card/80 transition-all"
                    />
                </div>

                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ott-muted group-focus-within:text-ott-accent transition-colors">
                        <FiLock size={18} />
                    </div>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full bg-ott-card border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[14px] outline-none focus:border-ott-accent/50 focus:bg-ott-card/80 transition-all"
                    />
                </div>

                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ott-muted group-focus-within:text-ott-accent transition-colors">
                        <FiSmartphone size={18} />
                    </div>
                    <input 
                        type="tel" 
                        placeholder="Mobile Number" 
                        className="w-full bg-ott-card border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[14px] outline-none focus:border-ott-accent/50 focus:bg-ott-card/80 transition-all"
                    />
                </div>

                <button 
                    onClick={() => navigate("/otp")}
                    className="w-full py-4 bg-gradient-to-r from-ott-grad-start to-ott-grad-end text-white border-none rounded-full font-bold text-[16px] shadow-md active:scale-95 transition-all mt-6"
                >
                    Create Account
                </button>

                <p className="text-center text-[13px] text-ott-muted mt-8">
                    Already have an account? 
                    <button onClick={() => navigate("/login")} className="text-ott-accent font-bold ml-1 hover:underline">Sign In</button>
                </p>

                <p className="text-center text-[10px] text-ott-muted px-4 leading-relaxed mt-4">
                    By continuing, you agree to Solma Didi Tv's <span className="underline">Terms of Service</span> & <span className="underline">Privacy Policy</span>.
                </p>
            </div>
        </div>
    );
}

export function OTP() {
    const navigate = useNavigate();
    return (
        <div className="bg-ott-bg min-h-screen text-white p-8 flex flex-col justify-center animate-in fade-in duration-500">
            <div className="mb-10 text-center">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FiSmartphone size={32} className="text-ott-accent" />
                </div>
                <h1 className="text-[28px] font-bold tracking-tight">OTP Verification</h1>
                <p className="text-ott-muted text-[14px] mt-1">Enter the code sent to +91 98*** **210</p>
            </div>

            <div className="max-w-[360px] mx-auto w-full">
                <div className="flex justify-between gap-3 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                        <input 
                            key={i}
                            type="text" 
                            maxLength={1}
                            className="w-16 h-16 bg-ott-card border border-white/10 rounded-2xl text-center text-[24px] font-bold outline-none focus:border-ott-accent/50 focus:bg-ott-card/80 transition-all"
                            defaultValue={i === 1 ? "4" : i === 2 ? "2" : ""}
                        />
                    ))}
                </div>

                <p className="text-center text-[13px] mb-8">
                    <span className="text-ott-muted">Didn't receive code? </span>
                    <button className="text-ott-accent font-bold hover:underline">Resend in 35s</button>
                </p>

                <button 
                    onClick={() => navigate("/content-preferences")}
                    className="w-full py-4 bg-gradient-to-r from-ott-grad-start to-ott-grad-end text-white border-none rounded-full font-bold text-[16px] shadow-md active:scale-95 transition-all"
                >
                    Verify & Proceed
                </button>

                <button 
                    onClick={() => navigate("/login")}
                    className="w-full py-4 bg-white/5 border border-white/10 rounded-full font-bold text-[14px] active:scale-95 transition-all mt-4"
                >
                    Change Number
                </button>
            </div>
        </div>
    );
}
