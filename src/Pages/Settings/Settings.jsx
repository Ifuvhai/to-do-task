import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Settings = () => {
  const { user, handleGoogleSignIn, handleSignOut } = useContext(AuthContext);
  const [syncEnabled, setSyncEnabled] = useState(false);

  const handleGoogleAuth = async () => {
    if (user) {
      await handleSignOut(); // Disconnect Google account
    } else {
      await handleGoogleSignIn(); // Connect Google account
    }
  };

  const handleSyncToggle = () => {
    setSyncEnabled(!syncEnabled);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Settings</h2>

      {user ? (
        <div className="mb-6 p-4 border rounded-lg text-center">
          <h3 className="text-xl font-semibold">Profile</h3>
          <img 
            src={user.photoURL || "https://via.placeholder.com/100"} 
            alt="User Profile" 
            className="w-16 h-16 mx-auto rounded-full mt-2"
          />
          <p className="mt-2"><strong>Name:</strong> {user.displayName || "N/A"}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p className="text-red-500 text-center">You are not logged in.</p>
      )}

      <div className="mb-6 p-4 border rounded-lg text-center">
        <h3 className="text-xl font-semibold">Google Account</h3>
        <button
          onClick={handleGoogleAuth}
          className={`mt-2 px-4 py-2 rounded text-white ${
            user ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {user ? "Disconnect Google Account" : "Connect Google Account"}
        </button>
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <h3 className="text-xl font-semibold">Google Calendar Sync</h3>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={syncEnabled} onChange={handleSyncToggle} />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600">
            <div
              className={`absolute w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                syncEnabled ? "translate-x-5" : "translate-x-1"
              }`}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Settings;
