import { createContext } from "react";

interface FormContextParams {
    canCreate: boolean;
    canDelete: boolean;
    viewReadonly: boolean;
};

const IndividualRecordViewContext = createContext<FormContextParams>({
    canCreate: true,
    canDelete: true,
    viewReadonly: false,
});

export default IndividualRecordViewContext;
