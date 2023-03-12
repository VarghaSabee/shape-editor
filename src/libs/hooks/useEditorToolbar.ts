import { IAction } from "@/utils/action";
import { editor } from "@/utils/impl/editor";
import { useEffect, useState } from "react";

export const useEditorToolbar = () => {
    const [tools, setTools] = useState<IAction[]>([])

    useEffect(() => {
        editor.toolbar.toolbarActions.on(handleActionsChange)
        return () => {
            editor.toolbar.toolbarActions.off(handleActionsChange)
        };
    }, []);


    const handleActionsChange = (tools: IAction[]) => {
        setTools(tools)
    }

    return {
        toolbar: {
            tools
        }
    }
}