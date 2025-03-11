// export class InitWorker {
//   private worker: Worker | undefined;
//   elem: any;

//   constructor({ elem }) {
//     this.elem = elem;
//     this.elem.textContent = 'воркер активирован';

//     if (typeof Worker !== 'undefined') {
//       this.worker = new Worker(new URL('./scene.worker', import.meta.url));
//       this.worker.onmessage = ({ data }) => {
//         this.elem.textContent = data;
//       };
//     } else {
//       console.warn('Web Workers are not supported in this environment.');
//     }
//   }

//   sendMessage() {
//     if (this.worker) {
//       this.worker.postMessage(' 111');
//     }
//   }
// }

export class InitWorker {
  init({ canvas }) {
    const offscreen = canvas.transferControlToOffscreen();
    const worker = new Worker(new URL('./scene.worker', import.meta.url), {
      type: 'module',
    });

    // const objectUrl = URL.createObjectURL(scriptObject);
    // const worker = new Worker(objectUrl);
    // URL.revokeObjectURL(objectUrl);

    worker.postMessage(
      {
        type: 'initScene',
        offscreen,
        width: canvas.clientWidth,
        height: canvas.clientHeight,
      },
      [offscreen]
    );

    canvas.addEventListener('mousedown', (event) => {
      worker.postMessage({
        type: 'mousedown',
        clientX: event.clientX,
        clientY: event.clientY,
      });
    });

    canvas.addEventListener('mousemove', (event) => {
      worker.postMessage({
        type: 'mousemove',
        clientX: event.clientX,
        clientY: event.clientY,
      });
    });

    canvas.addEventListener('mouseup', (event) => {
      worker.postMessage({
        type: 'mouseup',
        clientX: event.clientX,
        clientY: event.clientY,
      });
    });

    canvas.addEventListener('wheel', (event) => {
      worker.postMessage({
        type: 'wheel',
        deltaY: event.deltaY,
      });
    });

    canvas.addEventListener('click', (event) => {
      const rect = canvas.getBoundingClientRect();

      worker.postMessage({
        type: 'click',
        clientX: event.clientX,
        clientY: event.clientY,
        rect,
      });
    });
  }
}
