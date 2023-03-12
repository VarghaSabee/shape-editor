import { IAction } from "@/utils/action";

export class ActionImpl implements IAction {

    constructor(
        readonly id: string,
        readonly name: string,
        readonly iconPath: string,
        readonly disabled: boolean,
        readonly onClick: () => void
    ) {
    }
}