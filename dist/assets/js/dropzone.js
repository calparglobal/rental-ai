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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/plugins/dropzone.js":
/*!************************************!*\
  !*** ./src/js/plugins/dropzone.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  'use strict';

  Dropzone.autoDiscover = false;
  function mockFile(file, dzInstance, error) {
    var name_pieces = file.split(/[\s\/]+/);
    var name = name_pieces[name_pieces.length - 1];

    // Create the mock file:
    var mockFile = {
      name: name,
      size: 12345,
      accepted: true,
      dataURL: file
    };

    // Call the default addedfile event handler
    dzInstance.emit('addedfile', mockFile);

    // And optionally show the thumbnail of the file:
    // dzInstance.emit('thumbnail', mockFile, file);

    // Or if the file on your server is not yet in the right
    // size, you can let Dropzone download and resize it
    dzInstance.createThumbnailFromUrl(mockFile, dzInstance.options.thumbnailWidth, dzInstance.options.thumbnailHeight, dzInstance.options.thumbnailMethod, true, function (thumbnail) {
      dzInstance.emit('thumbnail', mockFile, thumbnail);
    });

    // fake error / success
    mockFile.status = Dropzone[error ? 'ERROR' : 'SUCCESS'];
    dzInstance.emit(error ? 'error' : 'success', mockFile, error ? 'The error message' : 'success', null);

    // Make sure that there is no progress bar, etc...
    dzInstance.emit('complete', mockFile);

    // If you use the maxFiles option, make sure you adjust it to the
    // correct amount:
    // var existingFileCount = 1; // The number of files already uploaded
    // dzInstance.options.maxFiles = dzInstance.options.maxFiles - existingFileCount;
  }
  $('[data-toggle="dropzone"]').each(function () {
    var element = $(this);
    var template = element.find('.dz-preview');
    var isMultiple = void 0 !== element.data('dropzone-multiple');
    var currentFile = void 0;
    var options = {
      url: element.data("dropzone-url"),
      thumbnailWidth: null,
      thumbnailHeight: null,
      previewsContainer: template.get(0),
      previewTemplate: template.html(),
      maxFiles: isMultiple ? null : 1,
      acceptedFiles: 'image/*',
      clickable: void 0 !== element.data('dropzone-clickable') ? element.data('dropzone-clickable') : true,
      init: function init() {
        this.on('addedfile', function (file) {
          if (!isMultiple && currentFile) {
            this.removeFile(currentFile);
          }
          currentFile = file;
        });
        this.on('maxfilesexceeded', function (file) {
          this.removeAllFiles();
          this.addFile(file);
        });
        var filesOnServer = element.data('dropzone-files');
        var dzInstance = this;
        filesOnServer.forEach(function (file, index) {
          mockFile(file, dzInstance, index >= (filesOnServer.length - 1) / 2);
        });
      }
    };
    template.html('');
    element.dropzone(options);
  });
})();

/***/ }),

