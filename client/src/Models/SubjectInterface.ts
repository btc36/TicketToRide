import { IObserver } from "../ViewModels/IObserver"

export interface ISubject {
    attach: (o: IObserver) => void
    detach: (o: IObserver) => void
    notify: (type: string, data: object) => void
}
