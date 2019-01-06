import React, { Component } from 'react';

import { CanvasWrapper } from './Fractal.styled';


class Fractal extends Component {
  canvasRef = React.createRef();

  componentDidMount() {
    const cRef = this.canvasRef.current.getContext('2d');

    cRef.moveTo(10.5, 10.5);
    cRef.lineTo(390.5, 10.5);
    cRef.lineTo(390.5, 390.5);
    cRef.lineTo(10.5, 390.5);
    cRef.lineTo(10.5, 10.5);
    cRef.strokeStyle = 'red';
    cRef.stroke();
  }

  render() {
    return (
      <CanvasWrapper>
        <canvas ref={this.canvasRef} width={400} height={400} />
      </CanvasWrapper>
    );
  }
}

export default Fractal;
