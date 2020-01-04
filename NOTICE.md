## Installation guide

Install Git : [https://git-scm.com/](https://git-scm.com/)

Install Node.js : [https://nodejs.org](https://nodejs.org)

Clone the project :

```bash
$ git clone https://github.com/LCluber/FrameRat.js.git
```

Install project dependencies :

```bash
$ cd <project-directory>
$ npm i
```

## Workflow

build the library :

```bash
$ npm run build
```

test the library :

```bash
$ npm run test
```

commit your work with [conventional commits](#conventional-commits) :

```bash
$ npm run commit
```

Set node environment if needed :

```bash
export NODE_ENV=development
export NODE_ENV=production
```

## Folders

- dist/
- examples/
- src/
- tests/

## Stack

| Purpose         |                    Choice                    |                                                                                Motivation |
| :-------------- | :------------------------------------------: | ----------------------------------------------------------------------------------------: |
| repository      |        [Github](https://github.com/)         | the world’s largest community of developers to discover, share, and build better software |
| package manager |     [npm](https://www.npmjs.com/get-npm)     |                                                           default node.js package manager |
| type checking   | [TypeScript](https://www.typescriptlang.org) |                            static type checking along with the latest ECMAScript features |
| module bundler  |      [Rollup.js](https://rollupjs.org)       |                                                   advanced module bundler for ES6 modules |
| unit testing    |          [Jest](https://jestjs.io/)          |                                             delightful testing with a focus on simplicity |
| deployment      |       [Travis](https://travis-ci.com/)       |                                                           test and deploy with confidence |

## Conventional commits

[see COMMITS.md](https://github.com/LCluber/Ch.js/blob/master/COMMITS.md).
