import { ILogger, errorLevel, logEvent, logLevel } from "./types";

class Logger implements ILogger {
  logLevel: logLevel = "SERVER";
  logEvent: logEvent = "LOG";
  errorLevel: errorLevel = "LOW";
  f: string;
  constructor(f: string) {
    this.f = f;
  }
  get timer() {
    const now = new Date();
    return `: ${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDay()}  ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  }
  dbLogger(log: string): void {
    console.log("log to db", this.timer);
  }
  genError(log: string, x?: string, e?: logEvent, l?: logLevel): void {
    if (l) this.logLevel = l;
    if (e) this.logEvent = e;
    console.log(
      `${this.timer} | ${this.logLevel} : ${this.f} | ${
        this.logEvent
      } | ${log} ${x ? x : ""}`
    );
  }
  genLog(log: string | string[], x?: string | string[]|number, l?: logLevel, e?: logEvent): void {
    if (l) this.logLevel = l;
    if (e) this.logEvent = e;
    console.log(
      `${this.timer} | ${this.logLevel} : ${this.f} | ${
        this.logEvent
      } | ${log} ${x ? x : ""}`
    );
  }
  unCought(): void {
    const logEvent = 'ERROR'
    const logLevel = 'UNCAUGHT'
    const errorLevel = 'HIGH'
    const timer = this.timer
    process.on("uncaughtException", function (err) {
      console.log(
        `::::${timer} | ${logLevel} | ${
          logEvent
        } | ${err}`
      );
    });
  }
}
export default Logger;
