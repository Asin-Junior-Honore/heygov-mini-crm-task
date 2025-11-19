import React, { useState, useContext } from 'react';
import { ContactsContext } from '../context/ContactsContext';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar() {
    const ctx = useContext(ContactsContext);
    const [q, setQ] = useState('');

    const onSearch = async (e?: React.FormEvent) => {
        e?.preventDefault();
        await ctx?.search(q);
    };

    return (
        <form onSubmit={onSearch} className="max-w-2xl mx-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
            {/* Search input */}
            <div className="relative w-full">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    placeholder="Search by name, email, notes..."
                    className="w-full text-white pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all shadow-sm hover:shadow-md"
                />
            </div>

            {/* Search button */}
            <button
                type="submit"
                className="w-full sm:w-auto bg-linear-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg"
                disabled={!q.trim()}
            >
                Search
            </button>
        </form>

    );
}
