import Base64Image from "../../image/Base64Image";

/** 
 *  ## Miniatura mediana
 *  Este componente renderiza una imagen de miniatura de `2.25rem`.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `data`: Datos base 64.
 *  - [ `string` ] `alt`: Texto alternativo de la imagen.
 */ 
const ThumbNailMedium: (config: BaseImageComponent) => (React.JSX.Element) = ({
    data,
    alt = "",
}) => {

    return (
        <div className="rounded-full max-w-9 h-9">
            <Base64Image data={data} alt={alt} />
        </div>
    )
}

export default ThumbNailMedium;
