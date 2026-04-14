import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUser, FiLock, FiCreditCard, FiTrash2, FiPlus, FiEye, FiEyeOff } from "react-icons/fi";

export function PersonalInfo() {
    const navigate = useNavigate();
    return (
        <div className="bg-ott-bg min-h-screen text-white p-4">
            <div className="flex items-center gap-3 mb-8 mt-2">
                <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-ott-card border border-white/10 flex items-center justify-center">
                    <FiArrowLeft />
                </button>
                <h1 className="text-[18px] font-bold">Personal Information</h1>
            </div>

            <div className="space-y-4">
                {[
                    { label: "Full Name", value: "Nitish Tao" },
                    { label: "Email Address", value: "nitish.tao@solma.com" },
                    { label: "Phone Number", value: "+91 98765 43210" },
                    { label: "Gender", value: "Male" },
                    { label: "Date of Birth", value: "14 April 1995" }
                ].map((item, i) => (
                    <div key={i} className="bg-ott-card p-4 rounded-[22px] border border-white/5">
                        <p className="text-ott-muted text-[11px] uppercase tracking-wider font-bold mb-1">{item.label}</p>
                        <p className="text-[15px] font-semibold">{item.value}</p>
                    </div>
                ))}
            </div>

            <button className="w-full mt-8 py-4 bg-gradient-to-r from-ott-grad-start to-ott-grad-end text-white border-none rounded-full font-bold text-[14px] shadow-md active:scale-95 transition-all">
                Edit Information
            </button>
        </div>
    );
}

