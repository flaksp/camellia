import IOperatingSystemDetector, {OperatingSystem} from './IOperatingSystemDetector';

export default class ChromiumOperatingSystemDetector implements IOperatingSystemDetector {
  getOperatingSystem(): OperatingSystem {
    return OperatingSystem.Mac;
  }
}
