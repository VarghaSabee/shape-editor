import { useRef, useEffect } from "react";
import { editor } from "@/utils/impl/editor";
import { useEditorToolbar } from "@/libs/hooks/useEditorToolbar";
import { useEditorSideToolbar } from "@/libs/hooks/useEditorSideToolbar";

export interface IEditorStyles {
    maxWidth: number;
    maxHeight: number;
    toolbarSize: number;
    borderRadius: number;
}

export const useEditor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { sideToolbar } = useEditorSideToolbar()
    const { toolbar } = useEditorToolbar()

    const editorStyles: IEditorStyles = {
        maxWidth: 800,
        maxHeight: 480,
        borderRadius: 4,
        toolbarSize: 48,
    };

    useEffect(() => {
        if (canvasRef.current) {
            editor.attachCanvas(canvasRef.current, editorStyles);
        }
        return () => {
            editor.dispose();
        };
    }, [canvasRef.current]);

    return { canvasRef, editorStyles, editor, sideToolbar, toolbar }
}