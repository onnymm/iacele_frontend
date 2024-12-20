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
            noRecordsMessage="¡No tienes comisiones!"
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

const viewConfig: ViewConfig[] = [
    {
        key: 'id',
        displayName: 'ID'
    },
    {
        key: 'business_model',
        displayName: 'Modelo de negocio',
    },
    {
        key: 'warehouse',
        displayName: 'Almacén',
    },
    {
        key: 'invoice_doc_id',
        displayName: 'ID de documento',
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
    },
    {
        key: 'partner_name',
        displayName: 'Cliente',
    },
    {
        key: 'internal_reference',
        displayName: 'Código',
    },
    {
        key: 'product_name',
        displayName: 'Producto',
    },
    {
        key: 'quantity',
        displayName: 'Cantidad',
    },
    {
        key: 'price_unit',
        displayName: 'Precio unitario',
    },
    {
        key: 'price_subtotal',
        displayName: 'Subtotal',
    },
    {
        key: 'purchase_name',
        displayName: 'Orden de compra',
    },
    {
        key: 'vendor_name',
        displayName: 'Proveedor',
    },
    {
        key: 'product_cost',
        displayName: 'Costo del producto',
    },
    {
        key: 'cost_subtotal',
        displayName: 'Costo subtotal',
    },
    {
        key: 'subtotal_commission',
        displayName: 'Comisión subtotal',
    },
    {
        key: 'subtotal_commission_pct',
        displayName: 'Comisión subtotal (%)',
        type: 'percentage',
    },
    {
        key: 'subtotal_contribution_pct',
        displayName: 'Contribución subtotal (%)',
        type: 'percentage',
    },
    {
        key: 'customer_commission_pct',
        displayName: 'Comisión del cliente (%)',
        type: 'percentage',
    },
    {
        key: 'customer_commission',
        displayName: 'Comisión del cliente',
    },
    {
        key: 'product_total_cost',
        displayName: 'Costo total del producto',
    },
    {
        key: 'total_utility_pct',
        displayName: 'Comisión total',
        type: 'percentage',
    },
    {
        key: 'total_contribution_pct',
        displayName: 'Contribución total (%)',
        type: 'percentage',
    },
    {
        key: 'product_total_commission',
        displayName: 'Utilidad final',
        options: {
            success: (value: number) => (value >= 0),
            danger: (value: number) => (value < 0),
        },
    },
]
