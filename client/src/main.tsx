import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ContactsProvider } from './context/ContactsContext';
import AuthProvider from './context/AuthContext.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ContactsProvider>
        <App />
      </ContactsProvider>
    </AuthProvider>
  </StrictMode>,
)
