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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/page.dashboard.js":
/*!**********************************!*\
  !*** ./src/js/page.dashboard.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var _n = 0,
        F = function F() {};
      return {
        s: F,
        n: function n() {
          return _n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[_n++]
          };
        },
        e: function e(r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function s() {
      t = t.call(r);
    },
    n: function n() {
      var r = t.next();
      return a = r.done, r;
    },
    e: function e(r) {
      u = !0, o = r;
    },
    f: function f() {
      try {
        a || null == t["return"] || t["return"]();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
(function () {
  'use strict';

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  window['moment-range'].extendMoment(moment);
  $('[data-toggle="tab"]').on('hide.bs.tab', function (e) {
    $(e.target).removeClass('active');
  });
  Charts.init();
  var TotalSales = function TotalSales(id) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'line';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    options = Chart.helpers.merge({
      title: {
        display: true,
        fontSize: 12,
        fontColor: 'rgba(54, 76, 102, 0.54)',
        position: 'top',
        text: 'SALES OVER TIME'
      },
      legend: {
        display: true,
        align: 'start',
        labels: {
          usePointStyle: false,
          padding: 16,
          boxWidth: 16
        }
      },
      elements: {
        line: {
          fill: 'start',
          backgroundColor: settings.charts.colors.area
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 10,
            callback: function callback(item) {
              return "$" + item;
            }
          }
        }],
        xAxes: [{
          ticks: {
            padding: 4,
            callback: function callback(item) {
              return item;
            }
          },
          gridLines: {
            display: false
          },
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'D/MM'
            },
            stepSize: 2,
            maxTicksLimit: 7,
            autoSkip: false
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: function label(a, e) {
            var t = e.datasets[a.datasetIndex].label || "",
              o = a.yLabel,
              r = "";
            return 1 < e.datasets.length && (r += '<span class="popover-body-label mr-auto">' + t + "</span>"), r += '<span class="popover-body-value">$' + o + "</span>";
          }
        }
      }
    }, options);
    var data = [];

    // Create a date range for the last 7 days
    var start = moment().subtract(6, 'days').format('YYYY-MM-DD'); // 7 days ago
    var end = moment().format('YYYY-MM-DD'); // today
    var range = moment.range(start, end);

    // Create the graph data
    // Iterate the date range and assign a random value for each day
    var _iterator = _createForOfIteratorHelper(range.by('days')),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _moment = _step.value;
        data.push({
          y: getRandomInt(2, 40),
          x: _moment.toDate()
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var data = {
      datasets: [{
        label: "Total Sales",
        data: data
      }]
    };
    Charts.create(id, type, options, data);
  };
  var TotalVisitors = function TotalVisitors(id) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'roundedBar';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    options = Chart.helpers.merge({
      title: {
        display: true,
        fontSize: 12,
        fontColor: 'rgba(54, 76, 102, 0.54)',
        position: 'top',
        text: 'VISITORS OVER TIME'
      },
      legend: {
        display: true,
        align: 'start',
        labels: {
          usePointStyle: false,
          padding: 16,
          boxWidth: 16
        }
      },
      barRoundness: 1.2,
      barThickness: 8,
      scales: {
        yAxes: [{
          ticks: {
            callback: function callback(a) {
              if (!(a % 10)) return a + "k";
            }
          }
        }],
        xAxes: [{
          ticks: {
            padding: 4,
            callback: function callback(item) {
              return item;
            }
          },
          offset: true,
          gridLines: {
            display: false
          },
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'D/MM'
            },
            stepSize: 2,
            maxTicksLimit: 7
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: function label(a, e) {
            var t = e.datasets[a.datasetIndex].label || "",
              o = a.yLabel,
              r = "";
            return 1 < e.datasets.length && (r += '<span class="popover-body-label mr-auto">' + t + "</span>"), r += '<span class="popover-body-value">' + o + "k</span>";
          }
        }
      }
    }, options);
    var data = [];

    // Create a date range for the last 7 days
    var start = moment().subtract(6, 'days').format('YYYY-MM-DD'); // 7 days ago
    var end = moment().format('YYYY-MM-DD'); // today
    var range = moment.range(start, end);

    // Create the graph data
    // Iterate the date range and assign a random value for each day
    var _iterator2 = _createForOfIteratorHelper(range.by('days')),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _moment2 = _step2.value;
        data.push({
          y: getRandomInt(10, 30),
          x: _moment2.toDate()
        });
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    var data = {
      datasets: [{
        label: "Total Visitors",
        data: data,
        barPercentage: 0.5,
        barThickness: 20
      }]
    };
    Charts.create(id, type, options, data);
  };
  var RepeatCustomerRate = function RepeatCustomerRate(id) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'line';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    options = Chart.helpers.merge({
      elements: {
        line: {
          tension: 0
        }
      },
      title: {
        display: true,
        fontSize: 12,
        fontColor: 'rgba(54, 76, 102, 0.54)',
        position: 'top',
        text: 'CUSTOMERS'
      },
      legend: {
        display: true,
        align: 'start',
        labels: {
          usePointStyle: false,
          padding: 16,
          boxWidth: 16
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            autoSkip: false,
            autoSkipPadding: 0,
            padding: 4,
            maxTicksLimit: 4,
            callback: function callback(item) {
              return item + "%";
            }
          }
        }],
        xAxes: [{
          ticks: {
            padding: 4,
            callback: function callback(item) {
              return item;
            }
          },
          gridLines: {
            display: false
          },
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'D/MM'
            },
            stepSize: 2,
            maxTicksLimit: 7,
            autoSkip: false
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: function label(a, e) {
            var t = e.datasets[a.datasetIndex].label || "",
              o = a.yLabel,
              r = "";
            return 1 < e.datasets.length && (r += '<span class="popover-body-label mr-auto">' + t + "</span>"), r += '<span class="popover-body-value">' + o + "%</span>";
          }
        }
      }
    }, options);
    var firstTimeData = [];
    var returningData = [];

    // Create a date range for the last 7 days
    var start = moment().subtract(6, 'days').format('YYYY-MM-DD'); // 7 days ago
    var end = moment().format('YYYY-MM-DD'); // today
    var range = moment.range(start, end);

    // Create the graph data
    // Iterate the date range and assign a random value for each day
    var _iterator3 = _createForOfIteratorHelper(range.by('days')),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _moment3 = _step3.value;
        firstTimeData.push({
          y: getRandomInt(0, 5),
          x: _moment3.toDate()
        });
        returningData.push({
          y: getRandomInt(5, 10),
          x: _moment3.toDate()
        });
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    var data = {
      datasets: [{
        label: "First time",
        data: firstTimeData,
        borderWidth: 2,
        borderColor: settings.colors.primary[400],
        backgroundColor: settings.colors.primary[400],
        pointBackgroundColor: settings.colors.primary[400]
      }, {
        label: "Returning",
        data: returningData,
        borderWidth: 2,
        borderColor: settings.colors.success[400],
        backgroundColor: settings.colors.success[400],
        pointBackgroundColor: settings.colors.success[400]
      }]
    };
    Charts.create(id, type, options, data);
  };
  var TotalOrders = function TotalOrders(id) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'line';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    options = Chart.helpers.merge({
      title: {
        display: true,
        fontSize: 12,
        fontColor: 'rgba(54, 76, 102, 0.54)',
        position: 'top',
        text: 'ORDERS OVER TIME'
      },
      legend: {
        display: true,
        align: 'start',
        labels: {
          usePointStyle: false,
          padding: 16,
          boxWidth: 16
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 1,
            callback: function callback(item) {
              return item;
            }
          }
        }],
        xAxes: [{
          ticks: {
            padding: 4,
            callback: function callback(item) {
              return item;
            }
          },
          gridLines: {
            display: false
          },
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'D/MM'
            },
            stepSize: 2,
            maxTicksLimit: 7,
            autoSkip: false
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: function label(a, e) {
            var t = e.datasets[a.datasetIndex].label || "",
              o = a.yLabel,
              r = "";
            return 1 < e.datasets.length && (r += '<span class="popover-body-label mr-auto">' + t + "</span>"), r += '<span class="popover-body-value">' + o + "</span>";
          }
        }
      }
    }, options);
    var data = [];

    // Create a date range for the last 7 days
    var start = moment().subtract(6, 'days').format('YYYY-MM-DD'); // 7 days ago
    var end = moment().format('YYYY-MM-DD'); // today
    var range = moment.range(start, end);

    // Create the graph data
    // Iterate the date range and assign a random value for each day
    var _iterator4 = _createForOfIteratorHelper(range.by('days')),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _moment4 = _step4.value;
        data.push({
          y: getRandomInt(0, 2),
          x: _moment4.toDate()
        });
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    var data = {
      datasets: [{
        label: "Total Orders",
        data: data
      }]
    };
    Charts.create(id, type, options, data);
  };
  var AverageOrderValue = function AverageOrderValue(id) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'line';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    options = Chart.helpers.merge({
      title: {
        display: true,
        fontSize: 12,
        fontColor: 'rgba(54, 76, 102, 0.54)',
        position: 'top',
        text: 'ORDER VALUE'
      },
      legend: {
        display: true,
        align: 'start',
        labels: {
          usePointStyle: false,
          padding: 16,
          boxWidth: 16
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 10,
            callback: function callback(item) {
              return "$" + item;
            }
          }
        }],
        xAxes: [{
          ticks: {
            padding: 4,
            callback: function callback(item) {
              return item;
            }
          },
          gridLines: {
            display: false
          },
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'D/MM'
            },
            stepSize: 2,
            maxTicksLimit: 7,
            autoSkip: false
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: function label(a, e) {
            var t = e.datasets[a.datasetIndex].label || "",
              o = a.yLabel,
              r = "";
            return 1 < e.datasets.length && (r += '<span class="popover-body-label mr-auto">' + t + "</span>"), r += '<span class="popover-body-value">$' + o + "</span>";
          }
        }
      }
    }, options);
    var data = [];

    // Create a date range for the last 7 days
    var start = moment().subtract(6, 'days').format('YYYY-MM-DD'); // 7 days ago
    var end = moment().format('YYYY-MM-DD'); // today
    var range = moment.range(start, end);

    // Create the graph data
    // Iterate the date range and assign a random value for each day
    var _iterator5 = _createForOfIteratorHelper(range.by('days')),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _moment5 = _step5.value;
        data.push({
          y: getRandomInt(0, 50),
          x: _moment5.toDate()
        });
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    var data = {
      datasets: [{
        label: "Order Value",
        data: data
      }]
    };
    Charts.create(id, type, options, data);
  };
  var VisitsByDevice = function VisitsByDevice(id) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'doughnut';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    options = Chart.helpers.merge({
      tooltips: {
        callbacks: {
          title: function title(a, e) {
            return e.labels[a[0].index];
          },
          label: function label(a, e) {
            var t = "";
            return t += '<span class="popover-body-value">' + e.datasets[0].data[a.index] + " visits</span>";
          }
        }
      }
    }, options);
    var data = {
      labels: ["Desktop", "Mobile", "Tablet"],
      datasets: [{
        data: [267, 184, 0],
        backgroundColor: [settings.colors.success[400], settings.colors.primary[500], settings.colors.gray[300]],
        hoverBorderColor: "dark" == settings.charts.colorScheme ? settings.colors.gray[800] : settings.colors.white
      }]
    };
    Charts.create(id, type, options, data);
  };
  var EarningsTraffic = function EarningsTraffic(id) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'line';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    options = Chart.helpers.merge({
      elements: {
        line: {
          fill: 'start',
          backgroundColor: settings.charts.colors.area
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            callback: function callback(a) {
              if (!(a % 10)) return "$" + a + "k";
            }
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: function label(a, e) {
            var t = e.datasets[a.datasetIndex].label || "",
              o = a.yLabel,
              r = "";
            return 1 < e.datasets.length && (r += '<span class="popover-body-label mr-auto">' + t + "</span>"), r += '<span class="popover-body-value">$' + o + "k</span>";
          }
        }
      }
    }, options);
    var data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        label: "Traffic",
        data: [10, 2, 5, 15, 10, 12, 15, 25, 22, 30, 25, 40]
      }]
    };
    Charts.create(id, type, options, data);
  };
  var Products = function Products(id) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'line';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var data = arguments.length > 3 ? arguments[3] : undefined;
    options = Chart.helpers.merge({
      elements: {
        line: {
          fill: 'start',
          backgroundColor: settings.charts.colors.area,
          tension: 0,
          borderWidth: 1
        },
        point: {
          pointStyle: 'circle',
          radius: 5,
          hoverRadius: 5,
          backgroundColor: settings.colors.white,
          borderColor: settings.colors.primary[700],
          borderWidth: 2
        }
      },
      scales: {
        yAxes: [{
          display: false
        }],
        xAxes: [{
          display: false
        }]
      }
    }, options);
    data = data || {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: "Earnings",
        data: [400, 200, 450, 460, 220, 380, 800]
      }]
    };
    Charts.create(id, type, options, data);
  };
  var Courses = function Courses(id) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'line';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    options = Chart.helpers.merge({
      elements: {
        line: {
          borderColor: settings.colors.success[700],
          backgroundColor: settings.hexToRGB(settings.colors.success[100], 0.5)
        },
        point: {
          borderColor: settings.colors.success[700]
        }
      }
    }, options);
    Products(id, type, options);
  };
  var LocationDoughnut = function LocationDoughnut(id) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'doughnut';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    options = Chart.helpers.merge({
      tooltips: {
        callbacks: {
          title: function title(a, e) {
            return e.labels[a[0].index];
          },
          label: function label(a, e) {
            var t = "";
            return t += '<span class="popover-body-value">' + e.datasets[0].data[a.index] + "%</span>";
          }
        }
      }
    }, options);
    var data = {
      labels: ["United States", "United Kingdom", "Germany", "India"],
      datasets: [{
        data: [25, 25, 15, 35],
        backgroundColor: [settings.colors.success[400], settings.colors.danger[400], settings.colors.primary[500], settings.colors.gray[300]],
        hoverBorderColor: "dark" == settings.charts.colorScheme ? settings.colors.gray[800] : settings.colors.white
      }]
    };
    Charts.create(id, type, options, data);
  };
  var TrafficBar = function TrafficBar(id) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'roundedBar';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    options = Chart.helpers.merge({
      barRoundness: 1.2,
      scales: {
        yAxes: [{
          ticks: {
            callback: function callback(a) {
              if (!(a % 10)) return a + "k";
            }
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: function label(a, e) {
            var t = e.datasets[a.datasetIndex].label || "",
              o = a.yLabel,
              r = "";
            return 1 < e.datasets.length && (r += '<span class="popover-body-label mr-auto">' + t + "</span>"), r += '<span class="popover-body-value">' + o + "k</span>";
          }
        }
      }
    }, options);
    var data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        label: "Sales",
        data: [25, 20, 30, 22, 17, 10, 18, 26, 28, 26, 20, 32],
        barPercentage: 0.5,
        barThickness: 20
      }]
    };
    Charts.create(id, type, options, data);
  };
  $('.stats-chart').each(function (index, element) {
    var ctx = element.getContext('2d');
    var stats_data = [];
    for (var i = 6; i >= 0; i--) {
      stats_data.push(getRandomInt(100, 300));
    }
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["01", "02", "03", "04", "05", "06", "07", "08"],
        datasets: [{
          data: stats_data,
          borderWidth: 2,
          borderColor: settings.colors.primary[400],
          backgroundColor: settings.colors.primary[50],
          pointBackgroundColor: settings.colors.primary[400]
        }]
      },
      options: {
        elements: {
          point: {
            radius: 0
          }
        },
        tooltips: {
          enabled: false
        },
        legend: {
          display: false,
          labels: {
            display: false
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
              // zeroLineColor: colors.border_color
            },
            ticks: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
              // zeroLineColor: colors.border_color
            },
            ticks: {
              display: false
            }
          }]
        }
      }
    });
  });

  ///////////////////
  // Create Charts //
  ///////////////////

  TotalSales('#totalSalesChart');
  TotalVisitors('#totalVisitorsChart');
  RepeatCustomerRate('#repeatCustomerRateChart');
  TotalOrders('#totalOrdersChart');
  AverageOrderValue('#averageOrderValueChart');
  VisitsByDevice('#visitsByDeviceChart');
  TrafficBar('#trafficBarChart');
  EarningsTraffic('#earningsTrafficChart');
  LocationDoughnut('#locationDoughnutChart');
  Products('#productsChart');
  Courses('#coursesChart');
})();

/***/ }),

