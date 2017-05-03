Version 0.2.8 (May 3rd 2017)
------------------------------
 * stop() method now initializes clock and tick count even if pause() method returns false. 

Version 0.2.7 (April 2nd 2017)
------------------------------
 * Added Time class to handle time formats properly in seconds and milliseconds.
 * elapsed and delta in the clock method are now Time classes.

Version 0.2.6 (February 18th 2017)
------------------------------
 * Type6.js and Taipan.js dependencies are built separately into the dist/dependencies/ folder instead of being directly inserted into the distribution FrameRat.js and FrameRat.min.js files

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
