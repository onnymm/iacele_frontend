import { createRoot } from 'react-dom/client'
import AuthProvider from './providers/AuthProvider.tsx'
import ApplicationProvider from './providers/ApplicationProvider.tsx';
import Root from './Root.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <ApplicationProvider>
            <Root />
        </ApplicationProvider>
        <Toaster className='bg-card' closeButton theme='system' />
    </AuthProvider>
);
