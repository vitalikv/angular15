/// <reference lib="webworker" />

class WorkerHandler {
  constructor() {
    self.addEventListener('message', (event) => this.onMessage(event));
  }

  onMessage(event) {
    const response = `текст из воркера ${event.data}`;
    self.postMessage(response);
  }
}

new WorkerHandler();