/***/ 15:
/*!******************************************!*\
  !*** multi ./src/js/plugins/dropzone.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/alishahbas/Documents/Projects/Rental AI /rental-ai/src/js/plugins/dropzone.js */"./src/js/plugins/dropzone.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BsdWdpbnMvZHJvcHpvbmUuanMiXSwibmFtZXMiOlsiRHJvcHpvbmUiLCJhdXRvRGlzY292ZXIiLCJtb2NrRmlsZSIsImZpbGUiLCJkekluc3RhbmNlIiwiZXJyb3IiLCJuYW1lX3BpZWNlcyIsInNwbGl0IiwibmFtZSIsImxlbmd0aCIsInNpemUiLCJhY2NlcHRlZCIsImRhdGFVUkwiLCJlbWl0IiwiY3JlYXRlVGh1bWJuYWlsRnJvbVVybCIsIm9wdGlvbnMiLCJ0aHVtYm5haWxXaWR0aCIsInRodW1ibmFpbEhlaWdodCIsInRodW1ibmFpbE1ldGhvZCIsInRodW1ibmFpbCIsInN0YXR1cyIsIiQiLCJlYWNoIiwiZWxlbWVudCIsInRlbXBsYXRlIiwiZmluZCIsImlzTXVsdGlwbGUiLCJkYXRhIiwiY3VycmVudEZpbGUiLCJ1cmwiLCJwcmV2aWV3c0NvbnRhaW5lciIsImdldCIsInByZXZpZXdUZW1wbGF0ZSIsImh0bWwiLCJtYXhGaWxlcyIsImFjY2VwdGVkRmlsZXMiLCJjbGlja2FibGUiLCJpbml0Iiwib24iLCJyZW1vdmVGaWxlIiwicmVtb3ZlQWxsRmlsZXMiLCJhZGRGaWxlIiwiZmlsZXNPblNlcnZlciIsImZvckVhY2giLCJpbmRleCIsImRyb3B6b25lIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FB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LEdBQUcsSUFBSTtNQUM3Q1UsSUFBSSxFQUFFLFNBQU5BLElBQUlBLENBQUEsRUFBYTtRQUNmLElBQUksQ0FBQ0MsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFTbkMsSUFBSSxFQUFFO1VBQ2xDLElBQUksQ0FBQ3VCLFVBQVUsSUFBSUUsV0FBVyxFQUFFO1lBQzlCLElBQUksQ0FBQ1csVUFBVSxDQUFDWCxXQUFXLENBQUM7VUFDOUI7VUFDQUEsV0FBVyxHQUFHekIsSUFBSTtRQUNwQixDQUFDLENBQUM7UUFFRixJQUFJLENBQUNtQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsVUFBU25DLElBQUksRUFBRTtVQUN6QyxJQUFJLENBQUNxQyxjQUFjLENBQUMsQ0FBQztVQUNyQixJQUFJLENBQUNDLE9BQU8sQ0FBQ3RDLElBQUksQ0FBQztRQUNwQixDQUFDLENBQUM7UUFFRixJQUFJdUMsYUFBYSxHQUFHbkIsT0FBTyxDQUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDbEQsSUFBSXZCLFVBQVUsR0FBRyxJQUFJO1FBQ3JCc0MsYUFBYSxDQUFDQyxPQUFPLENBQUMsVUFBU3hDLElBQUksRUFBRXlDLEtBQUssRUFBRTtVQUMxQzFDLFFBQVEsQ0FBQ0MsSUFBSSxFQUFFQyxVQUFVLEVBQUV3QyxLQUFLLElBQUksQ0FBQ0YsYUFBYSxDQUFDakMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckUsQ0FBQyxDQUFDO01BQ0o7SUFDRixDQUFDO0lBRURlLFFBQVEsQ0FBQ1MsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQlYsT0FBTyxDQUFDc0IsUUFBUSxDQUFDOUIsT0FBTyxDQUFDO0VBQzNCLENBQUMsQ0FBQztBQUVKLENBQUMsRUFBRSxDQUFDLEMiLCJmaWxlIjoiL2Rpc3QvYXNzZXRzL2pzL2Ryb3B6b25lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNSk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIERyb3B6b25lLmF1dG9EaXNjb3ZlciA9IGZhbHNlXG5cbiAgZnVuY3Rpb24gbW9ja0ZpbGUoZmlsZSwgZHpJbnN0YW5jZSwgZXJyb3IpIHtcbiAgICB2YXIgbmFtZV9waWVjZXMgPSBmaWxlLnNwbGl0KC9bXFxzXFwvXSsvKVxuICAgIHZhciBuYW1lID0gbmFtZV9waWVjZXNbbmFtZV9waWVjZXMubGVuZ3RoLTFdXG4gICAgXG4gICAgLy8gQ3JlYXRlIHRoZSBtb2NrIGZpbGU6XG4gICAgdmFyIG1vY2tGaWxlID0ge1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIHNpemU6IDEyMzQ1LFxuICAgICAgYWNjZXB0ZWQ6IHRydWUsXG4gICAgICBkYXRhVVJMOiBmaWxlXG4gICAgfVxuXG4gICAgLy8gQ2FsbCB0aGUgZGVmYXVsdCBhZGRlZGZpbGUgZXZlbnQgaGFuZGxlclxuICAgIGR6SW5zdGFuY2UuZW1pdCgnYWRkZWRmaWxlJywgbW9ja0ZpbGUpO1xuXG4gICAgLy8gQW5kIG9wdGlvbmFsbHkgc2hvdyB0aGUgdGh1bWJuYWlsIG9mIHRoZSBmaWxlOlxuICAgIC8vIGR6SW5zdGFuY2UuZW1pdCgndGh1bWJuYWlsJywgbW9ja0ZpbGUsIGZpbGUpO1xuXG4gICAgLy8gT3IgaWYgdGhlIGZpbGUgb24geW91ciBzZXJ2ZXIgaXMgbm90IHlldCBpbiB0aGUgcmlnaHRcbiAgICAvLyBzaXplLCB5b3UgY2FuIGxldCBEcm9wem9uZSBkb3dubG9hZCBhbmQgcmVzaXplIGl0XG4gICAgZHpJbnN0YW5jZS5jcmVhdGVUaHVtYm5haWxGcm9tVXJsKFxuICAgICAgbW9ja0ZpbGUsXG4gICAgICBkekluc3RhbmNlLm9wdGlvbnMudGh1bWJuYWlsV2lkdGgsIFxuICAgICAgZHpJbnN0YW5jZS5vcHRpb25zLnRodW1ibmFpbEhlaWdodCxcbiAgICAgIGR6SW5zdGFuY2Uub3B0aW9ucy50aHVtYm5haWxNZXRob2QsIFxuICAgICAgdHJ1ZSwgXG4gICAgICBmdW5jdGlvbih0aHVtYm5haWwpIHtcbiAgICAgICAgZHpJbnN0YW5jZS5lbWl0KCd0aHVtYm5haWwnLCBtb2NrRmlsZSwgdGh1bWJuYWlsKTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gZmFrZSBlcnJvciAvIHN1Y2Nlc3NcbiAgICBtb2NrRmlsZS5zdGF0dXMgPSBEcm9wem9uZVsoZXJyb3IgPyAnRVJST1InIDogJ1NVQ0NFU1MnKV07XG4gICAgZHpJbnN0YW5jZS5lbWl0KChlcnJvciA/ICdlcnJvcicgOiAnc3VjY2VzcycpLCBtb2NrRmlsZSwgKGVycm9yID8gJ1RoZSBlcnJvciBtZXNzYWdlJyA6ICdzdWNjZXNzJyksIG51bGwpO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlcmUgaXMgbm8gcHJvZ3Jlc3MgYmFyLCBldGMuLi5cbiAgICBkekluc3RhbmNlLmVtaXQoJ2NvbXBsZXRlJywgbW9ja0ZpbGUpO1xuXG4gICAgLy8gSWYgeW91IHVzZSB0aGUgbWF4RmlsZXMgb3B0aW9uLCBtYWtlIHN1cmUgeW91IGFkanVzdCBpdCB0byB0aGVcbiAgICAvLyBjb3JyZWN0IGFtb3VudDpcbiAgICAvLyB2YXIgZXhpc3RpbmdGaWxlQ291bnQgPSAxOyAvLyBUaGUgbnVtYmVyIG9mIGZpbGVzIGFscmVhZHkgdXBsb2FkZWRcbiAgICAvLyBkekluc3RhbmNlLm9wdGlvbnMubWF4RmlsZXMgPSBkekluc3RhbmNlLm9wdGlvbnMubWF4RmlsZXMgLSBleGlzdGluZ0ZpbGVDb3VudDtcbiAgfVxuXG4gICQoJ1tkYXRhLXRvZ2dsZT1cImRyb3B6b25lXCJdJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICB2YXIgZWxlbWVudCA9ICQodGhpcylcbiAgICB2YXIgdGVtcGxhdGUgPSBlbGVtZW50LmZpbmQoJy5kei1wcmV2aWV3JylcblxuICAgIHZhciBpc011bHRpcGxlID0gdm9pZCAwICE9PSBlbGVtZW50LmRhdGEoJ2Ryb3B6b25lLW11bHRpcGxlJylcbiAgICB2YXIgY3VycmVudEZpbGUgPSB2b2lkIDBcbiAgICB2YXIgb3B0aW9ucyAgPSB7XG4gICAgICB1cmw6IGVsZW1lbnQuZGF0YShcImRyb3B6b25lLXVybFwiKSxcbiAgICAgIHRodW1ibmFpbFdpZHRoOiBudWxsLFxuICAgICAgdGh1bWJuYWlsSGVpZ2h0OiBudWxsLFxuICAgICAgcHJldmlld3NDb250YWluZXI6IHRlbXBsYXRlLmdldCgwKSxcbiAgICAgIHByZXZpZXdUZW1wbGF0ZTogdGVtcGxhdGUuaHRtbCgpLFxuICAgICAgbWF4RmlsZXM6IGlzTXVsdGlwbGUgPyBudWxsIDogMSxcbiAgICAgIGFjY2VwdGVkRmlsZXM6ICdpbWFnZS8qJyxcbiAgICAgIGNsaWNrYWJsZTogdm9pZCAwICE9PSBlbGVtZW50LmRhdGEoJ2Ryb3B6b25lLWNsaWNrYWJsZScpXG4gICAgICAgID8gZWxlbWVudC5kYXRhKCdkcm9wem9uZS1jbGlja2FibGUnKSA6IHRydWUsXG4gICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5vbignYWRkZWRmaWxlJywgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICAgIGlmICghaXNNdWx0aXBsZSAmJiBjdXJyZW50RmlsZSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGaWxlKGN1cnJlbnRGaWxlKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJyZW50RmlsZSA9IGZpbGVcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLm9uKCdtYXhmaWxlc2V4Y2VlZGVkJywgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsRmlsZXMoKVxuICAgICAgICAgIHRoaXMuYWRkRmlsZShmaWxlKVxuICAgICAgICB9KVxuXG4gICAgICAgIHZhciBmaWxlc09uU2VydmVyID0gZWxlbWVudC5kYXRhKCdkcm9wem9uZS1maWxlcycpXG4gICAgICAgIHZhciBkekluc3RhbmNlID0gdGhpc1xuICAgICAgICBmaWxlc09uU2VydmVyLmZvckVhY2goZnVuY3Rpb24oZmlsZSwgaW5kZXgpIHtcbiAgICAgICAgICBtb2NrRmlsZShmaWxlLCBkekluc3RhbmNlLCBpbmRleCA+PSAoZmlsZXNPblNlcnZlci5sZW5ndGggLSAxKSAvIDIpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGVtcGxhdGUuaHRtbCgnJylcbiAgICBlbGVtZW50LmRyb3B6b25lKG9wdGlvbnMpXG4gIH0pXG5cbn0pKCkiXSwic291cmNlUm9vdCI6IiJ9