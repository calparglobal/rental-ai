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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/plugins/chartjs-rounded-bar.js":
/*!***********************************************!*\
  !*** ./src/js/plugins/chartjs-rounded-bar.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var drawRoundedTopRectangle = function drawRoundedTopRectangle(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  // top right corner
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  // bottom right   corner
  ctx.lineTo(x + width, y + height);
  // bottom left corner
  ctx.lineTo(x, y + height);
  // top left   
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};
Chart.elements.RoundedTopRectangle = Chart.elements.Rectangle.extend({
  draw: function draw() {
    var ctx = this._chart.ctx;
    var vm = this._view;
    var left, right, top, bottom, signX, signY, borderSkipped;
    var borderWidth = vm.borderWidth;
    if (!vm.horizontal) {
      // bar
      left = vm.x - vm.width / 2;
      right = vm.x + vm.width / 2;
      top = vm.y;
      bottom = vm.base;
      signX = 1;
      signY = bottom > top ? 1 : -1;
      borderSkipped = vm.borderSkipped || 'bottom';
    } else {
      // horizontal bar
      left = vm.base;
      right = vm.x;
      top = vm.y - vm.height / 2;
      bottom = vm.y + vm.height / 2;
      signX = right > left ? 1 : -1;
      signY = 1;
      borderSkipped = vm.borderSkipped || 'left';
    }

    // Canvas doesn't allow us to stroke inside the width so we can
    // adjust the sizes to fit if we're setting a stroke on the line
    if (borderWidth) {
      // borderWidth shold be less than bar width and bar height.
      var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
      borderWidth = borderWidth > barSize ? barSize : borderWidth;
      var halfStroke = borderWidth / 2;
      // Adjust borderWidth when bar top position is near vm.base(zero).
      var borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
      var borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
      var borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
      var borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
      // not become a vertical line?
      if (borderLeft !== borderRight) {
        top = borderTop;
        bottom = borderBottom;
      }
      // not become a horizontal line?
      if (borderTop !== borderBottom) {
        left = borderLeft;
        right = borderRight;
      }
    }

    // calculate the bar width and roundess
    var barWidth = Math.abs(left - right);
    var roundness = this._chart.config.options.barRoundness || 0.5;
    var radius = barWidth * roundness * 0.5;

    // keep track of the original top of the bar
    var prevTop = top;

    // move the top down so there is room to draw the rounded top
    top = prevTop + radius;
    var barRadius = top - prevTop;
    ctx.beginPath();
    ctx.fillStyle = vm.backgroundColor;
    ctx.strokeStyle = vm.borderColor;
    ctx.lineWidth = borderWidth;

    // draw the rounded top rectangle
    drawRoundedTopRectangle(ctx, left, top - barRadius + 1, barWidth, bottom - prevTop, barRadius);
    ctx.fill();
    if (borderWidth) {
      ctx.stroke();
    }

    // restore the original top value so tooltips and scales still work
    top = prevTop;
  }
});
Chart.defaults.roundedBar = Chart.helpers.clone(Chart.defaults.bar);
Chart.controllers.roundedBar = Chart.controllers.bar.extend({
  dataElementType: Chart.elements.RoundedTopRectangle
});

/***/ }),

