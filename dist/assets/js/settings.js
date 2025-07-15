/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/settings.js":
/*!****************************!*\
  !*** ./src/js/settings.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hexToRGB = function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};
var fonts = {
  base: "Helvetica Neue"
};

// https://material.io/design/color/the-color-system.html#tools-for-picking-colors
var colors = {
  bodyBg: '#F7F8F9',
  border: '#efefef',
  gray: {
    50: '#edeef0',
    100: '#d0d6dc',
    200: '#b2bac4',
    300: '#939fad',
    400: '#7c8a9b',
    500: '#65778a',
    600: '#586879',
    700: '#485563',
    800: '#39424d',
    900: '#272e36'
  },
  primary: {
    50: '#eaecfb',
    100: '#cacef4',
    200: '#a7aeed',
    300: '#838ee5',
    400: '#6773df',
    // $primary
    500: '#4c59d8',
    600: '#4750cd',
    700: '#3d45c0',
    800: '#363ab4',
    900: '#2a269e'
  },
  success: {
    50: '#ebf7e9',
    100: '#d0eac9',
    200: '#b2dda7',
    300: '#93d183',
    400: '#7cc668',
    // $success
    500: '#68bc4c',
    600: '#5dac44',
    700: '#509a39',
    800: '#45892f',
    900: '#30691e'
  },
  danger: {
    50: '#ffebf0',
    100: '#ffced6',
    200: '#ff9a9e',
    300: '#ff7077',
    // $danger
    400: '#ff4853',
    500: '#ff3136',
    600: '#ff2637',
    700: '#f11631',
    800: '#e3082a',
    900: '#d4001d'
  },
  black: '#112b4a',
  white: '#FFFFFF',
  transparent: 'transparent',
  get: function get(color) {
    return color.split('.').reduce(function (o, i) {
      return o[i];
    }, this);
  }
};
var charts = {
  colorScheme: 'light',
  colors: {
    area: hexToRGB(colors.primary[100], 0.5)
  }
};
var settings = {
  fonts: fonts,
  colors: colors,
  charts: charts,
  hexToRGB: hexToRGB
};
if (typeof window !== 'undefined') {
  window.settings = settings;
}

/***/ }),

