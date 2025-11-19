import { useState } from 'react';
import { FiEdit, FiSave, FiX } from 'react-icons/fi';
import type { Contact } from '../types';
import { contactService } from '../services/contactService';

export default function ContactCard({ contact }: { contact: Contact }) {
    const [editableContact, setEditableContact] = useState(contact);
    const [isEditing, setIsEditing] = useState(false);
    const [formValues, setFormValues] = useState({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        notes: contact.notes || ''
    });

    const displayNotes =
        formValues.notes && formValues.notes.trim() !== ''
            ? formValues.notes
            : editableContact.activities.length > 0
                ? editableContact.activities[0].notes
                : '';

    const createdAt = new Date(editableContact.createdAt);
    const updatedAt = new Date(editableContact.updatedAt);
    const contactUpdated = createdAt.getTime() !== updatedAt.getTime();

    const handleChange = (field: string, value: string) => {
        setFormValues(prev => ({ ...prev, [field]: value }));
    };

    const saveContact = async () => {
        try {
            const payload: Partial<Contact> = { ...formValues };
            const res = await contactService.update(editableContact._id, payload);
            setEditableContact(res.data);
            setIsEditing(false);
        } catch (err) {
            console.error('Failed to update contact', err);
        }
    };

    return (
        <div className="relative bg-linear-to-br from-white via-gray-50 to-gray-100 p-6 rounded-3xl shadow-md hover:shadow-2xl border-l-4 border-blue-600 transition-all group">
            {!isEditing && (
                <FiEdit
                    className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-blue-600 transition-opacity opacity-0 group-hover:opacity-100"
                    onClick={() => setIsEditing(true)}
                    size={20}
                />
            )}

            {isEditing && (
                <div className="absolute top-4 right-4 flex gap-2">
                    <FiSave
                        className="cursor-pointer text-green-600 hover:text-green-700 transition-colors"
                        onClick={saveContact}
                        size={20}
                    />
                    <FiX
                        className="cursor-pointer text-red-500 hover:text-red-600 transition-colors"
                        onClick={() => setIsEditing(false)}
                        size={20}
                    />
                </div>
            )}

            <div className="space-y-4">
                {/* Name */}
                <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    {isEditing ? (
                        <input
                            value={formValues.name}
                            onChange={e => handleChange('name', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                        />
                    ) : (
                        <p className="text-lg font-semibold text-gray-800 mt-1">{editableContact.name || '—'}</p>
                    )}
                </div>

                {/* Email & Phone*/}
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        {isEditing ? (
                            <input
                                value={formValues.email}
                                onChange={e => handleChange('email', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                            />
                        ) : (
                            <p className="text-gray-700 mt-1 break-all">{editableContact.email || '—'}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        {isEditing ? (
                            <input
                                value={formValues.phone}
                                onChange={e => handleChange('phone', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                            />
                        ) : (
                            <p className="text-gray-700 mt-1">{editableContact.phone || '—'}</p>
                        )}
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <label className="text-sm font-medium text-gray-500">Notes</label>
                    {isEditing ? (
                        <textarea
                            value={formValues.notes}
                            onChange={e => handleChange('notes', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mt-1 resize-none"
                        />
                    ) : (
                        <p className="text-gray-700 mt-1 text-sm">{displayNotes || 'No notes yet.'}</p>
                    )}
                </div>

                {/* Timestamps */}
                <div className="pt-2 border-t border-gray-200 text-xs text-gray-400">
                    <p>Created: {createdAt.toLocaleString()}</p>
                    {contactUpdated && <p>Updated: {updatedAt.toLocaleString()}</p>}
                </div>

                {/* Activities */}
                {editableContact.activities.length > 0 && (
                    <div className="pt-3 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Activities</h4>
                        <ul className="space-y-2">
                            {editableContact.activities.map(a => {
                                const activityTimestamp = new Date(a.timestamp);
                                const typeColor =
                                    a.type === 'call'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : a.type === 'email'
                                            ? 'bg-green-100 text-green-800'
                                            : a.type === 'meeting'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-gray-100 text-gray-700';

                                return (
                                    <li
                                        key={a._id}
                                        className={`flex justify-between items-start p-2 rounded-xl ${typeColor} text-xs`}
                                    >
                                        <div>
                                            <span className="font-semibold">[{a.type}]</span> {a.notes}
                                            <span className="block text-gray-500 text-[10px] mt-0.5">{activityTimestamp.toLocaleString()}</span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>


    );
}
