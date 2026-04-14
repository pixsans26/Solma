import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft, FiHelpCircle, FiChevronRight,
  FiMessageCircle, FiMail, FiPhone,
  FiChevronDown, FiChevronUp, FiBookOpen,
  FiAlertCircle, FiShield, FiArrowRight
} from "react-icons/fi";

const FAQS = [
  {
    q: "How do I change my subscription plan?",
    a: "Go to Profile → Manage Subscriptions. You can upgrade, downgrade or cancel your plan from there. Changes take effect at the start of the next billing cycle.",
  },
  {
    q: "Can I watch offline?",
    a: "Yes! Premium and Ultimate plan subscribers can download content for offline viewing. Go to a movie or series detail page and tap the Download button.",
  },
  {
    q: "How many devices can I use simultaneously?",
    a: "Basic: 1 device, Premium: 2 devices, Ultimate: 4 devices. You can manage your active devices from General Settings.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "Navigate to Profile → Manage Subscriptions → Manage Plan. You will find the cancellation option there. Your access continues until the end of your current billing period.",
  },
  {
    q: "Why isn't my video loading?",
    a: "Check your internet connection, try switching between Wi‑Fi and mobile data, or lower the video quality from the player settings. If the issue persists, contact support.",
  },
  {
    q: "How do I reset my password?",
    a: "Go to Profile → Edit Profile → Change Password. If you've forgotten your password, tap 'Forgot Password' on the login screen to receive a reset link.",
  },
];

const TOPICS = [
  { icon: <FiBookOpen />,    label: "Getting Started",   color: "bg-blue-500/10 text-blue-400"   },
  { icon: <FiAlertCircle />, label: "Billing & Payments", color: "bg-yellow-500/10 text-yellow-400" },
  { icon: <FiShield />,      label: "Account & Security", color: "bg-green-500/10 text-green-400"  },
  { icon: <FiHelpCircle />,  label: "Troubleshooting",   color: "bg-ott-accent/10 text-ott-accent" },
];

