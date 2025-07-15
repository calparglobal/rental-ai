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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/plugins/fullcalendar.js":
/*!****************************************!*\
  !*** ./src/js/plugins/fullcalendar.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  'use strict';

  var t = new Date();
  var date = (t.getDate(), t.getMonth(), t.getFullYear(), new Date($.now()));
  var events = [{
    title: "Hey!",
    start: new Date($.now() + 158e6),
    className: "bg-warning"
  }, {
    title: "See John Deo",
    start: date,
    end: date,
    className: "bg-success"
  }, {
    title: "Meet John Deo",
    start: new Date($.now() + 168e6),
    className: "bg-info"
  }, {
    title: "Buy a Theme",
    start: new Date($.now() + 338e6),
    className: "bg-primary"
  }];
  var onDrop = function onDrop(droppable, date, calendar) {
    var eventObject = droppable.data('eventObject');
    var className = droppable.data('class');
    var options = $.extend({}, eventObject);
    options.start = date;
    if (className) {
      options.className = [className];
    }
    calendar.fullCalendar('renderEvent', options, true);
    if ($('#drop-remove').is(':checked')) {
      droppable.remove();
    }
  };
  var onEventClick = function onEventClick(event, jsEvent, view, calendar) {
    var modal = $(MODAL);
    var form = $("<form>\n      <label>Change event name</label>\n      <div class=\"input-group m-b-15\">\n        <input class=\"form-control\" type=\"text\" value=\"".concat(event.title, "\" />\n        <span class=\"input-group-append\">\n          <button type=\"submit\" class=\"btn btn-success\">\n            <i class=\"material-icons mr-2\">check</i> Save\n          </button>\n        </span>\n      </div>\n    </form>"));
    modal.modal('show');
    modal.find('.delete-event').show().end().find('.save-event').hide().end().find('.modal-body').empty().prepend(form).end().find('.delete-event').unbind('click').on('click', function () {
      calendar.fullCalendar('removeEvents', function (e) {
        return e._id == event._id;
      });
      modal.modal('hide');
    });
    modal.find('form').on('submit', function (e) {
      e.preventDefault();
      event.title = form.find('input[type=text]').val();
      calendar.fullCalendar('updateEvent', event);
      modal.modal('hide');
    });
  };
  var onSelect = function onSelect(start, end, jsEvent, calendar) {
    var modal = $(MODAL);
    modal.modal({
      backdrop: "static"
    });
    var form = $("<form>\n      <div class=\"row\">\n        <div class=\"col-12\">\n          <div class=\"form-group\">\n            <label class=\"control-label\">Event Name</label>\n            <input class=\"form-control\" placeholder=\"Insert Event Name\" type=\"text\" name=\"title\" />\n          </div>\n        </div>\n        <div class=\"col-12\">\n          <div class=\"form-group\">\n            <label class=\"control-label\">Category</label>\n            <select class=\"form-control custom-select\" name=\"category\">\n              <option value=\"bg-danger\">Danger</option>\n              <option value=\"bg-success\">Success</option>\n              <option value=\"bg-primary\">Primary</option>\n              <option value=\"bg-info\">Info</option>\n              <option value=\"bg-dark\">Dark</option>\n              <option value=\"bg-warning\">Warning</option>\n            </select>\n          </div>\n        </div>\n      </div>\n    </form>");
    modal.find('.delete-event').hide().end().find('.save-event').show().end().find('.modal-body').empty().prepend(form).end().find('.save-event').unbind('click').on('click', function () {
      form.submit();
    });
    modal.find('form').on('submit', function (e) {
      e.preventDefault();
      var title = form.find('input[name="title"]').val();
      var className = (form.find('input[name="beginning"]').val(), form.find('input[name="ending"]').val(), form.find('select[name="category"] option:checked').val());
      if (null !== title && 0 != title.length) {
        calendar.fullCalendar('renderEvent', {
          title: title,
          start: start,
          end: end,
          allDay: false,
          className: className
        }, true);
        return modal.modal('hide');
      }
      alert('You have to give a title to your event');
    });
    calendar.fullCalendar('unselect');
  };
  $('[data-toggle="fullcalendar"]').each(function () {
    var element = $(this);
    var options = {
      themeSystem: 'bootstrap4',
      closeButton: void 0 !== element.data('toastr-close-button') ? element.data('toastr-close-button') : false,
      slotDuration: '00:15:00',
      minTime: '08:00:00',
      maxTime: '19:00:00',
      defaultView: 'month',
      handleWindowResize: true,
      height: $(window).height() - 200,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      events: events,
      editable: true,
      droppable: true,
      eventLimit: true,
      selectable: true,
      drop: function drop(date) {
        onDrop($(this), date, element);
      },
      select: function select(start, end, jsEvent) {
        onSelect(start, end, jsEvent, element);
      },
      eventClick: function eventClick(event, jsEvent, view) {
        onEventClick(event, jsEvent, view, element);
      }
    };
    element.fullCalendar(options);
  });
  var MODAL = '#event-modal';
  var EVENT = '#external-events div.external-event';
  var EXT_EVENTS_CONTAINER = '#external-events';
  var categoryForm = $('#add-category form');
  var enableDrag = function enableDrag() {
    $(EVENT).each(function () {
      if ($(this).data('eventObject')) {
        return;
      }
      $(this).data('eventObject', {
        title: $.trim($(this).find('.external-event__title').text())
      });
      $(this).draggable({
        zIndex: 999,
        revert: true,
        revertDuration: 0
      });
    });
  };
  enableDrag();
  $('.save-category').on('click', function () {
    var name = categoryForm.find('input[name="category-name"]').val();
    var color = categoryForm.find('select[name="category-color"]').val();
    if (null !== name && 0 != name.length) {
      $(EXT_EVENTS_CONTAINER).append("\n        <div class=\"external-event bg-".concat(color, "\" data-class=\"bg-").concat(color, "\">\n          <i class=\"mr-2 material-icons\">drag_handle</i>\n          <span class=\"external-event__title\">").concat(name, "</span>\n        </div>\n      "));
      enableDrag();
    }
  });
})();

/***/ }),

