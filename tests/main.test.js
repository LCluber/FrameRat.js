import { Player } from "../dist/framerat";

// jest.useFakeTimlers();

function render(){
  
}

var animation = new Player(render);

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
  expect(value).toBePositive();
});

test("getTotal() returns number", () => {
  let value = FrameRat.getTotal();
  expect(value).toBePositive();
});

test("getFPS() returns number", () => {
  let value = FrameRat.getFPS();
  expect(value).toBePositive();
});

test("getTicks() returns number", () => {
  let value = FrameRat.getTicks();
  expect(value).toBePositive();
});

test("getState() returns boolean", () => {
  let value = FrameRat.getState();
  expect(value).toBeBoolean();
});
