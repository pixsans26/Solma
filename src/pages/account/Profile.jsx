import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiChevronRight, FiCreditCard, FiDownload,
  FiSettings, FiHelpCircle, FiLogOut,
  FiEdit2, FiBookmark, FiCheckCircle, FiZap, FiShoppingBag,
} from "react-icons/fi";

// ─── Simulated user state ────────────────────────────────────────────────────
const USER = {
  name: "Nitish Tao",
  email: "nitish.tao@solma.com",
  plan: "Premium",           // null = no plan
  planExpiry: "May 14, 2026",
  planColor: "from-ott-grad-start to-ott-grad-end",
};

export default function Profile() {
  const navigate = useNavigate();

  const listItems = [
    { icon: <FiShoppingBag />, label: "My Library",           to: "/library"       },
    { icon: <FiCreditCard />, label: "Manage Subscriptions", to: "/subscriptions" },
    { icon: <FiDownload />,   label: "Downloads",            to: "/downloads"     },
    { icon: <FiSettings />,   label: "General Settings",     to: "/settings"      },
    { icon: <FiHelpCircle />, label: "Help & Support",       to: "/help"          },
    { icon: <FiLogOut />,     label: "Logout",               to: "/login", color: "text-red-400" },
  ];

  return (
    <div className="bg-ott-bg min-h-screen text-white pb-[88px]">

      {/* ── Hero / Avatar Section ─────────────────────────────── */}
      <div className="relative bg-gradient-to-b from-[#1e0a2e] via-ott-accent/5 to-transparent p-[52px_16px_24px_16px] flex flex-col items-center w-full overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-ott-accent/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#6400fb]/10 blur-2xl pointer-events-none" />

        {/* Avatar */}
        <div className="relative mb-3">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" 
            alt={USER.name}
            className="w-[88px] h-[88px] rounded-full object-cover border-[3px] border-white/10 shadow-[0_0_30px_rgba(231,31,105,0.35)]"
          />
          {/* Camera edit dot */}
          <button
            onClick={() => navigate("/edit-profile")}
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-ott-accent flex items-center justify-center border-2 border-ott-bg shadow-lg"
          >
            <FiEdit2 className="text-white text-[11px]" />
          </button>
        </div>

        <h1 className="text-[20px] font-bold mb-0.5">{USER.name}</h1>
        <p className="text-[13px] text-ott-muted mb-4">{USER.email}</p>

        {/* ── Subscription Badge ───────────────────────────────── */}
        {USER.plan ? (
          <div
            onClick={() => navigate("/subscriptions")}
            className={`flex items-center gap-2 bg-gradient-to-r ${USER.planColor} px-4 py-2 rounded-full cursor-pointer mb-5 shadow-[0_0_18px_rgba(231,31,105,0.4)] active:scale-95 transition-transform`}
          >
            <FiZap className="text-white text-[13px]" />
            <span className="text-white text-[13px] font-bold">{USER.plan} Plan</span>
            <span className="text-white/70 text-[11px]">· Active</span>
            <FiCheckCircle className="text-white text-[13px] ml-0.5" />
          </div>
        ) : (
          <div
            onClick={() => navigate("/subscriptions")}
            className="flex items-center gap-2 bg-ott-card border border-ott-accent/40 px-4 py-2 rounded-full cursor-pointer mb-5 active:scale-95 transition-transform"
          >
            <FiCreditCard className="text-ott-accent text-[13px]" />
            <span className="text-ott-accent text-[13px] font-semibold">No Active Plan</span>
            <span className="text-ott-muted text-[11px]">· Upgrade Now →</span>
          </div>
        )}

        {/* Expiry note */}
        {USER.plan && (
          <p className="text-ott-muted text-[11px] mb-5 -mt-3">
            Renews on <span className="text-white font-semibold">{USER.planExpiry}</span>
          </p>
        )}

        {/* ── Quick Action Buttons ─────────────────────────────── */}
        <div className="flex gap-3 w-full justify-center">
          <button
            onClick={() => navigate("/edit-profile")}
            className="flex-1 max-w-[140px] flex items-center justify-center gap-2 bg-ott-card text-white border-[1.5px] border-white/10 rounded-full py-2.5 text-[13px] font-semibold cursor-pointer active:scale-95 transition-transform hover:border-ott-accent/40"
          >
            <FiEdit2 className="text-ott-accent text-[14px]" />
            Edit Profile
          </button>
          <button
            onClick={() => navigate("/watchlist")}
            className="flex-1 max-w-[140px] flex items-center justify-center gap-2 bg-ott-card text-white border-[1.5px] border-white/10 rounded-full py-2.5 text-[13px] font-semibold cursor-pointer active:scale-95 transition-transform hover:border-ott-accent/40"
          >
            <FiBookmark className="text-ott-accent text-[14px]" />
            My Watchlist
          </button>
        </div>
      </div>

      {/* ── Stats Row ────────────────────────────────────────────── */}
      <div className="flex gap-3 px-4 mb-5">
        {[
          { label: "Watched",   value: "148" },
          { label: "Watchlist", value: "23"  },
          { label: "Downloads", value: "9"   },
        ].map((s) => (
          <div
            key={s.label}
            className="flex-1 bg-ott-card rounded-2xl border border-white/5 py-3 flex flex-col items-center gap-0.5"
          >
            <span className="text-white text-[18px] font-bold">{s.value}</span>
            <span className="text-ott-muted text-[11px]">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Menu List ────────────────────────────────────────────── */}
      <div className="w-full px-4">
        <p className="text-ott-muted text-[11px] font-semibold uppercase tracking-widest mb-3 px-1">Account</p>
        <div className="flex flex-col gap-2.5">
          {listItems.map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.to)}
              className="w-full flex items-center justify-between p-[14px_14px] bg-ott-card rounded-2xl border-[1.5px] border-white/5 cursor-pointer active:scale-[0.98] transition-transform text-left"
            >
              <div className="flex items-center gap-[14px]">
                <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-[17px] ${item.color ? "bg-red-500/10 text-red-400" : "bg-ott-accent/10 text-ott-accent"}`}>
                  {item.icon}
                </div>
                <span className={`text-[14px] font-medium ${item.color || "text-white"}`}>
                  {item.label}
                </span>
              </div>
              <FiChevronRight className="text-ott-muted text-[17px]" />
            </button>
          ))}
        </div>

        {/* App version */}
        <p className="text-center text-ott-muted/50 text-[11px] mt-8">v1.0.0 · OTT App</p>
      </div>
    </div>
  );
}