/***/ 5:
/*!****************************************!*\
  !*** multi ./src/js/page.dashboard.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/alishahbas/Documents/Projects/Rental AI /rental-ai/src/js/page.dashboard.js */"./src/js/page.dashboard.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhZ2UuZGFzaGJvYXJkLmpzIl0sIm5hbWVzIjpbImdldFJhbmRvbUludCIsIm1pbiIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIndpbmRvdyIsImV4dGVuZE1vbWVudCIsIm1vbWVudCIsIiQiLCJvbiIsImUiLCJ0YXJnZXQiLCJyZW1vdmVDbGFzcyIsIkNoYXJ0cyIsImluaXQiLCJUb3RhbFNhbGVzIiwiaWQiLCJ0eXBlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwib3B0aW9ucyIsIkNoYXJ0IiwiaGVscGVycyIsIm1lcmdlIiwidGl0bGUiLCJkaXNwbGF5IiwiZm9udFNpemUiLCJmb250Q29sb3IiLCJwb3NpdGlvbiIsInRleHQiLCJsZWdlbmQiLCJhbGlnbiIsImxhYmVscyIsInVzZVBvaW50U3R5bGUiLCJwYWRkaW5nIiwiYm94V2lkdGgiLCJlbGVtZW50cyIsImxpbmUiLCJmaWxsIiwiYmFja2dyb3VuZENvbG9yIiwic2V0dGluZ3MiLCJjaGFydHMiLCJjb2xvcnMiLCJhcmVhIiwic2NhbGVzIiwieUF4ZXMiLCJ0aWNrcyIsInN0ZXBTaXplIiwiY2FsbGJhY2siLCJpdGVtIiwieEF4ZXMiLCJncmlkTGluZXMiLCJ0aW1lIiwidW5pdCIsImRpc3BsYXlGb3JtYXRzIiwiZGF5IiwibWF4VGlja3NMaW1pdCIsImF1dG9Ta2lwIiwidG9vbHRpcHMiLCJjYWxsYmFja3MiLCJsYWJlbCIsImEiLCJ0IiwiZGF0YXNldHMiLCJkYXRhc2V0SW5kZXgiLCJvIiwieUxhYmVsIiwiciIsImRhdGEiLCJzdGFydCIsInN1YnRyYWN0IiwiZm9ybWF0IiwiZW5kIiwicmFuZ2UiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsImJ5IiwiX3N0ZXAiLCJzIiwibiIsImRvbmUiLCJfbW9tZW50IiwidmFsdWUiLCJwdXNoIiwieSIsIngiLCJ0b0RhdGUiLCJlcnIiLCJmIiwiY3JlYXRlIiwiVG90YWxWaXNpdG9ycyIsImJhclJvdW5kbmVzcyIsImJhclRoaWNrbmVzcyIsIm9mZnNldCIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJfbW9tZW50MiIsImJhclBlcmNlbnRhZ2UiLCJSZXBlYXRDdXN0b21lclJhdGUiLCJ0ZW5zaW9uIiwiYXV0b1NraXBQYWRkaW5nIiwiZmlyc3RUaW1lRGF0YSIsInJldHVybmluZ0RhdGEiLCJfaXRlcmF0b3IzIiwiX3N0ZXAzIiwiX21vbWVudDMiLCJib3JkZXJXaWR0aCIsImJvcmRlckNvbG9yIiwicHJpbWFyeSIsInBvaW50QmFja2dyb3VuZENvbG9yIiwic3VjY2VzcyIsIlRvdGFsT3JkZXJzIiwiX2l0ZXJhdG9yNCIsIl9zdGVwNCIsIl9tb21lbnQ0IiwiQXZlcmFnZU9yZGVyVmFsdWUiLCJfaXRlcmF0b3I1IiwiX3N0ZXA1IiwiX21vbWVudDUiLCJWaXNpdHNCeURldmljZSIsImluZGV4IiwiZ3JheSIsImhvdmVyQm9yZGVyQ29sb3IiLCJjb2xvclNjaGVtZSIsIndoaXRlIiwiRWFybmluZ3NUcmFmZmljIiwiUHJvZHVjdHMiLCJwb2ludCIsInBvaW50U3R5bGUiLCJyYWRpdXMiLCJob3ZlclJhZGl1cyIsIkNvdXJzZXMiLCJoZXhUb1JHQiIsIkxvY2F0aW9uRG91Z2hudXQiLCJkYW5nZXIiLCJUcmFmZmljQmFyIiwiZWFjaCIsImVsZW1lbnQiLCJjdHgiLCJnZXRDb250ZXh0Iiwic3RhdHNfZGF0YSIsImkiLCJlbmFibGVkIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtR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QywwQkFBMEIsQ0FBQztFQUM5Q2EsV0FBVyxDQUFDLG1CQUFtQixDQUFDO0VBQ2hDSSxpQkFBaUIsQ0FBQyx5QkFBeUIsQ0FBQztFQUM1Q0ksY0FBYyxDQUFDLHNCQUFzQixDQUFDO0VBRXRDZ0IsVUFBVSxDQUFDLGtCQUFrQixDQUFDO0VBQzlCVixlQUFlLENBQUMsdUJBQXVCLENBQUM7RUFDeENRLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDO0VBQzFDUCxRQUFRLENBQUMsZ0JBQWdCLENBQUM7RUFDMUJLLE9BQU8sQ0FBQyxlQUFlLENBQUM7QUFFMUIsQ0FBQyxFQUFFLENBQUMsQyIsImZpbGUiOiIvZGlzdC9hc3NldHMvanMvcGFnZS5kYXNoYm9hcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBnZXRSYW5kb21JbnQobWluLCBtYXgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pblxuICB9XG5cbiAgd2luZG93Wydtb21lbnQtcmFuZ2UnXS5leHRlbmRNb21lbnQobW9tZW50KTtcbiAgICBcbiAgJCgnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJykub24oJ2hpZGUuYnMudGFiJywgZnVuY3Rpb24gKGUpIHtcbiAgICAkKGUudGFyZ2V0KS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgfSlcblxuICBDaGFydHMuaW5pdCgpXG5cbiAgdmFyIFRvdGFsU2FsZXMgPSBmdW5jdGlvbihpZCwgdHlwZSA9ICdsaW5lJywgb3B0aW9ucyA9IHt9KSB7XG4gICAgb3B0aW9ucyA9IENoYXJ0LmhlbHBlcnMubWVyZ2Uoe1xuICAgICAgdGl0bGU6IHtcbiAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgZm9udFNpemU6IDEyLFxuICAgICAgICBmb250Q29sb3I6ICdyZ2JhKDU0LCA3NiwgMTAyLCAwLjU0KScsXG4gICAgICAgIHBvc2l0aW9uOiAndG9wJyxcbiAgICAgICAgdGV4dDogJ1NBTEVTIE9WRVIgVElNRSdcbiAgICAgIH0sXG4gICAgICBsZWdlbmQ6IHtcbiAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgYWxpZ246ICdzdGFydCcsXG4gICAgICAgIGxhYmVsczoge1xuICAgICAgICAgIHVzZVBvaW50U3R5bGU6IGZhbHNlLFxuICAgICAgICAgIHBhZGRpbmc6IDE2LFxuICAgICAgICAgIGJveFdpZHRoOiAxNixcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIGxpbmU6IHtcbiAgICAgICAgICBmaWxsOiAnc3RhcnQnLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogc2V0dGluZ3MuY2hhcnRzLmNvbG9ycy5hcmVhXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzY2FsZXM6IHtcbiAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgIHN0ZXBTaXplOiAxMCxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcIiRcIiArIGl0ZW1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1dLFxuICAgICAgICB4QXhlczogW3tcbiAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgcGFkZGluZzogNCxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpdGVtXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ3JpZExpbmVzOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHlwZTogJ3RpbWUnLFxuICAgICAgICAgIHRpbWU6IHtcbiAgICAgICAgICAgIHVuaXQ6ICdkYXknLFxuICAgICAgICAgICAgZGlzcGxheUZvcm1hdHM6IHtcbiAgICAgICAgICAgICAgZGF5OiAnRC9NTSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdGVwU2l6ZTogMixcbiAgICAgICAgICAgIG1heFRpY2tzTGltaXQ6IDcsXG4gICAgICAgICAgICBhdXRvU2tpcDogZmFsc2UsXG4gICAgICAgICAgfVxuICAgICAgICB9XVxuICAgICAgfSxcbiAgICAgIHRvb2x0aXBzOiB7XG4gICAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICAgIGxhYmVsOiBmdW5jdGlvbihhLCBlKSB7XG4gICAgICAgICAgICB2YXIgdCA9IGUuZGF0YXNldHNbYS5kYXRhc2V0SW5kZXhdLmxhYmVsIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgbyA9IGEueUxhYmVsLFxuICAgICAgICAgICAgICAgIHIgPSBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIDEgPCBlLmRhdGFzZXRzLmxlbmd0aCAmJiAociArPSAnPHNwYW4gY2xhc3M9XCJwb3BvdmVyLWJvZHktbGFiZWwgbXItYXV0b1wiPicgKyB0ICsgXCI8L3NwYW4+XCIpLCByICs9ICc8c3BhbiBjbGFzcz1cInBvcG92ZXItYm9keS12YWx1ZVwiPiQnICsgbyArIFwiPC9zcGFuPlwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgb3B0aW9ucylcblxuICAgIHZhciBkYXRhID0gW11cblxuICAgIC8vIENyZWF0ZSBhIGRhdGUgcmFuZ2UgZm9yIHRoZSBsYXN0IDcgZGF5c1xuICAgIHZhciBzdGFydCA9IG1vbWVudCgpLnN1YnRyYWN0KDYsICdkYXlzJykuZm9ybWF0KCdZWVlZLU1NLUREJykgLy8gNyBkYXlzIGFnb1xuICAgIHZhciBlbmQgPSBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQnKSAvLyB0b2RheVxuICAgIHZhciByYW5nZSA9IG1vbWVudC5yYW5nZShzdGFydCwgZW5kKVxuXG4gICAgLy8gQ3JlYXRlIHRoZSBncmFwaCBkYXRhXG4gICAgLy8gSXRlcmF0ZSB0aGUgZGF0ZSByYW5nZSBhbmQgYXNzaWduIGEgcmFuZG9tIHZhbHVlIGZvciBlYWNoIGRheVxuICAgIGZvciAobGV0IG1vbWVudCBvZiByYW5nZS5ieSgnZGF5cycpKSB7XG4gICAgICBkYXRhLnB1c2goe1xuICAgICAgICB5OiBnZXRSYW5kb21JbnQoMiwgNDApLFxuICAgICAgICB4OiBtb21lbnQudG9EYXRlKClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBkYXRhc2V0czogW3tcbiAgICAgICAgbGFiZWw6IFwiVG90YWwgU2FsZXNcIixcbiAgICAgICAgZGF0YVxuICAgICAgfV1cbiAgICB9XG5cbiAgICBDaGFydHMuY3JlYXRlKGlkLCB0eXBlLCBvcHRpb25zLCBkYXRhKVxuICB9XG5cbiAgdmFyIFRvdGFsVmlzaXRvcnMgPSBmdW5jdGlvbihpZCwgdHlwZSA9ICdyb3VuZGVkQmFyJywgb3B0aW9ucyA9IHt9KSB7XG4gICAgb3B0aW9ucyA9IENoYXJ0LmhlbHBlcnMubWVyZ2Uoe1xuICAgICAgdGl0bGU6IHtcbiAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgZm9udFNpemU6IDEyLFxuICAgICAgICBmb250Q29sb3I6ICdyZ2JhKDU0LCA3NiwgMTAyLCAwLjU0KScsXG4gICAgICAgIHBvc2l0aW9uOiAndG9wJyxcbiAgICAgICAgdGV4dDogJ1ZJU0lUT1JTIE9WRVIgVElNRSdcbiAgICAgIH0sXG4gICAgICBsZWdlbmQ6IHtcbiAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgYWxpZ246ICdzdGFydCcsXG4gICAgICAgIGxhYmVsczoge1xuICAgICAgICAgIHVzZVBvaW50U3R5bGU6IGZhbHNlLFxuICAgICAgICAgIHBhZGRpbmc6IDE2LFxuICAgICAgICAgIGJveFdpZHRoOiAxNixcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGJhclJvdW5kbmVzczogMS4yLFxuICAgICAgYmFyVGhpY2tuZXNzOiA4LFxuICAgICAgc2NhbGVzOiB7XG4gICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oYSkge1xuICAgICAgICAgICAgICBpZiAoIShhICUgMTApKVxuICAgICAgICAgICAgICAgIHJldHVybiBhICsgXCJrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1dLFxuICAgICAgICB4QXhlczogW3tcbiAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgcGFkZGluZzogNCxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpdGVtXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb2Zmc2V0OiB0cnVlLFxuICAgICAgICAgIGdyaWRMaW5lczoge1xuICAgICAgICAgICAgZGlzcGxheTogZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIHR5cGU6ICd0aW1lJyxcbiAgICAgICAgICB0aW1lOiB7XG4gICAgICAgICAgICB1bml0OiAnZGF5JyxcbiAgICAgICAgICAgIGRpc3BsYXlGb3JtYXRzOiB7XG4gICAgICAgICAgICAgIGRheTogJ0QvTU0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RlcFNpemU6IDIsXG4gICAgICAgICAgICBtYXhUaWNrc0xpbWl0OiA3XG4gICAgICAgICAgfVxuICAgICAgICB9XVxuICAgICAgfSxcbiAgICAgIHRvb2x0aXBzOiB7XG4gICAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICAgIGxhYmVsOiBmdW5jdGlvbihhLCBlKSB7XG4gICAgICAgICAgICB2YXIgdCA9IGUuZGF0YXNldHNbYS5kYXRhc2V0SW5kZXhdLmxhYmVsIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgbyA9IGEueUxhYmVsLFxuICAgICAgICAgICAgICAgIHIgPSBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIDEgPCBlLmRhdGFzZXRzLmxlbmd0aCAmJiAociArPSAnPHNwYW4gY2xhc3M9XCJwb3BvdmVyLWJvZHktbGFiZWwgbXItYXV0b1wiPicgKyB0ICsgXCI8L3NwYW4+XCIpLCByICs9ICc8c3BhbiBjbGFzcz1cInBvcG92ZXItYm9keS12YWx1ZVwiPicgKyBvICsgXCJrPC9zcGFuPlwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgb3B0aW9ucylcblxuICAgIHZhciBkYXRhID0gW11cblxuICAgIC8vIENyZWF0ZSBhIGRhdGUgcmFuZ2UgZm9yIHRoZSBsYXN0IDcgZGF5c1xuICAgIHZhciBzdGFydCA9IG1vbWVudCgpLnN1YnRyYWN0KDYsICdkYXlzJykuZm9ybWF0KCdZWVlZLU1NLUREJykgLy8gNyBkYXlzIGFnb1xuICAgIHZhciBlbmQgPSBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQnKSAvLyB0b2RheVxuICAgIHZhciByYW5nZSA9IG1vbWVudC5yYW5nZShzdGFydCwgZW5kKVxuXG4gICAgLy8gQ3JlYXRlIHRoZSBncmFwaCBkYXRhXG4gICAgLy8gSXRlcmF0ZSB0aGUgZGF0ZSByYW5nZSBhbmQgYXNzaWduIGEgcmFuZG9tIHZhbHVlIGZvciBlYWNoIGRheVxuICAgIGZvciAobGV0IG1vbWVudCBvZiByYW5nZS5ieSgnZGF5cycpKSB7XG4gICAgICBkYXRhLnB1c2goe1xuICAgICAgICB5OiBnZXRSYW5kb21JbnQoMTAsIDMwKSxcbiAgICAgICAgeDogbW9tZW50LnRvRGF0ZSgpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHZhciBkYXRhID0ge1xuICAgICAgZGF0YXNldHM6IFt7XG4gICAgICAgIGxhYmVsOiBcIlRvdGFsIFZpc2l0b3JzXCIsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGJhclBlcmNlbnRhZ2U6IDAuNSxcbiAgICAgICAgYmFyVGhpY2tuZXNzOiAyMCxcbiAgICAgIH1dXG4gICAgfVxuXG4gICAgQ2hhcnRzLmNyZWF0ZShpZCwgdHlwZSwgb3B0aW9ucywgZGF0YSlcbiAgfVxuXG4gIHZhciBSZXBlYXRDdXN0b21lclJhdGUgPSBmdW5jdGlvbihpZCwgdHlwZSA9ICdsaW5lJywgb3B0aW9ucyA9IHt9KSB7XG4gICAgb3B0aW9ucyA9IENoYXJ0LmhlbHBlcnMubWVyZ2Uoe1xuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgbGluZToge1xuICAgICAgICAgIHRlbnNpb246IDAsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgICBmb250U2l6ZTogMTIsXG4gICAgICAgIGZvbnRDb2xvcjogJ3JnYmEoNTQsIDc2LCAxMDIsIDAuNTQpJyxcbiAgICAgICAgcG9zaXRpb246ICd0b3AnLFxuICAgICAgICB0ZXh0OiAnQ1VTVE9NRVJTJ1xuICAgICAgfSxcbiAgICAgIGxlZ2VuZDoge1xuICAgICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgICBhbGlnbjogJ3N0YXJ0JyxcbiAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgdXNlUG9pbnRTdHlsZTogZmFsc2UsXG4gICAgICAgICAgcGFkZGluZzogMTYsXG4gICAgICAgICAgYm94V2lkdGg6IDE2LFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2NhbGVzOiB7XG4gICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICBhdXRvU2tpcDogZmFsc2UsXG4gICAgICAgICAgICBhdXRvU2tpcFBhZGRpbmc6IDAsXG4gICAgICAgICAgICBwYWRkaW5nOiA0LFxuICAgICAgICAgICAgbWF4VGlja3NMaW1pdDogNCxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpdGVtICsgXCIlXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1dLFxuICAgICAgICB4QXhlczogW3tcbiAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgcGFkZGluZzogNCxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpdGVtXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ3JpZExpbmVzOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHlwZTogJ3RpbWUnLFxuICAgICAgICAgIHRpbWU6IHtcbiAgICAgICAgICAgIHVuaXQ6ICdkYXknLFxuICAgICAgICAgICAgZGlzcGxheUZvcm1hdHM6IHtcbiAgICAgICAgICAgICAgZGF5OiAnRC9NTSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdGVwU2l6ZTogMixcbiAgICAgICAgICAgIG1heFRpY2tzTGltaXQ6IDcsXG4gICAgICAgICAgICBhdXRvU2tpcDogZmFsc2UsXG4gICAgICAgICAgfVxuICAgICAgICB9XVxuICAgICAgfSxcbiAgICAgIHRvb2x0aXBzOiB7XG4gICAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICAgIGxhYmVsOiBmdW5jdGlvbihhLCBlKSB7XG4gICAgICAgICAgICB2YXIgdCA9IGUuZGF0YXNldHNbYS5kYXRhc2V0SW5kZXhdLmxhYmVsIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgbyA9IGEueUxhYmVsLFxuICAgICAgICAgICAgICAgIHIgPSBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIDEgPCBlLmRhdGFzZXRzLmxlbmd0aCAmJiAociArPSAnPHNwYW4gY2xhc3M9XCJwb3BvdmVyLWJvZHktbGFiZWwgbXItYXV0b1wiPicgKyB0ICsgXCI8L3NwYW4+XCIpLCByICs9ICc8c3BhbiBjbGFzcz1cInBvcG92ZXItYm9keS12YWx1ZVwiPicgKyBvICsgXCIlPC9zcGFuPlwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgb3B0aW9ucylcblxuICAgIHZhciBmaXJzdFRpbWVEYXRhID0gW11cbiAgICB2YXIgcmV0dXJuaW5nRGF0YSA9IFtdXG5cbiAgICAvLyBDcmVhdGUgYSBkYXRlIHJhbmdlIGZvciB0aGUgbGFzdCA3IGRheXNcbiAgICB2YXIgc3RhcnQgPSBtb21lbnQoKS5zdWJ0cmFjdCg2LCAnZGF5cycpLmZvcm1hdCgnWVlZWS1NTS1ERCcpIC8vIDcgZGF5cyBhZ29cbiAgICB2YXIgZW5kID0gbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREJykgLy8gdG9kYXlcbiAgICB2YXIgcmFuZ2UgPSBtb21lbnQucmFuZ2Uoc3RhcnQsIGVuZClcblxuICAgIC8vIENyZWF0ZSB0aGUgZ3JhcGggZGF0YVxuICAgIC8vIEl0ZXJhdGUgdGhlIGRhdGUgcmFuZ2UgYW5kIGFzc2lnbiBhIHJhbmRvbSB2YWx1ZSBmb3IgZWFjaCBkYXlcbiAgICBmb3IgKGxldCBtb21lbnQgb2YgcmFuZ2UuYnkoJ2RheXMnKSkge1xuICAgICAgZmlyc3RUaW1lRGF0YS5wdXNoKHtcbiAgICAgICAgeTogZ2V0UmFuZG9tSW50KDAsIDUpLFxuICAgICAgICB4OiBtb21lbnQudG9EYXRlKClcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybmluZ0RhdGEucHVzaCh7XG4gICAgICAgIHk6IGdldFJhbmRvbUludCg1LCAxMCksXG4gICAgICAgIHg6IG1vbWVudC50b0RhdGUoKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICBsYWJlbDogXCJGaXJzdCB0aW1lXCIsXG4gICAgICAgIGRhdGE6IGZpcnN0VGltZURhdGEsXG4gICAgICAgIGJvcmRlcldpZHRoOiAyLFxuICAgICAgICBib3JkZXJDb2xvcjogc2V0dGluZ3MuY29sb3JzLnByaW1hcnlbNDAwXSxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBzZXR0aW5ncy5jb2xvcnMucHJpbWFyeVs0MDBdLFxuICAgICAgICBwb2ludEJhY2tncm91bmRDb2xvcjogc2V0dGluZ3MuY29sb3JzLnByaW1hcnlbNDAwXVxuICAgICAgfSwge1xuICAgICAgICBsYWJlbDogXCJSZXR1cm5pbmdcIixcbiAgICAgICAgZGF0YTogcmV0dXJuaW5nRGF0YSxcbiAgICAgICAgYm9yZGVyV2lkdGg6IDIsXG4gICAgICAgIGJvcmRlckNvbG9yOiBzZXR0aW5ncy5jb2xvcnMuc3VjY2Vzc1s0MDBdLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHNldHRpbmdzLmNvbG9ycy5zdWNjZXNzWzQwMF0sXG4gICAgICAgIHBvaW50QmFja2dyb3VuZENvbG9yOiBzZXR0aW5ncy5jb2xvcnMuc3VjY2Vzc1s0MDBdXG4gICAgICB9XVxuICAgIH1cblxuICAgIENoYXJ0cy5jcmVhdGUoaWQsIHR5cGUsIG9wdGlvbnMsIGRhdGEpXG4gIH1cblxuICB2YXIgVG90YWxPcmRlcnMgPSBmdW5jdGlvbihpZCwgdHlwZSA9ICdsaW5lJywgb3B0aW9ucyA9IHt9KSB7XG4gICAgb3B0aW9ucyA9IENoYXJ0LmhlbHBlcnMubWVyZ2Uoe1xuICAgICAgdGl0bGU6IHtcbiAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgZm9udFNpemU6IDEyLFxuICAgICAgICBmb250Q29sb3I6ICdyZ2JhKDU0LCA3NiwgMTAyLCAwLjU0KScsXG4gICAgICAgIHBvc2l0aW9uOiAndG9wJyxcbiAgICAgICAgdGV4dDogJ09SREVSUyBPVkVSIFRJTUUnXG4gICAgICB9LFxuICAgICAgbGVnZW5kOiB7XG4gICAgICAgIGRpc3BsYXk6IHRydWUsXG4gICAgICAgIGFsaWduOiAnc3RhcnQnLFxuICAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICB1c2VQb2ludFN0eWxlOiBmYWxzZSxcbiAgICAgICAgICBwYWRkaW5nOiAxNixcbiAgICAgICAgICBib3hXaWR0aDogMTYsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzY2FsZXM6IHtcbiAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgIHN0ZXBTaXplOiAxLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1dLFxuICAgICAgICB4QXhlczogW3tcbiAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgcGFkZGluZzogNCxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpdGVtXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ3JpZExpbmVzOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHlwZTogJ3RpbWUnLFxuICAgICAgICAgIHRpbWU6IHtcbiAgICAgICAgICAgIHVuaXQ6ICdkYXknLFxuICAgICAgICAgICAgZGlzcGxheUZvcm1hdHM6IHtcbiAgICAgICAgICAgICAgZGF5OiAnRC9NTSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdGVwU2l6ZTogMixcbiAgICAgICAgICAgIG1heFRpY2tzTGltaXQ6IDcsXG4gICAgICAgICAgICBhdXRvU2tpcDogZmFsc2UsXG4gICAgICAgICAgfVxuICAgICAgICB9XVxuICAgICAgfSxcbiAgICAgIHRvb2x0aXBzOiB7XG4gICAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICAgIGxhYmVsOiBmdW5jdGlvbihhLCBlKSB7XG4gICAgICAgICAgICB2YXIgdCA9IGUuZGF0YXNldHNbYS5kYXRhc2V0SW5kZXhdLmxhYmVsIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgbyA9IGEueUxhYmVsLFxuICAgICAgICAgICAgICAgIHIgPSBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIDEgPCBlLmRhdGFzZXRzLmxlbmd0aCAmJiAociArPSAnPHNwYW4gY2xhc3M9XCJwb3BvdmVyLWJvZHktbGFiZWwgbXItYXV0b1wiPicgKyB0ICsgXCI8L3NwYW4+XCIpLCByICs9ICc8c3BhbiBjbGFzcz1cInBvcG92ZXItYm9keS12YWx1ZVwiPicgKyBvICsgXCI8L3NwYW4+XCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBvcHRpb25zKVxuXG4gICAgdmFyIGRhdGEgPSBbXVxuXG4gICAgLy8gQ3JlYXRlIGEgZGF0ZSByYW5nZSBmb3IgdGhlIGxhc3QgNyBkYXlzXG4gICAgdmFyIHN0YXJ0ID0gbW9tZW50KCkuc3VidHJhY3QoNiwgJ2RheXMnKS5mb3JtYXQoJ1lZWVktTU0tREQnKSAvLyA3IGRheXMgYWdvXG4gICAgdmFyIGVuZCA9IG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTS1ERCcpIC8vIHRvZGF5XG4gICAgdmFyIHJhbmdlID0gbW9tZW50LnJhbmdlKHN0YXJ0LCBlbmQpXG5cbiAgICAvLyBDcmVhdGUgdGhlIGdyYXBoIGRhdGFcbiAgICAvLyBJdGVyYXRlIHRoZSBkYXRlIHJhbmdlIGFuZCBhc3NpZ24gYSByYW5kb20gdmFsdWUgZm9yIGVhY2ggZGF5XG4gICAgZm9yIChsZXQgbW9tZW50IG9mIHJhbmdlLmJ5KCdkYXlzJykpIHtcbiAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgIHk6IGdldFJhbmRvbUludCgwLCAyKSxcbiAgICAgICAgeDogbW9tZW50LnRvRGF0ZSgpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHZhciBkYXRhID0ge1xuICAgICAgZGF0YXNldHM6IFt7XG4gICAgICAgIGxhYmVsOiBcIlRvdGFsIE9yZGVyc1wiLFxuICAgICAgICBkYXRhXG4gICAgICB9XVxuICAgIH1cblxuICAgIENoYXJ0cy5jcmVhdGUoaWQsIHR5cGUsIG9wdGlvbnMsIGRhdGEpXG4gIH1cblxuICB2YXIgQXZlcmFnZU9yZGVyVmFsdWUgPSBmdW5jdGlvbihpZCwgdHlwZSA9ICdsaW5lJywgb3B0aW9ucyA9IHt9KSB7XG4gICAgb3B0aW9ucyA9IENoYXJ0LmhlbHBlcnMubWVyZ2Uoe1xuICAgICAgdGl0bGU6IHtcbiAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgZm9udFNpemU6IDEyLFxuICAgICAgICBmb250Q29sb3I6ICdyZ2JhKDU0LCA3NiwgMTAyLCAwLjU0KScsXG4gICAgICAgIHBvc2l0aW9uOiAndG9wJyxcbiAgICAgICAgdGV4dDogJ09SREVSIFZBTFVFJ1xuICAgICAgfSxcbiAgICAgIGxlZ2VuZDoge1xuICAgICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgICBhbGlnbjogJ3N0YXJ0JyxcbiAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgdXNlUG9pbnRTdHlsZTogZmFsc2UsXG4gICAgICAgICAgcGFkZGluZzogMTYsXG4gICAgICAgICAgYm94V2lkdGg6IDE2LFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2NhbGVzOiB7XG4gICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICBzdGVwU2l6ZTogMTAsXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICByZXR1cm4gXCIkXCIgKyBpdGVtXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XSxcbiAgICAgICAgeEF4ZXM6IFt7XG4gICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDQsXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICByZXR1cm4gaXRlbVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdyaWRMaW5lczoge1xuICAgICAgICAgICAgZGlzcGxheTogZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIHR5cGU6ICd0aW1lJyxcbiAgICAgICAgICB0aW1lOiB7XG4gICAgICAgICAgICB1bml0OiAnZGF5JyxcbiAgICAgICAgICAgIGRpc3BsYXlGb3JtYXRzOiB7XG4gICAgICAgICAgICAgIGRheTogJ0QvTU0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RlcFNpemU6IDIsXG4gICAgICAgICAgICBtYXhUaWNrc0xpbWl0OiA3LFxuICAgICAgICAgICAgYXV0b1NraXA6IGZhbHNlLFxuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH0sXG4gICAgICB0b29sdGlwczoge1xuICAgICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgICBsYWJlbDogZnVuY3Rpb24oYSwgZSkge1xuICAgICAgICAgICAgdmFyIHQgPSBlLmRhdGFzZXRzW2EuZGF0YXNldEluZGV4XS5sYWJlbCB8fCBcIlwiLFxuICAgICAgICAgICAgICAgIG8gPSBhLnlMYWJlbCxcbiAgICAgICAgICAgICAgICByID0gXCJcIjtcbiAgICAgICAgICAgIHJldHVybiAxIDwgZS5kYXRhc2V0cy5sZW5ndGggJiYgKHIgKz0gJzxzcGFuIGNsYXNzPVwicG9wb3Zlci1ib2R5LWxhYmVsIG1yLWF1dG9cIj4nICsgdCArIFwiPC9zcGFuPlwiKSwgciArPSAnPHNwYW4gY2xhc3M9XCJwb3BvdmVyLWJvZHktdmFsdWVcIj4kJyArIG8gKyBcIjwvc3Bhbj5cIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIG9wdGlvbnMpXG5cbiAgICB2YXIgZGF0YSA9IFtdXG5cbiAgICAvLyBDcmVhdGUgYSBkYXRlIHJhbmdlIGZvciB0aGUgbGFzdCA3IGRheXNcbiAgICB2YXIgc3RhcnQgPSBtb21lbnQoKS5zdWJ0cmFjdCg2LCAnZGF5cycpLmZvcm1hdCgnWVlZWS1NTS1ERCcpIC8vIDcgZGF5cyBhZ29cbiAgICB2YXIgZW5kID0gbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREJykgLy8gdG9kYXlcbiAgICB2YXIgcmFuZ2UgPSBtb21lbnQucmFuZ2Uoc3RhcnQsIGVuZClcblxuICAgIC8vIENyZWF0ZSB0aGUgZ3JhcGggZGF0YVxuICAgIC8vIEl0ZXJhdGUgdGhlIGRhdGUgcmFuZ2UgYW5kIGFzc2lnbiBhIHJhbmRvbSB2YWx1ZSBmb3IgZWFjaCBkYXlcbiAgICBmb3IgKGxldCBtb21lbnQgb2YgcmFuZ2UuYnkoJ2RheXMnKSkge1xuICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgeTogZ2V0UmFuZG9tSW50KDAsIDUwKSxcbiAgICAgICAgeDogbW9tZW50LnRvRGF0ZSgpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHZhciBkYXRhID0ge1xuICAgICAgZGF0YXNldHM6IFt7XG4gICAgICAgIGxhYmVsOiBcIk9yZGVyIFZhbHVlXCIsXG4gICAgICAgIGRhdGFcbiAgICAgIH1dXG4gICAgfVxuXG4gICAgQ2hhcnRzLmNyZWF0ZShpZCwgdHlwZSwgb3B0aW9ucywgZGF0YSlcbiAgfVxuXG4gIHZhciBWaXNpdHNCeURldmljZSA9IGZ1bmN0aW9uKGlkLCB0eXBlID0gJ2RvdWdobnV0Jywgb3B0aW9ucyA9IHt9KSB7XG4gICAgb3B0aW9ucyA9IENoYXJ0LmhlbHBlcnMubWVyZ2Uoe1xuICAgICAgdG9vbHRpcHM6IHtcbiAgICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgICAgdGl0bGU6IGZ1bmN0aW9uKGEsIGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlLmxhYmVsc1thWzBdLmluZGV4XVxuICAgICAgICAgIH0sXG4gICAgICAgICAgbGFiZWw6IGZ1bmN0aW9uKGEsIGUpIHtcbiAgICAgICAgICAgIHZhciB0ID0gXCJcIjtcbiAgICAgICAgICAgIHJldHVybiB0ICs9ICc8c3BhbiBjbGFzcz1cInBvcG92ZXItYm9keS12YWx1ZVwiPicgKyBlLmRhdGFzZXRzWzBdLmRhdGFbYS5pbmRleF0gKyBcIiB2aXNpdHM8L3NwYW4+XCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBvcHRpb25zKVxuXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBsYWJlbHM6IFtcIkRlc2t0b3BcIiwgXCJNb2JpbGVcIiwgXCJUYWJsZXRcIl0sXG4gICAgICBkYXRhc2V0czogW3tcbiAgICAgICAgZGF0YTogWzI2NywgMTg0LCAwXSxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBbc2V0dGluZ3MuY29sb3JzLnN1Y2Nlc3NbNDAwXSwgc2V0dGluZ3MuY29sb3JzLnByaW1hcnlbNTAwXSwgc2V0dGluZ3MuY29sb3JzLmdyYXlbMzAwXV0sXG4gICAgICAgIGhvdmVyQm9yZGVyQ29sb3I6IFwiZGFya1wiID09IHNldHRpbmdzLmNoYXJ0cy5jb2xvclNjaGVtZSA/IHNldHRpbmdzLmNvbG9ycy5ncmF5WzgwMF0gOiBzZXR0aW5ncy5jb2xvcnMud2hpdGVcbiAgICAgIH1dXG4gICAgfVxuXG4gICAgQ2hhcnRzLmNyZWF0ZShpZCwgdHlwZSwgb3B0aW9ucywgZGF0YSlcbiAgfVxuICBcbiAgdmFyIEVhcm5pbmdzVHJhZmZpYyA9IGZ1bmN0aW9uKGlkLCB0eXBlID0gJ2xpbmUnLCBvcHRpb25zID0ge30pIHtcbiAgICBvcHRpb25zID0gQ2hhcnQuaGVscGVycy5tZXJnZSh7XG4gICAgICBlbGVtZW50czoge1xuICAgICAgICBsaW5lOiB7XG4gICAgICAgICAgZmlsbDogJ3N0YXJ0JyxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHNldHRpbmdzLmNoYXJ0cy5jb2xvcnMuYXJlYVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2NhbGVzOiB7XG4gICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oYSkge1xuICAgICAgICAgICAgICBpZiAoIShhICUgMTApKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIiRcIiArIGEgKyBcImtcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH0sXG4gICAgICB0b29sdGlwczoge1xuICAgICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgICBsYWJlbDogZnVuY3Rpb24oYSwgZSkge1xuICAgICAgICAgICAgdmFyIHQgPSBlLmRhdGFzZXRzW2EuZGF0YXNldEluZGV4XS5sYWJlbCB8fCBcIlwiLFxuICAgICAgICAgICAgICAgIG8gPSBhLnlMYWJlbCxcbiAgICAgICAgICAgICAgICByID0gXCJcIjtcbiAgICAgICAgICAgIHJldHVybiAxIDwgZS5kYXRhc2V0cy5sZW5ndGggJiYgKHIgKz0gJzxzcGFuIGNsYXNzPVwicG9wb3Zlci1ib2R5LWxhYmVsIG1yLWF1dG9cIj4nICsgdCArIFwiPC9zcGFuPlwiKSwgciArPSAnPHNwYW4gY2xhc3M9XCJwb3BvdmVyLWJvZHktdmFsdWVcIj4kJyArIG8gKyBcIms8L3NwYW4+XCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBvcHRpb25zKVxuXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBsYWJlbHM6IFtcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXSxcbiAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICBsYWJlbDogXCJUcmFmZmljXCIsXG4gICAgICAgIGRhdGE6IFsxMCwgMiwgNSwgMTUsIDEwLCAxMiwgMTUsIDI1LCAyMiwgMzAsIDI1LCA0MF1cbiAgICAgIH1dXG4gICAgfVxuXG4gICAgQ2hhcnRzLmNyZWF0ZShpZCwgdHlwZSwgb3B0aW9ucywgZGF0YSlcbiAgfVxuXG4gIHZhciBQcm9kdWN0cyA9IGZ1bmN0aW9uKGlkLCB0eXBlID0gJ2xpbmUnLCBvcHRpb25zID0ge30sIGRhdGEpIHtcbiAgICBvcHRpb25zID0gQ2hhcnQuaGVscGVycy5tZXJnZSh7XG4gICAgICBlbGVtZW50czoge1xuICAgICAgICBsaW5lOiB7XG4gICAgICAgICAgZmlsbDogJ3N0YXJ0JyxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHNldHRpbmdzLmNoYXJ0cy5jb2xvcnMuYXJlYSxcbiAgICAgICAgICB0ZW5zaW9uOiAwLFxuICAgICAgICAgIGJvcmRlcldpZHRoOiAxXG4gICAgICAgIH0sXG4gICAgICAgIHBvaW50OiB7XG4gICAgICAgICAgcG9pbnRTdHlsZTogJ2NpcmNsZScsXG4gICAgICAgICAgcmFkaXVzOiA1LFxuICAgICAgICAgIGhvdmVyUmFkaXVzOiA1LFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogc2V0dGluZ3MuY29sb3JzLndoaXRlLFxuICAgICAgICAgIGJvcmRlckNvbG9yOiBzZXR0aW5ncy5jb2xvcnMucHJpbWFyeVs3MDBdLFxuICAgICAgICAgIGJvcmRlcldpZHRoOiAyXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzY2FsZXM6IHtcbiAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgZGlzcGxheTogZmFsc2VcbiAgICAgICAgfV0sXG4gICAgICAgIHhBeGVzOiBbe1xuICAgICAgICAgIGRpc3BsYXk6IGZhbHNlXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgfSwgb3B0aW9ucylcblxuICAgIGRhdGEgPSBkYXRhIHx8IHtcbiAgICAgIGxhYmVsczogW1wiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCIsIFwiU3VuXCJdLFxuICAgICAgZGF0YXNldHM6IFt7XG4gICAgICAgIGxhYmVsOiBcIkVhcm5pbmdzXCIsXG4gICAgICAgIGRhdGE6IFs0MDAsIDIwMCwgNDUwLCA0NjAsIDIyMCwgMzgwLCA4MDBdXG4gICAgICB9XVxuICAgIH1cblxuICAgIENoYXJ0cy5jcmVhdGUoaWQsIHR5cGUsIG9wdGlvbnMsIGRhdGEpXG4gIH1cblxuICB2YXIgQ291cnNlcyA9IGZ1bmN0aW9uKGlkLCB0eXBlID0gJ2xpbmUnLCBvcHRpb25zID0ge30pIHtcbiAgICBvcHRpb25zID0gQ2hhcnQuaGVscGVycy5tZXJnZSh7XG4gICAgICBlbGVtZW50czoge1xuICAgICAgICBsaW5lOiB7XG4gICAgICAgICAgYm9yZGVyQ29sb3I6IHNldHRpbmdzLmNvbG9ycy5zdWNjZXNzWzcwMF0sXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBzZXR0aW5ncy5oZXhUb1JHQihzZXR0aW5ncy5jb2xvcnMuc3VjY2Vzc1sxMDBdLCAwLjUpXG4gICAgICAgIH0sXG4gICAgICAgIHBvaW50OiB7XG4gICAgICAgICAgYm9yZGVyQ29sb3I6IHNldHRpbmdzLmNvbG9ycy5zdWNjZXNzWzcwMF1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIG9wdGlvbnMpXG5cbiAgICBQcm9kdWN0cyhpZCwgdHlwZSwgb3B0aW9ucylcbiAgfVxuXG4gIHZhciBMb2NhdGlvbkRvdWdobnV0ID0gZnVuY3Rpb24oaWQsIHR5cGUgPSAnZG91Z2hudXQnLCBvcHRpb25zID0ge30pIHtcbiAgICBvcHRpb25zID0gQ2hhcnQuaGVscGVycy5tZXJnZSh7XG4gICAgICB0b29sdGlwczoge1xuICAgICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgICB0aXRsZTogZnVuY3Rpb24oYSwgZSkge1xuICAgICAgICAgICAgcmV0dXJuIGUubGFiZWxzW2FbMF0uaW5kZXhdXG4gICAgICAgICAgfSxcbiAgICAgICAgICBsYWJlbDogZnVuY3Rpb24oYSwgZSkge1xuICAgICAgICAgICAgdmFyIHQgPSBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIHQgKz0gJzxzcGFuIGNsYXNzPVwicG9wb3Zlci1ib2R5LXZhbHVlXCI+JyArIGUuZGF0YXNldHNbMF0uZGF0YVthLmluZGV4XSArIFwiJTwvc3Bhbj5cIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIG9wdGlvbnMpXG5cbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIGxhYmVsczogW1wiVW5pdGVkIFN0YXRlc1wiLCBcIlVuaXRlZCBLaW5nZG9tXCIsIFwiR2VybWFueVwiLCBcIkluZGlhXCJdLFxuICAgICAgZGF0YXNldHM6IFt7XG4gICAgICAgIGRhdGE6IFsyNSwgMjUsIDE1LCAzNV0sXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogW3NldHRpbmdzLmNvbG9ycy5zdWNjZXNzWzQwMF0sIHNldHRpbmdzLmNvbG9ycy5kYW5nZXJbNDAwXSwgc2V0dGluZ3MuY29sb3JzLnByaW1hcnlbNTAwXSwgc2V0dGluZ3MuY29sb3JzLmdyYXlbMzAwXV0sXG4gICAgICAgIGhvdmVyQm9yZGVyQ29sb3I6IFwiZGFya1wiID09IHNldHRpbmdzLmNoYXJ0cy5jb2xvclNjaGVtZSA/IHNldHRpbmdzLmNvbG9ycy5ncmF5WzgwMF0gOiBzZXR0aW5ncy5jb2xvcnMud2hpdGVcbiAgICAgIH1dXG4gICAgfVxuXG4gICAgQ2hhcnRzLmNyZWF0ZShpZCwgdHlwZSwgb3B0aW9ucywgZGF0YSlcbiAgfVxuXG4gIHZhciBUcmFmZmljQmFyID0gZnVuY3Rpb24oaWQsIHR5cGUgPSAncm91bmRlZEJhcicsIG9wdGlvbnMgPSB7fSkge1xuICAgIG9wdGlvbnMgPSBDaGFydC5oZWxwZXJzLm1lcmdlKHtcbiAgICAgIGJhclJvdW5kbmVzczogMS4yLFxuICAgICAgc2NhbGVzOiB7XG4gICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oYSkge1xuICAgICAgICAgICAgICBpZiAoIShhICUgMTApKVxuICAgICAgICAgICAgICAgIHJldHVybiBhICsgXCJrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1dXG4gICAgICB9LFxuICAgICAgdG9vbHRpcHM6IHtcbiAgICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgICAgbGFiZWw6IGZ1bmN0aW9uKGEsIGUpIHtcbiAgICAgICAgICAgIHZhciB0ID0gZS5kYXRhc2V0c1thLmRhdGFzZXRJbmRleF0ubGFiZWwgfHwgXCJcIixcbiAgICAgICAgICAgICAgICBvID0gYS55TGFiZWwsXG4gICAgICAgICAgICAgICAgciA9IFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gMSA8IGUuZGF0YXNldHMubGVuZ3RoICYmIChyICs9ICc8c3BhbiBjbGFzcz1cInBvcG92ZXItYm9keS1sYWJlbCBtci1hdXRvXCI+JyArIHQgKyBcIjwvc3Bhbj5cIiksIHIgKz0gJzxzcGFuIGNsYXNzPVwicG9wb3Zlci1ib2R5LXZhbHVlXCI+JyArIG8gKyBcIms8L3NwYW4+XCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBvcHRpb25zKVxuXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBsYWJlbHM6IFtcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXSxcbiAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICBsYWJlbDogXCJTYWxlc1wiLFxuICAgICAgICBkYXRhOiBbMjUsIDIwLCAzMCwgMjIsIDE3LCAxMCwgMTgsIDI2LCAyOCwgMjYsIDIwLCAzMl0sXG4gICAgICAgIGJhclBlcmNlbnRhZ2U6IDAuNSxcbiAgICAgICAgYmFyVGhpY2tuZXNzOiAyMCxcbiAgICAgIH1dXG4gICAgfVxuXG4gICAgQ2hhcnRzLmNyZWF0ZShpZCwgdHlwZSwgb3B0aW9ucywgZGF0YSlcbiAgfVxuXG4gICQoJy5zdGF0cy1jaGFydCcpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgbGV0IGN0eCA9IGVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKVxuICAgIGxldCBzdGF0c19kYXRhID0gW11cblxuICAgIGZvciAodmFyIGkgPSA2OyBpID49IDA7IGktLSkge1xuICAgICAgc3RhdHNfZGF0YS5wdXNoKGdldFJhbmRvbUludCgxMDAsIDMwMCkpO1xuICAgIH1cblxuICAgIG5ldyBDaGFydChjdHgsIHtcbiAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbGFiZWxzOlxuICAgICAgICBbXG4gICAgICAgIFwiMDFcIiwgXCIwMlwiLCBcIjAzXCIsIFwiMDRcIixcbiAgICAgICAgXCIwNVwiLCBcIjA2XCIsIFwiMDdcIiwgXCIwOFwiXG4gICAgICAgIF0sXG4gICAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICAgIGRhdGE6IHN0YXRzX2RhdGEsXG4gICAgICAgICAgYm9yZGVyV2lkdGg6IDIsXG4gICAgICAgICAgYm9yZGVyQ29sb3I6IHNldHRpbmdzLmNvbG9ycy5wcmltYXJ5WzQwMF0sXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBzZXR0aW5ncy5jb2xvcnMucHJpbWFyeVs1MF0sXG4gICAgICAgICAgcG9pbnRCYWNrZ3JvdW5kQ29sb3I6IHNldHRpbmdzLmNvbG9ycy5wcmltYXJ5WzQwMF1cbiAgICAgICAgfV1cbiAgICAgIH0sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGVsZW1lbnRzOiB7IHBvaW50OiB7IHJhZGl1czogMCB9IH0sXG4gICAgICAgIHRvb2x0aXBzOiB7XG4gICAgICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgZGlzcGxheTogZmFsc2UsXG4gICAgICAgICAgbGFiZWxzOiB7IGRpc3BsYXk6IGZhbHNlIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2NhbGVzOiB7XG4gICAgICAgICAgeEF4ZXM6IFt7XG4gICAgICAgICAgICBncmlkTGluZXM6IHtcbiAgICAgICAgICAgICAgZGlzcGxheTogZmFsc2UsXG4gICAgICAgICAgICAgIC8vIHplcm9MaW5lQ29sb3I6IGNvbG9ycy5ib3JkZXJfY29sb3JcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICBkaXNwbGF5OiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1dLFxuICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgZ3JpZExpbmVzOiB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgICAvLyB6ZXJvTGluZUNvbG9yOiBjb2xvcnMuYm9yZGVyX2NvbG9yXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgZGlzcGxheTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8gQ3JlYXRlIENoYXJ0cyAvL1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vXG4gIFxuICBUb3RhbFNhbGVzKCcjdG90YWxTYWxlc0NoYXJ0JylcbiAgVG90YWxWaXNpdG9ycygnI3RvdGFsVmlzaXRvcnNDaGFydCcpXG4gIFJlcGVhdEN1c3RvbWVyUmF0ZSgnI3JlcGVhdEN1c3RvbWVyUmF0ZUNoYXJ0JylcbiAgVG90YWxPcmRlcnMoJyN0b3RhbE9yZGVyc0NoYXJ0JylcbiAgQXZlcmFnZU9yZGVyVmFsdWUoJyNhdmVyYWdlT3JkZXJWYWx1ZUNoYXJ0JylcbiAgVmlzaXRzQnlEZXZpY2UoJyN2aXNpdHNCeURldmljZUNoYXJ0JylcblxuICBUcmFmZmljQmFyKCcjdHJhZmZpY0JhckNoYXJ0JylcbiAgRWFybmluZ3NUcmFmZmljKCcjZWFybmluZ3NUcmFmZmljQ2hhcnQnKVxuICBMb2NhdGlvbkRvdWdobnV0KCcjbG9jYXRpb25Eb3VnaG51dENoYXJ0JylcbiAgUHJvZHVjdHMoJyNwcm9kdWN0c0NoYXJ0JylcbiAgQ291cnNlcygnI2NvdXJzZXNDaGFydCcpXG5cbn0pKCkiXSwic291cmNlUm9vdCI6IiJ9