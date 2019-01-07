import React, { Component } from 'react';

import WebWorker from '../WebWorker';
import testWorker from './workers/mandelbrot.worker';

import { CanvasWrapper } from './Fractal.styled';


class Fractal extends Component {
  canvasRef = React.createRef();

  componentDidMount() {
    this.testSW = new WebWorker(testWorker);
    this.testSW.addEventListener('message', this.drawCanvas);
    this.testSW.postMessage({ height: 400, width: 400 });
  }

  drawCanvas = (workersMessage) => {
    if (workersMessage.data.error) { return; }

    const cRef = this.canvasRef.current.getContext('2d');
    workersMessage.data.forEach(({ method, x, y, color }) => {
      cRef.fillStyle = color;
      cRef[method](x, y, 1, 1);
    });
    cRef.stroke();
  };

  render() {
    return (
      <CanvasWrapper>
        <canvas ref={this.canvasRef} width={400} height={400} />
      </CanvasWrapper>
    );
  }
}

export default Fractal;
