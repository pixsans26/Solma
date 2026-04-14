import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiBell, FiSettings, FiCheckCircle, FiInfo, FiTag } from "react-icons/fi";

const notifications = [
    {
        id: 1,
        type: 'offer',
        title: "50% Off Annual Subscription!",
        desc: "Upgrade today and get access to all premium movies and series at half the price. Limited time offer.",
        time: "2 hours ago",
        read: false,
        icon: <FiTag className="text-amber-500" />
    },
    {
        id: 2,
        type: 'new_release',
        title: "New Arrival: Spider-Man",
        desc: "Spider-Man: Across the Spider-Verse is now available to rent or buy.",
        time: "5 hours ago",
        read: false,
        icon: <FiBell className="text-ott-accent" />
    },
    {
        id: 3,
        type: 'account',
        title: "Login detected on new device",
        desc: "We noticed a new login from an Apple iPhone in Mumbai. If this wasn't you, secure your account.",
        time: "Yesterday",
        read: true,
        icon: <FiInfo className="text-blue-500" />
    },
    {
        id: 4,
        type: 'success',
        title: "Payment Successful",
        desc: "Your rental for John Wick: Chapter 4 was successful. Enjoy watching!",
        time: "2 days ago",
        read: true,
        icon: <FiCheckCircle className="text-green-500" />
    }
];

export default function Notifications() {
    const navigate = useNavigate();

    return (
        <div className="bg-ott-bg min-h-screen text-white pb-[88px]">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-ott-bg/95 backdrop-blur-md border-b border-white/5 px-4 pt-12 pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-9 h-9 rounded-full bg-ott-card border border-white/10 flex items-center justify-center"
                        >
                            <FiArrowLeft className="text-[17px]" />
                        </button>
                        <h1 className="text-[18px] font-bold">Notifications</h1>
                    </div>
                    <button className="text-ott-accent text-[12px] font-bold">
                        Mark all as read
                    </button>
                </div>
            </div>

            <div className="px-4 py-4 space-y-3">
                {notifications.map((notif) => (
                    <div 
                        key={notif.id} 
                        className={`p-4 rounded-2xl border transition-all active:scale-[0.98] ${
                            notif.read ? 'bg-ott-card border-white/5 opacity-70' : 'bg-ott-accent/5 border-ott-accent/20'
                        }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                {notif.icon}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`text-[14px] font-bold ${!notif.read ? 'text-white' : 'text-ott-muted'}`}>{notif.title}</h3>
                                    {!notif.read && <span className="w-2 h-2 rounded-full bg-ott-accent shrink-0 mt-1 ml-2" />}
                                </div>
                                <p className="text-[12px] text-ott-muted leading-relaxed line-clamp-2 pr-2">{notif.desc}</p>
                                <p className="text-[10px] text-ott-muted/60 mt-2">{notif.time}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {notifications.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-32 text-ott-muted">
                    <FiBell className="text-[48px] opacity-20 mb-4" />
                    <p className="text-[14px]">No notifications yet</p>
                </div>
            )}
        </div>
    );
}
