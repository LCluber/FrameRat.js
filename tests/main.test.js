import { isNumber, isBoolean } from "@lcluber/chjs";
import { Player } from "../dist/framerat.iife.js";

jest.useFakeTimlers();

function render(){
  
}

var animation = new _frameratIife.Player(render);

animation.start();

test('waits 1 second before ending', () => {
  const timer = require('../timer');
  timer(animation.stop);

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});


// animation.stop();


test("getDelta() returns number", () => {
  let value = FrameRat.getDelta();
  expect(isNumber(value)).toBe(true);
});

test("getTotal() returns number", () => {
  let value = FrameRat.getTotal();
  expect(isNumber(value)).toBe(true);
});

test("getFPS() returns number", () => {
  let value = FrameRat.getFPS();
  expect(isNumber(value)).toBe(true);
});

test("getTicks() returns number", () => {
  let value = FrameRat.getTicks();
  expect(isNumber(value)).toBe(true);
});

test("getState() returns boolean", () => {
  let value = FrameRat.getState();
  expect(isBoolean(value)).toBe(true);
});
