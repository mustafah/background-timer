!function(t,i){"object"==typeof exports&&"object"==typeof module?module.exports=i():"function"==typeof define&&define.amd?define([],i):"object"==typeof exports?exports.exampleTypescriptPackage=i():t.exampleTypescriptPackage=i()}(this,(function(){return(()=>{"use strict";var t={432:(t,i)=>{Object.defineProperty(i,"__esModule",{value:!0});var e=function(){function t(t,i){void 0===i&&(i={}),this.interval=t,"function"==typeof i?i={finishCallback:i}:(i.finishCallback||(i.finishCallback=function(){}),(i.tickInterval||i.tickCallback)&&this.enableTicking(i.tickInterval||1e3,i.tickCallback||function(){})),this.options=i}return t.prototype.start=function(){var t=this;return this.expirationDate=Date.now()+this.interval,this.running=!0,this.tickingEnabled&&this.startTicking(),this.timerID=setTimeout((function(){return t.cancel(),t.options.finishCallback(0,t.formatTime(0))}),this.interval),document.addEventListener("resume",(function(){return t.wakeup()}),!1),!0},t.prototype.getRemaining=function(){return this.expirationDate-Date.now()},t.prototype.wakeup=function(){var t;if(this.running){if(t=this.getRemaining(),this.cancel(),t>0){this.interval=t;var i=this.start();return this.startTicking(),i}return this.options.finishCallback(0,this.formatTime(0)),this.cancel}},t.prototype.enableTicking=function(t,i){return this.tickInterval=t,this.tickCallback=i,this.tickingEnabled=!0},t.prototype.pauseTicking=function(){if(this.tickerID)return clearInterval(this.tickerID),this.tickerID=null},t.prototype.resumeTicking=function(){return this.startTicking()},t.prototype.roundTime=function(t){return 1e3*Math.floor((t+100)/1e3)},t.prototype.formatTime=function(t){t/=1e3;var i=parseInt(String(t/60)),e=i<10?"0"+i:i,n=parseInt(String(t%60));return e+":"+(n<10?"0"+n:n)},t.prototype.startTicking=function(){var t=this;if(this.tickingEnabled){var i=function(){var i=t.roundTime(t.getRemaining());return t.tickCallback(t.formatTime(i),i)};return i(),this.tickerID=setInterval(i,this.tickInterval)}},t.prototype.disableTicking=function(){if(this.tickerID)return this.tickingEnabled=!1,clearInterval(this.tickerID),this.tickerID=null},t.prototype.cancel=function(){if(this.running)return this.running=!1,this.pauseTicking(),clearTimeout(this.timerID),this.timerID=null},t}();i.default=e}},i={};return function e(n){if(i[n])return i[n].exports;var r=i[n]={exports:{}};return t[n](r,r.exports,e),r.exports}(432)})()}));