import { useMemo } from "react";
import usePagination from "../../hooks/usePagination";
import buildSmartPagination from "../functions/buildSmartPagination";
import ButtonIcon from "../ui/button/ButtonIcon";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import PageContainer from "./components/PagesContainer";
import InputNumeric from "../ui/input/InputNumeric";

interface PaginationParams<T extends number | undefined | ((page: number) => (number))> {
    count: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<T>>;
    itemsPerPage: number;
    disabled: boolean;
}

/** 
 *  ## Paginación
 *  Este componente renderiza un componente que crea un menú de acceso rápido
 *  de paginación dinámica para uso en vistas de datos paginadas.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `number` ] `count`: Conteo de páginas.
 *  - [ `number` ] `page`: Página actual.
 *  - [ `undefined` ] `setPage`: Función de cambio de página.
 *  - [ `number` ] `itemsPerPage`: Número de registros por página.
 *  - [ `boolean` ] `disabled`: Deshabilitado.
 */
const Pagination: (config: PaginationParams<number | ((page: number) => (number)) | undefined>) => (React.JSX.Element) = ({
    count,
    page,
    setPage,
    itemsPerPage,
    disabled,
}) => {

    // Obtención de arreglo de páginas y cantidad de páginas con respeto a
    //      número de registros por página
    const { pages, pagesQty } = useMemo(
        () => {
            // Cantidad de páginas
            const pagesQty = Math.trunc(count / itemsPerPage) + 1;

            // Obtención de arreglo de páginas desde 0 a pagesQty - 1
            const pages =  Array.from(
                { length: pagesQty },
                (_, i) => (i)
            );

            return { pages, pagesQty };
        }, [count, itemsPerPage]
    );

    // Obtención de páginas a mostrar desde la función de construcción
    //      inteligente
    const pagesToShow = useMemo(
        () => {
            return buildSmartPagination(pages, page);
        }, [pages, page]
    );

    // Obtención de funciones de cambio de página para control de cambios
    //      dentro del rango válido
    const { setPageIndex, increasePage, decreasePage } = usePagination(pages, setPage);

    // Declaración de función de cambio de página para uso óptimo de memoria
    const updatePage = (value: number) => setPage(value);

    return (
        <div className="flex flex-row flex-none items-center gap-2">
            {/* Botón de decremento de página */}
            <ButtonIcon type="primary" onClick={decreasePage} icon={ChevronLeftIcon} disabled={page === 0 || pages.length === 0 || disabled} />

            {/* Contenedor de acceso rápido de páginas */}
            <PageContainer pagesToShow={pagesToShow} page={page} setPageIndex={setPageIndex} disabled={disabled} />

            {/* Campo para ingresar página manualmente */}
            <div className="w-16">
                <InputNumeric value={page + 1} setValue={setPage} min={1} max={pagesQty} onEnter={updatePage} onBlur={updatePage} />
            </div>

            {/* Indicador de conteo total de páginas */}
            <span className="sm:hidden px-2 ui-text-none text-xl"> / {pagesQty}</span>

            {/* Botón de incremento de página */}
            <ButtonIcon type="primary" onClick={increasePage} icon={ChevronRightIcon} disabled={page === pages.length || pages.length === 0 || disabled} />
        </div>
    );
};

export default Pagination;
