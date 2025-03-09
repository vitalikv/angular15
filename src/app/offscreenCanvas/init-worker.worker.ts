export class InitWorker {
  private worker: Worker | undefined;
  message: string;
  elem: any;

  constructor({ message, elem }) {
    this.message = message;
    this.elem = elem;
    this.elem.textContent = 'воркер активирован';

    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('./scene.worker', import.meta.url));
      this.worker.onmessage = ({ data }) => {
        this.elem.textContent = data;
      };
    } else {
      console.warn('Web Workers are not supported in this environment.');
    }
  }

  sendMessage() {
    if (this.worker) {
      this.worker.postMessage(' 111');
    }
  }
}
