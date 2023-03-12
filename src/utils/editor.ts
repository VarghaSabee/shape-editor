import { IDisposable } from "@/libs/common";
import { IEditorStyles } from "@/libs/hooks/useEditor";
import { ISideToolbar } from "@/utils/sideToolbar";
import { IToolbar } from "@/utils/toolbar";
import { IToolbarShape } from "@/utils/toolbar-shape";
import { IShapeObject } from "@/utils/shape";

export interface IEditor extends IDisposable {

    readonly sidetoolbar: ISideToolbar

    readonly toolbar: IToolbar

    attachCanvas(canvas: HTMLCanvasElement, editorStyles: IEditorStyles): void

    getCanvas(): HTMLCanvasElement | null
}

export interface IDrawer {
    isActive: boolean,
    originX: number,
    originY: number,
    activeShape: IShapeObject | null,
    selectedToolbarShape: IToolbarShape | null,
}