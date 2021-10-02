[![License: MIT](https://img.shields.io/npm/l/@lcluber/frameratjs?color=brightgreen)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/%40lcluber%2Fframeratjs.svg)](https://www.npmjs.com/package/@lcluber/frameratjs)
[![last version release date](https://img.shields.io/github/release-date/LCluber/FrameRat.js)](https://www.npmjs.com/package/@lcluber/frameratjs)
![Jest:coverage](https://img.shields.io/badge/Jest:coverage-100%25-brightgreen.svg)
[![minified size](https://img.shields.io/bundlephobia/min/@lcluber/frameratjs?color=brightgreen)](https://www.npmjs.com/package/@lcluber/frameratjs)


## Synopsis

**[FrameRat.js](http://frameratjs.lcluber.com)** is an animation frame request library written in TypeScript.

## Motivation

The purpose of this library is to provide a simple way to control an animation while providing useful methods to monitor it and polyfills.

## Installation

### npm

```bash
$ npm i @lcluber/frameratjs
```

### yarn

```bash
$ yarn add @lcluber/frameratjs
```

## Usage


### TypeScript

```javascript

import { Player } from '@lcluber/frameratjs';

export class AnimatedBackground {
  animation: Player;
  context: WebGLRenderingContext;
  width: number;
  height: number;

constructor() {
    const canvas: HTMLCanvasElement = document.getElementById("canvas");
    this.context = canvas.getContext("webgl");
    this.width   = canvas.width = window.innerWidth;
    this.height  = canvas.height = window.innerHeight;
    this.animation = new Player(this.render);
    this.animation.setScope(this);
    this.animation.capFPS(24);
}

public playAnimation(){
  this.animation.toggle();
}

public stopAnimation () {
  this.animation.stop();
  clearFrame();
}

// rendering function
private render(){
  clearFrame();
  draw();
}

private clearFrame(){
  context.clearRect(0, 0, this.width, this.height);
}

private draw() {
    //draw stuff in canvas
}

```

### IIFE

```javascript

var canvas  = document.getElementById("canvas");
var context = canvas.getContext("2d");
var width   = canvas.width = window.innerWidth;
var height  = canvas.height = window.innerHeight;

// rendering function
function render(){
  clearFrame();
  draw();
}

//create animation frame
var animation = new FrameRat.Player(render);

function playAnimation(){
  animation.toggle();
}

function stopAnimation () {
  animation.stop();
  clearFrame();
}

function clearFrame(){
  context.clearRect(0, 0, width, height);
}

function draw() {
  //draw stuff in canvas
}

```


## API Reference

```javascript

capFPS(maxFPS: number): void;
getTick(): number;
getTime(): number;
getFPS(): number;
getTicks(): number;
setScope(scope: Object): void; // Set the scope of the callback if needed
start(): boolean;
toggle(): boolean;
pause(): boolean;
stop(): void;

```

## Contributors

There is still a lot of work to do on this project and I would be glad to get all the help you can provide.
To contribute you can clone the project on **[GitHub](https://github.com/LCluber/FrameRat.js)** and see  **NOTICE.md** for detailed installation walkthrough of the project.
