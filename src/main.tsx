import { createRoot } from 'react-dom/client'
import AuthProvider from './providers/AuthProvider.tsx'
import Router from './router.tsx';
import { BrowserRouter } from 'react-router';
import ApplicationProvider from './providers/ApplicationProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <ApplicationProvider>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </ApplicationProvider>
    </AuthProvider>
);
