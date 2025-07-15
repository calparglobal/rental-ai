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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/plugins/vector-maps.js":
/*!***************************************!*\
  !*** ./src/js/plugins/vector-maps.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  'use strict';

  JQVMap.prototype.resizeContainer = function () {
    this.width = this.container.width();
    this.height = this.container.height();
    this.resize();
    this.canvas.setSize(this.width, this.height);
    this.applyTransform();
    this.positionPins();
  };
  JQVMap.prototype.setFocus = function (codes) {
    var _this = this;
    var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (typeof codes === 'string') {
      codes = [codes];
    }
    var map = this;
    var coords, newCoords;
    codes.forEach(function (cc) {
      var el = $('#' + _this.getCountryId(cc));
      var path = el[0];
      var bbox = path.getBBox();
      if (typeof coords == 'undefined') {
        coords = bbox;
      } else {
        newCoords = {
          x: Math.min(coords.x, bbox.x),
          y: Math.min(coords.y, bbox.y),
          width: Math.max(coords.x + coords.width, bbox.x + bbox.width) - Math.min(coords.x, bbox.x),
          height: Math.max(coords.y + coords.height, bbox.y + bbox.height) - Math.min(coords.y, bbox.y)
        };
        coords = newCoords;
      }
    });
    var scale = Math.min(this.width / coords.width, this.height / coords.height);
    if (scale > this.zoomMaxStep * this.baseScale) {
      scale = this.zoomMaxStep * this.baseScale;
    } else if (scale < this.baseScale) {
      scale = this.baseScale;
    }
    var zoomStep = scale / this.scale;
    this.zoomCurStep = this.zoomCurStep * Math.round(zoomStep);
    var cX = coords.x * scale;
    var cY = coords.y * scale;
    var middleX = coords.width / 2;
    var middleY = coords.height / 2;
    var anchorX = (cX - middleX) / scale * -1;
    var anchorY = (cY - middleY) / scale * -1;
    var transX = anchorX + this.defaultWidth * (this.width / (this.defaultWidth * scale)) / 2;
    var transY = anchorY + this.defaultHeight * (this.height / (this.defaultHeight * scale)) / 2;
    var count = Math.abs(Math.round((scale - this.scale) * 60 / Math.max(scale, this.scale))) || 30;
    if (animate) {
      var _frame = function frame() {
        i += 1;
        map.scale = scaleStart + scaleDiff * i;
        map.transX = (transXStart + transXDiff * i) / map.scale;
        map.transY = (transYStart + transYDiff * i) / map.scale;
        map.applyTransform();
        map.positionPins();
        if (i < count) {
          requestAnimationFrame(_frame);
        }
      };
      var i = 0,
        scaleStart,
        scaleDiff,
        transXStart,
        transXDiff,
        transYStart,
        transYDiff;
      scaleStart = this.scale;
      scaleDiff = (scale - scaleStart) / count;
      transXStart = this.transX * this.scale;
      transYStart = this.transY * this.scale;
      transXDiff = (transX * scale - transXStart) / count;
      transYDiff = (transY * scale - transYStart) / count;
      requestAnimationFrame(_frame);
    } else {
      this.transX = transX;
      this.transY = transY;
      this.setScale(scale);
      this.positionPins();
    }
  };
  function escapeXml(string) {
    return string.replace(/[<>]/g, function (c) {
      switch (c) {
        case '<':
          return "<";
        case '>':
          return ">";
      }
    });
  }
  function resizeContainer() {
    $('[data-toggle="vector-map"]').each(function () {
      var element = $(this);
      var map = element.data().mapObject;
      map.resizeContainer();
      var focus = element.data('vector-map-focus');
      if (focus) {
        map.setFocus(focus);
      }
    });
  }
  $('[data-toggle="vector-map"]').each(function () {
    var element = $(this);
    var values = element.data('vector-map-values') ? maps[element.data('vector-map-values')] || {} : {};
    var pins = {};
    try {
      pins = element.data('vector-map-pins');
      for (var key in pins) {
        if (pins.hasOwnProperty(key)) {
          pins[key] = escapeXml(pins[key]);
        }
      }
    } catch (e) {}
    var options = {
      map: element.data('vector-map-map'),
      zoomOnScroll: void 0 !== element.data('vector-map-zoom-on-scroll') ? element.data('vector-map-zoom-on-scroll') : false,
      enableZoom: void 0 !== element.data('vector-map-enable-zoom') ? element.data('vector-map-enable-zoom') : false,
      showTooltip: void 0 !== element.data('vector-map-show-tooltip') ? element.data('vector-map-show-tooltip') : true,
      focusOnSelect: void 0 !== element.data('vector-map-focus-on-select') ? element.data('vector-map-focus-on-select') : false,
      backgroundColor: void 0 !== element.data('vector-map-background-color') ? element.data('vector-map-background-color') : 'transparent',
      values: values,
      color: settings.colors.gray[50],
      selectedColor: settings.colors.primary[300],
      hoverColor: settings.colors.primary[100],
      scaleColors: [settings.colors.primary[50], settings.colors.primary[500]],
      borderWidth: 1,
      borderColor: '#ffffff',
      borderOpacity: 1,
      normalizeFunction: 'polynomial',
      colors: {},
      pins: pins,
      pinMode: 'content',
      onLabelShow: function onLabelShow(e, label, code) {
        label.html(label.html() + ' - ' + values[code]);
      },
      onRegionSelect: function onRegionSelect(event, code, region) {
        if (options.focusOnSelect) {
          map.setFocus(code);
        }
      }
    };
    var colors = element.data('vector-map-values-colors');
    if (colors) {
      for (var key in values) {
        if (values.hasOwnProperty(key) && colors[values[key]] !== undefined) {
          var color = colors[values[key]];
          options.colors[key] = settings.colors.get(color) || color;
        }
      }
    }
    element.vectorMap(options);
    var map = $(this).data().mapObject;
    if (Object.keys(options.colors)) {
      map.setColors(options.colors);
    }
    var scale = element.data('vector-map-scale');
    var focus = element.data('vector-map-focus');
    if (scale) {
      map.setScale(scale);
      map.positionPins();
    } else if (focus) {
      map.setFocus(focus);
    }
  });
  $('[data-toggle=vector-map-focus]').on('click', function (e) {
    e.preventDefault();
    var element = $(this);
    var target = $(element.data('target'));
    if (!target) {
      return;
    }
    var map = target.data().mapObject;
    var focus = element.data('focus');
    var animate = element.data('animate');
    if (focus) {
      map.setFocus(focus, animate);
    }
  });
  var drawer = document.querySelector('.mdk-drawer');
  if (drawer) {
    drawer.addEventListener('mdk-drawer-change', function () {
      return requestAnimationFrame(resizeContainer);
    });
  }
})();

/***/ }),

