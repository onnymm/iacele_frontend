import ThumbNailSmall from "../image/thumbnail/ThumbnailSmall";

/** 
 *  ## Avatar chico
 *  Este componente renderiza un avatar de usuario de `1.5rem`.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `data`: Datos base 64.
 *  - [ `string` ] `alt`: Texto alternativo de la imagen.
 *  - [ `boolean` ] `online`: Usuario activo.
 */ 
const AvatarSmall: (config: AvatarParams) => (React.JSX.Element) = ({
    data,
    online = false,
}) => {

    return (
        <div className="relative size-6">
            <div className={`${online ? "profile-image": ""} absolute rounded-full overflow-hidden size-6`}>
                <ThumbNailSmall data={data} />
            </div>
            {online &&
                <span className="absolute bg-green-500 w-full h-full profile-status-image"/>
            }
        </div>
    );
};

export default AvatarSmall;
