import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FractalMonoThread, FractalMultiThread, presets } from '../../lib';
import ControlPanel from './ControlPanel';
import PresetBar from './PresetsBar';

import { fractalSize } from './FractalView.constants';
import { CanvasWrapper } from './FractalView.styled';


class FractalView extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    threads: PropTypes.number,
  };

  static defaultProps = {
    threads: 1,
  };

  canvasRef = React.createRef();

  constructor(props) {
    super(props);

    const { height, width } = fractalSize;
    this.fractal = props.threads === 1
      ? new FractalMonoThread({ width, height, onReady: this.drawCanvas })
      : new FractalMultiThread({
        width, height, onReady: this.drawCanvas, threads: props.threads,
      });
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
        <PresetBar presets={presets} setPreset={this.fractal.setOffset} />
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
