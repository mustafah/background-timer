
export type BackgroundTimerOptions = {
    finishCallback?: Function;
    tickInterval?: number;
    tickCallback?: (remaining: string, remainingMS: number) => void;
};

export default class BackgroundTimer {

    private tickingEnabled: boolean;
    private timerID: any;
    private expirationDate: number;
    private running: boolean;
    private tickInterval: number;
    private tickCallback: Function;
    private tickerID: any;
    private options: BackgroundTimerOptions;

    constructor(private interval: number, options: Function | BackgroundTimerOptions = {}) {
        if (typeof options == 'function') {
            options = {
                finishCallback: options
            }
        } else {
            options.finishCallback ||= () => { };
            if (options.tickInterval || options.tickCallback) {
                this.enableTicking(
                    options.tickInterval || 1000,
                    options.tickCallback || (() => { })
                );
            }
        }
        this.options = options;
    }

    start() {
        this.expirationDate = Date.now() + this.interval;
        this.running = true;
        if (this.tickingEnabled) {
            this.startTicking();
        }
        this.timerID = setTimeout(() => {
            this.cancel();
            return this.options.finishCallback(0, this.formatTime(0));
        }, this.interval);

        document.addEventListener('resume', () => {
            return this.wakeup();
        }, false);
        return true;
    };

    getRemaining() {
        return this.expirationDate - Date.now()
    };

    private wakeup() {
        var remaining;
        if (this.running) {
            remaining = this.getRemaining();
            this.cancel();
            if (remaining > 0) {
                this.interval = remaining;
                const result = this.start();
                this.startTicking();
                return result;
            } else {
                this.options.finishCallback(0, this.formatTime(0));
                return this.cancel;
            }
        }
    };

    enableTicking(tickInterval, tickCallback) {
        this.tickInterval = tickInterval;
        this.tickCallback = tickCallback;
        return this.tickingEnabled = true;
    };

    pauseTicking() {
        if (this.tickerID) {
            clearInterval(this.tickerID);
            return this.tickerID = null;
        }
    };

    resumeTicking() {
        return this.startTicking();
    };

    private roundTime(time) {
        return Math.floor((time + 100) / 1000) * 1000;
    };

    private formatTime(t: number) {
        t /= 1000;
        let minutes: number = parseInt(String(t / 60));
        let minutesText = (minutes < 10) ? "0" + minutes : minutes;
        let seconds: number = parseInt(String(t % 60));
        let secondsText = (seconds < 10) ? "0" + seconds : seconds;
        return minutesText + ":" + secondsText;
    }

    startTicking() {
        if (this.tickingEnabled) {
            const intervalFunc = () => {
                const remaining = this.roundTime(this.getRemaining());
                return this.tickCallback(this.formatTime(remaining), remaining);
            };
            intervalFunc();
            return this.tickerID = setInterval(intervalFunc, this.tickInterval);
        }
    };

    disableTicking() {
        if (this.tickerID) {
            this.tickingEnabled = false;
            clearInterval(this.tickerID);
            return this.tickerID = null;
        }
    };

    cancel() {
        if (this.running) {
            this.running = false;
            this.pauseTicking();
            clearTimeout(this.timerID);
            return this.timerID = null;
        }
    };

}