export default function HelpSupport() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chat, setChat] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = () => {
    if (!chat.trim()) return;
    setChatHistory([...chatHistory, { role: 'user', text: chat }]);
    setChat("");
    setTimeout(() => {
        setChatHistory(h => [...h, { role: 'bot', text: 'Our support agents are currently busy. Connecting you to the next available agent... Please hold on.' }]);
    }, 1000);
  };

  if (showChat) {
    return (
      <div className="bg-ott-bg min-h-screen text-white flex flex-col fixed inset-0 z-[6000]">
        <div className="bg-ott-bg/95 backdrop-blur-md border-b border-white/5 px-4 pt-12 pb-3 flex items-center gap-3">
          <button onClick={() => setShowChat(false)} className="w-9 h-9 rounded-full bg-ott-card border border-white/10 flex items-center justify-center">
            <FiArrowLeft className="text-white text-[17px]" />
          </button>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-ott-accent flex items-center justify-center font-bold text-[14px]">S</div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-ott-bg"></div>
            </div>
            <div>
              <p className="text-[14px] font-bold leading-tight">Solma Support</p>
              <p className="text-[10px] text-green-400 font-medium">Online</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <p className="text-center text-[10px] text-ott-muted uppercase tracking-widest my-2">Today</p>
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-ott-accent flex-shrink-0 flex items-center justify-center font-bold text-[10px]">S</div>
            <div className="bg-ott-card border border-white/5 rounded-2xl rounded-tl-sm p-3 max-w-[85%]">
              <p className="text-[13px] leading-relaxed">Hi there! I'm Solma's digital assistant. How can I help you today?</p>
            </div>
          </div>
          {chatHistory.map((m, i) => (
             <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                 <div className={`p-3 rounded-2xl max-w-[85%] ${m.role === 'user' ? 'bg-gradient-to-r from-ott-grad-start to-ott-grad-end text-white rounded-tr-sm shadow-md' : 'bg-ott-card border border-white/5 rounded-tl-sm'}`}>
                    <p className="text-[13px] leading-relaxed">{m.text}</p>
                 </div>
             </div>
          ))}
        </div>

        <div className="p-4 bg-ott-bg border-t border-white/5 flex gap-2 items-center pb-8">
            <input 
                type="text" 
                value={chat}
                onChange={(e) => setChat(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-ott-card border border-white/10 rounded-full px-4 py-3 text-[13px] outline-none focus:border-ott-accent/50"
            />
            <button 
                onClick={sendMessage}
                className="w-11 h-11 rounded-full bg-gradient-to-r from-ott-grad-start to-ott-grad-end flex flex-shrink-0 items-center justify-center text-white shadow-md active:scale-95"
            >
                <FiArrowRight size={18} />
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ott-bg min-h-screen text-white pb-[88px]">

      {/* ── Sticky header ─────────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-ott-bg/95 backdrop-blur-md border-b border-white/5 px-4 pt-12 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-ott-card border border-white/10 flex items-center justify-center"
          >
            <FiArrowLeft className="text-white text-[17px]" />
          </button>
          <h1 className="text-[18px] font-bold flex items-center gap-2">
            <FiHelpCircle className="text-ott-accent" /> Help & Support
          </h1>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-6">

        {/* ── Hero / Contact banner ──────────────────────────── */}
        <div className="relative bg-gradient-to-br from-ott-accent/20 via-[#2a0050]/60 to-ott-card rounded-3xl border border-ott-accent/20 p-5 overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-ott-accent/10 blur-2xl pointer-events-none" />
          <p className="text-[15px] font-bold mb-1">We're here to help 👋</p>
          <p className="text-ott-muted text-[12px] leading-relaxed mb-4">
            Browse FAQs below or reach out to our support team. We typically respond within 2 hours.
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowChat(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-ott-grad-start to-ott-grad-end text-white border-none py-2.5 rounded-2xl text-[13px] font-bold shadow-md active:scale-95 transition-transform"
            >
              <FiMessageCircle className="text-[14px]" /> Live Chat
            </button>
            <a
              href="mailto:support@ottapp.com"
              className="flex-1 flex items-center justify-center gap-2 bg-ott-card border border-white/10 text-white py-2.5 rounded-2xl text-[13px] font-semibold active:scale-95 transition-transform"
            >
              <FiMail className="text-ott-accent text-[14px]" /> Email Us
            </a>
          </div>
        </div>

        {/* ── Quick topic tiles ─────────────────────────────────── */}
        <div>
          <p className="text-ott-muted text-[11px] font-semibold uppercase tracking-widest mb-3 px-1">Browse Topics</p>
          <div className="grid grid-cols-2 gap-3">
            {TOPICS.map((t) => (
              <button
                key={t.label}
                className="flex items-center gap-3 bg-ott-card border border-white/5 rounded-2xl p-4 active:scale-[0.97] transition-transform text-left"
              >
                <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-[17px] ${t.color}`}>
                  {t.icon}
                </div>
                <span className="text-[13px] font-medium text-white leading-tight">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── FAQs ─────────────────────────────────────────────── */}
        <div>
          <p className="text-ott-muted text-[11px] font-semibold uppercase tracking-widest mb-3 px-1">Frequently Asked</p>
          <div className="space-y-2.5">
            {FAQS.map((item, i) => (
              <div
                key={i}
                className={`bg-ott-card rounded-2xl border overflow-hidden transition-all ${
                  open === i ? "border-ott-accent/30" : "border-white/5"
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start justify-between p-4 text-left gap-2"
                >
                  <span className="text-[13px] font-semibold text-white leading-snug flex-1">{item.q}</span>
                  {open === i
                    ? <FiChevronUp className="text-ott-accent text-[16px] shrink-0 mt-0.5" />
                    : <FiChevronDown className="text-ott-muted text-[16px] shrink-0 mt-0.5" />
                  }
                </button>
                {open === i && (
                  <div className="px-4 pb-4 text-ott-muted text-[12px] leading-relaxed border-t border-white/5 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Contact Options ───────────────────────────────────── */}
        <div>
          <p className="text-ott-muted text-[11px] font-semibold uppercase tracking-widest mb-3 px-1">Contact Us</p>
          <div className="space-y-2.5">
            {[
              { icon: <FiPhone />,          label: "Call Support",  sub: "Mon–Sat, 9am–6pm",   color: "bg-green-500/10 text-green-400" },
              { icon: <FiMail />,           label: "Email Support", sub: "support@ottapp.com", color: "bg-blue-500/10 text-blue-400"   },
              { icon: <FiMessageCircle />,  label: "Live Chat",     sub: "Usually < 5 min",    color: "bg-ott-accent/10 text-ott-accent", onClick: () => setShowChat(true) },
            ].map((c) => (
              <button
                key={c.label}
                onClick={c.onClick}
                className="w-full flex items-center justify-between p-4 bg-ott-card rounded-2xl border border-white/5 active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-[17px] ${c.color}`}>
                    {c.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-white text-[13px] font-semibold">{c.label}</p>
                    <p className="text-ott-muted text-[11px]">{c.sub}</p>
                  </div>
                </div>
                <FiChevronRight className="text-ott-muted text-[17px]" />
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-ott-muted/50 text-[11px] pb-2">OTT App · Support v1.0</p>
      </div>
    </div>
  );
}
