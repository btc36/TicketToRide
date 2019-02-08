export interface Subject {
    attach: (o: Observer) => void
    detach: (o: Observer) => void
    notify: (type: string, data: object) => void
}
