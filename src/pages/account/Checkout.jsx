import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCreditCard, FiLock, FiCheckCircle } from "react-icons/fi";

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const plan = location.state?.plan || { name: "Premium", price: "₹299/mo" };

    const handlePay = () => {
        // Mock payment delay
        setTimeout(() => {
            navigate("/payment-success", { state: { plan } });
        }, 1500);
    };

    return (
        <div className="bg-ott-bg min-h-screen text-white p-4">
            <div className="flex items-center gap-3 mb-6">
                <button onClick={() => navigate(-1)} className="p-2 bg-ott-card rounded-full border border-white/10">
                    <FiArrowLeft />
                </button>
                <h1 className="text-[18px] font-bold">Checkout</h1>
            </div>

            <div className="bg-ott-card rounded-[24px] p-6 border border-white/10 mb-6">
                <span className="text-ott-muted text-[12px] uppercase tracking-wider font-bold">Selected Plan</span>
                <div className="flex justify-between items-end mt-2">
                    <h2 className="text-[24px] font-bold">{plan.name} Plan</h2>
                    <span className="text-ott-accent text-[20px] font-bold">{plan.price}</span>
                </div>
                <div className="h-[1px] bg-white/5 my-4" />
                <ul className="space-y-3">
                    {plan.features?.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-[13px] text-ott-muted">
                            <FiCheckCircle className="text-ott-accent" /> {f}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="space-y-4">
                <h3 className="text-[15px] font-bold ml-1">Payment Method</h3>
                <div className="bg-ott-accent/10 border border-ott-accent p-5 rounded-[24px] flex items-center justify-between shadow-ott-glow/20">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-ott-accent flex items-center justify-center text-white shadow-lg">
                            <FiCreditCard size={24} />
                        </div>
                        <div>
                            <p className="text-[15px] font-bold">Credit / Debit Card</p>
                            <p className="text-[12px] text-ott-muted">Visa ending in 4242</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-8 left-4 right-4 max-w-[448px] mx-auto">
                <div className="flex items-center justify-center gap-2 mb-4 text-ott-muted text-[11px]">
                    <FiLock /> Secure encrypted payment
                </div>
                <button 
                    onClick={handlePay}
                    className="w-full bg-ott-accent text-white py-4 rounded-full font-bold text-[16px] shadow-ott-glow active:scale-[0.98] transition-all"
                >
                    Pay {plan.price.split('/')[0]} Now
                </button>
            </div>
        </div>
    );
}
