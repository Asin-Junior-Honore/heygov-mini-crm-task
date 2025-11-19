import api from './api';

export const assistantService = {
    ask: (query: string) => api.post('/assistant', { query })
};
