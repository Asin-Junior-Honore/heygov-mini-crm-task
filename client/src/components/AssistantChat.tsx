import { useState, useContext } from 'react';
import { assistantService } from '../services/assistantService';
import { ContactsContext } from '../context/ContactsContext';

export default function AssistantChat() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const ctx = useContext(ContactsContext);

    const ask = async () => {
        if (!query) return;
        setLoading(true);
        try {
            const res = await assistantService.ask(query);
            if (res.data && res.data.contact) {
                await ctx?.reload();
            } else {
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setQuery('');
        }
    };

    return (
        <div className="p-6 bg-white rounded-2xl max-w-2xl mx-auto shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">AI Assistant</h3>
            <textarea
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Tell the assistant about your meeting, and we'll extract the contacts automatically..."
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none h-32 resize-none transition-all"
            />

            <button
                onClick={ask}
                disabled={loading}
                className="mt-4 w-full bg-linear-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </span>
                ) : (
                    "Send to AI"
                )}
            </button>
        </div>
    );

}
