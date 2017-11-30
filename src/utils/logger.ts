import { ILogger } from "../interfaces/ILogger";

export class LoggerImpl implements ILogger {

  logActive: boolean = true;

  log(...any) {
    if (this.logActive)
      console.log(any)
  }

  error(...any) {
    if (this.logActive)
      console.error(any)
  }

  debug(...any) {
    if (this.logActive)
      console.debug(any);
  }

}

export const Logger = new LoggerImpl();

