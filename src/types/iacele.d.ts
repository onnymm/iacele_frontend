// Datos estructurados de la aplicación, objetos, componentes y UI
declare namespace IACele {

    // Tipos de dato provenientes del backend
    declare namespace Types {
        // Entero
        type Integer = number | undefined;
        // Cadena de texto
        type Char = string | undefined;
        // Flotante
        type Float = number | undefined;
        // Monetario
        type Monetary = number | undefined;
        // Porcentaje
        type Percentage = number | undefined;

        // Nombres de tipo de dato
        type TypeName = 'char' | 'integer' | 'float' | 'monetary' | 'percentage';

        // Unión de tipos de dato
        type ValueType = Integer | Char | Float | Monetary | Percentage;
    }

    // Interfaces para componentes complejos
    declare namespace UI {

        // Formulario
        interface Field {
            name: string; // Nombre del campo en la tabla de la base de datos.
            title: string; // Nombre visible del campo en el placeholder.
            type: IACele.Types.TypeName; // Tipo de valor del campo.
            readonly?: boolean; // Modo "sólo lectura".
        }
    }

    // Vistas
    declare namespace View {

        // Vista de formulari
        declare namespace Form {

            // Contexto de formulario
            interface Context {
                // Estado que invoca la recarga de los datos
                reload: boolean;
                // Función de cambio de estado para ejecutar la recarga de datos
                setReload: React.Dispatch<React.SetStateAction<boolean>>;
                // Indicador de si los datos han cambiado
                dataChanged: boolean;
                // Función de cambio de estado de indicador de datos cambiados
                setDataChanged: React.Dispatch<React.SetStateAction<boolean>>;
                // Datos del formulario
                formData: DataRecord;
                // Estado de sólo lecura
                readonly: boolean;
                // Datos del registro
                recordData: Record;
                // Función para guardar los cambios
                saveData: (data: DataRecord) => (void);
                // Función de cambio de estado para cambio de un valor en los datos del formulario
                setFormValue: (name: string, value: string | number | undefined) => (void);
                // Función para deshacer cambios
                undoChanges: () => (void);
            };

            // Detalles del registro que incluyen su ID y su origen en base de datos
            interface Record {
                id: number;
                table: IACele.Database.Table,
                data: Record<string, IACele.Types.ValueType>;
            };
        };
    };

    // Contextos complejos
    declare namespace Context {

        // Contexto de vista de formulario
        interface FormDetail {
            // Estado que invoca la recarga de los datos
            reload: boolean;
            // Función de cambio de estado para ejecutar la recarga de datos
            setReload: React.Dispatch<React.SetStateAction<boolean>>;
            // Indicador de si los datos han cambiado
            dataChanged: boolean;
            // Función de cambio de estado de indicador de datos cambiados
            setDataChanged: React.Dispatch<React.SetStateAction<boolean>>;
            // Datos del formulario
            formData: DataRecord;
            // Estado de sólo lecura
            readonly: boolean;
            // Datos del registro
            recordData: RecordDetail;
            // Función para guardar los cambios
            saveData: (data: DataRecord) => (void);
            // Función de cambio de estado para cambio de un valor en los datos del formulario
            setFormValue: (name: string, value: string | number | undefined) => (void);
            // Función para deshacer cambios
            undoChanges: () => (void);
        };
    }

    // Tablas de la base de datos
    declare namespace Database {
        type Table = (
            'base.users'
            | 'commissions.line'
        )
    }
}