export interface IAction {
    id: string
    name: string
    iconPath: string
    disabled: boolean
    onClick: () => void
}