/***/ 11:
/*!*****************************************************!*\
  !*** multi ./src/js/plugins/chartjs-rounded-bar.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/alishahbas/Documents/Projects/Rental AI /rental-ai/src/js/plugins/chartjs-rounded-bar.js */"./src/js/plugins/chartjs-rounded-bar.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BsdWdpbnMvY2hhcnRqcy1yb3VuZGVkLWJhci5qcyJdLCJuYW1lcyI6WyJkcmF3Um91bmRlZFRvcFJlY3RhbmdsZSIsImN0eCIsIngiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJyYWRpdXMiLCJiZWdpblBhdGgiLCJtb3ZlVG8iLCJsaW5lVG8iLCJxdWFkcmF0aWNDdXJ2ZVRvIiwiY2xvc2VQYXRoIiwiQ2hhcnQiLCJlbGVtZW50cyIsIlJvdW5kZWRUb3BSZWN0YW5nbGUiLCJSZWN0YW5nbGUiLCJleHRlbmQiLCJkcmF3IiwiX2NoYXJ0Iiwidm0iLCJfdmlldyIsImxlZnQiLCJyaWdodCIsInRvcCIsImJvdHRvbSIsInNpZ25YIiwic2lnblkiLCJib3JkZXJTa2lwcGVkIiwiYm9yZGVyV2lkdGgiLCJob3Jpem9udGFsIiwiYmFzZSIsImJhclNpemUiLCJNYXRoIiwibWluIiwiYWJzIiwiaGFsZlN0cm9rZSIsImJvcmRlckxlZnQiLCJib3JkZXJSaWdodCIsImJvcmRlclRvcCIsImJvcmRlckJvdHRvbSIsImJhcldpZHRoIiwicm91bmRuZXNzIiwiY29uZmlnIiwib3B0aW9ucyIsImJhclJvdW5kbmVzcyIsInByZXZUb3AiLCJiYXJSYWRpdXMiLCJmaWxsU3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzdHJva2VTdHlsZSIsImJvcmRlckNvbG9yIiwibGluZVdpZHRoIiwiZmlsbCIsInN0cm9rZSIsImRlZmF1bHRzIiwicm91bmRlZEJhciIsImhlbHBlcnMiLCJjbG9uZSIsImJhciIsImNvbnRyb2xsZXJzIiwiZGF0YUVsZW1lbnRUeXBlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztR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SUFFaEc3QyxHQUFHLENBQUNtRCxJQUFJLENBQUMsQ0FBQztJQUNWLElBQUl4QixXQUFXLEVBQUU7TUFDZjNCLEdBQUcsQ0FBQ29ELE1BQU0sQ0FBQyxDQUFDO0lBQ2Q7O0lBRUE7SUFDQTlCLEdBQUcsR0FBR3NCLE9BQU87RUFDZjtBQUNGLENBQUMsQ0FBQztBQUVGakMsS0FBSyxDQUFDMEMsUUFBUSxDQUFDQyxVQUFVLEdBQUczQyxLQUFLLENBQUM0QyxPQUFPLENBQUNDLEtBQUssQ0FBQzdDLEtBQUssQ0FBQzBDLFFBQVEsQ0FBQ0ksR0FBRyxDQUFDO0FBRW5FOUMsS0FBSyxDQUFDK0MsV0FBVyxDQUFDSixVQUFVLEdBQUczQyxLQUFLLENBQUMrQyxXQUFXLENBQUNELEdBQUcsQ0FBQzFDLE1BQU0sQ0FBQztFQUMxRDRDLGVBQWUsRUFBRWhELEtBQUssQ0FBQ0MsUUFBUSxDQUFDQztBQUNsQyxDQUFDLENBQUMsQyIsImZpbGUiOiIvZGlzdC9hc3NldHMvanMvY2hhcnRqcy1yb3VuZGVkLWJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuIiwiY29uc3QgZHJhd1JvdW5kZWRUb3BSZWN0YW5nbGUgPSAoY3R4LCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMpID0+IHtcbiAgY3R4LmJlZ2luUGF0aCgpXG4gIGN0eC5tb3ZlVG8oeCArIHJhZGl1cywgeSlcbiAgLy8gdG9wIHJpZ2h0IGNvcm5lclxuICBjdHgubGluZVRvKHggKyB3aWR0aCAtIHJhZGl1cywgeSlcbiAgY3R4LnF1YWRyYXRpY0N1cnZlVG8oeCArIHdpZHRoLCB5LCB4ICsgd2lkdGgsIHkgKyByYWRpdXMpXG4gIC8vIGJvdHRvbSByaWdodCAgIGNvcm5lclxuICBjdHgubGluZVRvKHggKyB3aWR0aCwgeSArIGhlaWdodClcbiAgLy8gYm90dG9tIGxlZnQgY29ybmVyXG4gIGN0eC5saW5lVG8oeCwgeSArIGhlaWdodCk7XG4gIC8vIHRvcCBsZWZ0ICAgXG4gIGN0eC5saW5lVG8oeCwgeSArIHJhZGl1cylcbiAgY3R4LnF1YWRyYXRpY0N1cnZlVG8oeCwgeSwgeCArIHJhZGl1cywgeSlcbiAgY3R4LmNsb3NlUGF0aCgpXG59XG5cbkNoYXJ0LmVsZW1lbnRzLlJvdW5kZWRUb3BSZWN0YW5nbGUgPSBDaGFydC5lbGVtZW50cy5SZWN0YW5nbGUuZXh0ZW5kKHtcbiAgZHJhdzogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN0eCA9IHRoaXMuX2NoYXJ0LmN0eDtcbiAgICB2YXIgdm0gPSB0aGlzLl92aWV3O1xuICAgIHZhciBsZWZ0LCByaWdodCwgdG9wLCBib3R0b20sIHNpZ25YLCBzaWduWSwgYm9yZGVyU2tpcHBlZDtcbiAgICB2YXIgYm9yZGVyV2lkdGggPSB2bS5ib3JkZXJXaWR0aDtcblxuICAgIGlmICghdm0uaG9yaXpvbnRhbCkge1xuICAgICAgLy8gYmFyXG4gICAgICBsZWZ0ID0gdm0ueCAtIHZtLndpZHRoIC8gMjtcbiAgICAgIHJpZ2h0ID0gdm0ueCArIHZtLndpZHRoIC8gMjtcbiAgICAgIHRvcCA9IHZtLnk7XG4gICAgICBib3R0b20gPSB2bS5iYXNlO1xuICAgICAgc2lnblggPSAxO1xuICAgICAgc2lnblkgPSBib3R0b20gPiB0b3A/IDE6IC0xO1xuICAgICAgYm9yZGVyU2tpcHBlZCA9IHZtLmJvcmRlclNraXBwZWQgfHwgJ2JvdHRvbSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhvcml6b250YWwgYmFyXG4gICAgICBsZWZ0ID0gdm0uYmFzZTtcbiAgICAgIHJpZ2h0ID0gdm0ueDtcbiAgICAgIHRvcCA9IHZtLnkgLSB2bS5oZWlnaHQgLyAyO1xuICAgICAgYm90dG9tID0gdm0ueSArIHZtLmhlaWdodCAvIDI7XG4gICAgICBzaWduWCA9IHJpZ2h0ID4gbGVmdD8gMTogLTE7XG4gICAgICBzaWduWSA9IDE7XG4gICAgICBib3JkZXJTa2lwcGVkID0gdm0uYm9yZGVyU2tpcHBlZCB8fCAnbGVmdCc7XG4gICAgfVxuXG4gICAgLy8gQ2FudmFzIGRvZXNuJ3QgYWxsb3cgdXMgdG8gc3Ryb2tlIGluc2lkZSB0aGUgd2lkdGggc28gd2UgY2FuXG4gICAgLy8gYWRqdXN0IHRoZSBzaXplcyB0byBmaXQgaWYgd2UncmUgc2V0dGluZyBhIHN0cm9rZSBvbiB0aGUgbGluZVxuICAgIGlmIChib3JkZXJXaWR0aCkge1xuICAgICAgLy8gYm9yZGVyV2lkdGggc2hvbGQgYmUgbGVzcyB0aGFuIGJhciB3aWR0aCBhbmQgYmFyIGhlaWdodC5cbiAgICAgIHZhciBiYXJTaXplID0gTWF0aC5taW4oTWF0aC5hYnMobGVmdCAtIHJpZ2h0KSwgTWF0aC5hYnModG9wIC0gYm90dG9tKSk7XG4gICAgICBib3JkZXJXaWR0aCA9IGJvcmRlcldpZHRoID4gYmFyU2l6ZT8gYmFyU2l6ZTogYm9yZGVyV2lkdGg7XG4gICAgICB2YXIgaGFsZlN0cm9rZSA9IGJvcmRlcldpZHRoIC8gMjtcbiAgICAgIC8vIEFkanVzdCBib3JkZXJXaWR0aCB3aGVuIGJhciB0b3AgcG9zaXRpb24gaXMgbmVhciB2bS5iYXNlKHplcm8pLlxuICAgICAgdmFyIGJvcmRlckxlZnQgPSBsZWZ0ICsgKGJvcmRlclNraXBwZWQgIT09ICdsZWZ0Jz8gaGFsZlN0cm9rZSAqIHNpZ25YOiAwKTtcbiAgICAgIHZhciBib3JkZXJSaWdodCA9IHJpZ2h0ICsgKGJvcmRlclNraXBwZWQgIT09ICdyaWdodCc/IC1oYWxmU3Ryb2tlICogc2lnblg6IDApO1xuICAgICAgdmFyIGJvcmRlclRvcCA9IHRvcCArIChib3JkZXJTa2lwcGVkICE9PSAndG9wJz8gaGFsZlN0cm9rZSAqIHNpZ25ZOiAwKTtcbiAgICAgIHZhciBib3JkZXJCb3R0b20gPSBib3R0b20gKyAoYm9yZGVyU2tpcHBlZCAhPT0gJ2JvdHRvbSc/IC1oYWxmU3Ryb2tlICogc2lnblk6IDApO1xuICAgICAgLy8gbm90IGJlY29tZSBhIHZlcnRpY2FsIGxpbmU/XG4gICAgICBpZiAoYm9yZGVyTGVmdCAhPT0gYm9yZGVyUmlnaHQpIHtcbiAgICAgICAgdG9wID0gYm9yZGVyVG9wO1xuICAgICAgICBib3R0b20gPSBib3JkZXJCb3R0b207XG4gICAgICB9XG4gICAgICAvLyBub3QgYmVjb21lIGEgaG9yaXpvbnRhbCBsaW5lP1xuICAgICAgaWYgKGJvcmRlclRvcCAhPT0gYm9yZGVyQm90dG9tKSB7XG4gICAgICAgIGxlZnQgPSBib3JkZXJMZWZ0O1xuICAgICAgICByaWdodCA9IGJvcmRlclJpZ2h0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNhbGN1bGF0ZSB0aGUgYmFyIHdpZHRoIGFuZCByb3VuZGVzc1xuICAgIHZhciBiYXJXaWR0aCA9IE1hdGguYWJzKGxlZnQgLSByaWdodCk7XG4gICAgdmFyIHJvdW5kbmVzcyA9IHRoaXMuX2NoYXJ0LmNvbmZpZy5vcHRpb25zLmJhclJvdW5kbmVzcyB8fCAwLjU7XG4gICAgdmFyIHJhZGl1cyA9IGJhcldpZHRoICogcm91bmRuZXNzICogMC41O1xuXG4gICAgLy8ga2VlcCB0cmFjayBvZiB0aGUgb3JpZ2luYWwgdG9wIG9mIHRoZSBiYXJcbiAgICB2YXIgcHJldlRvcCA9IHRvcDtcblxuICAgIC8vIG1vdmUgdGhlIHRvcCBkb3duIHNvIHRoZXJlIGlzIHJvb20gdG8gZHJhdyB0aGUgcm91bmRlZCB0b3BcbiAgICB0b3AgPSBwcmV2VG9wICsgcmFkaXVzO1xuICAgIHZhciBiYXJSYWRpdXMgPSB0b3AgLSBwcmV2VG9wO1xuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSB2bS5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gdm0uYm9yZGVyQ29sb3I7XG4gICAgY3R4LmxpbmVXaWR0aCA9IGJvcmRlcldpZHRoO1xuXG4gICAgLy8gZHJhdyB0aGUgcm91bmRlZCB0b3AgcmVjdGFuZ2xlXG4gICAgZHJhd1JvdW5kZWRUb3BSZWN0YW5nbGUoY3R4LCBsZWZ0LCAodG9wIC0gYmFyUmFkaXVzICsgMSksIGJhcldpZHRoLCBib3R0b20gLSBwcmV2VG9wLCBiYXJSYWRpdXMpO1xuXG4gICAgY3R4LmZpbGwoKTtcbiAgICBpZiAoYm9yZGVyV2lkdGgpIHtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICAvLyByZXN0b3JlIHRoZSBvcmlnaW5hbCB0b3AgdmFsdWUgc28gdG9vbHRpcHMgYW5kIHNjYWxlcyBzdGlsbCB3b3JrXG4gICAgdG9wID0gcHJldlRvcDtcbiAgfSxcbn0pXG5cbkNoYXJ0LmRlZmF1bHRzLnJvdW5kZWRCYXIgPSBDaGFydC5oZWxwZXJzLmNsb25lKENoYXJ0LmRlZmF1bHRzLmJhcilcblxuQ2hhcnQuY29udHJvbGxlcnMucm91bmRlZEJhciA9IENoYXJ0LmNvbnRyb2xsZXJzLmJhci5leHRlbmQoe1xuICBkYXRhRWxlbWVudFR5cGU6IENoYXJ0LmVsZW1lbnRzLlJvdW5kZWRUb3BSZWN0YW5nbGVcbn0pIl0sInNvdXJjZVJvb3QiOiIifQ==