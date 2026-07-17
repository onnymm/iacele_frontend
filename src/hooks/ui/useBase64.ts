import { useCallback } from "react";

const useBase64 = () => {

    // Inicialización de función para conversión a base64
    const convertToBase64 = useCallback(
        async (file: File): Promise<string> => {
            return new Promise(
                (resolve, reject) => {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = () => {
                        resolve(fileReader.result as string);
                    };
                    fileReader.onerror = (error) => {
                        reject(error);
                    };
                }
            );
        }, []
    );

    return { convertToBase64 };
};

export default useBase64;
