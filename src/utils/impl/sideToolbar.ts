import { v4 } from "uuid";
import { SimpleEvent } from "@/libs/events";
import { ISideToolbar } from "@/utils/sideToolbar";
import { IToolbarShape } from "@/utils/toolbar-shape";
import { ToolbarShapeImpl } from "@/utils/impl/toolbar-shape";
import { LineShape } from "@/utils/impl/shapes/line-shape";
import { RectShape } from "@/utils/impl/shapes/rect-shape";
import { TriangleShape } from "@/utils/impl/shapes/triangle-shape";
import { mdiVectorLine, mdiVectorRectangle, mdiVectorTriangle/*, mdiVectorCircle*/ } from "@mdi/js";
// import { CircleShape } from "./shapes/circle-shape";

export class SideToolbarImpl implements ISideToolbar {
    private shapes: IToolbarShape[] = []

    private _activeShape: IToolbarShape | null = null

    private readonly shapesEvent = new SimpleEvent<IToolbarShape[]>();
    private readonly activeShapeEvent = new SimpleEvent<IToolbarShape | null>();

    public get toolbarShapes(): SimpleEvent<IToolbarShape[]> {
        return this.shapesEvent;
    }

    public get activeShape(): SimpleEvent<IToolbarShape | null> {
        return this.activeShapeEvent;
    }

    constructor() {

        const lineShape = new ToolbarShapeImpl(
            v4(),
            "Line",
            mdiVectorLine,
            new LineShape(),
        )

        const rectShape = new ToolbarShapeImpl(
            v4(),
            "Rectangle",
            mdiVectorRectangle,
            new RectShape(),
        )

        const triangleShape = new ToolbarShapeImpl(
            v4(),
            "Triangle",
            mdiVectorTriangle,
            new TriangleShape(),
        )

        // const circleShape = new ToolbarShapeImpl(
        //     v4(),
        //     "Circle",
        //     mdiVectorCircle,
        //     new CircleShape(),
        // )

        this.shapes.push(
            lineShape, rectShape, triangleShape, // circleShape
        )

        this.shapesEvent.trigger(this.shapes)
    }

    onSelectShape(shape: IToolbarShape): void {

        if (shape.id === this._activeShape?.id) {
            this._activeShape = null
            this.activeShapeEvent.trigger(null)
            return
        }

        this._activeShape = shape
        this.activeShapeEvent.trigger(shape)
    }

    renderShapes() {
        this.shapesEvent.trigger(this.shapes)
    }
}