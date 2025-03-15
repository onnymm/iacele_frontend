import usePagination from "../../hooks/usePagination"; // eslint-disable-line
import Pagination from "../pagination/Pagination"; // eslint-disable-line

/** 
 *  ## Paginación inteligente
 *  Esta función construye la estructura de índices de página para utilizarse
 *  en el componente {@link Pagination} para búsqueda y/o visualización de 
 *  datos por paginación. Los datos de entrada son obtenidos desde el Custom
 *  Hook {@link usePagination}
 *  
 *  ### Ejemplo
 *  Si la cantidad de páginas es de 25 (`0` a `24`) y la página actual está
 *  entre `0` y `3` esta función retornará el siguiente arreglo:
 *  ```
 *  [0, 1, 2, 3, 4, '>', 24]
 *  ```
 *  ...mostrando las primeras páginas y el acceso a la última.
 *  
 *  Por otro lado, si la página actual está entre entre `21` y `24`, la función
 *  retornará el siguiente arreglo:
 *  ```
 *  [0, '<', 20, 21, 22, 23, 24]
 *  ```
 *  
 *  Finalmente, si la página actual está entre `4` y `20`, la función retornará
 *  el siguiente arreglo:
 *  ```
 *  [0, '<', currentPosition - 1, currentPosition, currentPosition + 1, '>', 24]
 *  ```
 *  
 *  Nótese que los valores `'<'` y `'>'` serán renderizados como íconos de
 *  elipse que no accesan a ninguna página.
 */ 

const buildSmartPagination = (
    pages: number[],
    currentPosition: number
): ( (number | string)[] ) => {

    // Se retorna la matriz original si su tamaño es muy pequeño
    if ( pages.length <= 7 ) return pages;

    // Matriz a retornar
    const pagesToShow = [];
    
    // Validación de si la posición actual es superior o igual a 4
    const isSuperior = pages.slice(0, currentPosition).length >= 4;
    // Validación de si la posición actual es inferior a los últimes índices
    const isInferior = pages.slice(currentPosition + 1, pages.length).length >= 4;

    // Lista truncada en ambos extremos
    if ( isSuperior && isInferior ) {
        pagesToShow.push(0, "<", currentPosition - 1, currentPosition, currentPosition + 1, ">", pages.length - 1);
    // Lista truncada en el extremo superior
    } else if ( isSuperior ) {
        pagesToShow.push(0, "<", pages.length - 5, pages.length - 4, pages.length - 3, pages.length - 2, pages.length - 1);
    // Lista truncada en el extremo inferior
    } else {
        pagesToShow.push(0, 1, 2, 3, 4, ">", pages.length - 1);
    }

    // Retorno de la matriz de selección de páginas
    return pagesToShow;
};

export default buildSmartPagination;
