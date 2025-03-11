import {
  Component,
  AfterViewInit,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { InitScene } from './offscreenCanvas/init-scene.service';
import { InitWorker } from './offscreenCanvas/init-worker.service';

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
  @ViewChild('scene_1', { static: true })
  canvas1!: ElementRef;
  @ViewChild('scene_2', { static: true })
  canvas2!: ElementRef;

  ngAfterViewInit() {
    if (this.canvas2) {
      const initWorker = new InitWorker();
      initWorker.init({ canvas: this.canvas2.nativeElement });
    }

    const initScene = new InitScene();
    if (this.canvas1) {
      initScene.initCanvas1({ canvas: this.canvas1.nativeElement });
    }
  }

  ngOnInit() {}
}
