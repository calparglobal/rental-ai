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
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/settings/local-app-settings-mixin.js":
/*!*****************************************************!*\
  !*** ./src/js/settings/local-app-settings-mixin.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    layoutActive: {
      type: String,
      required: true
    },
    layoutLocation: {
      type: Object,
      required: true
    }
  },
  computed: {
    config: function config() {
      var config = {
        'layout.layout': function layoutLayout(layout) {
          if (layout !== this.layoutActive) {
            location = this.layoutLocation[layout];
          }
        },
        'layout.rtl': function layoutRtl(rtl) {
          var _this = this;
          if (this.oldSettings['layout.rtl'] !== undefined && rtl !== this.oldSettings['layout.rtl']) {
            return location.reload();
          }
          document.querySelector('html').setAttribute('dir', rtl ? 'rtl' : 'ltr');
          document.querySelectorAll('.mdk-drawer').forEach(function (node) {
            return _this["try"](node, function () {
              this.mdkDrawer._resetPosition();
            });
          });
          document.querySelectorAll('.mdk-drawer-layout').forEach(function (node) {
            return _this["try"](node, function () {
              this.mdkDrawerLayout._resetLayout();
            });
          });
        }
      };
      config["".concat(this.layoutActive, ".mainDrawer.align")] = function (align) {
        this["try"](document.querySelector('#default-drawer'), function () {
          this.mdkDrawer.align = align;
          var sidebar = document.querySelector('#default-drawer .sidebar');
          if (!sidebar) {
            return;
          }
          sidebar.classList.add(align === 'end' ? 'sidebar-right' : 'sidebar-left');
          sidebar.classList.remove(align === 'end' ? 'sidebar-left' : 'sidebar-right');
        });
      };
      config["".concat(this.layoutActive, ".mainDrawer.sidebar")] = {
        'light': {
          '#default-drawer .sidebar': {
            addClass: ['sidebar-light'],
            removeClass: ['sidebar-dark', 'bg-dark']
          },
          '#default-drawer .js-text-body': {
            addClass: ['text-body']
          }
        },
        'dark': {
          '#default-drawer .sidebar': {
            addClass: ['sidebar-dark', 'bg-dark'],
            removeClass: ['sidebar-light']
          },
          '#default-drawer .js-text-body': {
            removeClass: ['text-body']
          }
        }
      };
      config["".concat(this.layoutActive, ".mainNavbar.navbar")] = {
        'light': {
          '.navbar-main .navbar-brand img': {
            src: 'assets/images/flowdash-logo-primary.svg'
          },
          '.navbar-main': {
            addClass: ['navbar-light', 'bg-white', 'border-bottom'],
            removeClass: ['navbar-dark', 'bg-primary', 'bg-dark']
          },
          '.navbar-main .text-white': {
            addClass: ['text-light'],
            removeClass: ['text-white']
          }
        },
        'dark': {
          '.navbar-main .navbar-brand img': {
            src: 'assets/images/flowdash-logo-white.svg'
          },
          '.navbar-main': {
            addClass: ['navbar-dark', 'bg-dark'],
            removeClass: ['navbar-light', 'bg-primary', 'bg-white', 'border-bottom']
          },
          '.navbar-main .text-light': {
            addClass: ['text-white'],
            removeClass: ['text-light']
          }
        },
        'primary': {
          '.navbar-main .navbar-brand img': {
            src: 'assets/images/flowdash-logo-white.svg'
          },
          '.navbar-main': {
            addClass: ['navbar-dark', 'bg-primary'],
            removeClass: ['navbar-light', 'bg-white', 'bg-dark', 'border-bottom']
          },
          '.navbar-main .text-light': {
            addClass: ['text-white'],
            removeClass: ['text-light']
          }
        }
      };
      return config;
    },
    options: function options() {
      return [{
        id: "layout",
        title: 'Layout',
        children: [{
          id: 'layout',
          title: 'Layout',
          component: 'b-form-select',
          cookies: false,
          value: 'default',
          options: [{
            text: 'Layout Default',
            value: 'default',
            selected: true
          }, {
            text: 'Layout Fixed',
            value: 'fixed'
          }, {
            text: 'Layout Fluid',
            value: 'fluid'
          }, {
            text: 'Layout Mini',
            value: 'mini'
          }]
        }, {
          id: 'rtl',
          title: 'Text Direction',
          component: 'custom-checkbox-toggle',
          options: [{
            value: true
          }, {
            value: false,
            selected: true
          }]
        }]
      }, {
        id: "".concat(this.layoutActive, ".mainDrawer"),
        title: 'Main Drawer',
        children: [{
          id: 'align',
          title: 'Align',
          component: 'b-form-radio-group',
          options: [{
            text: 'Start',
            value: 'start',
            selected: true
          }, {
            text: 'End',
            value: 'end'
          }]
        }, {
          id: 'sidebar',
          title: 'Sidebar Skin',
          component: 'b-form-radio-group',
          options: [{
            text: 'Light',
            value: 'light'
          }, {
            text: 'Dark',
            value: 'dark',
            selected: true
          }]
        }]
      }, {
        id: "".concat(this.layoutActive, ".mainNavbar"),
        title: 'Main Navbar',
        children: [{
          id: 'navbar',
          title: 'Main Navbar',
          component: 'b-form-radio-group',
          options: [{
            text: 'Dark',
            value: 'dark',
            selected: ['fluid', 'fixed'].includes(this.layoutActive)
          }, {
            text: 'Light',
            value: 'light',
            selected: ['default', 'mini'].includes(this.layoutActive)
          }, {
            text: 'Primary',
            value: 'primary'
          }]
        }]
      }];
    },
    computedOptions: function computedOptions() {
      var _this2 = this;
      var options = JSON.parse(JSON.stringify(this.options));
      options.map(function (option) {
        option.children.filter(function (group) {
          return group.cookies === false;
        }).map(function (group) {
          if (_this2.layoutActive) {
            group.options.map(function (go) {
              return go.selected = go.value === _this2.layoutActive;
            });
          } else {
            group.options.map(function (go) {
              return go.selected = go.value === group.value;
            });
          }
        });
      });
      return options;
    },
    computedSettings: function computedSettings() {
      return Object.assign({}, this.settings);
    }
  },
  created: function created() {
    this.listenOnRoot('fm:settings:state', this.onUpdate);
  },
  methods: {
    "try": function _try(node, callback) {
      try {
        callback.call(node);
      } catch (e) {
        if (node) {
          node.addEventListener('domfactory-component-upgraded', callback);
        }
      }
    }
  }
});

/***/ }),

