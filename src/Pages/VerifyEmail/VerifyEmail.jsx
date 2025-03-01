import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const VerifyOtp = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const email = localStorage.getItem("email");

    useEffect(() => {
        if (!email) {
            navigate("/login");
        }
    }, [email, navigate]);

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        
        if (!otp.trim() || otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:3000/verify-otp", {
                email,
                code: Number(otp), 
            });

            if (response.data.message.includes("OTP verified")) {
                alert("✅ OTP Verified!");
                navigate("/");
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || "Something went wrong. Try again.";
            setError(errorMessage);

            if (errorMessage.toLowerCase().includes("expired") || errorMessage.toLowerCase().includes("not found")) {
                localStorage.removeItem("email"); 
                setTimeout(() => navigate("/login"), 2000);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center">Verify OTP</h2>
                <p className="text-center text-gray-600 mb-4">Enter the OTP sent to your email.</p>

                <form onSubmit={handleVerifyOtp}>
                    <input
                        type="text"
                        maxLength="6"
                        className="w-full px-4 py-2 border rounded-md mb-4 text-center tracking-widest"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))} // Prevents non-numeric input
                        required
                    />

                    {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

                    <button
                        type="submit"
                        className={`w-full text-white py-2 rounded-md transition ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;
