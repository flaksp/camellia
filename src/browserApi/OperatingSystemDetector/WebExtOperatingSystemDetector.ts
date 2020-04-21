import IOperatingSystemDetector, {OperatingSystem} from './IOperatingSystemDetector';

export default class WebExtOperatingSystemDetector implements IOperatingSystemDetector {
  getOperatingSystem(): OperatingSystem {
    return OperatingSystem.Mac;
  }
}
