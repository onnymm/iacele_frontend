import DataViewForm from "../../components/data_visualizers/DataViewForm";
import Header from "../../components/layout/Header";
import ButtonSave from "../../components/data_visualizers/form/ButtonSave";
import ButtonUndo from "../../components/data_visualizers/form/ButtonUndo";
import Page from "../../components/layout/Page";
import Sheet from "../../components/layout/Sheet";
import Group from "../../components/layout/Group";
import Field from "../../components/data_visualizers/form/Field";

const UITests = () => {

    return (
        <DataViewForm id={18} table="commissions.line">
            <Page>
                <Header>
                    <ButtonSave />
                    <ButtonUndo />
                </Header>
                <Sheet>
                    
                    {/* <Group title="Datos">
                        <Field name="user" title="Nombre de usuario" type="char" />
                        <Field name="name" title="Nombre" type="char" />
                        <Field name="odoo_id" title="ID de Odoo" type="integer" />
                        <Field name="active" title="Activo" type="boolean" />
                        <Field name="password" title="Contraseña" type="char" readonly />
                        <Field name="create_date" title="Fecha de creación" type="char" />
                    </Group>
                    <Group title="Nombre y todo">
                        <Field name="active" title="Activo" type="boolean" />
                    </Group> */}

                    <Group title="General">
                        <Group>
                            <Field name="invoice_line_id" type="integer" title="ID de línea de factura" readonly />
                            <Field name="invoice_id" type="integer" title="ID de factura" readonly />
                        </Group>
                        <Field name="invoice_date" type="date" title="Fecha de factura" />
                        <Field name="name" type="char" title="Folio" readonly />
                    </Group>

                    <Group title="Producto">
                        <Group>
                            <Field name="product_id" type="integer" title="ID del producto" />
                            <Field name="internal_reference" type="char" title="Código" />
                        </Group>
                        <Field name="product_name" type="char" title="Descripción" />
                        <Group>
                            <Field name="quantity" type="float" title="Cantidad" />
                            <Field name="price_unit" type="monetary" title="Precio" />
                        </Group>
                    </Group>

                    <Group title="Responsable">
                        <Group>
                            <Field name="salesperson_id" type="integer" title="ID de vendedora" />
                            <Field name="invoice_origin" type="char" title="Origen de la factura" />
                            <Field name="warehouse" type="char" title="Almacén" readonly />
                            <Field name="business_model" type="char" title="Modelo de negocio" readonly />
                        </Group>
                    </Group>

                    <Group title="Cliente">
                        <Field name="partner_id" type="integer" title="ID del cliente" />
                        <Field name="partner_name" type="char" title="Nombre del cliente" readonly />
                        <Field name="partner_commission" type="percentage" title="Comision del cliente" />
                        <Field name="partner_commission_cost" type="percentage" title="Costo de comisión del cliente" />
                    </Group>

                </Sheet>
            </Page>
        </DataViewForm>
    );
};

export default UITests;
