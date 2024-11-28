import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { RouterProvider } from 'react-router'
import router from './router.tsx'
import AuthProvider from './security/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <RouterProvider router={router}/>
    </AuthProvider>,
)
