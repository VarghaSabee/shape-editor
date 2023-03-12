import { IEditorStyles } from "@/libs/hooks/useEditor";
import { IDrawer, IEditor } from "@/utils/editor";
import { fabric } from "fabric";
import { ISideToolbar } from "@/utils/sideToolbar";
import { SideToolbarImpl } from "@/utils/impl/sideToolbar";
import { IToolbarShape } from "@/utils/toolbar-shape";
import { ToolbarImpl } from "@/utils/impl/toolbar";
import { IToolbar } from "@/utils/toolbar";

export class EditorImpl implements IEditor {

    readonly sidetoolbar: ISideToolbar;

    readonly toolbar: IToolbar

    private canvas: HTMLCanvasElement | null = null;

    private fabricCanvas: fabric.Canvas | null = null;

    private drawer: IDrawer = {
        originX: 0,
        originY: 0,
        isActive: false,
        activeShape: null,
        selectedToolbarShape: null,
    }

    private constructor() {
        this.sidetoolbar = new SideToolbarImpl()
        this.toolbar = new ToolbarImpl()
    }

    private static _instance: IEditor

    static get instance() {
        if (!this._instance) {
            this._instance = new EditorImpl()
        }
        return this._instance
    }

    getCanvas(): HTMLCanvasElement | null {
        return this.canvas
    }

    attachCanvas(canvas: HTMLCanvasElement, editorStyles: IEditorStyles): void {
        this.canvas = canvas

        this.fabricCanvas = new fabric.Canvas(canvas, {
            width: editorStyles.maxWidth - editorStyles.toolbarSize,
            height: editorStyles.maxHeight - editorStyles.toolbarSize,
        })

        this.toolbar.renderActions()

        this.sidetoolbar.renderShapes()
        this.sidetoolbar.activeShape.on(this.onChangeActiveShape)

        // events
        window.addEventListener("keydown", this.onKeydown)
        this.fabricCanvas.on("mouse:down", this.onMouseDown)
        this.fabricCanvas.on("mouse:up", this.onMouseUp)
        this.fabricCanvas.on("mouse:move", this.onMouseMove)
    }


    private onKeydown = (event: KeyboardEvent) => {
        if (event.key === "Delete") {
            this.removeSelectedShapes()
        }
    }

    private removeSelectedShapes() {
        if (!this.fabricCanvas) {
            throw new Error("Canvas not initialized!")
        }

        const selectedShapes = this.fabricCanvas.getActiveObjects();

        if (selectedShapes.length < 1) {
            console.warn("Shape not selected!");
            return
        }

        selectedShapes.forEach(shape => { this.fabricCanvas?.remove(shape) })

        this.fabricCanvas.renderAll()
    }

    private onMouseUp = (event: fabric.IEvent<MouseEvent>) => {
        this.drawer.isActive = false
    }

    private onMouseDown = (event: fabric.IEvent<MouseEvent>) => {

        const { selectedToolbarShape } = this.drawer
        if (event.target || !selectedToolbarShape) {
            return
        }

        if (!this.fabricCanvas) {
            throw new Error("Canvas not initialized!")
        }

        this.drawer.isActive = true

        const pointer = this.fabricCanvas.getPointer(event.e);
        this.drawer.originX = pointer.x
        this.drawer.originY = pointer.y

        this.drawer.activeShape = selectedToolbarShape.shape.createObject({
            left: this.drawer.originX,
            top: this.drawer.originY,
            originX: 'left',
            originY: 'top',
            width: pointer.x - this.drawer.originX,
            height: pointer.y - this.drawer.originY,
            angle: 0,
            fill: 'rgba(255,0,0,1)',
            stroke: 'rgba(255,0,0,1)',
            transparentCorners: false
        })

        this.fabricCanvas.add(this.drawer.activeShape);
    }

    private onMouseMove = (event: fabric.IEvent<MouseEvent>) => {
        if (!this.drawer.isActive || !this.drawer.selectedToolbarShape || !this.drawer.activeShape) {
            return
        }

        if (!this.fabricCanvas) {
            throw new Error("Canvas not initialized!")
        }

        const pointer = this.fabricCanvas.getPointer(event.e);

        if (this.drawer.originX > pointer.x) {
            this.drawer.activeShape.set({ left: Math.abs(pointer.x) });
        }

        if (this.drawer.originY > pointer.y) {
            this.drawer.activeShape.set({ top: Math.abs(pointer.y) });
        }

        this.drawer.activeShape.set({ width: Math.abs(this.drawer.originX - pointer.x) });
        this.drawer.activeShape.set({ height: Math.abs(this.drawer.originY - pointer.y) });

        this.fabricCanvas.renderAll();
    }

    private onChangeActiveShape = (shape: IToolbarShape | null) => {
        if (!this.fabricCanvas) {
            throw new Error("Canvas not initialized!")
        }

        if (shape) {
            this.fabricCanvas.defaultCursor = "crosshair"
            this.drawer.selectedToolbarShape = shape
        } else {
            this.drawer.selectedToolbarShape = null
            this.fabricCanvas.defaultCursor = ""
        }
    }


    dispose(): void {
        window.removeEventListener("keydown", this.onKeydown)
        this.sidetoolbar.activeShape.off(this.onChangeActiveShape)
        this.fabricCanvas?.dispose()
    }
}

export const editor = EditorImpl.instance