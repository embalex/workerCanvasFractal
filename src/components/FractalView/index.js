import React, { Component } from 'react';

import { Fractal } from '../../lib';
import ControlPanel from './ControlPanel';

import { fractalSize } from './FractalView.constants';
import { CanvasWrapper } from './FractalView.styled';


class FractalView extends Component {
  canvasRef = React.createRef();

  constructor(props) {
    super(props);

    const { height, width } = fractalSize;
    this.fractal = new Fractal({ width, height, onReady: this.drawCanvas });
  }

  componentDidMount() {
    this.fractal.recalculateFractal();
  }

  drawCanvas = (workersMessage) => {
    if (workersMessage.data.error) { return; }

    const cRef = this.canvasRef.current.getContext('2d');
    workersMessage.data.forEach(({ x, y, color }) => {
      cRef.fillStyle = color;
      cRef.fillRect(x, y, 1, 1);
    });
    cRef.stroke();
  };

  render() {
    return (
      <CanvasWrapper>
        <canvas
          ref={this.canvasRef}
          width={fractalSize.width}
          height={fractalSize.height}
        />
        <ControlPanel
          onLeft={this.fractal.moveLeft}
          onRight={this.fractal.moveRight}
          onUp={this.fractal.moveUp}
          onDown={this.fractal.moveDown}
          onZoomOut={this.fractal.zoomOut}
          onZoomIn={this.fractal.zoomIn}
        />
      </CanvasWrapper>
    );
  }
}

export default FractalView;
