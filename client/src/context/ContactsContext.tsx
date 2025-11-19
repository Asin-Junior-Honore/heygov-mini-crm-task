import React, { createContext, useEffect, useState } from 'react';
import type { Contact } from '../types';
import { contactService } from '../services/contactService';

type ContactsContextType = {
    contacts: Contact[];
    reload: () => Promise<void>;
    search: (q: string) => Promise<void>;
    addContact: (payload: Partial<Contact>) => Promise<Contact | null>;
};

export const ContactsContext = createContext<ContactsContextType | null>(null);

export const ContactsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [contacts, setContacts] = useState<Contact[]>([]);

    const reload = async () => {
        const res = await contactService.list();
        setContacts(res.data);
    };

    const search = async (q: string) => {
        if (!q) return reload();
        const res = await contactService.search(q);
        setContacts(res.data);
    };

    const addContact = async (payload: Partial<Contact>) => {
        const res = await contactService.create(payload);
        setContacts(prev => [res.data, ...prev]);
        return res.data;
    };

    useEffect(() => {
        reload();
    }, []);

    return (
        <ContactsContext.Provider value={{ contacts, reload, search, addContact }}>
            {children}
        </ContactsContext.Provider>
    );
};
