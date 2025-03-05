import { BanknotesIcon } from "@heroicons/react/24/outline";
import DataView from "../../components/data_visualizers/DataView";

const RouteSales: () => (React.JSX.Element) = () => {

    return (
        <DataView
            backendPath="/sales/commissions/"
            viewConfig={viewConfig}
            filters={filters}
            noRecordsIcon={BanknotesIcon}
            noRecordsMessage="¡No hay comisiones!"
            searchScope={search}
        />
    )
}

export default RouteSales;

const filters: DataViewFilters = {
    default: {
        criteria: [],
    },
    available: [
        {
            key: 0,
            displayName: 'Comisión negativa',
            criteria: [['utility_subtotal', '<', 0]],
        },
        {
            key: 1,
            displayName: 'Ventas a mostrador',
            criteria: [['partner_name', '=', 'Mostrador']],
        },
    ]
}

const search: SearchScope = {
    'invoice_name': 'contains',
    'partner_name': 're',
    'product_name': 're',
    'internal_reference': 'match',
}

const viewConfig: ViewConfig[] = [
    {
        key: 'id',
        displayName: 'ID',
        type: 'integer',
        tableVisible: false,
    },
    {
        key: 'invoice_line_id',
        displayName: 'ID de línea de factura',
        type: 'integer',
        tableVisible: false,
    },
    {
        key: 'invoice_id',
        displayName: 'ID de factura',
        type: 'integer',
        tableVisible: false,
    },
    {
        key: 'invoice_date',
        displayName: 'Fecha de factura',
        type: 'date',
        tableVisible: true,
    },
    {
        key: 'name',
        displayName: 'Folio',
        type: 'char',
    },
    {
        key: 'invoice_origin',
        displayName: 'Origen de factura',
        type: 'badge',
        tableVisible: false,
    },
    {
        key: 'salesperson_id',
        displayName: 'ID de vendedora',
        type: 'integer',
        tableVisible: false,
    },
    {
        key: 'business_model',
        displayName: 'Modelo de negocio',
        type: 'badge',
        tableVisible: false,
    },
    {
        key: 'warehouse',
        displayName: 'Almacén',
        type: 'badge',
        tableVisible: false,
    },
    {
        key: 'origin_module',
        displayName: 'Módulo de origen',
        type: 'badge',
        tableVisible: false,
    },
    {
        key: 'partner_id',
        displayName: 'ID de cliente',
        type: 'integer',
        tableVisible: false,
    },
    {
        key: 'partner_name',
        displayName: 'Cliente',
        type: 'char',
        tableVisible: true,
    },
    {
        key: 'product_id',
        displayName: 'ID de producto',
        type: 'integer',
        tableVisible: false,
    },
    {
        key: 'internal_reference',
        displayName: 'Código',
        type: 'char',
        tableVisible: true,
    },
    {
        key: 'product_name',
        displayName: 'Descripción',
        type: 'char',
    },
    {
        key: 'quantity',
        displayName: 'Cantidad',
        type: 'float',
        tableVisible: true,
    },
    {
        key: 'price_unit',
        displayName: 'Precio unitario',
        type: 'monetary',
        tableVisible: false,
    },
    {
        key: 'price_subtotal',
        displayName: 'Subtotal del producto',
        type: 'monetary',
        tableVisible: false,
    },
    {
        key: 'purchase_id',
        displayName: 'ID de compra',
        type: 'integer',
        tableVisible: false,
    },
    {
        key: 'purchase_name',
        displayName: 'Folio de compra',
        type: 'char',
        tableVisible: false,
    },
    {
        key: 'vendor_id',
        displayName: 'ID del proveedor',
        type: 'integer',
        tableVisible: false,
    },
    {
        key: 'vendor_name',
        displayName: 'Proveedor',
        type: 'char',
        tableVisible: false,
    },
    {
        key: 'purchase_date',
        displayName: 'Fecha de compra',
        type: 'date',
        tableVisible: false,
    },
    {
        key: 'product_cost',
        displayName: 'Costo del producto',
        type: 'monetary',
        tableVisible: false,
    },
    {
        key: 'cost_subtotal',
        displayName: 'Subtotal de compra del producto',
        type: 'monetary',
        tableVisible: false,
    },
    {
        key: 'discount',
        displayName: 'Descuento',
        type: 'percentage',
        tableVisible: false,
    },
    {
        key: 'partner_commission',
        displayName: 'Porcentaje de comisión del cliente',
        type: 'percentage',
        tableVisible: false,
    },
    {
        key: 'partner_commission_cost',
        displayName: 'Comisión del cliente',
        type: 'monetary',
        tableVisible: false,
    },
    {
        key: 'utility_subtotal',
        displayName: 'Utilidad subtotal',
        type: 'monetary',
        tableVisible: true,
    },
    {
        key: 'total_utility_pct',
        displayName: 'Porcentaje de utilidad subtotal',
        type: 'percentage',
        tableVisible: false,
    },
    {
        key: 'margin',
        displayName: 'Margen de ganancia',
        type: 'percentage',
        tableVisible: false,
    },
    {
        key: 'cost_subtotal_after_partner_commission',
        displayName: 'Costo después de comisión del cliente',
        type: 'monetary',
        tableVisible: false,
    },
    {
        key: 'utility_subtotal_after_partner_commission',
        displayName: 'Utilidad después de comisión del cliente',
        type: 'monetary',
        tableVisible: false,
    },
    {
        key: 'utility_subtotal_after_partner_commission_pct',
        displayName: 'Porcentaje de utilidad después de comisión del cliente',
        type: 'percentage',
        tableVisible: false,
    },
    {
        key: 'margin_after_partner_commission_pct',
        displayName: 'Margen después de comisión del cliente',
        type: 'percentage',
        tableVisible: false,
    },
    {
        key: 'notes',
        displayName: 'Observaciones',
        type: 'char',
        tableVisible: true,
    }
]
