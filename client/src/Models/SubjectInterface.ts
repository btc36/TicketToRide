import {IObserver} from "../ViewModels/IObserver"
export interface Subject {
    attach: (o: IObserver) => void
    detach: (o: IObserver) => void
    notify: (type: string, data: object) => void
}
