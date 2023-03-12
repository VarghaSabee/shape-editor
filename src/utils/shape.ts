import { IObjectOptions, Object } from "fabric/fabric-impl";

export type IShapeOptions = IObjectOptions
export type IShapeObject = Object

export interface IShape {
    createObject(options?: IShapeOptions): IShapeObject
}