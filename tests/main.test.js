import { Player } from '../dist/framerat';

jest.useFakeTimers();

function render() {}

var animation = new Player(render);

animation.start();

test('waits 1 second before ending', () => {
  const timer = require('./timer');
  timer(animation.stop);
  animation.stop();
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

test('getDelta() returns number', () => {
  let value = animation.getDelta();
  expect(value).toBePositive();
});

test('getTotal() returns number', () => {
  let value = animation.getTotal();
  expect(value).toBePositive();
});

test('getFPS() returns number', () => {
  let value = animation.getFPS();
  expect(value).toBePositive();
});

test('getTicks() returns number', () => {
  let value = animation.getTicks();
  expect(value).toBePositive();
});

test('getState() returns boolean', () => {
  let value = animation.getState();
  expect(value).toBeBoolean();
});
