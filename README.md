
<p align="center">
  <img width="128" src="https://static.thenounproject.com/png/97982-200.png">
  <h1 style="text-align: center">Background Timer ⌚</h1>
</p>

Similar to javascript's setTimeout but works well when iPhone/Android goes to sleep on background !


### Install

Install dependencies with npm:

```bash
npm i mustafah/background-timer
```

### Import
```ts
import BackgroundTimer from 'background-timer';
```

### Example of usage
```ts
new BackgroundTimer(60 * 1000,
    () => console.log(`You were waiting this from a minute ago 👍`);
).start();
```
```ts
@partial export class EmployeeWork {
    @partial model: EmployeeModel;
    doWork() {
        console.log(`doWork()`);
    }
}
```
```ts
new BackgroundTimer(60 * 1000, {
    tickCallback: (remaining) => {
        console.log(`Remaining time = ${remaining}`);
        // Every second this function will be called until time is finished
        // Will output:
        // Remaining time = 01:00
        // Remaining time = 00:59
        // ...
    },
    finishCallback: () => {
        console.log(`Finshed 👍`);
    }
}).start();
```
```ts
new BackgroundTimer(60 * 1000, {
    tickInterval: 1000 * 2,
    tickCallback: (remaining, remaingingMS) => {
        console.log(`Remaining time = ${remainingMS}`);
        // Tthis function will be called every two seconds !
        // Remaining time = 60000
        // Remaining time = 58000
        // Remaining time = 56000
        // ...
    },
    finishCallback: () => {
        console.log(`Finshed 👍`);
    },
}).start();
```