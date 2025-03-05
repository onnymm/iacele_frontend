// Datos estructurados de la aplicación, objetos, componentes y UI
declare namespace IACele {

    // Tipos de dato provenientes del backend
    declare namespace Types {
        // Entero
        type Integer = number | undefined;
        // Cadena de texto
        type Char = string | undefined;

        // Nombres de tipo de dato
        type TypeName = 'char' | 'integer'

        // Unión de tipos de dato
        type ValueType = IACele.Types.Integer | IACele.Types.Char;
    }

    // Interfaces para componentes complejos
    declare namespace Component {

        // Formulario
        interface Field {
            name: string;
            title: string;
            type: IACele.Types.TypeName;
            readonly?: boolean;
        }
    }

    // Tablas de la base de datos
    declare namespace Database {
        type Table = (
            'base.users'
            | 'commissions.line'
        )
    }
}