import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<h1>Angular Web Worker</h1>
    <button (click)="sendMessage()">Send Message</button>
    <p>{{ message }}</p>`,
})
export class AppComponent implements OnInit {
  private worker: Worker | undefined;
  message = 'No message yet';

  ngOnInit() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('./worker.worker', import.meta.url));
      this.worker.onmessage = ({ data }) => {
        this.message = data;
      };
    } else {
      console.warn('Web Workers are not supported in this environment.');
    }
  }

  sendMessage() {
    if (this.worker) {
      this.worker.postMessage('Hello from AppComponent');
    }
  }
}
