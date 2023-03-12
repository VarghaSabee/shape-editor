import { SimpleEvent } from "@/libs/events";
import { IToolbarShape } from "@/utils/toolbar-shape";

export interface ISideToolbar {
    activeShape: SimpleEvent<IToolbarShape | null>

    toolbarShapes: SimpleEvent<IToolbarShape[]>

    onSelectShape(shape: IToolbarShape): void

    renderShapes(): void
}