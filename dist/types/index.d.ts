/// <reference types="node" />
export declare type BackgroundTimerOptions = {
    finishCallback?: Function;
    tickInterval?: number;
    tickCallback?: (remaining: string, remainingMS: number) => void;
};
export default class BackgroundTimer {
    private interval;
    private tickingEnabled;
    private timerID;
    private expirationDate;
    private running;
    private tickInterval;
    private tickCallback;
    private tickerID;
    private options;
    constructor(interval: number, options?: Function | BackgroundTimerOptions);
    start(): boolean;
    getRemaining(): number;
    private wakeup;
    enableTicking(tickInterval: any, tickCallback: any): boolean;
    pauseTicking(): any;
    resumeTicking(): NodeJS.Timeout;
    private roundTime;
    private formatTime;
    startTicking(): NodeJS.Timeout;
    disableTicking(): any;
    cancel(): any;
}
