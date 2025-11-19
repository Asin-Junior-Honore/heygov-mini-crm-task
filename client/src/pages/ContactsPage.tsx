import { useContext } from "react";
import AddContactModal from "../components/AddContactModal";
import AssistantChat from "../components/AssistantChat";
import ContactList from "../components/ContactList";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface ContactsPageProps {
    demoMode?: boolean;
}

export default function ContactsPage({ demoMode }: ContactsPageProps) {
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        ctx?.logout();
        navigate("/");
    };

    return (
        <div className="max-w-6xl mx-auto lg:p-6 space-y-8">
            <div className="flex items-center justify-between text-white">
                <div>
                    {ctx?.user?.username ? `Hello, ${ctx.user.username}` : "Hello!"}
                </div>
                {ctx?.user && (
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-all"
                    >
                        Logout
                    </button>
                )}
            </div>

            {/* Demo Mode Alert */}
            {demoMode && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-sm">
                    <p className="font-semibold">Demo Mode Data will not be saved to your account.</p>
                </div>
            )}

            {/* AI Contact Section */}
            <section >
                <h2 className="text-2xl font-bold text-white mb-4">Add Contacts with AI</h2>
                <AssistantChat />
            </section>

            {/* Manual Contact Section */}
            <section >
                <h2 className="text-2xl font-bold text-white mb-4">Add Contacts Manually</h2>
                <AddContactModal />
            </section>

            {/* Divider */}
            <hr className="border-gray-300 my-4" />

            {/* Search & Contacts */}
            <section className="space-y-6">
                <SearchBar />
                <ContactList />
            </section>
        </div>

    );
}
