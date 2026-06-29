import VIEW from "./Views"

const useView = (viewName: keyof (typeof VIEW)) => {

    // Obtención de la función a usar para renderizar
    const View = VIEW[viewName];

    return { View };
};

export default useView;
