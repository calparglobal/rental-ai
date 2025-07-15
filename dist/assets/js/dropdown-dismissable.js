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
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/settings/dropdown-dismissable.js":
/*!*************************************************!*\
  !*** ./src/js/settings/dropdown-dismissable.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
// import $ from 'jquery'

var DropdownDismissable = function () {
  var NAME = 'dropdownDismissable';
  var DATA_KEY = 'bs.dropdown-dismissable';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var DropdownDismissable = /*#__PURE__*/function () {
    function DropdownDismissable(element) {
      _classCallCheck(this, DropdownDismissable);
      Object.defineProperty(element, NAME, {
        configurable: true,
        writable: false,
        value: this
      });
      this._element = element;
      this._dismiss = element.querySelector('[data-dismiss="dropdown"]');
      this._toggle = element.querySelector('[data-toggle="dropdown"]');
      this._init();
      this._addEventListeners();
    }
    return _createClass(DropdownDismissable, [{
      key: "_init",
      value: function _init() {
        $('.dropdown-menu', this._element).removeClass('show').removeAttr('style');
        if ($(this._element).hasClass('show')) {
          $(this._element).removeClass('show');
          $(this._toggle).dropdown('toggle');
        }
        this._element._closable = false;
      }
    }, {
      key: "_addEventListeners",
      value: function _addEventListeners() {
        this._dismiss.addEventListener('click', this.dismiss.bind(this));
      }
    }, {
      key: "_removeEventListeners",
      value: function _removeEventListeners() {
        this._dismiss.removeEventListener('click', this.dismiss.bind(this));
      }

      // Static jQuery Interface
    }, {
      key: "dismiss",
      value:
      // Public

      function dismiss(event) {
        this._element._closable = true;
        if (!event) {
          $(this._toggle).dropdown('toggle');
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this._removeEventListeners();
        $.removeData(this._element, DATA_KEY);
        $(this._element).dropdown('dispose');
        this._element = null;
      }
    }], [{
      key: "_jQueryInterface",
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          if (!data) {
            data = new DropdownDismissable(this);
            $(this).data(DATA_KEY, data);
          }
          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new Error("No method named \"".concat(config, "\""));
            }
            data[config]();
          }
        });
      }
    }]);
  }();
  $(document).on({
    'show.bs.dropdown': function showBsDropdown() {
      this._closable = false;
    },
    'hide.bs.dropdown': function hideBsDropdown() {
      return this._closable === undefined || this._closable !== false;
    }
  }, '[data-dropdown-dismissable]');

  ////////////
  // jQuery //
  ////////////

  $.fn[NAME] = DropdownDismissable._jQueryInterface;
  $.fn[NAME].Constructor = DropdownDismissable;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return DropdownDismissable._jQueryInterface;
  };

  ////////////////
  // Initialize //
  ////////////////

  $('[data-dropdown-dismissable]').dropdownDismissable();
  return DropdownDismissable;
}($);
/* harmony default export */ __webpack_exports__["default"] = (DropdownDismissable);

/***/ }),

