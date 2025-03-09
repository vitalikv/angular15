/// <reference lib="webworker" />

import { Test } from './test';

class WorkerHandler {
  constructor() {
    const test = new Test();
    console.log(test.getData());
    self.addEventListener('message', (event) => this.onMessage(event));
  }

  onMessage(event) {
    const response = `текст из воркера ${event.data}`;
    self.postMessage(response);
  }
}

new WorkerHandler();
