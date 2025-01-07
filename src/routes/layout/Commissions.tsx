// import useOptions from "../../hooks/useOptions";
// import Header from "../../components/layout/Header";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import DataView from "../../components/data_visualizers/DataView";

const RouteCommissions: () => (React.JSX.Element) = () => {

    return (
        <DataView
            backendPath="/odoo/commissions"
            viewConfig={viewConfig}
            filters={filters}
            noRecordsIcon={BanknotesIcon}
            noRecordsMessage="¡No hay comisiones!"
            searchScope={search}
        />
    )
}

export default RouteCommissions;

const filters = {
    default: {
        criteria: '[]',
    },
    available: [
        {
            key: 0,
            displayName: 'Comisión negativa',
            criteria: '[["product_total_commission", "<", 0]]',
        },
        {
            key: 1,
            displayName: 'Ventas a mostrador',
            criteria: '[["partner_name", "=", "Mostrador"]]',
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
    },
    {
        key: 'business_model',
        displayName: 'Modelo de negocio',
        tableVisible: false,
    },
    {
        key: 'warehouse',
        displayName: 'Almacén',
        tableVisible: false,
    },
    {
        key: 'invoice_doc_id',
        displayName: 'ID de documento',
        tableVisible: true,
    },
    {
        key: 'invoice_name',
        displayName: 'Folio',
    },
    {
        key: 'invoice_date',
        displayName: 'Fecha de factura',
    },
    {
        key: 'invoice_origin',
        displayName: 'Origen',
        tableVisible: false,
    },
    {
        key: 'partner_name',
        displayName: 'Cliente',
        tableVisible: true,
    },
    {
        key: 'internal_reference',
        displayName: 'Código',
        tableVisible: false,
    },
    {
        key: 'product_name',
        displayName: 'Producto',
    },
    {
        key: 'quantity',
        displayName: 'Cantidad',
        tableVisible: true,
    },
    {
        key: 'price_unit',
        displayName: 'Precio unitario',
        tableVisible: false,
    },
    {
        key: 'price_subtotal',
        displayName: 'Subtotal',
        tableVisible: false,
    },
    {
        key: 'purchase_name',
        displayName: 'Orden de compra',
        tableVisible: false,
    },
    {
        key: 'vendor_name',
        displayName: 'Proveedor',
        tableVisible: false,
    },
    {
        key: 'product_cost',
        displayName: 'Costo del producto',
        tableVisible: false,
    },
    {
        key: 'cost_subtotal',
        displayName: 'Costo subtotal',
        tableVisible: false,
    },
    {
        key: 'subtotal_commission',
        displayName: 'Comisión subtotal',
        tableVisible: false,
    },
    {
        key: 'subtotal_commission_pct',
        displayName: 'Comisión subtotal (%)',
        type: 'percentage',
        tableVisible: false,
    },
    {
        key: 'subtotal_contribution_pct',
        displayName: 'Contribución subtotal (%)',
        type: 'percentage',
        tableVisible: false,
    },
    {
        key: 'customer_commission_pct',
        displayName: 'Comisión del cliente (%)',
        type: 'percentage',
        tableVisible: false,
    },
    {
        key: 'customer_commission',
        displayName: 'Comisión del cliente',
        tableVisible: false,
    },
    {
        key: 'product_total_cost',
        displayName: 'Costo total del producto',
        tableVisible: false,
    },
    {
        key: 'total_utility_pct',
        displayName: 'Comisión total',
        type: 'percentage',
        tableVisible: false,
    },
    {
        key: 'total_contribution_pct',
        displayName: 'Contribución total (%)',
        type: 'percentage',
        tableVisible: false,
    },
    {
        key: 'product_total_commission',
        displayName: 'Utilidad final',
        options: {
            success: (value: number) => (value >= 0),
            danger: (value: number) => (value < 0),
        },
        tableVisible: true,
    },
]
