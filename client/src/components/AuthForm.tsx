import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Props {
    type: "login" | "register";
    onSubmit: (data: { username?: string; email: string; password: string }) => void;
}

export default function AuthForm({ type, onSubmit }: Props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ username, email, password });
            }}
            className="auth-form bg-white p-8 rounded-2xl shadow-lg border border-gray-100 w-full max-w-sm mx-auto"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {type === "login" ? "Welcome Back" : "Create Account"}
            </h2>

            <div className="space-y-4">
                {type === "register" && (
                    <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                        <FaUser className="text-gray-400" />
                        <input
                            placeholder="Full username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="flex-1 outline-none bg-transparent"
                        />
                    </div>
                )}

                <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                    <FaEnvelope className="text-gray-400" />
                    <input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 outline-none bg-transparent"
                    />
                </div>

                <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                    <FaLock className="text-gray-400" />
                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="flex-1 outline-none bg-transparent"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                >
                    {type === "login" ? "Login" : "Create Account"}
                </button>

                <small className="text-gray-600 mt-2 block text-center">
                    {type === "login" ? (
                        <>
                            Don't have an account?{" "}
                            <Link className="text-blue-600 hover:underline" to="/register">
                                Create Account
                            </Link>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <Link className="text-blue-600 hover:underline" to="/login">
                                Login
                            </Link>
                        </>
                    )}
                </small>
            </div>

            <Link to="/" className="w-full block mt-5 bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
            >
                Home
            </Link>
        </form>
    );
}
