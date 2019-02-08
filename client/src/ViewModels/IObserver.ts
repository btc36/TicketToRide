export default interface IObserver {
  update(updateType: string, data: any): void;
}
