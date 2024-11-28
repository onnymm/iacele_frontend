/**
 *  ## Obtención de la URL del backend
 *  Esta función facilita el manejo de la creación de rutas a partir de la URL
 *  del backend. La ruta debe contener los símbolos `/` al inicio y al final de
 *  ésta. En caso contrario se mostrará un error en consola indicando la
 *  ausencia de éstos.
 *  
 *  ### Uso:
 *  ```ts
 *  getBackendURL("/home/")
 *  // www.backenddomain.com/home/
 *  ```
 *  
 *  ### Parámetros de entrada:
 *  - [ `string` ] `route`: Ruta a contatenar con la URL base.
 */ 
const getBackendUrl: (route: string) => (string) = ( route ) => {

    if ( !/\/.*\//.test(route) ) {
        throw SyntaxError("La ruta proporcionada debe contener diagonales al inicio y al final");
    }

    const apiHost = import.meta.env.VITE_API;

    return `${apiHost}${route}`;
};

export default getBackendUrl;
