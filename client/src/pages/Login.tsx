import { useContext } from "react";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();
    if (!ctx) return null;

    const handleLogin = async (data: { email: string; password: string }) => {
        await ctx.login(data.email, data.password);
        navigate("/app");
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
            <AuthForm type="login" onSubmit={handleLogin} />
        </div>
    );
}
