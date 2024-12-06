import Base64Image from "../../image/Base64Image";

/** 
 *  ## Miniatura extragrande
 *  Este componente renderiza una imagen de miniatura de `4rem`.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `data`: Datos base 64.
 *  - [ `string` ] `alt`: Texto alternativo de la imagen.
 */ 
const ThumbnailExtralarge: (config: BaseImageComponent) => (React.JSX.Element) = ({
    data,
    alt = "",
}) => {

    return (
        <div className="rounded-full size-16">
            <Base64Image data={data} alt={alt} />
        </div>
    )
}

export default ThumbnailExtralarge;