import { IShape, IShapeObject, IShapeOptions } from "@/utils/shape";
import { fabric } from "fabric";

export class RectShape implements IShape {

    createObject(options?: IShapeOptions): IShapeObject {
        return new fabric.Rect(options)
    }
}