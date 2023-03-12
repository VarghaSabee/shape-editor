import { IShape, IShapeObject, IShapeOptions } from "@/utils/shape";
import { fabric } from "fabric";

export class LineShape implements IShape {

    createObject(options?: IShapeOptions): IShapeObject {
        return new fabric.Line([0, 0, 1, 1], options)
    }
}