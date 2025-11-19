import api from './api';
import type { Contact } from '../types';

export const contactService = {
    create: (payload: Partial<Contact>) => api.post<Contact>('/contacts', payload),
    list: () => api.get<Contact[]>('/contacts'),
    get: (id: string) => api.get<Contact>(`/contacts/${id}`),
    update: (id: string, payload: Partial<Contact>) => api.put<Contact>(`/contacts/${id}`, payload),
    addActivity: (id: string, payload: { type: string; notes?: string; timestamp?: string }) =>
        api.post<Contact>(`/contacts/${id}/activity`, payload),
    search: (q: string) => api.get<Contact[]>('/contacts/search', { params: { q } })
};
