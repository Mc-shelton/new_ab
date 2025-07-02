type logLevel = 'SERVER' | 'DATABASE' | 'UNCAUGHT'
type logEvent = 'ERROR' | 'LOG'
type errorLevel = 'HIGH' | 'LOW' | 'MEDIUM'

interface ILogger {
dbLogger(log:string):void
genError(log:string,x?:string, e?:string,l?:string):void
genLog(log:string, x?:string ,e?:string,l?:string):void
unCought():void
}
export {
    logLevel,
    logEvent,
    errorLevel,
    ILogger
}