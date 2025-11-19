import { useContext } from 'react';
import { ContactsContext } from '../context/ContactsContext';
import ContactCard from './ContactCard';

export default function ContactList() {
    const ctx = useContext(ContactsContext);
    const contacts = ctx?.contacts || [];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:p-6">
            {contacts.map(contact => (
                <ContactCard key={contact._id} contact={contact} />
            ))}
        </div>

    );
}
