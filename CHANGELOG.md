Version 0.3.6 (June 20th 2019)
-----------------------------
 * Fixed declaration file.

Version 0.3.5 (October 08th 2018)
-----------------------------
 * FrameRat.js published on NPM at @lcluber/frameratjs.
 * Updated README.md with NPM installation procedure.

Version 0.3.4 (July 15th 2018)
------------------------------
 * Library exported as ES6 and IIFE modules instead of UMD.
 * FRAMERAT namespace becomes Framerat

Version 0.3.3 (July 4th 2018)
------------------------------
 * Documentation automatically generated in /doc folder
 * Typedoc and grunt-typedoc added in devDependencies
 * New "typedoc" task in Gruntfile.js
 * Typescript upgraded to version 2.9.2
 * INSTALL.md becomes NOTICE.md and RELEASE_NOTES.md becomes CHANGELOG.md

Version 0.3.2 (May 30th 2018)
------------------------------
 * added getters getDelta(), getTotal(), getFPS()

Version 0.3.1 (March 18th 2018)
------------------------------
 * Updated Type6.js dependency to version 0.4.3
 * Updated Taipan.js dependency to version 0.3.2
 * Utils class deleted. Now using Type6.js Time utility functions
 * Added logs with Mouette.js

Version 0.3.0 (March 12th 2018)
------------------------------
 * Library is written in TypeScript
 * Updated Type6.js dependency to version 0.4.1
 * Updated Taipan.js dependency to version 0.3.1

Version 0.2.8 (May 3rd 2017)
------------------------------
 * stop() method now initializes clock and tick count even if pause() method returns false

Version 0.2.7 (April 2nd 2017)
------------------------------
 * Added Time class to handle time formats properly in seconds and milliseconds
 * elapsed and delta in the clock method are now Time classes

Version 0.2.6 (February 18th 2017)
------------------------------
 * Type6.js and Taipan.js dependencies not inserted into the distribution FrameRat.js and FrameRat.min.js files anymore

Version 0.2.5 (January 30th 2017)
------------------------------
 * Updated Type6.js dependency to version 0.2.3

Version 0.2.4 (January 29th 2017)
------------------------------
 * Fixed console bug when using several instances of FrameRat.js

Version 0.2.3 (January 28th 2017)
------------------------------
 * Added a console to display frame rate information on the canvas
 * New drawConsole() method to draw the console on the canvas when needed
 * New toggleConsole() method to show or hide the console on the canvas
 * Simplified clock class
 * The callback's scope is now passed on creation rather than in the new frame request
 * Added Type6.js dependency

Version 0.2.2 (January 10th 2017)
------------------------------
 * Added toggle() method to toggle between play and pause states
 * play(), pause() and stop() methods now return a boolean

Version 0.2.1 (October 15th 2016)
------------------------------
 * Added performance.now() polyfill
 * Uses performance.now instead of Date.getTime() for better performances
 * Added Time class
 * Added getRoundedDelta() method

Version 0.2.0 (September 21st 2016)
------------------------------
 * Updated for open source release on GitHub
 * Code reworked
 * Dedicated website
 * Documentation
 * Examples

Version 0.1.0 (December 1st 2011)
-----------------------------
 * initial version
