import { SimpleEvent } from "@/libs/events"
import { IAction } from "./action"

export interface IToolbar {
    toolbarActions: SimpleEvent<IAction[]>

    renderActions(): void
}