import { Link } from "react-router-dom";
import { FiInfo } from "react-icons/fi";

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <h1 className="text-4xl font-bold text-gray-800 text-center">
                Welcome to <span className="text-blue-600">HeyGov Mini CRM</span>
            </h1>
            <p className="text-gray-100 text-lg text-center">
                Choose how you want to use the app
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mt-6">
                {/* Demo / No Auth */}
                <div className="relative group">
                    <Link to="/demo">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                            Use App (No Auth)
                            <FiInfo className="text-white/70 group-hover:text-white transition-colors" />
                        </button>
                    </Link>
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
                transition-opacity bg-gray-800 text-white text-sm px-3 py-1 rounded-lg shadow-lg w-56 text-center
                pointer-events-none">
                        Demo mode: view public data only. No personal data stored.
                    </div>
                </div>

                {/* Auth / With Account */}
                <div className="relative group">
                    <Link to="/login">
                        <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                            Use App With Auth
                            <FiInfo className="text-white/70 group-hover:text-white transition-colors" />
                        </button>
                    </Link>
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
                transition-opacity bg-gray-800 text-white text-sm px-3 py-1 rounded-lg shadow-lg w-56 text-center
                pointer-events-none">
                        Auth mode: use your own data, track interactions, and full CRM features.
                    </div>
                </div>
            </div>
        </div>
    );
}