/***/ 28:
/*!*******************************************************!*\
  !*** multi ./src/js/settings/dropdown-dismissable.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/alishahbas/Documents/Projects/Rental AI /rental-ai/src/js/settings/dropdown-dismissable.js */"./src/js/settings/dropdown-dismissable.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NldHRpbmdzL2Ryb3Bkb3duLWRpc21pc3NhYmxlLmpzIl0sIm5hbWVzIjpbIkRyb3Bkb3duRGlzbWlzc2FibGUiLCJOQU1FIiwiREFUQV9LRVkiLCJKUVVFUllfTk9fQ09ORkxJQ1QiLCIkIiwiZm4iLCJlbGVtZW50IiwiX2NsYXNzQ2FsbENoZWNrIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsInZhbHVlIiwiX2VsZW1lbnQiLCJfZGlzbWlzcyIsInF1ZXJ5U2VsZWN0b3IiLCJfdG9nZ2xlIiwiX2luaXQiLCJfYWRkRXZlbnRMaXN0ZW5lcnMiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJyZW1vdmVDbGFzcyIsInJlbW92ZUF0dHIiLCJoYXNDbGFzcyIsImRyb3Bkb3duIiwiX2Nsb3NhYmxlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImRpc21pc3MiLCJiaW5kIiwiX3JlbW92ZUV2ZW50TGlzdGVuZXJzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiZGVzdHJveSIsInJlbW92ZURhdGEiLCJfalF1ZXJ5SW50ZXJmYWNlIiwiY29uZmlnIiwiZWFjaCIsImRhdGEiLCJFcnJvciIsImNvbmNhdCIsImRvY3VtZW50Iiwib24iLCJzaG93QnNEcm9wZG93biIsImhpZGVCc0Ryb3Bkb3duIiwidW5kZWZpbmVkIiwiQ29uc3RydWN0b3IiLCJub0NvbmZsaWN0IiwiZHJvcGRvd25EaXNtaXNzYWJsZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFn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QUM7RUFBQTtFQW9CSC9CLENBQUMsQ0FBQ29DLFFBQVEsQ0FBQyxDQUFDQyxFQUFFLENBQUM7SUFDYixrQkFBa0IsRUFBRSxTQUFwQkMsY0FBa0JBLENBQUEsRUFBYTtNQUM3QixJQUFJLENBQUNqQixTQUFTLEdBQUcsS0FBSztJQUN4QixDQUFDO0lBQ0Qsa0JBQWtCLEVBQUUsU0FBcEJrQixjQUFrQkEsQ0FBQSxFQUFhO01BQzdCLE9BQU8sSUFBSSxDQUFDbEIsU0FBUyxLQUFLbUIsU0FBUyxJQUFJLElBQUksQ0FBQ25CLFNBQVMsS0FBSyxLQUFLO0lBQ2pFO0VBQ0YsQ0FBQyxFQUFFLDZCQUE2QixDQUFDOztFQUVqQztFQUNBO0VBQ0E7O0VBRUFyQixDQUFDLENBQUNDLEVBQUUsQ0FBQ0osSUFBSSxDQUFDLEdBQWVELG1CQUFtQixDQUFDa0MsZ0JBQWdCO0VBQzdEOUIsQ0FBQyxDQUFDQyxFQUFFLENBQUNKLElBQUksQ0FBQyxDQUFDNEMsV0FBVyxHQUFHN0MsbUJBQW1CO0VBQzVDSSxDQUFDLENBQUNDLEVBQUUsQ0FBQ0osSUFBSSxDQUFDLENBQUM2QyxVQUFVLEdBQUksWUFBWTtJQUNuQzFDLENBQUMsQ0FBQ0MsRUFBRSxDQUFDSixJQUFJLENBQUMsR0FBR0Usa0JBQWtCO0lBQy9CLE9BQU9ILG1CQUFtQixDQUFDa0MsZ0JBQWdCO0VBQzdDLENBQUM7O0VBRUQ7RUFDQTtFQUNBOztFQUVBOUIsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLENBQUMyQyxtQkFBbUIsQ0FBQyxDQUFDO0VBRXRELE9BQU8vQyxtQkFBbUI7QUFFNUIsQ0FBQyxDQUFFSSxDQUFDLENBQUM7QUFFVUosa0ZBQW1CLEUiLCJmaWxlIjoiL2Rpc3QvYXNzZXRzL2pzL2Ryb3Bkb3duLWRpc21pc3NhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyOCk7XG4iLCIvLyBpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5cbmNvbnN0IERyb3Bkb3duRGlzbWlzc2FibGUgPSAoKCkgPT4ge1xuICBjb25zdCBOQU1FICAgICAgICAgICAgICAgPSAnZHJvcGRvd25EaXNtaXNzYWJsZSdcbiAgY29uc3QgREFUQV9LRVkgICAgICAgICAgID0gJ2JzLmRyb3Bkb3duLWRpc21pc3NhYmxlJ1xuICBjb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkLmZuW05BTUVdXG5cbiAgY2xhc3MgRHJvcGRvd25EaXNtaXNzYWJsZSB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsIE5BTUUsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiB0aGlzXG4gICAgICB9KVxuXG4gICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudFxuICAgICAgdGhpcy5fZGlzbWlzcyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZGlzbWlzcz1cImRyb3Bkb3duXCJdJylcbiAgICAgIHRoaXMuX3RvZ2dsZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIl0nKVxuICAgICAgdGhpcy5faW5pdCgpXG4gICAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpXG4gICAgfVxuXG4gICAgX2luaXQoKSB7XG4gICAgICAkKCcuZHJvcGRvd24tbWVudScsIHRoaXMuX2VsZW1lbnQpLnJlbW92ZUNsYXNzKCdzaG93JykucmVtb3ZlQXR0cignc3R5bGUnKVxuICAgICAgaWYgKCQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoJ3Nob3cnKSkge1xuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLnJlbW92ZUNsYXNzKCdzaG93JylcbiAgICAgICAgJCh0aGlzLl90b2dnbGUpLmRyb3Bkb3duKCd0b2dnbGUnKVxuICAgICAgfVxuICAgICAgdGhpcy5fZWxlbWVudC5fY2xvc2FibGUgPSBmYWxzZVxuICAgIH1cblxuICAgIF9hZGRFdmVudExpc3RlbmVycygpIHtcbiAgICAgIHRoaXMuX2Rpc21pc3MuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRpc21pc3MuYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICBfcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICB0aGlzLl9kaXNtaXNzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kaXNtaXNzLmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgLy8gU3RhdGljIGpRdWVyeSBJbnRlcmZhY2VcblxuICAgIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKVxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IERyb3Bkb3duRGlzbWlzc2FibGUodGhpcylcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhW2NvbmZpZ10oKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIFB1YmxpY1xuXG4gICAgZGlzbWlzcyhldmVudCkge1xuICAgICAgdGhpcy5fZWxlbWVudC5fY2xvc2FibGUgPSB0cnVlXG4gICAgICBpZiAoIWV2ZW50KSB7XG4gICAgICAgICQodGhpcy5fdG9nZ2xlKS5kcm9wZG93bigndG9nZ2xlJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKVxuXG4gICAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLmRyb3Bkb3duKCdkaXNwb3NlJylcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgJChkb2N1bWVudCkub24oe1xuICAgICdzaG93LmJzLmRyb3Bkb3duJzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLl9jbG9zYWJsZSA9IGZhbHNlXG4gICAgfSxcbiAgICAnaGlkZS5icy5kcm9wZG93bic6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2Nsb3NhYmxlID09PSB1bmRlZmluZWQgfHwgdGhpcy5fY2xvc2FibGUgIT09IGZhbHNlXG4gICAgfVxuICB9LCAnW2RhdGEtZHJvcGRvd24tZGlzbWlzc2FibGVdJylcblxuICAvLy8vLy8vLy8vLy9cbiAgLy8galF1ZXJ5IC8vXG4gIC8vLy8vLy8vLy8vL1xuXG4gICQuZm5bTkFNRV0gICAgICAgICAgICAgPSBEcm9wZG93bkRpc21pc3NhYmxlLl9qUXVlcnlJbnRlcmZhY2VcbiAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IERyb3Bkb3duRGlzbWlzc2FibGVcbiAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ICA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXG4gICAgcmV0dXJuIERyb3Bkb3duRGlzbWlzc2FibGUuX2pRdWVyeUludGVyZmFjZVxuICB9XG5cbiAgLy8vLy8vLy8vLy8vLy8vL1xuICAvLyBJbml0aWFsaXplIC8vXG4gIC8vLy8vLy8vLy8vLy8vLy9cbiAgXG4gICQoJ1tkYXRhLWRyb3Bkb3duLWRpc21pc3NhYmxlXScpLmRyb3Bkb3duRGlzbWlzc2FibGUoKVxuXG4gIHJldHVybiBEcm9wZG93bkRpc21pc3NhYmxlXG5cbn0pKCQpXG5cbmV4cG9ydCBkZWZhdWx0IERyb3Bkb3duRGlzbWlzc2FibGUiXSwic291cmNlUm9vdCI6IiJ9