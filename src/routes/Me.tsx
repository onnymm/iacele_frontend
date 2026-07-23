import ViewDataContext from "@/contexts/routes/viewDataContext"
import useUserData from "@/hooks/app/useUserData";
import VIEW from "@/views/Views";
import { useMemo } from "react";

const Me = () => {

    // Obtención de la vista a renderizar
    const View = useMemo(
        () => (VIEW['base.users.me.form']),
        [],
    );

    // Obtención de los datos de usuario
    const { userData } = useUserData();

    return (
        <ViewDataContext.Provider value={{ viewDataName: 'base.users.me.form', recordId: userData['id'], display: 'screen' }}>
            <View.View />
        </ViewDataContext.Provider>
    );
};

export default Me;
