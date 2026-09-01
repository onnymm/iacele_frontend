import type FieldComponent from "../components/views/FieldComponent";
import type IconOption from "./IconOption";

const packedView = <M extends IACele.Data.ModelName>(params: IACele.View.PackedParams<M, typeof FieldComponent, keyof typeof IconOption>) => (params);

export default packedView;
