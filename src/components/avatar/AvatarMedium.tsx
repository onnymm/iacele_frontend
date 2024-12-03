import ThumbNailMedium from "../image/thumbnail/ThumbnailMedium";
import { AvatarParams } from "../types";

/** 
 *  ## Avatar mediano
 *  Este componente renderiza un avatar de usuario de `2.25rem`.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `data`: Datos base 64.
 *  - [ `string` ] `alt`: Texto alternativo de la imagen.
 *  - [ `boolean` ] `online`: Usuario activo.
 */ 
const AvatarMedium: (config: AvatarParams) => (React.JSX.Element) = ({
    data,
    online = false,
}) => {

    return (
        <div className="relative size-9">
            <div className={`${online ? "profile-image": ""} absolute rounded-full overflow-hidden size-9`}>
                <ThumbNailMedium data={data} />
            </div>
            {online &&
                <span className="absolute bg-green-500 w-full h-full profile-status-image"/>
            }
        </div>
    )
}

export default AvatarMedium;
