import ToggleDarkMode from "../../ui/toggle/ToggleDarkMode";
import NavbarProfile from "./NavbarProfile";
import ButtonSidebarMenu from "../base_interface_components/ButtonSidebarMenu";

/** 
 *  ## Barra superior de interfaz base
 *  Este componente renderiza la barra superior de la interfaz de la aplicación.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const Navbar: () => (React.JSX.Element) = () => {

    return (
        <nav className="top-0 z-10 sticky flex flex-row justify-between bg-white dark:bg-[#1f2f3f] shadow w-full h-20 transition select-none">
            <div className="flex flex-row justify-between items-center px-4 w-72 h-full">
                <h1>iaCele</h1>
                <ButtonSidebarMenu />
            </div>
            <div className="flex flex-row gap-4 px-4 w-min h-full">
                <div className="flex flex-row items-center h-full">
                    <ToggleDarkMode />
                </div>
                <NavbarProfile />
            </div>
        </nav>
    )
}

export default Navbar;
