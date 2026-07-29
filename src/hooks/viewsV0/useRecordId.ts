import { useMemo } from "react";
import { useSearchParams } from "react-router";

const useRecordId = () => {

    // Obtención de parámetros de query
    const [ searchParams ] = useSearchParams();
    // Obtención de la ID de registro
    const recordId = useMemo(
        () => {
            return Number( searchParams.get('id') );
        }, [searchParams]
    );

    return { recordId };
};

export default useRecordId;
