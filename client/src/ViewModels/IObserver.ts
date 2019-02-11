export interface IObserver {
  update(updateType: string, data: any): void;
}