/***/ 29:
/*!***********************************************************!*\
  !*** multi ./src/js/settings/local-app-settings-mixin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/alishahbas/Documents/Projects/Rental AI /rental-ai/src/js/settings/local-app-settings-mixin.js */"./src/js/settings/local-app-settings-mixin.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NldHRpbmdzL2xvY2FsLWFwcC1zZXR0aW5ncy1taXhpbi5qcyJdLCJuYW1lcyI6WyJwcm9wcyIsImxheW91dEFjdGl2ZSIsInR5cGUiLCJTdHJpbmciLCJyZXF1aXJlZCIsImxheW91dExvY2F0aW9uIiwiT2JqZWN0IiwiY29tcHV0ZWQiLCJjb25maWciLCJsYXlvdXRMYXlvdXQiLCJsYXlvdXQiLCJsb2NhdGlvbiIsImxheW91dFJ0bCIsInJ0bCIsIl90aGlzIiwib2xkU2V0dGluZ3MiLCJ1bmRlZmluZWQiLCJyZWxvYWQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZXRBdHRyaWJ1dGUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIm5vZGUiLCJtZGtEcmF3ZXIiLCJfcmVzZXRQb3NpdGlvbiIsIm1ka0RyYXdlckxheW91dCIsIl9yZXNldExheW91dCIsImNvbmNhdCIsImFsaWduIiwic2lkZWJhciIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzcmMiLCJvcHRpb25zIiwiaWQiLCJ0aXRsZSIsImNoaWxkcmVuIiwiY29tcG9uZW50IiwiY29va2llcyIsInZhbHVlIiwidGV4dCIsInNlbGVjdGVkIiwiaW5jbHVkZXMiLCJjb21wdXRlZE9wdGlvbnMiLCJfdGhpczIiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJtYXAiLCJvcHRpb24iLCJmaWx0ZXIiLCJncm91cCIsImdvIiwiY29tcHV0ZWRTZXR0aW5ncyIsImFzc2lnbiIsInNldHRpbmdzIiwiY3JlYXRlZCIsImxpc3Rlbk9uUm9vdCIsIm9uVXBkYXRlIiwibWV0aG9kcyIsIl90cnkiLCJjYWxsYmFjayIsImNhbGwiLCJlIiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtR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Q29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI5KTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICBsYXlvdXRBY3RpdmU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBsYXlvdXRMb2NhdGlvbjoge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgY29uZmlnKCkge1xuICAgICAgbGV0IGNvbmZpZyA9IHtcbiAgICAgICAgJ2xheW91dC5sYXlvdXQnOiBmdW5jdGlvbihsYXlvdXQpIHtcbiAgICAgICAgICBpZiAobGF5b3V0ICE9PSB0aGlzLmxheW91dEFjdGl2ZSkge1xuICAgICAgICAgICAgbG9jYXRpb24gPSB0aGlzLmxheW91dExvY2F0aW9uW2xheW91dF1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdsYXlvdXQucnRsJzogZnVuY3Rpb24ocnRsKSB7XG4gICAgICAgICAgaWYgKHRoaXMub2xkU2V0dGluZ3NbJ2xheW91dC5ydGwnXSAhPT0gdW5kZWZpbmVkICYmIHJ0bCAhPT0gdGhpcy5vbGRTZXR0aW5nc1snbGF5b3V0LnJ0bCddKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYXRpb24ucmVsb2FkKClcbiAgICAgICAgICB9XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLnNldEF0dHJpYnV0ZSgnZGlyJywgcnRsID8gJ3J0bCcgOiAnbHRyJylcblxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZGstZHJhd2VyJylcbiAgICAgICAgICAgIC5mb3JFYWNoKG5vZGUgPT4gdGhpcy50cnkobm9kZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHRoaXMubWRrRHJhd2VyLl9yZXNldFBvc2l0aW9uKClcbiAgICAgICAgICAgIH0pKVxuXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1kay1kcmF3ZXItbGF5b3V0JylcbiAgICAgICAgICAgIC5mb3JFYWNoKG5vZGUgPT4gdGhpcy50cnkobm9kZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHRoaXMubWRrRHJhd2VyTGF5b3V0Ll9yZXNldExheW91dCgpXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25maWdbYCR7dGhpcy5sYXlvdXRBY3RpdmV9Lm1haW5EcmF3ZXIuYWxpZ25gXSA9IGZ1bmN0aW9uKGFsaWduKSB7XG4gICAgICAgIHRoaXMudHJ5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZWZhdWx0LWRyYXdlcicpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLm1ka0RyYXdlci5hbGlnbiA9IGFsaWduXG5cbiAgICAgICAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RlZmF1bHQtZHJhd2VyIC5zaWRlYmFyJylcblxuICAgICAgICAgIGlmICghc2lkZWJhcikge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QuYWRkKGFsaWduID09PSAnZW5kJyA/ICdzaWRlYmFyLXJpZ2h0JyA6ICdzaWRlYmFyLWxlZnQnKVxuICAgICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZShhbGlnbiA9PT0gJ2VuZCcgPyAnc2lkZWJhci1sZWZ0JyA6ICdzaWRlYmFyLXJpZ2h0JylcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgY29uZmlnW2Ake3RoaXMubGF5b3V0QWN0aXZlfS5tYWluRHJhd2VyLnNpZGViYXJgXSA9IHtcbiAgICAgICAgJ2xpZ2h0Jzoge1xuICAgICAgICAgICcjZGVmYXVsdC1kcmF3ZXIgLnNpZGViYXInOiB7XG4gICAgICAgICAgICBhZGRDbGFzczogWydzaWRlYmFyLWxpZ2h0J10sXG4gICAgICAgICAgICByZW1vdmVDbGFzczogWydzaWRlYmFyLWRhcmsnLCAnYmctZGFyayddXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnI2RlZmF1bHQtZHJhd2VyIC5qcy10ZXh0LWJvZHknOiB7XG4gICAgICAgICAgICBhZGRDbGFzczogWyd0ZXh0LWJvZHknXVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ2RhcmsnOiB7XG4gICAgICAgICAgJyNkZWZhdWx0LWRyYXdlciAuc2lkZWJhcic6IHtcbiAgICAgICAgICAgIGFkZENsYXNzOiBbJ3NpZGViYXItZGFyaycsICdiZy1kYXJrJ10sXG4gICAgICAgICAgICByZW1vdmVDbGFzczogWydzaWRlYmFyLWxpZ2h0J11cbiAgICAgICAgICB9LFxuICAgICAgICAgICcjZGVmYXVsdC1kcmF3ZXIgLmpzLXRleHQtYm9keSc6IHtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzOiBbJ3RleHQtYm9keSddXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbmZpZ1tgJHt0aGlzLmxheW91dEFjdGl2ZX0ubWFpbk5hdmJhci5uYXZiYXJgXSA9IHtcbiAgICAgICAgJ2xpZ2h0Jzoge1xuICAgICAgICAgICcubmF2YmFyLW1haW4gLm5hdmJhci1icmFuZCBpbWcnOiB7XG4gICAgICAgICAgICBzcmM6ICdhc3NldHMvaW1hZ2VzL2Zsb3dkYXNoLWxvZ28tcHJpbWFyeS5zdmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgJy5uYXZiYXItbWFpbic6IHtcbiAgICAgICAgICAgIGFkZENsYXNzOiBbJ25hdmJhci1saWdodCcsICdiZy13aGl0ZScsICdib3JkZXItYm90dG9tJ10sXG4gICAgICAgICAgICByZW1vdmVDbGFzczogWyduYXZiYXItZGFyaycsICdiZy1wcmltYXJ5JywgJ2JnLWRhcmsnXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJy5uYXZiYXItbWFpbiAudGV4dC13aGl0ZSc6IHtcbiAgICAgICAgICAgIGFkZENsYXNzOiBbJ3RleHQtbGlnaHQnXSxcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzOiBbJ3RleHQtd2hpdGUnXVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ2RhcmsnOiB7XG4gICAgICAgICAgJy5uYXZiYXItbWFpbiAubmF2YmFyLWJyYW5kIGltZyc6IHtcbiAgICAgICAgICAgIHNyYzogJ2Fzc2V0cy9pbWFnZXMvZmxvd2Rhc2gtbG9nby13aGl0ZS5zdmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgJy5uYXZiYXItbWFpbic6IHtcbiAgICAgICAgICAgIGFkZENsYXNzOiBbJ25hdmJhci1kYXJrJywgJ2JnLWRhcmsnXSxcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzOiBbJ25hdmJhci1saWdodCcsICdiZy1wcmltYXJ5JywgJ2JnLXdoaXRlJywgJ2JvcmRlci1ib3R0b20nXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJy5uYXZiYXItbWFpbiAudGV4dC1saWdodCc6IHtcbiAgICAgICAgICAgIGFkZENsYXNzOiBbJ3RleHQtd2hpdGUnXSxcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzOiBbJ3RleHQtbGlnaHQnXVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ3ByaW1hcnknOiB7XG4gICAgICAgICAgJy5uYXZiYXItbWFpbiAubmF2YmFyLWJyYW5kIGltZyc6IHtcbiAgICAgICAgICAgIHNyYzogJ2Fzc2V0cy9pbWFnZXMvZmxvd2Rhc2gtbG9nby13aGl0ZS5zdmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgJy5uYXZiYXItbWFpbic6IHtcbiAgICAgICAgICAgIGFkZENsYXNzOiBbJ25hdmJhci1kYXJrJywgJ2JnLXByaW1hcnknXSxcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzOiBbJ25hdmJhci1saWdodCcsICdiZy13aGl0ZScsICdiZy1kYXJrJywgJ2JvcmRlci1ib3R0b20nXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJy5uYXZiYXItbWFpbiAudGV4dC1saWdodCc6IHtcbiAgICAgICAgICAgIGFkZENsYXNzOiBbJ3RleHQtd2hpdGUnXSxcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzOiBbJ3RleHQtbGlnaHQnXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29uZmlnXG4gICAgfSxcbiAgICBvcHRpb25zKCkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiBgbGF5b3V0YCxcbiAgICAgICAgICB0aXRsZTogJ0xheW91dCcsXG4gICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6ICdsYXlvdXQnLFxuICAgICAgICAgICAgICB0aXRsZTogJ0xheW91dCcsXG4gICAgICAgICAgICAgIGNvbXBvbmVudDogJ2ItZm9ybS1zZWxlY3QnLFxuICAgICAgICAgICAgICBjb29raWVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgdmFsdWU6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgICAgb3B0aW9uczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdMYXlvdXQgRGVmYXVsdCcsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogJ2RlZmF1bHQnLFxuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdMYXlvdXQgRml4ZWQnLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6ICdmaXhlZCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdMYXlvdXQgRmx1aWQnLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6ICdmbHVpZCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdMYXlvdXQgTWluaScsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogJ21pbmknXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogJ3J0bCcsXG4gICAgICAgICAgICAgIHRpdGxlOiAnVGV4dCBEaXJlY3Rpb24nLFxuICAgICAgICAgICAgICBjb21wb25lbnQ6ICdjdXN0b20tY2hlY2tib3gtdG9nZ2xlJyxcbiAgICAgICAgICAgICAgb3B0aW9uczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiBgJHt0aGlzLmxheW91dEFjdGl2ZX0ubWFpbkRyYXdlcmAsXG4gICAgICAgICAgdGl0bGU6ICdNYWluIERyYXdlcicsXG4gICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6ICdhbGlnbicsXG4gICAgICAgICAgICAgIHRpdGxlOiAnQWxpZ24nLFxuICAgICAgICAgICAgICBjb21wb25lbnQ6ICdiLWZvcm0tcmFkaW8tZ3JvdXAnLFxuICAgICAgICAgICAgICBvcHRpb25zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ1N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdFbmQnLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6ICdlbmQnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogJ3NpZGViYXInLFxuICAgICAgICAgICAgICB0aXRsZTogJ1NpZGViYXIgU2tpbicsXG4gICAgICAgICAgICAgIGNvbXBvbmVudDogJ2ItZm9ybS1yYWRpby1ncm91cCcsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnTGlnaHQnLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6ICdsaWdodCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdEYXJrJyxcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiAnZGFyaycsXG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiBgJHt0aGlzLmxheW91dEFjdGl2ZX0ubWFpbk5hdmJhcmAsXG4gICAgICAgICAgdGl0bGU6ICdNYWluIE5hdmJhcicsXG4gICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6ICduYXZiYXInLFxuICAgICAgICAgICAgICB0aXRsZTogJ01haW4gTmF2YmFyJyxcbiAgICAgICAgICAgICAgY29tcG9uZW50OiAnYi1mb3JtLXJhZGlvLWdyb3VwJyxcbiAgICAgICAgICAgICAgb3B0aW9uczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdEYXJrJyxcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiAnZGFyaycsXG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZDogWydmbHVpZCcsICdmaXhlZCddLmluY2x1ZGVzKHRoaXMubGF5b3V0QWN0aXZlKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ0xpZ2h0JyxcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiAnbGlnaHQnLFxuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IFsnZGVmYXVsdCcsICdtaW5pJ10uaW5jbHVkZXModGhpcy5sYXlvdXRBY3RpdmUpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnUHJpbWFyeScsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogJ3ByaW1hcnknXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICBjb21wdXRlZE9wdGlvbnMoKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMpKVxuICAgICAgb3B0aW9ucy5tYXAob3B0aW9uID0+IHtcbiAgICAgICAgb3B0aW9uLmNoaWxkcmVuXG4gICAgICAgICAgLmZpbHRlcihncm91cCA9PiBncm91cC5jb29raWVzID09PSBmYWxzZSlcbiAgICAgICAgICAubWFwKGdyb3VwID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxheW91dEFjdGl2ZSkge1xuICAgICAgICAgICAgICBncm91cC5vcHRpb25zLm1hcChnbyA9PiBnby5zZWxlY3RlZCA9IGdvLnZhbHVlID09PSB0aGlzLmxheW91dEFjdGl2ZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGdyb3VwLm9wdGlvbnMubWFwKGdvID0+IGdvLnNlbGVjdGVkID0gZ28udmFsdWUgPT09IGdyb3VwLnZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gb3B0aW9uc1xuICAgIH0sXG4gICAgY29tcHV0ZWRTZXR0aW5ncygpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnNldHRpbmdzKVxuICAgIH1cbiAgfSxcbiAgY3JlYXRlZCgpIHtcbiAgICB0aGlzLmxpc3Rlbk9uUm9vdCgnZm06c2V0dGluZ3M6c3RhdGUnLCB0aGlzLm9uVXBkYXRlKVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgdHJ5KG5vZGUsIGNhbGxiYWNrKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKG5vZGUpXG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2RvbWZhY3RvcnktY29tcG9uZW50LXVwZ3JhZGVkJywgY2FsbGJhY2spXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=