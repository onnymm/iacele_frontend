import React, { useContext, useEffect, useRef } from "react"
import { AppContext } from "../../../contexts/appContext";
import useClickOutside from "../../../hooks/useClickOutside";
import ButtonCloseSidebar from "../base_interface_components/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import ButtonLockSidebar from "../base_interface_components/ButtonLockSidebar";
import SidebarContent from "./SidebarContent";
import { sidebarWidth } from "../../../settings/appSettings";
import useBreakpoint from "../../../hooks/useBreakpoint";

const Sidebar: () => (React.JSX.Element) = (() => {

    // Inicialición de referencia de la barra lateral
    const sidebarRef = useRef<HTMLElement>(null)
    // Obtención del estado de barra lateral desde el contexto
    const { isSidebarLocked, setIsSidebarLocked, isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);

    const { isOverThereshold } = useBreakpoint(sidebarWidth);

    // Función para cerrar la barra lateral cuando se detecta un clic por fuera
    const handleClickOutside: () => (void) = () => {

        // Si la barra lateral no está bloqueada o si el umbral de pantalla 
        if ( !isSidebarLocked || !isOverThereshold ) {
            setIsSidebarOpen(false);
            setIsSidebarLocked(false);
        }
    }

    useEffect(
        () => {
            if ( isOverThereshold) return;
            setIsSidebarLocked(false);
            setIsSidebarOpen(false);
        }, [isOverThereshold, setIsSidebarLocked, setIsSidebarOpen]
    )

    // Manejo de clic fuera del componente
    useClickOutside(sidebarRef, handleClickOutside);

    return (
        // Contenedor de toda la interacción con la barra lateral
        <div id="sidebar-section" className="top-0 z-20 absolute w-screen h-full text-gray-300 pointer-events-none">

            {/* Elemento que oscurece la vista de la aplicación cuando la barra lateral se muestra */}
            <div className={`${isSidebarOpen && !isSidebarLocked ? "opacity-20 pointer-events-auto": "opacity-0"} absolute transition-opacity bg-black w-screen h-full`}/>

            <aside ref={sidebarRef} className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-[288px]'} gap-2 px-4 py-4 lg:px-6 bg-[#162230] flex flex-col absolute w-72 pointer-events-auto transition duration-300 h-full`}>

                {/* Encabezado de barra lateral */}
                <div className="flex flex-row justify-between w-full h-14 sm:h-12">
                    <h1>iaCele</h1>
                    <div className={`${isSidebarLocked ? "opacity-0 pointer-events-none" : "opacity-100"} transition-opacity size-14 sm:size-12`}>
                        <ButtonCloseSidebar icon={ArrowLeftIcon} callback={() => setIsSidebarOpen(false)} />
                    </div>
                </div>

                {/* Menú de barra lateral */}
                <SidebarContent />

                {/* Pie de barra lateral */}
                <div className="flex justify-end h-12 sm:h-10">
                    <ButtonLockSidebar />
                </div>

            </aside>
        </div>
    );
});

export default React.memo(Sidebar);
