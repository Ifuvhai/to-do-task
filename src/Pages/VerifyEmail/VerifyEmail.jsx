import { useState } from "react";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationCode: code }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Verification Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Verify Your Email
        </h2>

        {message && <p className="text-green-500 text-center">{message}</p>}

        <form onSubmit={handleVerify} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="text" placeholder="Enter Code" value={code} onChange={(e) => setCode(e.target.value)} required />

          <button type="submit">
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
