import { IToolbarShape } from "@/utils/toolbar-shape";
import { IShape } from "@/utils/shape";

export class ToolbarShapeImpl implements IToolbarShape {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly iconPath: string,
        readonly shape: IShape,
    ) {
    }
}