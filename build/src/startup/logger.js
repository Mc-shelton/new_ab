"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor(f) {
        this.logLevel = "SERVER";
        this.logEvent = "LOG";
        this.errorLevel = "LOW";
        this.f = f;
    }
    get timer() {
        const now = new Date();
        return `: ${now.getFullYear()}-${now.getMonth() + 1}-${now.getDay()}  ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    }
    dbLogger(log) {
        console.log("log to db", this.timer);
    }
    genError(log, x, e, l) {
        if (l)
            this.logLevel = l;
        if (e)
            this.logEvent = e;
        console.log(`${this.timer} | ${this.logLevel} : ${this.f} | ${this.logEvent} | ${log} ${x ? x : ""}`);
    }
    genLog(log, x, l, e) {
        if (l)
            this.logLevel = l;
        if (e)
            this.logEvent = e;
        console.log(`${this.timer} | ${this.logLevel} : ${this.f} | ${this.logEvent} | ${log} ${x ? x : ""}`);
    }
    unCought() {
        const logEvent = 'ERROR';
        const logLevel = 'UNCAUGHT';
        const errorLevel = 'HIGH';
        const timer = this.timer;
        process.on("uncaughtException", function (err) {
            console.log(`::::${timer} | ${logLevel} | ${logEvent} | ${err}`);
        });
    }
}
exports.default = Logger;
