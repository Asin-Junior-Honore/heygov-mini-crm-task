import { useState, useContext } from 'react';
import { ContactsContext } from '../context/ContactsContext';

export default function AddContactModal() {
    const ctx = useContext(ContactsContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');

    const create = async () => {
        if (!name && !email) {
            alert('Provide name or email');
            return;
        }

        await ctx?.addContact({
            name,
            email,
            phone,
            notes
        });

        setName('');
        setEmail('');
        setPhone('');
        setNotes('');
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Add New Contact</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                        placeholder="Enter full name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    />
                </div>

                {/* Email */}
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        placeholder="email@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    />
                </div>

                {/* Phone */}
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    />
                </div>

                {/* Notes */}
                <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea
                        placeholder="Add any relevant notes..."
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none h-28 resize-none"
                    />
                </div>
            </div>

            {/* Button */}
            <button
                onClick={create}
                className="mt-4 w-full bg-linear-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
                Add Contact
            </button>
        </div>

    );

}
