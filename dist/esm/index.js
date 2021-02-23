var BackgroundTimer = /** @class */ (function () {
    function BackgroundTimer(interval, options) {
        if (options === void 0) { options = {}; }
        this.interval = interval;
        if (typeof options == 'function') {
            options = {
                finishCallback: options
            };
        }
        else {
            options.finishCallback || (options.finishCallback = function () { });
            if (options.tickInterval || options.tickCallback) {
                this.enableTicking(options.tickInterval || 1000, options.tickCallback || (function () { }));
            }
        }
        this.options = options;
    }
    BackgroundTimer.prototype.start = function () {
        var _this = this;
        this.expirationDate = Date.now() + this.interval;
        this.running = true;
        if (this.tickingEnabled) {
            this.startTicking();
        }
        this.timerID = setTimeout(function () {
            _this.cancel();
            return _this.options.finishCallback(0, _this.formatTime(0));
        }, this.interval);
        document.addEventListener('resume', function () {
            return _this.wakeup();
        }, false);
        return true;
    };
    ;
    BackgroundTimer.prototype.getRemaining = function () {
        return this.expirationDate - Date.now();
    };
    ;
    BackgroundTimer.prototype.wakeup = function () {
        var remaining;
        if (this.running) {
            remaining = this.getRemaining();
            this.cancel();
            if (remaining > 0) {
                this.interval = remaining;
                var result = this.start();
                this.startTicking();
                return result;
            }
            else {
                this.options.finishCallback(0, this.formatTime(0));
                return this.cancel;
            }
        }
    };
    ;
    BackgroundTimer.prototype.enableTicking = function (tickInterval, tickCallback) {
        this.tickInterval = tickInterval;
        this.tickCallback = tickCallback;
        return this.tickingEnabled = true;
    };
    ;
    BackgroundTimer.prototype.pauseTicking = function () {
        if (this.tickerID) {
            clearInterval(this.tickerID);
            return this.tickerID = null;
        }
    };
    ;
    BackgroundTimer.prototype.resumeTicking = function () {
        return this.startTicking();
    };
    ;
    BackgroundTimer.prototype.roundTime = function (time) {
        return Math.floor((time + 100) / 1000) * 1000;
    };
    ;
    BackgroundTimer.prototype.formatTime = function (t) {
        t /= 1000;
        var minutes = parseInt(String(t / 60));
        var minutesText = (minutes < 10) ? "0" + minutes : minutes;
        var seconds = parseInt(String(t % 60));
        var secondsText = (seconds < 10) ? "0" + seconds : seconds;
        return minutesText + ":" + secondsText;
    };
    BackgroundTimer.prototype.startTicking = function () {
        var _this = this;
        if (this.tickingEnabled) {
            var intervalFunc = function () {
                var remaining = _this.roundTime(_this.getRemaining());
                return _this.tickCallback(_this.formatTime(remaining), remaining);
            };
            intervalFunc();
            return this.tickerID = setInterval(intervalFunc, this.tickInterval);
        }
    };
    ;
    BackgroundTimer.prototype.disableTicking = function () {
        if (this.tickerID) {
            this.tickingEnabled = false;
            clearInterval(this.tickerID);
            return this.tickerID = null;
        }
    };
    ;
    BackgroundTimer.prototype.cancel = function () {
        if (this.running) {
            this.running = false;
            this.pauseTicking();
            clearTimeout(this.timerID);
            return this.timerID = null;
        }
    };
    ;
    return BackgroundTimer;
}());
export default BackgroundTimer;
