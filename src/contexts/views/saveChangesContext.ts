import { createContext } from "react";

interface SaveChangesContextParams {
    saveChanges: () => Promise<void>;
};

const SaveChangesContext = createContext<SaveChangesContextParams>({
    saveChanges: async () => {},
});

export default SaveChangesContext;