export function Security() {
    const navigate = useNavigate();
    return (
        <div className="bg-ott-bg min-h-screen text-white p-4">
            <div className="flex items-center gap-3 mb-8 mt-2">
                <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-ott-card border border-white/10 flex items-center justify-center">
                    <FiArrowLeft />
                </button>
                <h1 className="text-[18px] font-bold">Password & Security</h1>
            </div>

            <div className="space-y-4">
                <div className="bg-ott-card p-5 rounded-[24px] border border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                            <FiLock />
                        </div>
                        <h2 className="text-[15px] font-bold">Change Password</h2>
                    </div>
                    <button 
                        onClick={() => navigate('/settings/update-password')}
                        className="w-full py-3 bg-gradient-to-r from-ott-grad-start to-ott-grad-end text-white border-none rounded-full text-[13px] font-bold shadow-md active:scale-95 transition-all"
                    >
                        Update Password
                    </button>
                </div>

                <div className="bg-ott-card p-5 rounded-[24px] border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-ott-accent/10 text-ott-accent flex items-center justify-center">
                                <FiLock />
                            </div>
                            <div>
                                <h2 className="text-[15px] font-bold">2-Step Verification</h2>
                                <p className="text-ott-muted text-[11px]">Secure your account with OTP</p>
                            </div>
                        </div>
                        <div className="w-10 h-5 bg-ott-accent rounded-full relative">
                            <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function PaymentMethods() {
    const navigate = useNavigate();
    return (
        <div className="bg-ott-bg min-h-screen text-white p-4">
            <div className="flex items-center gap-3 mb-8 mt-2">
                <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-ott-card border border-white/10 flex items-center justify-center">
                    <FiArrowLeft />
                </button>
                <h1 className="text-[18px] font-bold">Payment Methods</h1>
            </div>

            <div className="space-y-4 mb-8">
                <div className="relative p-6 rounded-[28px] bg-gradient-to-br from-[#1e1e26] to-[#2d2d39] border border-white/10 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-6 opacity-20">
                         <FiCreditCard size={100} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[12px] opacity-60 uppercase tracking-widest font-bold mb-8">Primary Card</p>
                        <div className="flex gap-4 mb-4">
                            <span className="text-[18px] font-mono tracking-widest">••••</span>
                            <span className="text-[18px] font-mono tracking-widest">••••</span>
                            <span className="text-[18px] font-mono tracking-widest">••••</span>
                            <span className="text-[18px] font-mono tracking-widest">4242</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] opacity-50 uppercase font-bold">Card Holder</p>
                                <p className="text-[13px] font-bold">NITISH TAO</p>
                            </div>
                            <div>
                                <p className="text-[10px] opacity-50 uppercase font-bold text-right">Expires</p>
                                <p className="text-[13px] font-bold text-right">08/26</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <button className="w-full py-4 bg-white/5 border border-white/10 rounded-full flex items-center justify-center gap-2 text-[14px] font-bold">
                    <FiPlus /> Add New Method
                </button>
                <button className="w-full py-4 text-red-500 font-bold text-[14px] flex items-center justify-center gap-2">
                    <FiTrash2 /> Remove Current Card
                </button>
            </div>
        </div>
    );
}

export function Language() {
    const navigate = useNavigate();
    const [selected, setSelected] = React.useState("English (US)");
    const languages = [
        "English (US)", "English (UK)", "Hindi", "Punjabi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada", "Malayalam"
    ];

    return (
        <div className="bg-ott-bg min-h-screen text-white p-4">
            <div className="flex items-center gap-3 mb-8 mt-2">
                <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-ott-card border border-white/10 flex items-center justify-center">
                    <FiArrowLeft />
                </button>
                <h1 className="text-[18px] font-bold">App Language</h1>
            </div>

            <div className="bg-ott-card rounded-[24px] border border-white/5 overflow-hidden">
                {languages.map((lang, i) => (
                    <div 
                        key={lang} 
                        onClick={() => setSelected(lang)}
                        className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${i !== languages.length - 1 ? "border-b border-white/5" : ""} ${selected === lang ? "bg-ott-accent/5" : "active:bg-white/5"}`}
                    >
                        <span className={`text-[15px] ${selected === lang ? "text-white font-bold" : "text-ott-muted font-medium"}`}>{lang}</span>
                        {selected === lang && (
                            <div className="w-5 h-5 rounded-full bg-ott-accent flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button 
                onClick={() => navigate(-1)}
                className="w-full mt-8 py-4 bg-gradient-to-r from-ott-grad-start to-ott-grad-end text-white border-none rounded-full font-bold text-[14px] shadow-md active:scale-95 transition-all"
            >
                Confirm Language
            </button>
        </div>
    );
}
export function UpdatePassword() {
    const navigate = useNavigate();
    const [form, setForm] = React.useState({ current: '', next: '', confirm: '' });
    const [saved, setSaved] = React.useState(false);
    const [showCurrent, setShowCurrent] = React.useState(false);
    const [showNext, setShowNext] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);

    const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

    // Password strength
    const strength = (() => {
        const p = form.next;
        if (!p) return 0;
        let s = 0;
        if (p.length >= 8) s++;
        if (/[A-Z]/.test(p)) s++;
        if (/[0-9]/.test(p)) s++;
        if (/[^A-Za-z0-9]/.test(p)) s++;
        return s;
    })();
    const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
    const strengthColor = ['', '#ef4444', '#f59e0b', '#22c55e', '#10b981'][strength];

    const save = () => {
        if (!form.current || !form.next || form.next !== form.confirm) return;
        setSaved(true);
        setTimeout(() => { setSaved(false); navigate('/settings/security'); }, 1400);
    };

    return (
        <div className="bg-ott-bg min-h-screen text-white pb-[88px]">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-ott-bg/95 backdrop-blur-md border-b border-white/5 px-4 pt-12 pb-3 flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="w-9 h-9 rounded-full bg-ott-card border border-white/10 flex items-center justify-center"
                >
                    <FiArrowLeft className="text-[17px]" />
                </button>
                <h1 className="text-[18px] font-bold flex-1">Update Password</h1>
            </div>

            <div className="px-4 py-8 space-y-4">
                {/* Illustration */}
                <div className="flex flex-col items-center py-6 gap-3 mb-2">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ott-grad-start to-ott-grad-end flex items-center justify-center shadow-ott-glow">
                        <FiLock className="text-white text-[34px]" />
                    </div>
                    <p className="text-ott-muted text-[13px] text-center">Create a strong password to keep<br/>your account secure</p>
                </div>

                {/* Current Password */}
                <div className="bg-ott-card rounded-2xl border border-white/5 px-4 py-3">
                    <p className="text-ott-muted text-[11px] mb-1.5 flex items-center gap-1.5">
                        <FiLock className="text-ott-accent text-[13px]" /> Current Password
                    </p>
                    <div className="flex items-center gap-2">
                        <input
                            type={showCurrent ? 'text' : 'password'}
                            value={form.current}
                            onChange={handle('current')}
                            placeholder="Enter current password"
                            className="flex-1 bg-transparent text-white text-[14px] font-medium outline-none placeholder:text-ott-muted/50"
                        />
                        <button onClick={() => setShowCurrent(v => !v)} className="text-ott-muted text-[13px] p-1">
                            {showCurrent ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div className="bg-ott-card rounded-2xl border border-white/5 px-4 py-3">
                    <p className="text-ott-muted text-[11px] mb-1.5 flex items-center gap-1.5">
                        <FiLock className="text-ott-accent text-[13px]" /> New Password
                    </p>
                    <div className="flex items-center gap-2">
                        <input
                            type={showNext ? 'text' : 'password'}
                            value={form.next}
                            onChange={handle('next')}
                            placeholder="Enter new password"
                            className="flex-1 bg-transparent text-white text-[14px] font-medium outline-none placeholder:text-ott-muted/50"
                        />
                        <button onClick={() => setShowNext(v => !v)} className="text-ott-muted text-[13px] p-1">
                            {showNext ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                    {/* Strength bar */}
                    {form.next.length > 0 && (
                        <div className="mt-2 space-y-1">
                            <div className="flex gap-1">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="flex-1 h-1 rounded-full transition-all" style={{ background: i <= strength ? strengthColor : 'rgba(255,255,255,0.1)' }} />
                                ))}
                            </div>
                            <p className="text-[10px] font-semibold" style={{ color: strengthColor }}>{strengthLabel}</p>
                        </div>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="bg-ott-card rounded-2xl border border-white/5 px-4 py-3">
                    <p className="text-ott-muted text-[11px] mb-1.5 flex items-center gap-1.5">
                        <FiLock className="text-ott-accent text-[13px]" /> Confirm Password
                    </p>
                    <div className="flex items-center gap-2">
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            value={form.confirm}
                            onChange={handle('confirm')}
                            placeholder="Re-enter new password"
                            className="flex-1 bg-transparent text-white text-[14px] font-medium outline-none placeholder:text-ott-muted/50"
                        />
                        <button onClick={() => setShowConfirm(v => !v)} className="text-ott-muted text-[13px] p-1">
                            {showConfirm ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                    {form.confirm && form.next !== form.confirm && (
                        <p className="text-red-400 text-[10px] mt-1">Passwords do not match</p>
                    )}
                    {form.confirm && form.next === form.confirm && form.next && (
                        <p className="text-green-400 text-[10px] mt-1">✓ Passwords match</p>
                    )}
                </div>

                {/* Tips */}
                <div className="bg-ott-accent/5 border border-ott-accent/15 rounded-2xl p-4 space-y-1.5">
                    <p className="text-ott-accent text-[12px] font-bold mb-2">Password Tips</p>
                    {['At least 8 characters long', 'Include uppercase and lowercase letters', 'Add numbers and special characters'].map((t, i) => (
                        <p key={i} className="text-ott-muted text-[11px] flex items-center gap-2">
                            <span className="text-ott-accent">•</span> {t}
                        </p>
                    ))}
                </div>

                {/* Save Button */}
                <button
                    onClick={save}
                    className={`w-full py-4 rounded-full font-bold text-[15px] transition-all active:scale-95 ${
                        saved
                        ? 'bg-green-500 text-white'
                        : 'bg-gradient-to-r from-ott-grad-start to-ott-grad-end text-white border-none shadow-md'
                    }`}
                >
                    {saved ? '✓ Password Updated!' : 'Update Password'}
                </button>
            </div>
        </div>
    );
}
