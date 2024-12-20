import { BeakerIcon, Cog6ToothIcon, HomeIcon, SparklesIcon, UserIcon } from "@heroicons/react/24/outline"

// Delimitador de ancho de pantalla en pixeles
export const screenWidthThereshold = 768

// Ancho de sidebar
export const sidebarWidth = 640

// Menú de la barra lateral
export const sidebarMenu: MenuSection[] = [
    {
        name: 'Menú',
        groups: [
            {
                name: 'Inicio',
                icon: HomeIcon,
                routes: [
                    {
                        name: 'Mis comisiones',
                        route: '/commissions',
                    },
                ]
            },
            {
                name: 'Mi espacio',
                icon: SparklesIcon,
                routes: [
                    {
                        name: 'Actividades',
                        route: '/todo',
                    }
                ]
            },
            {
                name: 'Mi cuenta',
                icon: UserIcon,
                routes: '/me',
            },
        ]
    },
    {
        name: 'Configuración',
        groups: [
            {
                name: 'Preferencias',
                icon: Cog6ToothIcon,
                routes: '/settings',
            }
        ]
    },
    {
        name: 'Experimental',
        groups: [
            {
                name: 'UI-Tests',
                icon: BeakerIcon,
                routes: '/uitests',
            }
        ]
    }
]

// Mensajes y leyendas
export const COMMON_LEGEND = {
    NO_RECORDS_MESSAGE: "No hay registros.",
    CELL_RENDER_ERROR: 'N/A',
}
