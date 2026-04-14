import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft, FiEdit2, FiUser, FiMail, FiPhone,
  FiCalendar, FiCamera, FiCheck,
} from "react-icons/fi";

const INIT = {
  name: "Nitish Tao",
  email: "nitish.tao@solma.com",
  phone: "+91 98765 43210",
  dob: "1998-06-15",
  gender: "Male",
};

export default function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INIT);
  const [saved, setSaved] = useState(false);

  const handle = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = () => {
    setSaved(true);
    setTimeout(() => { setSaved(false); navigate("/profile"); }, 1200);
  };

  return (
    <div className="bg-ott-bg min-h-screen text-white pb-[88px]">

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-ott-bg/95 backdrop-blur-md border-b border-white/5 px-4 pt-12 pb-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-ott-card border border-white/10 flex items-center justify-center hover:border-ott-accent/40 transition-colors"
        >
          <FiArrowLeft className="text-white text-[17px]" />
        </button>
        <h1 className="text-[18px] font-bold flex-1">Edit Profile</h1>
        <button
          onClick={save}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold transition-all active:scale-95 ${
            saved
              ? "bg-green-500 text-white"
              : "bg-gradient-to-r from-ott-grad-start to-ott-grad-end text-white"
          }`}
        >
          {saved ? <><FiCheck /> Saved</> : "Save"}
        </button>
      </div>

      {/* ── Avatar ───────────────────────────────────────────────── */}
      <div className="flex flex-col items-center py-8 gap-3">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" 
            alt={form.name}
            className="w-[96px] h-[96px] rounded-full object-cover border-[3px] border-white/10 shadow-[0_0_30px_rgba(231,31,105,0.35)]"
          />
          <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-ott-accent flex items-center justify-center border-2 border-ott-bg shadow-lg active:scale-90 transition-transform">
            <FiCamera className="text-white text-[13px]" />
          </button>
        </div>
        <p className="text-ott-muted text-[12px]">Tap camera to change photo</p>
      </div>

      {/* ── Form ─────────────────────────────────────────────────── */}
      <div className="px-4 space-y-4">

        <Section label="Personal Info">
          <Field icon={<FiUser />} label="Full Name" value={form.name} onChange={handle("name")} placeholder="Your full name" />
          <Field icon={<FiMail />} label="Email" value={form.email} onChange={handle("email")} placeholder="Email address" type="email" />
          <Field icon={<FiPhone />} label="Phone" value={form.phone} onChange={handle("phone")} placeholder="Phone number" type="tel" />
          <Field icon={<FiCalendar />} label="Date of Birth" value={form.dob} onChange={handle("dob")} type="date" />
          <div className="bg-ott-card rounded-2xl border border-white/5 px-4 py-3">
            <p className="text-ott-muted text-[11px] mb-1.5">Gender</p>
            <div className="flex gap-2">
              {["Male", "Female", "Other"].map((g) => (
                <button
                  key={g}
                  onClick={() => setForm((f) => ({ ...f, gender: g }))}
                  className={`flex-1 py-2 rounded-xl text-[13px] font-medium transition-all border ${
                    form.gender === g
                      ? "bg-ott-accent/20 border-ott-accent text-ott-accent"
                      : "bg-ott-bg border-white/10 text-ott-muted"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </Section>


        {/* Save button */}
        <button
          onClick={save}
          className={`w-full py-3.5 rounded-2xl font-bold text-[16px] transition-all active:scale-95 ${
            saved
              ? "bg-green-500 text-white"
              : "bg-gradient-to-r from-ott-grad-start to-ott-grad-end text-white shadow-[0_4px_20px_rgba(231,31,105,0.35)]"
          }`}
        >
          {saved ? "✓ Profile Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────────── */
function Section({ label, children }) {
  return (
    <div>
      <p className="text-ott-muted text-[11px] font-semibold uppercase tracking-widest mb-2.5 px-1">{label}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ icon, label, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="bg-ott-card rounded-2xl border border-white/5 px-4 py-3">
      <p className="text-ott-muted text-[11px] mb-1.5 flex items-center gap-1.5">
        <span className="text-ott-accent text-[13px]">{icon}</span>
        {label}
      </p>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-white text-[14px] font-medium outline-none placeholder:text-ott-muted/50"
      />
    </div>
  );
}
