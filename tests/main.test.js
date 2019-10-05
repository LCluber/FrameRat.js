// import { Player } from "../dist/framerat";
const framerat = require("../dist/framerat.iife.js");
const ch = require("@lcluber/chjs/dist/ch.cjs");

// jest.useFakeTimlers();

function render(){
  
}
console.log(framerat);
var animation = new framerat.Player(render);

animation.start();

// test('waits 1 second before ending', () => {
//   const timer = require('../timer');
//   timer(animation.stop);

//   expect(setTimeout).toHaveBeenCalledTimes(1);
//   expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
// });


// animation.stop();


test("getDelta() returns number", () => {
  let value = FrameRat.getDelta();
  expect(ch.isNumber(value)).toBe(true);
});

test("getTotal() returns number", () => {
  let value = FrameRat.getTotal();
  expect(ch.isNumber(value)).toBe(true);
});

test("getFPS() returns number", () => {
  let value = FrameRat.getFPS();
  expect(ch.isNumber(value)).toBe(true);
});

test("getTicks() returns number", () => {
  let value = FrameRat.getTicks();
  expect(ch.isNumber(value)).toBe(true);
});

test("getState() returns boolean", () => {
  let value = FrameRat.getState();
  expect(ch.isBoolean(value)).toBe(true);
});
