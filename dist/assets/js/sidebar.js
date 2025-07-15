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
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/sidebar.js":
/*!***************************!*\
  !*** ./src/js/sidebar.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  'use strict';

  // Connect button(s) to drawer(s)
  var sidebarToggle = document.querySelectorAll('[data-toggle="sidebar"]');
  sidebarToggle = Array.prototype.slice.call(sidebarToggle);
  sidebarToggle.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      var selector = e.currentTarget.getAttribute('data-target') || e.currentTarget.getAttribute('href') || '#default-drawer';
      var drawer = document.querySelector(selector);
      if (drawer) {
        drawer.mdkDrawer.toggle();
      }
    });
  });
  var drawers = document.querySelectorAll('.mdk-drawer');
  drawers = Array.prototype.slice.call(drawers);
  drawers.forEach(function (drawer) {
    drawer.addEventListener('mdk-drawer-change', function (e) {
      if (!e.target.mdkDrawer) {
        return;
      }
      document.querySelector('body').classList[e.target.mdkDrawer.opened ? 'add' : 'remove']('has-drawer-opened');
      var button = document.querySelector('[data-target="#' + e.target.id + '"]');
      if (button) {
        button.classList[e.target.mdkDrawer.opened ? 'add' : 'remove']('active');
      }
    });
  });

  // SIDEBAR COLLAPSE MENUS
  $('.sidebar .collapse').on('show.bs.collapse', function (e) {
    e.stopPropagation();
    var parent = $(this).parents('.sidebar-submenu').get(0) || $(this).parents('.sidebar-menu').get(0);
    $(parent).find('.open').find('.collapse').collapse('hide');
    $(this).closest('li').addClass('open');
  });
  $('.sidebar .collapse').on('hidden.bs.collapse', function (e) {
    e.stopPropagation();
    $(this).closest('li').removeClass('open');
  });
})();

/***/ }),

/***/ 31:
/*!*********************************!*\
  !*** multi ./src/js/sidebar.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/alishahbas/Documents/Projects/Rental AI /rental-ai/src/js/sidebar.js */"./src/js/sidebar.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NpZGViYXIuanMiXSwibmFtZXMiOlsic2lkZWJhclRvZ2dsZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiZm9yRWFjaCIsInRvZ2dsZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwic2VsZWN0b3IiLCJjdXJyZW50VGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwiZHJhd2VyIiwicXVlcnlTZWxlY3RvciIsIm1ka0RyYXdlciIsImRyYXdlcnMiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJvcGVuZWQiLCJidXR0b24iLCJpZCIsIiQiLCJvbiIsInN0b3BQcm9wYWdhdGlvbiIsInBhcmVudCIsInBhcmVudHMiLCJnZXQiLCJmaW5kIiwiY29sbGFwc2UiLCJjbG9zZXN0IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNB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LENBQUMsQ0FBQ0MsRUFBRSxDQUFDLG9CQUFvQixFQUFFLFVBQVVkLENBQUMsRUFBRTtJQUM1REEsQ0FBQyxDQUFDZSxlQUFlLENBQUMsQ0FBQztJQUNuQkYsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDUSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUNFLFdBQVcsQ0FBQyxNQUFNLENBQUM7RUFDM0MsQ0FBQyxDQUFDO0FBRUosQ0FBQyxFQUFFLENBQUMsQyIsImZpbGUiOiIvZGlzdC9hc3NldHMvanMvc2lkZWJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMzEpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBDb25uZWN0IGJ1dHRvbihzKSB0byBkcmF3ZXIocylcbiAgdmFyIHNpZGViYXJUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10b2dnbGU9XCJzaWRlYmFyXCJdJylcbiAgc2lkZWJhclRvZ2dsZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHNpZGViYXJUb2dnbGUpXG5cbiAgc2lkZWJhclRvZ2dsZS5mb3JFYWNoKGZ1bmN0aW9uICh0b2dnbGUpIHtcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIHNlbGVjdG9yID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKSB8fCBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyNkZWZhdWx0LWRyYXdlcidcbiAgICAgIHZhciBkcmF3ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICAgICAgaWYgKGRyYXdlcikge1xuICAgICAgICBkcmF3ZXIubWRrRHJhd2VyLnRvZ2dsZSgpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcblxuICBsZXQgZHJhd2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZGstZHJhd2VyJylcbiAgZHJhd2VycyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRyYXdlcnMpXG4gIGRyYXdlcnMuZm9yRWFjaCgoZHJhd2VyKSA9PiB7XG4gICAgZHJhd2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21kay1kcmF3ZXItY2hhbmdlJywgKGUpID0+IHtcbiAgICAgIGlmICghZS50YXJnZXQubWRrRHJhd2VyKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTGlzdFtlLnRhcmdldC5tZGtEcmF3ZXIub3BlbmVkID8gJ2FkZCcgOiAncmVtb3ZlJ10oJ2hhcy1kcmF3ZXItb3BlbmVkJylcbiAgICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10YXJnZXQ9XCIjJyArIGUudGFyZ2V0LmlkICsgJ1wiXScpXG4gICAgICBpZiAoYnV0dG9uKSB7XG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3RbZS50YXJnZXQubWRrRHJhd2VyLm9wZW5lZCA/ICdhZGQnIDogJ3JlbW92ZSddKCdhY3RpdmUnKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgLy8gU0lERUJBUiBDT0xMQVBTRSBNRU5VU1xuICAkKCcuc2lkZWJhciAuY29sbGFwc2UnKS5vbignc2hvdy5icy5jb2xsYXBzZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIHZhciBwYXJlbnQgPSAkKHRoaXMpLnBhcmVudHMoJy5zaWRlYmFyLXN1Ym1lbnUnKS5nZXQoMCkgfHwgJCh0aGlzKS5wYXJlbnRzKCcuc2lkZWJhci1tZW51JykuZ2V0KDApXG4gICAgJChwYXJlbnQpLmZpbmQoJy5vcGVuJykuZmluZCgnLmNvbGxhcHNlJykuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkKHRoaXMpLmNsb3Nlc3QoJ2xpJykuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgfSk7XG5cbiAgJCgnLnNpZGViYXIgLmNvbGxhcHNlJykub24oJ2hpZGRlbi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICQodGhpcykuY2xvc2VzdCgnbGknKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICB9KTtcblxufSkoKSJdLCJzb3VyY2VSb290IjoiIn0=