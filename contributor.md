# Installation guide

## Clone the project :

  ```bash
  $ git clone https://github.com/LCluber/FrameRat.js.git
  ```

## Launch with docker
 
  ### build image : 
  ```bash
  $ cd FrameRat.js/
  $ docker-compose up -d
  ```
  
  ### build lib : 
  ```bash
  $ cd FrameRat.js/
  $ docker-compose run ctrltab
  ```
  
OR

## Install project dependencies :

  ```bash
  $ cd FrameRat.js/
  $ npm i
  ```

# Workflow

- create a branch following [these instructions](https://lcluber.github.io/LeadDevToolkit/docs/git/branch.html)

- build the library :

  ```bash
  $ npm run build
  ```

- test the library :

  ```bash
  $ npm run test
  ```

- Test result in a browser using /exemples/index.htm

- commit your work following [conventional commits rules](https://lcluber.github.io/LeadDevToolkit/docs/git/commit.html) :


## Folders

- dist/
- src/
- tests/
- examples/