/***/ 17:
/*!**********************************************!*\
  !*** multi ./src/js/plugins/fullcalendar.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/alishahbas/Documents/Projects/Rental AI /rental-ai/src/js/plugins/fullcalendar.js */"./src/js/plugins/fullcalendar.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BsdWdpbnMvZnVsbGNhbGVuZGFyLmpzIl0sIm5hbWVzIjpbInQiLCJEYXRlIiwiZGF0ZSIsImdldERhdGUiLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwiJCIsIm5vdyIsImV2ZW50cyIsInRpdGxlIiwic3RhcnQiLCJjbGFzc05hbWUiLCJlbmQiLCJvbkRyb3AiLCJkcm9wcGFibGUiLCJjYWxlbmRhciIsImV2ZW50T2JqZWN0IiwiZGF0YSIsIm9wdGlvbnMiLCJleHRlbmQiLCJmdWxsQ2FsZW5kYXIiLCJpcyIsInJlbW92ZSIsIm9uRXZlbnRDbGljayIsImV2ZW50IiwianNFdmVudCIsInZpZXciLCJtb2RhbCIsIk1PREFMIiwiZm9ybSIsImNvbmNhdCIsImZpbmQiLCJzaG93IiwiaGlkZSIsImVtcHR5IiwicHJlcGVuZCIsInVuYmluZCIsIm9uIiwiZSIsIl9pZCIsInByZXZlbnREZWZhdWx0IiwidmFsIiwib25TZWxlY3QiLCJiYWNrZHJvcCIsInN1Ym1pdCIsImxlbmd0aCIsImFsbERheSIsImFsZXJ0IiwiZWFjaCIsImVsZW1lbnQiLCJ0aGVtZVN5c3RlbSIsImNsb3NlQnV0dG9uIiwic2xvdER1cmF0aW9uIiwibWluVGltZSIsIm1heFRpbWUiLCJkZWZhdWx0VmlldyIsImhhbmRsZVdpbmRvd1Jlc2l6ZSIsImhlaWdodCIsIndpbmRvdyIsImhlYWRlciIsImxlZnQiLCJjZW50ZXIiLCJyaWdodCIsImVkaXRhYmxlIiwiZXZlbnRMaW1pdCIsInNlbGVjdGFibGUiLCJkcm9wIiwic2VsZWN0IiwiZXZlbnRDbGljayIsIkVWRU5UIiwiRVhUX0VWRU5UU19DT05UQUlORVIiLCJjYXRlZ29yeUZvcm0iLCJlbmFibGVEcmFnIiwidHJpbSIsInRleHQiLCJkcmFnZ2FibGUiLCJ6SW5kZXgiLCJyZXZlcnQiLCJyZXZlcnREdXJhdGlvbiIsIm5hbWUiLCJjb2xvciIs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LG9CQUFvQixDQUFDLENBQUNXLE1BQU0sNkNBQUFuRCxNQUFBLENBQ0trRCxLQUFLLHlCQUFBbEQsTUFBQSxDQUFzQmtELEtBQUssdUhBQUFsRCxNQUFBLENBRXhCaUQsSUFBSSxvQ0FFOUMsQ0FBQztNQUNGUCxVQUFVLENBQUMsQ0FBQztJQUNkO0VBQ0YsQ0FBQyxDQUFDO0FBRUosQ0FBQyxFQUFFLENBQUMsQyIsImZpbGUiOiIvZGlzdC9hc3NldHMvanMvZnVsbGNhbGVuZGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNyk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0ID0gbmV3IERhdGVcbiAgY29uc3QgZGF0ZSA9ICh0LmdldERhdGUoKSwgdC5nZXRNb250aCgpLCB0LmdldEZ1bGxZZWFyKCksIG5ldyBEYXRlKCQubm93KCkpKVxuXG4gIGNvbnN0IGV2ZW50cyA9IFt7XG4gICAgdGl0bGU6IFwiSGV5IVwiLFxuICAgIHN0YXJ0OiBuZXcgRGF0ZSgkLm5vdygpICsgMTU4ZTYpLFxuICAgIGNsYXNzTmFtZTogXCJiZy13YXJuaW5nXCJcbiAgfSwge1xuICAgIHRpdGxlOiBcIlNlZSBKb2huIERlb1wiLFxuICAgIHN0YXJ0OiBkYXRlLFxuICAgIGVuZDogZGF0ZSxcbiAgICBjbGFzc05hbWU6IFwiYmctc3VjY2Vzc1wiXG4gIH0sIHtcbiAgICB0aXRsZTogXCJNZWV0IEpvaG4gRGVvXCIsXG4gICAgc3RhcnQ6IG5ldyBEYXRlKCQubm93KCkgKyAxNjhlNiksXG4gICAgY2xhc3NOYW1lOiBcImJnLWluZm9cIlxuICB9LCB7XG4gICAgdGl0bGU6IFwiQnV5IGEgVGhlbWVcIixcbiAgICBzdGFydDogbmV3IERhdGUoJC5ub3coKSArIDMzOGU2KSxcbiAgICBjbGFzc05hbWU6IFwiYmctcHJpbWFyeVwiXG4gIH1dXG5cbiAgY29uc3Qgb25Ecm9wID0gKGRyb3BwYWJsZSwgZGF0ZSwgY2FsZW5kYXIpID0+IHtcbiAgICBjb25zdCBldmVudE9iamVjdCA9IGRyb3BwYWJsZS5kYXRhKCdldmVudE9iamVjdCcpXG4gICAgY29uc3QgY2xhc3NOYW1lID0gZHJvcHBhYmxlLmRhdGEoJ2NsYXNzJylcbiAgICBjb25zdCBvcHRpb25zID0gJC5leHRlbmQoe30sIGV2ZW50T2JqZWN0KVxuICAgIG9wdGlvbnMuc3RhcnQgPSBkYXRlIFxuICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgIG9wdGlvbnMuY2xhc3NOYW1lID0gW2NsYXNzTmFtZV1cbiAgICB9XG5cbiAgICBjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ3JlbmRlckV2ZW50Jywgb3B0aW9ucywgdHJ1ZSlcbiAgICBpZiAoJCgnI2Ryb3AtcmVtb3ZlJykuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgIGRyb3BwYWJsZS5yZW1vdmUoKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG9uRXZlbnRDbGljayA9IChldmVudCwganNFdmVudCwgdmlldywgY2FsZW5kYXIpID0+IHtcbiAgICBjb25zdCBtb2RhbCA9ICQoTU9EQUwpXG4gICAgY29uc3QgZm9ybSA9ICQoYDxmb3JtPlxuICAgICAgPGxhYmVsPkNoYW5nZSBldmVudCBuYW1lPC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBtLWItMTVcIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7IGV2ZW50LnRpdGxlIH1cIiAvPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIG1yLTJcIj5jaGVjazwvaT4gU2F2ZVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Zvcm0+YClcblxuICAgIG1vZGFsLm1vZGFsKCdzaG93JylcbiAgICBtb2RhbFxuICAgICAgLmZpbmQoJy5kZWxldGUtZXZlbnQnKS5zaG93KCkuZW5kKClcbiAgICAgIC5maW5kKCcuc2F2ZS1ldmVudCcpLmhpZGUoKS5lbmQoKVxuICAgICAgLmZpbmQoJy5tb2RhbC1ib2R5JykuZW1wdHkoKS5wcmVwZW5kKGZvcm0pLmVuZCgpXG4gICAgICAuZmluZCgnLmRlbGV0ZS1ldmVudCcpLnVuYmluZCgnY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY2FsZW5kYXIuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgcmV0dXJuIGUuX2lkID09IGV2ZW50Ll9pZFxuICAgICAgICB9KVxuICAgICAgICBtb2RhbC5tb2RhbCgnaGlkZScpXG4gICAgfSlcblxuICAgIG1vZGFsLmZpbmQoJ2Zvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBldmVudC50aXRsZSA9IGZvcm0uZmluZCgnaW5wdXRbdHlwZT10ZXh0XScpLnZhbCgpXG4gICAgICBjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ3VwZGF0ZUV2ZW50JywgZXZlbnQpXG4gICAgICBtb2RhbC5tb2RhbCgnaGlkZScpXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IG9uU2VsZWN0ID0gKHN0YXJ0LCBlbmQsIGpzRXZlbnQsIGNhbGVuZGFyKSA9PiB7XG4gICAgY29uc3QgbW9kYWwgPSAkKE1PREFMKVxuICAgIG1vZGFsLm1vZGFsKHtcbiAgICAgIGJhY2tkcm9wOiBcInN0YXRpY1wiXG4gICAgfSlcbiAgICBcbiAgICBjb25zdCBmb3JtID0gJChgPGZvcm0+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiPkV2ZW50IE5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJJbnNlcnQgRXZlbnQgTmFtZVwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRpdGxlXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiPkNhdGVnb3J5PC9sYWJlbD5cbiAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgY3VzdG9tLXNlbGVjdFwiIG5hbWU9XCJjYXRlZ29yeVwiPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYmctZGFuZ2VyXCI+RGFuZ2VyPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJiZy1zdWNjZXNzXCI+U3VjY2Vzczwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYmctcHJpbWFyeVwiPlByaW1hcnk8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJnLWluZm9cIj5JbmZvPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJiZy1kYXJrXCI+RGFyazwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYmctd2FybmluZ1wiPldhcm5pbmc8L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZm9ybT5gKTtcblxuICAgIG1vZGFsXG4gICAgICAuZmluZCgnLmRlbGV0ZS1ldmVudCcpLmhpZGUoKS5lbmQoKVxuICAgICAgLmZpbmQoJy5zYXZlLWV2ZW50Jykuc2hvdygpLmVuZCgpXG4gICAgICAuZmluZCgnLm1vZGFsLWJvZHknKS5lbXB0eSgpLnByZXBlbmQoZm9ybSkuZW5kKClcbiAgICAgIC5maW5kKCcuc2F2ZS1ldmVudCcpLnVuYmluZCgnY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9ybS5zdWJtaXQoKVxuICAgICAgfSlcblxuICAgIG1vZGFsLmZpbmQoJ2Zvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIHZhciB0aXRsZSA9IGZvcm0uZmluZCgnaW5wdXRbbmFtZT1cInRpdGxlXCJdJykudmFsKClcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IChcbiAgICAgICAgZm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiYmVnaW5uaW5nXCJdJykudmFsKCksIFxuICAgICAgICBmb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJlbmRpbmdcIl0nKS52YWwoKSwgXG4gICAgICAgIGZvcm0uZmluZCgnc2VsZWN0W25hbWU9XCJjYXRlZ29yeVwiXSBvcHRpb246Y2hlY2tlZCcpLnZhbCgpXG4gICAgICApXG5cbiAgICAgIGlmIChudWxsICE9PSB0aXRsZSAmJiAwICE9IHRpdGxlLmxlbmd0aCkge1xuICAgICAgICBjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ3JlbmRlckV2ZW50Jywge1xuICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgIGVuZCxcbiAgICAgICAgICBhbGxEYXk6IGZhbHNlLFxuICAgICAgICAgIGNsYXNzTmFtZVxuICAgICAgICB9LCB0cnVlKVxuICAgICAgICByZXR1cm4gbW9kYWwubW9kYWwoJ2hpZGUnKVxuICAgICAgfVxuICAgICAgXG4gICAgICBhbGVydCgnWW91IGhhdmUgdG8gZ2l2ZSBhIHRpdGxlIHRvIHlvdXIgZXZlbnQnKVxuICAgIH0pXG5cbiAgICBjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ3Vuc2VsZWN0JylcbiAgfVxuXG4gICQoJ1tkYXRhLXRvZ2dsZT1cImZ1bGxjYWxlbmRhclwiXScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcylcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgdGhlbWVTeXN0ZW06ICdib290c3RyYXA0JyxcbiAgICAgIGNsb3NlQnV0dG9uOiB2b2lkIDAgIT09IGVsZW1lbnQuZGF0YSgndG9hc3RyLWNsb3NlLWJ1dHRvbicpIFxuICAgICAgICA/IGVsZW1lbnQuZGF0YSgndG9hc3RyLWNsb3NlLWJ1dHRvbicpIFxuICAgICAgICA6IGZhbHNlLFxuICAgICAgc2xvdER1cmF0aW9uOiAnMDA6MTU6MDAnLFxuICAgICAgbWluVGltZTogJzA4OjAwOjAwJyxcbiAgICAgIG1heFRpbWU6ICcxOTowMDowMCcsXG4gICAgICBkZWZhdWx0VmlldzogJ21vbnRoJyxcbiAgICAgIGhhbmRsZVdpbmRvd1Jlc2l6ZTogdHJ1ZSxcbiAgICAgIGhlaWdodDogJCh3aW5kb3cpLmhlaWdodCgpIC0gMjAwLFxuICAgICAgaGVhZGVyOiB7XG4gICAgICAgIGxlZnQ6ICdwcmV2LG5leHQgdG9kYXknLFxuICAgICAgICBjZW50ZXI6ICd0aXRsZScsXG4gICAgICAgIHJpZ2h0OiAnbW9udGgsYWdlbmRhV2VlayxhZ2VuZGFEYXknXG4gICAgICB9LFxuICAgICAgZXZlbnRzLFxuICAgICAgZWRpdGFibGU6IHRydWUsXG4gICAgICBkcm9wcGFibGU6IHRydWUsXG4gICAgICBldmVudExpbWl0OiB0cnVlLFxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcbiAgICAgIGRyb3A6IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgb25Ecm9wKCQodGhpcyksIGRhdGUsIGVsZW1lbnQpXG4gICAgICB9LFxuICAgICAgc2VsZWN0OiBmdW5jdGlvbihzdGFydCwgZW5kLCBqc0V2ZW50KSB7XG4gICAgICAgIG9uU2VsZWN0KHN0YXJ0LCBlbmQsIGpzRXZlbnQsIGVsZW1lbnQpXG4gICAgICB9LFxuICAgICAgZXZlbnRDbGljazogZnVuY3Rpb24oZXZlbnQsIGpzRXZlbnQsIHZpZXcpIHtcbiAgICAgICAgb25FdmVudENsaWNrKGV2ZW50LCBqc0V2ZW50LCB2aWV3LCBlbGVtZW50KVxuICAgICAgfVxuICAgIH1cblxuICAgIGVsZW1lbnQuZnVsbENhbGVuZGFyKG9wdGlvbnMpXG4gIH0pXG5cbiAgY29uc3QgTU9EQUwgPSAnI2V2ZW50LW1vZGFsJ1xuICBjb25zdCBFVkVOVCA9ICcjZXh0ZXJuYWwtZXZlbnRzIGRpdi5leHRlcm5hbC1ldmVudCdcbiAgY29uc3QgRVhUX0VWRU5UU19DT05UQUlORVIgPSAnI2V4dGVybmFsLWV2ZW50cydcbiAgY29uc3QgY2F0ZWdvcnlGb3JtID0gJCgnI2FkZC1jYXRlZ29yeSBmb3JtJylcblxuICBjb25zdCBlbmFibGVEcmFnID0gKCkgPT4ge1xuICAgICQoRVZFTlQpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoJCh0aGlzKS5kYXRhKCdldmVudE9iamVjdCcpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgJCh0aGlzKS5kYXRhKCdldmVudE9iamVjdCcsIHtcbiAgICAgICAgdGl0bGU6ICQudHJpbSgkKHRoaXMpLmZpbmQoJy5leHRlcm5hbC1ldmVudF9fdGl0bGUnKS50ZXh0KCkpXG4gICAgICB9KVxuICAgICAgJCh0aGlzKS5kcmFnZ2FibGUoe1xuICAgICAgICB6SW5kZXg6IDk5OSxcbiAgICAgICAgcmV2ZXJ0OiB0cnVlLFxuICAgICAgICByZXZlcnREdXJhdGlvbjogMFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZW5hYmxlRHJhZygpXG5cbiAgJCgnLnNhdmUtY2F0ZWdvcnknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBuYW1lID0gY2F0ZWdvcnlGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJjYXRlZ29yeS1uYW1lXCJdJykudmFsKClcbiAgICBjb25zdCBjb2xvciA9IGNhdGVnb3J5Rm9ybS5maW5kKCdzZWxlY3RbbmFtZT1cImNhdGVnb3J5LWNvbG9yXCJdJykudmFsKClcblxuICAgIGlmIChudWxsICE9PSBuYW1lICYmIDAgIT0gbmFtZS5sZW5ndGgpIHtcbiAgICAgICQoRVhUX0VWRU5UU19DT05UQUlORVIpLmFwcGVuZChgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJleHRlcm5hbC1ldmVudCBiZy0keyBjb2xvciB9XCIgZGF0YS1jbGFzcz1cImJnLSR7IGNvbG9yIH1cIj5cbiAgICAgICAgICA8aSBjbGFzcz1cIm1yLTIgbWF0ZXJpYWwtaWNvbnNcIj5kcmFnX2hhbmRsZTwvaT5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImV4dGVybmFsLWV2ZW50X190aXRsZVwiPiR7IG5hbWUgfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICBgKVxuICAgICAgZW5hYmxlRHJhZygpXG4gICAgfVxuICB9KVxuXG59KSgpIl0sInNvdXJjZVJvb3QiOiIifQ==