/***/ 26:
/*!**********************************!*\
  !*** multi ./src/js/settings.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/alishahbas/Documents/Projects/Rental AI /rental-ai/src/js/settings.js */"./src/js/settings.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NldHRpbmdzLmpzIl0sIm5hbWVzIjpbImhleFRvUkdCIiwiaGV4IiwiYWxwaGEiLCJyIiwicGFyc2VJbnQiLCJzbGljZSIsImciLCJiIiwiZm9udHMiLCJiYXNlIiwiY29sb3JzIiwiYm9keUJnIiwiYm9yZGVyIiwiZ3JheSIsInByaW1hcnkiLCJzdWNjZXNzIiwiZGFuZ2VyIiwiYmxhY2siLCJ3aGl0ZSIsInRyYW5zcGFyZW50IiwiZ2V0IiwiY29sb3IiLCJzcGxpdCIsInJlZHVjZSIsIm8iLCJpIiwiY2hhcnRzIiwiY29sb3JTY2hlbWUiLCJhcmVhIiwic2V0dGluZ3MiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFNQSxRQUFRLEdBQUcsU0FBWEEsUUFBUUEsQ0FBSUMsR0FBRyxFQUFFQyxLQUFLLEVBQUs7RUFDL0IsSUFBTUMsQ0FBQyxHQUFHQyxRQUFRLENBQUNILEdBQUcsQ0FBQ0ksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7RUFDdkMsSUFBTUMsQ0FBQyxHQUFHRixRQUFRLENBQUNILEdBQUcsQ0FBQ0ksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7RUFDdkMsSUFBTUUsQ0FBQyxHQUFHSCxRQUFRLENBQUNILEdBQUcsQ0FBQ0ksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7RUFFdkMsSUFBSUgsS0FBSyxFQUFFO0lBQ1QsT0FBTyxPQUFPLEdBQUdDLENBQUMsR0FBRyxJQUFJLEdBQUdHLENBQUMsR0FBRyxJQUFJLEdBQUdDLENBQUMsR0FBRyxJQUFJLEdBQUdMLEtBQUssR0FBRyxHQUFHO0VBQy9ELENBQUMsTUFBTTtJQUNMLE9BQU8sTUFBTSxHQUFHQyxDQUFDLEdBQUcsSUFBSSxHQUFHRyxDQUFDLEdBQUcsSUFBSSxHQUFHQyxDQUFDLEdBQUcsR0FBRztFQUMvQztBQUNGLENBQUM7QUFFRCxJQUFNQyxLQUFLLEdBQUc7RUFBRUMsSUFBSSxFQUFFO0FBQWlCLENBQUM7O0FBRXhDO0FBQ0EsSUFBTUMsTUFBTSxHQUFHO0VBQ2JDLE1BQU0sRUFBRSxTQUFTO0VBQ2pCQyxNQUFNLEVBQUUsU0FBUztFQUNqQkMsSUFBSSxFQUFFO0lBQ0osRUFBRSxFQUFFLFNBQVM7SUFDYixHQUFHLEVBQUUsU0FBUztJQUNkLEdBQUcsRUFBRSxTQUFTO0lBQ2QsR0FBRyxFQUFFLFNBQVM7SUFDZCxHQUFHLEVBQUUsU0FBUztJQUNkLEdBQUcsRUFBRSxTQUFTO0lBQ2QsR0FBRyxFQUFFLFNBQVM7SUFDZCxHQUFHLEVBQUUsU0FBUztJQUNkLEdBQUcsRUFBRSxTQUFTO0lBQ2QsR0FBRyxFQUFFO0VBQ1AsQ0FBQztFQUNEQyxPQUFPLEVBQUU7SUFDUCxFQUFFLEVBQUUsU0FBUztJQUNiLEdBQUcsRUFBRSxTQUFTO0lBQ2QsR0FBRyxFQUFFLFNBQVM7SUFDZCxHQUFHLEVBQUUsU0FBUztJQUNkLEdBQUcsRUFBRSxTQUFTO0lBQUU7SUFDaEIsR0FBRyxFQUFFLFNBQVM7SUFDZCxHQUFHLEVBQUUsU0FBUztJQUNkLEdBQUcsRUFBRSxTQUFTO0lBQ2QsR0FBRyxFQUFFLFNBQVM7SUFDZCxHQUFHLEVBQUU7RUFDUCxDQUFDO0VBQ0RDLE9BQU8sRUFBRTtJQUNQLEVBQUUsRUFBRSxTQUFTO0lBQ2IsR0FBRyxFQUFFLFNBQVM7SUFDZCxHQUFHLEVBQUUsU0FBUztJQUNkLEdBQUcsRUFBRSxTQUFTO0lBQ2QsR0FBRyxFQUFFLFNBQVM7SUFBRTtJQUNoQixHQUFHLEVBQUUsU0FBUztJQUNkLEdBQUcsRUFBRSxTQUFTO0lBQ2QsR0FBRyxFQUFFLFNBQVM7SUFDZCxHQUFHLEVBQUUsU0FBUztJQUNkLEdBQUcsRUFBRTtFQUNQLENBQUM7RUFDREMsTUFBTSxFQUFFO0lBQ04sRUFBRSxFQUFFLFNBQVM7SUFDYixHQUFHLEVBQUUsU0FBUztJQUNkLEdBQUcsRUFBRSxTQUFTO0lBQ2QsR0FBRyxFQUFFLFNBQVM7SUFBRTtJQUNoQixHQUFHLEVBQUUsU0FBUztJQUNkLEdBQUcsRUFBRSxTQUFTO0lBQ2QsR0FBRyxFQUFFLFNBQVM7SUFDZCxHQUFHLEVBQUUsU0FBUztJQUNkLEdBQUcsRUFBRSxTQUFTO0lBQ2QsR0FBRyxFQUFFO0VBQ1AsQ0FBQztFQUNEQyxLQUFLLEVBQUUsU0FBUztFQUNoQkMsS0FBSyxFQUFFLFNBQVM7RUFDaEJDLFdBQVcsRUFBRSxhQUFhO0VBQzFCQyxHQUFHLFdBQUhBLEdBQUdBLENBQUNDLEtBQUssRUFBRTtJQUNULE9BQU9BLEtBQUssQ0FBQ0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxNQUFNLENBQUMsVUFBQ0MsQ0FBQyxFQUFDQyxDQUFDO01BQUEsT0FBR0QsQ0FBQyxDQUFDQyxDQUFDLENBQUM7SUFBQSxHQUFFLElBQUksQ0FBQztFQUNuRDtBQUNGLENBQUM7QUFFRCxJQUFNQyxNQUFNLEdBQUc7RUFDYkMsV0FBVyxFQUFFLE9BQU87RUFDcEJqQixNQUFNLEVBQUU7SUFDTmtCLElBQUksRUFBRTVCLFFBQVEsQ0FBQ1UsTUFBTSxDQUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRztFQUN6QztBQUNGLENBQUM7QUFFRCxJQUFNZSxRQUFRLEdBQUc7RUFDZnJCLEtBQUssRUFBTEEsS0FBSztFQUNMRSxNQUFNLEVBQU5BLE1BQU07RUFDTmdCLE1BQU0sRUFBTkEsTUFBTTtFQUNOMUIsUUFBUSxFQUFSQTtBQUNGLENBQUM7QUFFRCxJQUFJLE9BQU84QixNQUFNLEtBQUssV0FBVyxFQUFFO0VBQ2pDQSxNQUFNLENBQUNELFFBQVEsR0FBR0EsUUFBUTtBQUM1QixDIiwiZmlsZSI6Ii9kaXN0L2Fzc2V0cy9qcy9zZXR0aW5ncy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjYpO1xuIiwiY29uc3QgaGV4VG9SR0IgPSAoaGV4LCBhbHBoYSkgPT4ge1xuICBjb25zdCByID0gcGFyc2VJbnQoaGV4LnNsaWNlKDEsIDMpLCAxNilcbiAgY29uc3QgZyA9IHBhcnNlSW50KGhleC5zbGljZSgzLCA1KSwgMTYpXG4gIGNvbnN0IGIgPSBwYXJzZUludChoZXguc2xpY2UoNSwgNyksIDE2KVxuXG4gIGlmIChhbHBoYSkge1xuICAgIHJldHVybiBcInJnYmEoXCIgKyByICsgXCIsIFwiICsgZyArIFwiLCBcIiArIGIgKyBcIiwgXCIgKyBhbHBoYSArIFwiKVwiXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFwicmdiKFwiICsgciArIFwiLCBcIiArIGcgKyBcIiwgXCIgKyBiICsgXCIpXCJcbiAgfVxufVxuXG5jb25zdCBmb250cyA9IHsgYmFzZTogXCJIZWx2ZXRpY2EgTmV1ZVwiIH1cblxuLy8gaHR0cHM6Ly9tYXRlcmlhbC5pby9kZXNpZ24vY29sb3IvdGhlLWNvbG9yLXN5c3RlbS5odG1sI3Rvb2xzLWZvci1waWNraW5nLWNvbG9yc1xuY29uc3QgY29sb3JzID0ge1xuICBib2R5Qmc6ICcjRjdGOEY5JyxcbiAgYm9yZGVyOiAnI2VmZWZlZicsXG4gIGdyYXk6IHtcbiAgICA1MDogJyNlZGVlZjAnLFxuICAgIDEwMDogJyNkMGQ2ZGMnLFxuICAgIDIwMDogJyNiMmJhYzQnLFxuICAgIDMwMDogJyM5MzlmYWQnLFxuICAgIDQwMDogJyM3YzhhOWInLFxuICAgIDUwMDogJyM2NTc3OGEnLFxuICAgIDYwMDogJyM1ODY4NzknLFxuICAgIDcwMDogJyM0ODU1NjMnLFxuICAgIDgwMDogJyMzOTQyNGQnLFxuICAgIDkwMDogJyMyNzJlMzYnXG4gIH0sXG4gIHByaW1hcnk6IHtcbiAgICA1MDogJyNlYWVjZmInLFxuICAgIDEwMDogJyNjYWNlZjQnLFxuICAgIDIwMDogJyNhN2FlZWQnLFxuICAgIDMwMDogJyM4MzhlZTUnLFxuICAgIDQwMDogJyM2NzczZGYnLCAvLyAkcHJpbWFyeVxuICAgIDUwMDogJyM0YzU5ZDgnLFxuICAgIDYwMDogJyM0NzUwY2QnLFxuICAgIDcwMDogJyMzZDQ1YzAnLFxuICAgIDgwMDogJyMzNjNhYjQnLFxuICAgIDkwMDogJyMyYTI2OWUnXG4gIH0sXG4gIHN1Y2Nlc3M6IHtcbiAgICA1MDogJyNlYmY3ZTknLFxuICAgIDEwMDogJyNkMGVhYzknLFxuICAgIDIwMDogJyNiMmRkYTcnLFxuICAgIDMwMDogJyM5M2QxODMnLFxuICAgIDQwMDogJyM3Y2M2NjgnLCAvLyAkc3VjY2Vzc1xuICAgIDUwMDogJyM2OGJjNGMnLFxuICAgIDYwMDogJyM1ZGFjNDQnLFxuICAgIDcwMDogJyM1MDlhMzknLFxuICAgIDgwMDogJyM0NTg5MmYnLFxuICAgIDkwMDogJyMzMDY5MWUnLFxuICB9LFxuICBkYW5nZXI6IHtcbiAgICA1MDogJyNmZmViZjAnLFxuICAgIDEwMDogJyNmZmNlZDYnLFxuICAgIDIwMDogJyNmZjlhOWUnLFxuICAgIDMwMDogJyNmZjcwNzcnLCAvLyAkZGFuZ2VyXG4gICAgNDAwOiAnI2ZmNDg1MycsXG4gICAgNTAwOiAnI2ZmMzEzNicsXG4gICAgNjAwOiAnI2ZmMjYzNycsXG4gICAgNzAwOiAnI2YxMTYzMScsXG4gICAgODAwOiAnI2UzMDgyYScsXG4gICAgOTAwOiAnI2Q0MDAxZCdcbiAgfSxcbiAgYmxhY2s6ICcjMTEyYjRhJyxcbiAgd2hpdGU6ICcjRkZGRkZGJyxcbiAgdHJhbnNwYXJlbnQ6ICd0cmFuc3BhcmVudCcsXG4gIGdldChjb2xvcikge1xuICAgIHJldHVybiBjb2xvci5zcGxpdCgnLicpLnJlZHVjZSgobyxpKT0+b1tpXSwgdGhpcylcbiAgfVxufVxuXG5jb25zdCBjaGFydHMgPSB7XG4gIGNvbG9yU2NoZW1lOiAnbGlnaHQnLFxuICBjb2xvcnM6IHtcbiAgICBhcmVhOiBoZXhUb1JHQihjb2xvcnMucHJpbWFyeVsxMDBdLCAwLjUpXG4gIH1cbn1cblxuY29uc3Qgc2V0dGluZ3MgPSB7XG4gIGZvbnRzLFxuICBjb2xvcnMsXG4gIGNoYXJ0cyxcbiAgaGV4VG9SR0Jcbn1cblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHdpbmRvdy5zZXR0aW5ncyA9IHNldHRpbmdzXG59Il0sInNvdXJjZVJvb3QiOiIifQ==