import { IShape, IShapeObject, IShapeOptions } from "@/utils/shape";
import { fabric } from "fabric";

export class CircleShape implements IShape {

    createObject(options?: IShapeOptions): IShapeObject {
        return new fabric.Circle({
            ...options,
            radius: 10
        })
    }
}