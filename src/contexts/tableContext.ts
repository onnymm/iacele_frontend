import { createContext } from "react";

interface TableContextParams {
    [key: string]: number | null;
}

export const TableContext = createContext<TableContextParams>({});
