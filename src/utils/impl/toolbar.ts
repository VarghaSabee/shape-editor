import { SimpleEvent } from "@/libs/events";
import { IAction } from "@/utils/action";
import { IToolbar } from "@/utils/toolbar";
import { ActionImpl } from "@/utils/impl/actions";
import { mdiUndo, mdiRedo, mdiContentSave } from "@mdi/js";
import { v4 } from "uuid";

export class ToolbarImpl implements IToolbar {
    private actions: IAction[] = []

    private actionsEvent: SimpleEvent<IAction[]> = new SimpleEvent<IAction[]>();

    public get toolbarActions(): SimpleEvent<IAction[]> {
        return this.actionsEvent;
    }

    constructor() {

        const saveAction = new ActionImpl(
            v4(),
            "Save",
            mdiContentSave,
            true,
            this.onSave
        )

        const undoAction = new ActionImpl(
            v4(),
            "Undo",
            mdiUndo,
            true,
            this.onUndo
        )

        const redoAction = new ActionImpl(
            v4(),
            "Redo",
            mdiRedo,
            true,
            this.onRedo
        )

        this.actions.push(undoAction, redoAction, saveAction)
        this.actionsEvent.trigger(this.actions)
    }

    private onSave = () => {
        throw new Error("Method not implemented.");
    }

    private onUndo = () => {
        throw new Error("Method not implemented.");
    }

    private onRedo = () => {
        throw new Error("Method not implemented.");
    }

    renderActions(): void {
        this.actionsEvent.trigger(this.actions)
    }
}