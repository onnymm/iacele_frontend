import ThumbnailExtralarge from "../image/thumbnail/ThumbnailExtralarge";
import { AvatarParams } from "../types";

/** 
 *  ## Avatar extragrande
 *  Este componente renderiza un avatar de usuario de `4rem`.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `data`: Datos base 64.
 *  - [ `string` ] `alt`: Texto alternativo de la imagen.
 *  - [ `boolean` ] `online`: Usuario activo.
 */ 
const AvatarExtralarge: (config: AvatarParams) => (React.JSX.Element) = ({
    data,
    online = false,
}) => {

    return (
        <div className="relative size-6">
            <div className={`${online ? "profile-image": ""} absolute rounded-full overflow-hidden size-6`}>
                <ThumbnailExtralarge data={data} />
            </div>
            {online &&
                <span className="absolute bg-green-500 w-full h-full profile-status-image"/>
            }
        </div>
    )
}

export default AvatarExtralarge;
