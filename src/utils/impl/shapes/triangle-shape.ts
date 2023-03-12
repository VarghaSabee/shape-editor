import { IShape, IShapeObject, IShapeOptions } from "@/utils/shape";
import { fabric } from "fabric";

export class TriangleShape implements IShape {

    createObject(options?: IShapeOptions): IShapeObject {
        return new fabric.Triangle(options)
    }
}