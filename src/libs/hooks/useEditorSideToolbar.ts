import { editor } from "@/utils/impl/editor";
import { useEffect, useState } from "react";
import { IToolbarShape } from "@/utils/toolbar-shape";

export const useEditorSideToolbar = () => {
    const [shapes, setShapes] = useState<IToolbarShape[]>([])
    const [activeShape, setActiveShape] = useState<IToolbarShape | null>(null)

    useEffect(() => {
        editor.sidetoolbar.toolbarShapes.on(handleShapesChange)
        editor.sidetoolbar.activeShape.on(handleActiveShapeChange)
        return () => {
            editor.sidetoolbar.toolbarShapes.off(handleShapesChange)
            editor.sidetoolbar.activeShape.off(handleActiveShapeChange)
        };
    }, []);


    const handleShapesChange = (shapes: IToolbarShape[]) => {
        setShapes(shapes)
    }

    const handleActiveShapeChange = (shape: IToolbarShape | null) => {
        setActiveShape(shape)
    }

    const onSelectShape = (shape: IToolbarShape) => {
        editor.sidetoolbar.onSelectShape(shape)
    }

    return {
        sideToolbar: {
            shapes,
            activeShape,
            onSelectShape
        }
    }
}