import { useContext } from "react";
import { images } from "../../../_data/test";
import { UserContext } from "../../../contexts/userContext";
import AvatarLarge from "../../avatar/AvatarLarge";

/** 
 *  ## Sección de perfil en barra superior
 *  Este componente renderiza la sección del perfil del usuario que se
 *  visualiza en la barra superior de la interfaz base.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const NavbarProfile: () => (React.JSX.Element) = () => {

    // Obtención de los datos de perfil del usuario actual
    const currentUser = useContext(UserContext);

    return (
        <div className="flex flex-row items-center gap-2 w-max h-full">
            <div>
                <p className="justify-end font-semibold text-end text-sm">{currentUser.name}</p>
                <p className="text-end text-gray-400 text-xs">{currentUser.user}</p>
            </div>
            <AvatarLarge data={images.cat} alt="Profile" online={true} />
        </div>
    );
};

export default NavbarProfile;
