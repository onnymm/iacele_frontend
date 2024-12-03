import { BaseImageComponent } from "../types";

/** 
 *  ## Imagen base 64
 *  Este componente renderiza una imagen a partir de datos base 64
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `data`: Datos base 64.
 *  - [ `string` ] `alt`: Texto alternativo de la imagen.
 */ 
const Base64Image: (config: BaseImageComponent) => (React.JSX.Element) = ({
    data,
    alt = "",
}) => {

    return (
        <img src={`data:image/jpeg;base64,${data}`} alt={alt} />
    )
}

export default Base64Image;
