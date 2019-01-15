import CalculateBlocker from './CalculateBlocker';


describe('CalculateBlocker ', () => {
  const blocker = new CalculateBlocker();
  it('isCalculating is false after creating', () => {
    expect(blocker.isCalculating()).toBeFalsy();
  });

  it('isCalculating is true after the startCalculate was called', () => {
    blocker.startCalculate();
    expect(blocker.isCalculating()).toBeTruthy();
  });

  it('isCalculating is false after the stopCalculate was called', () => {
    blocker.stopCalculate();
    expect(blocker.isCalculating()).toBeFalsy();
  });
});
