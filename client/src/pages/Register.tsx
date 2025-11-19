import { useContext } from "react";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();

    if (!ctx) return null;

    const handleRegister = (data: { username?: string; email: string; password: string }) => {
        if (!data.username) {
            alert("Username is required");
            return;
        }
        ctx.register(data.username, data.email, data.password).then(() => {
            navigate("/login");
        });
    };

    return (
        <div >
            <h2 className="text-2xl font-bold text-white mb-4">Create an Account</h2>
            <AuthForm type="register" onSubmit={handleRegister} />
        </div>
    );
}
