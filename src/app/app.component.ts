import {
  Component,
  AfterViewInit,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { InitWorker } from './offscreenCanvas/init-worker.worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

  // template: `<h1>Angular Web Worker</h1>
  // <button (click)="sendMessage()">Send Message</button>
  // <p>{{ message }}</p>`,
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'renderWorker';
  private initWorker: InitWorker | undefined;
  message = 'No message yet';
  @ViewChild('txt') paragraphRef!: ElementRef<HTMLParagraphElement>;

  ngAfterViewInit() {
    const elem = this.paragraphRef.nativeElement;

    this.initWorker = new InitWorker({ message: this.message, elem });
  }

  ngOnInit() {}

  sendMessage() {
    if (this.initWorker) {
      this.initWorker.sendMessage();
    }
  }
}