/***/ 24:
/*!*********************************************!*\
  !*** multi ./src/js/plugins/vector-maps.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/alishahbas/Documents/Projects/Rental AI /rental-ai/src/js/plugins/vector-maps.js */"./src/js/plugins/vector-maps.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BsdWdpbnMvdmVjdG9yLW1hcHMuanMiXSwibmFtZXMiOlsiSlFWTWFwIiwicHJvdG90eXBlIiwicmVzaXplQ29udGFpbmVyIiwid2lkdGgiLCJjb250YWluZXIiLCJoZWlnaHQiLCJyZXNpemUiLCJjYW52YXMiLCJzZXRTaXplIiwiYXBwbHlUcmFuc2Zvcm0iLCJwb3NpdGlvblBpbnMiLCJzZXRGb2N1cyIsImNvZGVzIiwiX3RoaXMiLCJhbmltYXRlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwibWFwIiwiY29vcmRzIiwibmV3Q29vcmRzIiwiZm9yRWFjaCIsImNjIiwiZWwiLCIkIiwiZ2V0Q291bnRyeUlkIiwicGF0aCIsImJib3giLCJnZXRCQm94IiwieCIsIk1hdGgiLCJtaW4iLCJ5IiwibWF4Iiwic2NhbGUiLCJ6b29tTWF4U3RlcCIsImJhc2VTY2FsZSIsInpvb21TdGVwIiwiem9vbUN1clN0ZXAiLCJyb3VuZCIsImNYIiwiY1kiLCJtaWRkbGVYIiwibWlkZGxlWSIsImFuY2hvclgiLCJhbmNob3JZIiwidHJhbnNYIiwiZGVmYXVsdFdpZHRoIiwidHJhbnNZIiwiZGVmYXVsdEhlaWdodCIsImNvdW50IiwiYWJzIiwiX2ZyYW1lIiwiZnJhbWUiLCJpIiwic2NhbGVTdGFydCIsInNjYWxlRGlmZiIsInRyYW5zWFN0YXJ0IiwidHJhbnNYRGlmZiIsInRyYW5zWVN0YXJ0IiwidHJhbnNZRGlmZiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNldFNjYWxlIiwiZXNjYXBlWG1sIiwic3RyaW5nIiwicmVwbGFjZSIsImMiLCJlYWNoIiwiZWxlbWVudCIsImRhdGEiLCJtYXBPYmplY3QiLCJmb2N1cyIsInZhbHVlcyIsIm1hcHMiLCJwaW5zIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJlIiwib3B0aW9ucyIsInpvb21PblNjcm9sbCIsImVuYWJsZVpvb20iLCJzaG93VG9vbHRpcCIsImZvY3VzT25TZWxlY3QiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvciIsInNldHRpbmdzIiwiY29sb3JzIiwiZ3JheSIsInNlbGVjdGVkQ29sb3IiLCJwcmltYXJ5IiwiaG92ZXJDb2xvciIsInNjYWxlQ29sb3JzIiwiYm9yZGVyV2lkdGgiLCJib3JkZXJDb2xvciIsImJvcmRlck9wYWNpdHkiLCJub3JtYWxpemVGdW5jdGlvbiIsInBpbk1vZGUiLCJvbkxhYmVsU2hvdyIsImxhYmVsIiwiY29kZSIsImh0bWwiLCJvblJlZ2lvblNlbGVjdCIsImV2ZW50IiwicmVnaW9uIiwiZ2V0IiwidmVjdG9yTWFwIiwiT2JqZWN0Iiwia2V5cyIsInNldENvbG9ycyIsIm9uIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJkcmF3ZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7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bUJBQW1CLEVBQUU7TUFBQSxPQUFNdEQscUJBQXFCLENBQUMzRCxlQUFlLENBQUM7SUFBQSxFQUFDO0VBQzVGO0FBRUYsQ0FBQyxFQUFFLENBQUMsQyIsImZpbGUiOiIvZGlzdC9hc3NldHMvanMvdmVjdG9yLW1hcHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI0KTtcbiIsIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgSlFWTWFwLnByb3RvdHlwZS5yZXNpemVDb250YWluZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMuY29udGFpbmVyLndpZHRoKClcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuY29udGFpbmVyLmhlaWdodCgpXG4gICAgdGhpcy5yZXNpemUoKVxuICAgIHRoaXMuY2FudmFzLnNldFNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG4gICAgdGhpcy5hcHBseVRyYW5zZm9ybSgpXG4gICAgdGhpcy5wb3NpdGlvblBpbnMoKVxuICB9XG5cbiAgSlFWTWFwLnByb3RvdHlwZS5zZXRGb2N1cyA9IGZ1bmN0aW9uIChjb2RlcywgYW5pbWF0ZSA9IHRydWUpIHtcbiAgICBpZiAodHlwZW9mIGNvZGVzID09PSAnc3RyaW5nJykge1xuICAgICAgY29kZXMgPSBbY29kZXNdXG4gICAgfVxuXG4gICAgdmFyIG1hcCA9IHRoaXNcbiAgICB2YXIgY29vcmRzLCBuZXdDb29yZHM7XG5cbiAgICBjb2Rlcy5mb3JFYWNoKGNjID0+IHtcbiAgICAgIHZhciBlbCA9ICQoJyMnICsgdGhpcy5nZXRDb3VudHJ5SWQoY2MpKVxuICAgICAgdmFyIHBhdGggPSBlbFswXVxuICAgICAgdmFyIGJib3ggPSBwYXRoLmdldEJCb3goKVxuXG4gICAgICBpZiAodHlwZW9mIGNvb3JkcyA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb29yZHMgPSBiYm94XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbmV3Q29vcmRzID0ge1xuICAgICAgICAgIHg6IE1hdGgubWluKGNvb3Jkcy54LCBiYm94LngpLFxuICAgICAgICAgIHk6IE1hdGgubWluKGNvb3Jkcy55LCBiYm94LnkpLFxuICAgICAgICAgIHdpZHRoOiBNYXRoLm1heChjb29yZHMueCArIGNvb3Jkcy53aWR0aCwgYmJveC54ICsgYmJveC53aWR0aCkgLSBNYXRoLm1pbihjb29yZHMueCwgYmJveC54KSxcbiAgICAgICAgICBoZWlnaHQ6IE1hdGgubWF4KGNvb3Jkcy55ICsgY29vcmRzLmhlaWdodCwgYmJveC55ICsgYmJveC5oZWlnaHQpIC0gTWF0aC5taW4oY29vcmRzLnksIGJib3gueSlcbiAgICAgICAgfVxuICAgICAgICBjb29yZHMgPSBuZXdDb29yZHNcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdmFyIHNjYWxlID0gTWF0aC5taW4odGhpcy53aWR0aCAvIGNvb3Jkcy53aWR0aCwgdGhpcy5oZWlnaHQgLyBjb29yZHMuaGVpZ2h0KVxuXG4gICAgaWYgKHNjYWxlID4gdGhpcy56b29tTWF4U3RlcCAqIHRoaXMuYmFzZVNjYWxlKSB7XG4gICAgICBzY2FsZSA9IHRoaXMuem9vbU1heFN0ZXAgKiB0aGlzLmJhc2VTY2FsZVxuICAgIH1cbiAgICBlbHNlIGlmIChzY2FsZSA8IHRoaXMuYmFzZVNjYWxlKSB7XG4gICAgICBzY2FsZSA9IHRoaXMuYmFzZVNjYWxlXG4gICAgfVxuXG4gICAgdmFyIHpvb21TdGVwID0gc2NhbGUgLyB0aGlzLnNjYWxlXG4gICAgdGhpcy56b29tQ3VyU3RlcCA9IHRoaXMuem9vbUN1clN0ZXAgKiBNYXRoLnJvdW5kKHpvb21TdGVwKVxuXG4gICAgdmFyIGNYID0gY29vcmRzLnggKiBzY2FsZVxuICAgIHZhciBjWSA9IGNvb3Jkcy55ICogc2NhbGVcblxuICAgIHZhciBtaWRkbGVYID0gY29vcmRzLndpZHRoIC8gMlxuICAgIHZhciBtaWRkbGVZID0gY29vcmRzLmhlaWdodCAvIDJcblxuICAgIHZhciBhbmNob3JYID0gKGNYIC0gbWlkZGxlWCkgLyBzY2FsZSAqIC0xXG4gICAgdmFyIGFuY2hvclkgPSAoY1kgLSBtaWRkbGVZKSAvIHNjYWxlICogLTFcbiAgICBcbiAgICB2YXIgdHJhbnNYID0gYW5jaG9yWCArIHRoaXMuZGVmYXVsdFdpZHRoICogKHRoaXMud2lkdGggLyAodGhpcy5kZWZhdWx0V2lkdGggKiBzY2FsZSkpIC8gMlxuICAgIHZhciB0cmFuc1kgPSBhbmNob3JZICsgdGhpcy5kZWZhdWx0SGVpZ2h0ICogKHRoaXMuaGVpZ2h0IC8gKHRoaXMuZGVmYXVsdEhlaWdodCAqIHNjYWxlKSkgLyAyXG5cbiAgICB2YXIgY291bnQgPSBNYXRoLmFicyhNYXRoLnJvdW5kKChzY2FsZSAtIHRoaXMuc2NhbGUpICogNjAgLyBNYXRoLm1heChzY2FsZSwgdGhpcy5zY2FsZSkpKSB8fCAzMFxuICAgIFxuICAgIGlmIChhbmltYXRlKSB7XG4gICAgICB2YXIgaSA9IDAsXG4gICAgICAgICAgc2NhbGVTdGFydCxcbiAgICAgICAgICBzY2FsZURpZmYsXG4gICAgICAgICAgdHJhbnNYU3RhcnQsXG4gICAgICAgICAgdHJhbnNYRGlmZixcbiAgICAgICAgICB0cmFuc1lTdGFydCxcbiAgICAgICAgICB0cmFuc1lEaWZmXG5cbiAgICAgIHNjYWxlU3RhcnQgPSB0aGlzLnNjYWxlO1xuICAgICAgc2NhbGVEaWZmID0gKHNjYWxlIC0gc2NhbGVTdGFydCkgLyBjb3VudDtcbiAgICAgIHRyYW5zWFN0YXJ0ID0gdGhpcy50cmFuc1ggKiB0aGlzLnNjYWxlO1xuICAgICAgdHJhbnNZU3RhcnQgPSB0aGlzLnRyYW5zWSAqIHRoaXMuc2NhbGU7XG4gICAgICB0cmFuc1hEaWZmID0gKHRyYW5zWCAqIHNjYWxlIC0gdHJhbnNYU3RhcnQpIC8gY291bnQ7XG4gICAgICB0cmFuc1lEaWZmID0gKHRyYW5zWSAqIHNjYWxlIC0gdHJhbnNZU3RhcnQpIC8gY291bnQ7XG5cbiAgICAgIGZ1bmN0aW9uIGZyYW1lKCkge1xuICAgICAgICBpICs9IDFcbiAgICAgICAgbWFwLnNjYWxlID0gc2NhbGVTdGFydCArIHNjYWxlRGlmZiAqIGlcbiAgICAgICAgbWFwLnRyYW5zWCA9ICh0cmFuc1hTdGFydCArIHRyYW5zWERpZmYgKiBpKSAvIG1hcC5zY2FsZVxuICAgICAgICBtYXAudHJhbnNZID0gKHRyYW5zWVN0YXJ0ICsgdHJhbnNZRGlmZiAqIGkpIC8gbWFwLnNjYWxlXG4gICAgICAgIG1hcC5hcHBseVRyYW5zZm9ybSgpXG4gICAgICAgIG1hcC5wb3NpdGlvblBpbnMoKVxuICAgICAgICBcbiAgICAgICAgaWYgKGkgPCBjb3VudCkge1xuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmcmFtZSkgXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZyYW1lKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMudHJhbnNYID0gdHJhbnNYXG4gICAgICB0aGlzLnRyYW5zWSA9IHRyYW5zWVxuICAgICAgdGhpcy5zZXRTY2FsZShzY2FsZSlcbiAgICAgIHRoaXMucG9zaXRpb25QaW5zKClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlc2NhcGVYbWwoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bPD5dL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgY2FzZSAnPCc6IHJldHVybiAnXFx1MDAzYyc7XG4gICAgICAgIGNhc2UgJz4nOiByZXR1cm4gJ1xcdTAwM2UnO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzaXplQ29udGFpbmVyKCkge1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInZlY3Rvci1tYXBcIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgZWxlbWVudCA9ICQodGhpcylcbiAgICAgIGNvbnN0IG1hcCA9IGVsZW1lbnQuZGF0YSgpLm1hcE9iamVjdFxuICAgICAgbWFwLnJlc2l6ZUNvbnRhaW5lcigpXG4gICAgICBcbiAgICAgIGNvbnN0IGZvY3VzID0gZWxlbWVudC5kYXRhKCd2ZWN0b3ItbWFwLWZvY3VzJylcbiAgICAgIGlmIChmb2N1cykge1xuICAgICAgICBtYXAuc2V0Rm9jdXMoZm9jdXMpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gICQoJ1tkYXRhLXRvZ2dsZT1cInZlY3Rvci1tYXBcIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbGVtZW50ID0gJCh0aGlzKVxuICAgIHZhciB2YWx1ZXMgPSBlbGVtZW50LmRhdGEoJ3ZlY3Rvci1tYXAtdmFsdWVzJykgPyBtYXBzW2VsZW1lbnQuZGF0YSgndmVjdG9yLW1hcC12YWx1ZXMnKV0gfHwge30gOiB7fVxuICAgIGxldCBwaW5zID0ge31cblxuICAgIHRyeSB7XG4gICAgICBwaW5zID0gZWxlbWVudC5kYXRhKCd2ZWN0b3ItbWFwLXBpbnMnKVxuICAgICAgZm9yICh2YXIga2V5IGluIHBpbnMpIHtcbiAgICAgICAgaWYgKHBpbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHBpbnNba2V5XSA9IGVzY2FwZVhtbChwaW5zW2tleV0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2goZSkge31cblxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgbWFwOiBlbGVtZW50LmRhdGEoJ3ZlY3Rvci1tYXAtbWFwJyksXG4gICAgICB6b29tT25TY3JvbGw6IHZvaWQgMCAhPT0gZWxlbWVudC5kYXRhKCd2ZWN0b3ItbWFwLXpvb20tb24tc2Nyb2xsJykgXG4gICAgICAgID8gZWxlbWVudC5kYXRhKCd2ZWN0b3ItbWFwLXpvb20tb24tc2Nyb2xsJykgXG4gICAgICAgIDogZmFsc2UsXG4gICAgICBlbmFibGVab29tOiB2b2lkIDAgIT09IGVsZW1lbnQuZGF0YSgndmVjdG9yLW1hcC1lbmFibGUtem9vbScpIFxuICAgICAgICA/IGVsZW1lbnQuZGF0YSgndmVjdG9yLW1hcC1lbmFibGUtem9vbScpIFxuICAgICAgICA6IGZhbHNlLFxuICAgICAgc2hvd1Rvb2x0aXA6IHZvaWQgMCAhPT0gZWxlbWVudC5kYXRhKCd2ZWN0b3ItbWFwLXNob3ctdG9vbHRpcCcpIFxuICAgICAgICA/IGVsZW1lbnQuZGF0YSgndmVjdG9yLW1hcC1zaG93LXRvb2x0aXAnKSBcbiAgICAgICAgOiB0cnVlLFxuICAgICAgZm9jdXNPblNlbGVjdDogdm9pZCAwICE9PSBlbGVtZW50LmRhdGEoJ3ZlY3Rvci1tYXAtZm9jdXMtb24tc2VsZWN0JykgXG4gICAgICAgID8gZWxlbWVudC5kYXRhKCd2ZWN0b3ItbWFwLWZvY3VzLW9uLXNlbGVjdCcpIFxuICAgICAgICA6IGZhbHNlLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiB2b2lkIDAgIT09IGVsZW1lbnQuZGF0YSgndmVjdG9yLW1hcC1iYWNrZ3JvdW5kLWNvbG9yJykgXG4gICAgICAgID8gZWxlbWVudC5kYXRhKCd2ZWN0b3ItbWFwLWJhY2tncm91bmQtY29sb3InKSBcbiAgICAgICAgOiAndHJhbnNwYXJlbnQnLFxuICAgICAgdmFsdWVzLFxuICAgICAgY29sb3I6IHNldHRpbmdzLmNvbG9ycy5ncmF5WzUwXSxcbiAgICAgIHNlbGVjdGVkQ29sb3I6IHNldHRpbmdzLmNvbG9ycy5wcmltYXJ5WzMwMF0sXG4gICAgICBob3ZlckNvbG9yOiBzZXR0aW5ncy5jb2xvcnMucHJpbWFyeVsxMDBdLFxuICAgICAgc2NhbGVDb2xvcnM6IFsgc2V0dGluZ3MuY29sb3JzLnByaW1hcnlbNTBdLCBzZXR0aW5ncy5jb2xvcnMucHJpbWFyeVs1MDBdIF0sXG4gICAgICBib3JkZXJXaWR0aDogMSxcbiAgICAgIGJvcmRlckNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICBib3JkZXJPcGFjaXR5OiAxLFxuICAgICAgbm9ybWFsaXplRnVuY3Rpb246ICdwb2x5bm9taWFsJyxcbiAgICAgIGNvbG9yczoge30sXG4gICAgICBwaW5zLFxuICAgICAgcGluTW9kZTogJ2NvbnRlbnQnLFxuICAgICAgb25MYWJlbFNob3c6IGZ1bmN0aW9uIChlLCBsYWJlbCwgY29kZSkge1xuICAgICAgICBsYWJlbC5odG1sKGxhYmVsLmh0bWwoKSArICcgLSAnICsgdmFsdWVzWyBjb2RlIF0pXG4gICAgICB9LFxuICAgICAgb25SZWdpb25TZWxlY3Q6IGZ1bmN0aW9uKGV2ZW50LCBjb2RlLCByZWdpb24pIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZm9jdXNPblNlbGVjdCkge1xuICAgICAgICAgIG1hcC5zZXRGb2N1cyhjb2RlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNvbG9ycyA9IGVsZW1lbnQuZGF0YSgndmVjdG9yLW1hcC12YWx1ZXMtY29sb3JzJylcbiAgICBpZiAoY29sb3JzKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWVzKSB7XG4gICAgICAgIGlmICh2YWx1ZXMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBjb2xvcnNbdmFsdWVzW2tleV1dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zdCBjb2xvciA9IGNvbG9yc1t2YWx1ZXNba2V5XV1cbiAgICAgICAgICBvcHRpb25zLmNvbG9yc1trZXldID0gc2V0dGluZ3MuY29sb3JzLmdldChjb2xvcikgfHwgY29sb3JcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGVsZW1lbnQudmVjdG9yTWFwKG9wdGlvbnMpXG5cbiAgICBjb25zdCBtYXAgPSAkKHRoaXMpLmRhdGEoKS5tYXBPYmplY3RcblxuICAgIGlmIChPYmplY3Qua2V5cyhvcHRpb25zLmNvbG9ycykpIHtcbiAgICAgIG1hcC5zZXRDb2xvcnMob3B0aW9ucy5jb2xvcnMpXG4gICAgfVxuXG4gICAgY29uc3Qgc2NhbGUgPSBlbGVtZW50LmRhdGEoJ3ZlY3Rvci1tYXAtc2NhbGUnKVxuICAgIGNvbnN0IGZvY3VzID0gZWxlbWVudC5kYXRhKCd2ZWN0b3ItbWFwLWZvY3VzJylcblxuICAgIGlmIChzY2FsZSkge1xuICAgICAgbWFwLnNldFNjYWxlKHNjYWxlKVxuICAgICAgbWFwLnBvc2l0aW9uUGlucygpXG4gICAgfVxuICAgIGVsc2UgaWYgKGZvY3VzKSB7XG4gICAgICBtYXAuc2V0Rm9jdXMoZm9jdXMpXG4gICAgfVxuICB9KVxuXG4gICQoJ1tkYXRhLXRvZ2dsZT12ZWN0b3ItbWFwLWZvY3VzXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMpXG4gICAgY29uc3QgdGFyZ2V0ID0gJChlbGVtZW50LmRhdGEoJ3RhcmdldCcpKVxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBtYXAgPSB0YXJnZXQuZGF0YSgpLm1hcE9iamVjdFxuICAgIGNvbnN0IGZvY3VzID0gZWxlbWVudC5kYXRhKCdmb2N1cycpXG4gICAgY29uc3QgYW5pbWF0ZSA9IGVsZW1lbnQuZGF0YSgnYW5pbWF0ZScpXG5cbiAgICBpZiAoZm9jdXMpIHtcbiAgICAgIG1hcC5zZXRGb2N1cyhmb2N1cywgYW5pbWF0ZSlcbiAgICB9XG4gIH0pXG5cbiAgY29uc3QgZHJhd2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kay1kcmF3ZXInKVxuICBpZiAoZHJhd2VyKSB7XG4gICAgZHJhd2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21kay1kcmF3ZXItY2hhbmdlJywgKCkgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlc2l6ZUNvbnRhaW5lcikpXG4gIH1cblxufSkoKSJdLCJzb3VyY2VSb290IjoiIn0=