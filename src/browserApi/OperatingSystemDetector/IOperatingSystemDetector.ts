export enum OperatingSystem {
  Mac,
  Other,
}

export default interface IOperatingSystemDetector {
  getOperatingSystem(): OperatingSystem;
}
