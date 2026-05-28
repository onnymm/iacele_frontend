import { createRoot } from 'react-dom/client'
import AuthProvider from './providers/AuthProvider.tsx'
import Router from './router.tsx';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </AuthProvider>
);
