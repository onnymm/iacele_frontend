import Base64Image from "../Base64Image";

/** 
 *  ## Miniatura grande
 *  Este componente renderiza una imagen de miniatura de `3rem`.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `data`: Datos base 64.
 *  - [ `string` ] `alt`: Texto alternativo de la imagen.
 */ 
const ThumbnailLarge: (config: BaseImageComponent) => (React.JSX.Element) = ({
    data,
    alt = "",
}) => {

    return (
        <div className="rounded-full max-w-12 h-12 overflow-hidden">
            <Base64Image data={data} alt={alt} />
        </div>
    )
}

export default ThumbnailLarge;