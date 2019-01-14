class CalculateBlocker {
  constructor() {
    this.isCalculatingFlag = false;
  }

  isCalculating = () => this.isCalculatingFlag;

  startCalculate = () => {
    this.startTime = new Date();
    this.isCalculatingFlag = true;
    console.group('New calculation profiling');
  };

  stopCalculate = () => {
    this.isCalculatingFlag = false;
    console.log('Thread time -> ', new Date() - this.startTime);
    console.groupEnd();
  };
}

export default CalculateBlocker;
