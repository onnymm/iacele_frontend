import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import PageButton from "./pageButton";
import buildSmartPagination from "../../functions/buildSmartPagination"; // eslint-disable-line
import Pagination from "../Pagination"; // eslint-disable-line
import usePagination from "../../../hooks/usePagination"; // eslint-disable-line

interface PageContainerParams {
    pagesToShow: (number | string)[];
    page: number;
    setPageIndex: (page: number | string) => (void);
    disabled: boolean;
}

/** 
 *  ## Contenedor de páginas
 *  Este componente renderiza un contenedor de acceso a páginas para 
 *  visualización de datos, utilizado en el componente {@link Pagination}.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `number | string)[]` ] `pagesToShow`: Arreglo de páginas a
 *  mostrar, obtenido desde la función {@link buildSmartPagination}.
 *  - [ `number` ] `page`: Página actual.
 *  - [ `undefined` ] `setPageIndex`: Función de cambio de estado de página,
 *  obtenida desde el Custom Hook {@link usePagination}.
 */ 
const PageContainer: (config: PageContainerParams) => (React.JSX.Element) = ({
    pagesToShow,
    page,
    setPageIndex,
    disabled
}) => {

    return (
        <div className="relative sm:flex hidden">

            {/* Botón de página */}
            <div className="flex">
                {
                    pagesToShow.map(
                        (page_i) => (
                            <PageButton value={page_i} callback={() => setPageIndex(page_i)} disabled={disabled} key={page_i} />
                        )
                    )
                }
            </div>

            {/* Indicador de página */}
            <div
                className="absolute bg-main-500 shadow-sm rounded-xl transition-transform duration-300 size-10"
                style={{
                    transform: `translateX( calc(${pagesToShow.indexOf(page) !== -1 ? pagesToShow.indexOf(page) : 0} * 2.5rem) )`
                }}
            />

            {/* Contenedores de números */}
            <div className="absolute flex pointer-events-none">
                {
                    pagesToShow.length !== 0
                        ? pagesToShow.map(
                            (pageToShow, index) => (
                                <div
                                    className={`${pageToShow === page ? "text-white" : ""} ${disabled ? "text-gray-500/50 dark:text-gray-300/50" : ""} transition duration-200 flex text-sm size-10 justify-center items-center dark:text-white`}
                                    key={index}
                                >
                                    {typeof pageToShow === "number" ? pageToShow + 1 : <EllipsisHorizontalIcon className="size-4" />}
                                </div>
                            )
                        )
                        : <div className="flex justify-center items-center text-sm text-white dark:text-white transition duration-200 size-10">
                            1
                        </div>
                }
            </div>

        </div>
    )
}

export default PageContainer;
