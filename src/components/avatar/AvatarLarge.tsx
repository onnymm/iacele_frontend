import ThumbnailLarge from "../image/thumbnail/ThumbnailLarge";

/** 
 *  ## Avatar grande
 *  Este componente renderiza un avatar de usuario de `3rem`.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `data`: Datos base 64.
 *  - [ `string` ] `alt`: Texto alternativo de la imagen.
 *  - [ `boolean` ] `online`: Usuario activo.
 */ 
const AvatarLarge: (config: AvatarParams) => (React.JSX.Element) = ({
    data,
    online = false,
}) => {

    return (
        <div className="relative size-12">
            <div className={`${online ? "profile-image": ""} absolute rounded-full overflow-hidden size-12`}>
                <ThumbnailLarge data={data} />
            </div>
            {online &&
                <span className="absolute bg-green-500 w-full h-full profile-status-image"/>
            }
        </div>
    );
};

export default AvatarLarge;
