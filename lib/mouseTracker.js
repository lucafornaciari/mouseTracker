(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("mouseTracker", [], factory);
	else if(typeof exports === 'object')
		exports["mouseTracker"] = factory();
	else
		root["mouseTracker"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MouseTracker = function () {
	    function MouseTracker() {
	        _classCallCheck(this, MouseTracker);
	    }
	
	    _createClass(MouseTracker, [{
	        key: 'createPage',
	        value: function createPage(name) {
	            //Creo la pagina   
	            var page = new Page(name);
	            return page;
	        }
	    }, {
	        key: 'createAnalysisWrapper',
	        value: function createAnalysisWrapper(page, eventContainer) {
	            //Creo il wrapper su cui abilito gli analytics
	            var analysisWrapper = new AnalysisWrapper(page, eventContainer);
	            return analysisWrapper;
	        }
	    }, {
	        key: 'getMouseEvents',
	        value: function getMouseEvents(page) {
	            var cached = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	            for (var _len = arguments.length, wrappers = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	                wrappers[_key - 2] = arguments[_key];
	            }
	
	            return page.sendAllRegisteredData(cached, wrappers);
	        }
	    }, {
	        key: 'getMouseMovementEvents',
	        value: function getMouseMovementEvents(page) {
	            var cached = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	            for (var _len2 = arguments.length, wrappers = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	                wrappers[_key2 - 2] = arguments[_key2];
	            }
	
	            return page.sendRegisteredMouseMovement(cached, wrappers);
	        }
	    }, {
	        key: 'getMouseClickEvents',
	        value: function getMouseClickEvents(page) {
	            var cached = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	            for (var _len3 = arguments.length, wrappers = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
	                wrappers[_key3 - 2] = arguments[_key3];
	            }
	
	            //array di wrapper in input
	            return page.sendRegisteredClick(cached, wrappers);
	        }
	    }, {
	        key: 'addListener',
	        value: function addListener(wrapper) {
	            for (var _len4 = arguments.length, listeners = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	                listeners[_key4 - 1] = arguments[_key4];
	            }
	
	            listeners.forEach(function (listener) {
	                switch (listener) {
	                    case 'click':
	                        wrapper.addClickListener();
	                        break;
	                    case 'mouseMovement':
	                        wrapper.addMouseMoveListener();
	                        break;
	                    default:
	                        console.error('listener ' + listener + ' is not available');
	                }
	            });
	        }
	    }, {
	        key: 'addAllListeners',
	        value: function addAllListeners(wrapper) {
	            wrapper.addClickListener();
	            wrapper.addMouseMoveListener();
	        }
	    }]);
	
	    return MouseTracker;
	}();
	
	exports.default = MouseTracker;
	
	var Inspector = function () {
	    function Inspector() {
	        _classCallCheck(this, Inspector);
	    }
	
	    _createClass(Inspector, null, [{
	        key: 'findElementSelected',
	        value: function findElementSelected(eventContainerElement, event) {
	            //prendo la distanza del path dell'elemento e la distanza del path container
	            var pathDistanceElementSelected = Inspector.searchPathElementDistance(event);
	            var pathElementDistanceContainer = Inspector.searchPathElementContainerDistance(event, eventContainerElement);
	            var element = null;
	
	            for (var i = pathDistanceElementSelected; i < pathElementDistanceContainer; i++) {
	                //Ciclo fino a trovare il primo elemento che si vuole analizzare -> lo riconosciamo attraverso l'attributo mouseTracker
	                if (event.path[i].attributes.mouseTracker !== undefined) {
	                    element = event.path[i];
	                    break;
	                }
	            }
	            if (element === null) return eventContainerElement;
	            return element;
	        } //CLICK EVENT
	
	    }, {
	        key: 'searchPathElementDistance',
	        value: function searchPathElementDistance(node) {
	            var tagAnalyticsElement = node.toElement.attributes.mouseTracker;
	            // se l'elemento cliccato non ha tag analytics vado a prendermi il tagAnalytics del prima padre disponibile
	            if (node.toElement.attributes.mouseTracker === undefined) {
	                tagAnalyticsElement = Inspector.searchFirtFatherAnalyticsTag(node);
	            }
	
	            for (var i = 0; i < node.path.length; i++) {
	                if (node.path[i].attributes.mouseTracker !== undefined) {
	                    if (node.path[i].attributes.mouseTracker === tagAnalyticsElement) {
	                        return i;
	                    }
	                }
	            }
	            return -1;
	        }
	    }, {
	        key: 'searchPathElementContainerDistance',
	        value: function searchPathElementContainerDistance(node, eventContainerElement) {
	            for (var i = 0; i < node.path.length; i++) {
	                if (node.path[i].id === eventContainerElement.id) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	    }, {
	        key: 'searchFirtFatherAnalyticsTag',
	        value: function searchFirtFatherAnalyticsTag(node) {
	            //  vado a prendermi il tagAnalytics del prima padre disponibile
	            var tagAnalyticsElement = void 0;
	            var nodeToFind = node;
	            var find = false;
	            while (!find) {
	                if (nodeToFind.toElement.parentNode.attributes.mouseTracker !== undefined) {
	                    tagAnalyticsElement = nodeToFind.toElement.parentNode.attributes.mouseTracker;
	                    find = true;
	                } else {
	                    nodeToFind = nodeToFind.toElement.parentNode;
	                }
	            }
	            return tagAnalyticsElement;
	        }
	    }, {
	        key: 'containerIsInWrapperList',
	        value: function containerIsInWrapperList(valueKey, myArray) {
	            for (var i = 0; i < myArray.length; i++) {
	                if (myArray[i].name === valueKey) {
	                    return true;
	                }
	            }
	            return false;
	        }
	    }, {
	        key: 'getBrowser',
	        value: function getBrowser() {
	            if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1) return 'Opera';else if (navigator.userAgent.indexOf('Chrome') !== -1) return 'Chrome';else if (navigator.userAgent.indexOf('Safari') !== -1) return 'Safari';else if (navigator.userAgent.indexOf('Firefox') !== -1) return 'Firefox';else if (navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode == true) //IF IE > 10
	                return 'IE';else return 'unknown';
	        }
	    }]);
	
	    return Inspector;
	}();
	
	var Page = function () {
	    function Page(name) {
	        _classCallCheck(this, Page);
	
	        this.name = name;
	        this.width = window.innerWidth;
	        this.height = window.innerHeight;
	        this.browser = Inspector.getBrowser();
	        this.containers = []; //container all'interno della pagina
	    }
	
	    _createClass(Page, [{
	        key: 'setHeight',
	        value: function setHeight(height) {
	            this.height = height;
	        }
	    }, {
	        key: 'setWidth',
	        value: function setWidth(width) {
	            this.width = width;
	        }
	    }, {
	        key: 'addContainer',
	        value: function addContainer(container) {
	            //container di tipo AnalysisWrapper
	            this.containers.push(container);
	        }
	    }, {
	        key: 'sendAllRegisteredData',
	        value: function sendAllRegisteredData(cached, wrappers) {
	            var data = Sender.sendJsonAllData(this.containers, wrappers);
	            if (!cached) this.emptyContainersTracementList(wrappers);
	            return data;
	        }
	    }, {
	        key: 'sendRegisteredClick',
	        value: function sendRegisteredClick(cached, wrappers) {
	            var clickData = Sender.sendJsonClickData(this.containers, wrappers);
	            if (!cached) this.emptyClickContainers(wrappers);
	            return clickData;
	        }
	    }, {
	        key: 'sendRegisteredMouseMovement',
	        value: function sendRegisteredMouseMovement(cached, wrappers) {
	            var mouseMovementData = Sender.sendJsonMouseMovementsData(this.containers, wrappers);
	            if (!cached) this.emptyMouseMovementContainers(wrappers);
	            return mouseMovementData;
	        }
	    }, {
	        key: 'emptyContainersTracementList',
	        value: function emptyContainersTracementList(wrappers) {
	            this.containers.forEach(function (container) {
	                if (Inspector.containerIsInWrapperList(container.name, wrappers) || wrappers.length == 0) {
	                    container.clickListener.clearList();
	                    container.mouseMovementListener.clearList();
	                }
	            });
	        }
	    }, {
	        key: 'emptyClickContainers',
	        value: function emptyClickContainers(wrappers) {
	            this.containers.forEach(function (container) {
	                if (Inspector.containerIsInWrapperList(container.name, wrappers) || wrappers.length == 0) container.clickListener.clearList();
	            });
	        }
	    }, {
	        key: 'emptyMouseMovementContainers',
	        value: function emptyMouseMovementContainers(wrappers) {
	            this.containers.forEach(function (container) {
	                if (Inspector.containerIsInWrapperList(container.name, wrappers) || wrappers.length == 0) container.mouseMovementListener.clearList();
	            });
	        }
	    }]);
	
	    return Page;
	}();
	
	var ClickListener = function () {
	    function ClickListener(wrapper) {
	        var _this = this;
	
	        _classCallCheck(this, ClickListener);
	
	        this.clickList = [];
	        this.wrapper = wrapper;
	        this.wrapper.element.addEventListener('click', function (evt) {
	            return _this.registerClick(evt);
	        });
	    }
	
	    _createClass(ClickListener, [{
	        key: 'registerClick',
	        value: function registerClick(event) {
	            this.wrapper.page.setHeight(window.innerHeight); // prendo altezza corrente della pagina browser
	            this.wrapper.page.setWidth(window.innerWidth); // prendo larghezza corrente della pagina browser
	            var click = new Click(this.wrapper, event); //con this gli passo l'oggetto AnalysisWrapper
	            //click.showInfo();
	            this.clickList.push(click);
	        }
	    }, {
	        key: 'clearList',
	        value: function clearList() {
	            this.clickList.length = 0;
	        }
	    }, {
	        key: 'getClickList',
	        value: function getClickList() {
	            return this.clickList;
	        }
	    }]);
	
	    return ClickListener;
	}();
	
	var MouseMovementListener = function () {
	    function MouseMovementListener(wrapper) {
	        _classCallCheck(this, MouseMovementListener);
	
	        this.movements = [];
	        this.wrapper = wrapper;
	        this.addListener();
	    }
	
	    _createClass(MouseMovementListener, [{
	        key: 'addListener',
	        value: function addListener() {
	            this.mouseIsOver = false;
	            var self = this;
	            //verifico se il mouse è sopra il wrapper per la registrazione della posizione
	            this.wrapper.element.onmouseover = function () {
	                self.mouseIsOver = true;
	            };
	            this.wrapper.element.onmouseout = function () {
	                self.mouseIsOver = false;
	            };
	            //Vado a prendermi le coordinate del mouse ad ogni movimento del mouse nella pagina
	            this.wrapper.element.addEventListener('mousemove', function (event) {
	                window.mouseX = event.clientX;
	                window.mouseY = event.clientY;
	            });
	            //Registro la posizione del mouse solo ogni mezzo secondo
	            window.setInterval(function (event) {
	                if (self.mouseIsOver) {
	                    self.registerMouseMovement(event);
	                }
	            }, 500);
	        }
	    }, {
	        key: 'registerMouseMovement',
	        value: function registerMouseMovement(event) {
	            this.wrapper.page.setHeight(window.innerHeight); // prendo altezza corrente della pagina browser
	            this.wrapper.page.setWidth(window.innerWidth); // prendo larghezza corrente della pagina browser
	            var movement = new MouseMovement(this.wrapper, window.mouseX, window.mouseY); //con this gli passo l'oggetto AnalysisWrapper
	            // movement.showInfo();
	            this.movements.push(movement);
	        }
	    }, {
	        key: 'clearList',
	        value: function clearList() {
	            this.movements.length = 0;
	        }
	    }, {
	        key: 'getList',
	        value: function getList() {
	            return this.movements;
	        }
	    }]);
	
	    return MouseMovementListener;
	}();
	
	var AnalysisWrapper = function () {
	    /*
	        CONTIENE LE DUE LISTE DI EVENTI : CLICK, MOVEMENT
	    */
	
	    function AnalysisWrapper(page, wrapperName) {
	        _classCallCheck(this, AnalysisWrapper);
	
	        //page di tipo Page
	        this.page = page;
	        this.name = wrapperName;
	        this.element = document.getElementById(wrapperName);
	        this.page.addContainer(this);
	    }
	
	    _createClass(AnalysisWrapper, [{
	        key: 'addClickListener',
	        value: function addClickListener() {
	            this.clickListener = new ClickListener(this);
	        }
	    }, {
	        key: 'addMouseMoveListener',
	        value: function addMouseMoveListener() {
	            this.mouseMovementListener = new MouseMovementListener(this);
	        }
	    }]);
	
	    return AnalysisWrapper;
	}();
	
	var Click = function () {
	    function Click(wrapperElement, event) {
	        _classCallCheck(this, Click);
	
	        this.wrapperElement = wrapperElement;
	        this.dateTime = Date.now();
	        this.x = event.x + window.pageXOffset;
	        this.y = event.y + window.pageYOffset;
	        this.selectedElement = Inspector.findElementSelected(this.wrapperElement.element, event);
	        this.nameSelectedElement = this.selectedElement.attributes.mouseTracker.nodeValue; //elemento specifico cliccato all'interno di containerElement (es. bottone)
	    }
	
	    _createClass(Click, [{
	        key: 'showInfo',
	        value: function showInfo() {
	            var message = 'Page ' + this.wrapperElement.page.name + ' [width:' + this.wrapperElement.page.width + ', height: ' + this.wrapperElement.page.height + '] \n Container: ' + this.wrapperElement.name + ' \n ### ' + this.dateTime + ' - (x: ' + this.x + ' y:' + this.y + ') ------ ' + this.nameSelectedElement;
	            console.log(message);
	        }
	    }]);
	
	    return Click;
	}();
	
	var MouseMovement = function () {
	    function MouseMovement(wrapperElement, mouseX, mouseY) {
	        _classCallCheck(this, MouseMovement);
	
	        this.wrapperElement = wrapperElement;
	        this.dateTime = Date.now();
	        this.x = mouseX + window.pageXOffset;
	        this.y = mouseY + window.pageYOffset;
	    }
	
	    _createClass(MouseMovement, [{
	        key: 'showInfo',
	        value: function showInfo() {
	            /*let message = `Page ${this.wrapperElement.page.name} [width:${this.wrapperElement.page.width}, height: ${this.wrapperElement.page.height}] \n Container: ${this.wrapperElement.name} \n ### ${this.dateTime} - (x: ${this.x} y:${this.y})`;*/
	            var message = 'Page ' + this.wrapperElement.page.name + ' ' + this.wrapperElement.name + ' ### ' + this.dateTime + ' - x: ' + this.x + ' y:' + this.y;
	            console.log(message);
	        }
	    }]);
	
	    return MouseMovement;
	}();
	
	var Sender = function () {
	    function Sender() {
	        _classCallCheck(this, Sender);
	    }
	
	    _createClass(Sender, null, [{
	        key: 'sendJsonAllData',
	        value: function sendJsonAllData(mouseTrackerList, wrappers) {
	            var reporClicktToSend = JsonReport.createClickObjectToSend(mouseTrackerList, wrappers);
	            var reporMouseMovementstToSend = JsonReport.createMouseMovementObjectToSend(mouseTrackerList, wrappers);
	            return JSON.stringify(reporClicktToSend.concat(reporMouseMovementstToSend));
	        }
	    }, {
	        key: 'sendJsonClickData',
	        value: function sendJsonClickData(pageClickList, wrappers) {
	            var reportToSend = JsonReport.createClickObjectToSend(pageClickList, wrappers);
	            return JSON.stringify(reportToSend);
	        }
	    }, {
	        key: 'sendJsonMouseMovementsData',
	        value: function sendJsonMouseMovementsData(movementsList, wrappers) {
	            var reportToSend = JsonReport.createMouseMovementObjectToSend(movementsList, wrappers);
	            return JSON.stringify(reportToSend);
	        }
	    }]);
	
	    return Sender;
	}();
	
	var JsonReport = function () {
	    function JsonReport() {
	        _classCallCheck(this, JsonReport);
	    }
	
	    _createClass(JsonReport, null, [{
	        key: 'createMouseMovementObjectToSend',
	        value: function createMouseMovementObjectToSend(list, wrappers) {
	            // arriva una lista di Container
	            var array = [];
	            list.forEach(function (container) {
	                if (Inspector.containerIsInWrapperList(container.name, wrappers) || wrappers.length == 0) {
	                    //verifica se il container selezionato è tra quelli richiesti dall'utente, se wrappers è vuoto vuol dire che l'utente vuole prendere tutti i wrappers della pagina e quindi l'if sarà sempre true
	                    container.mouseMovementListener.getList().forEach(function (ele) {
	                        var obj = {
	                            type: 'move',
	                            dateTime: ele.dateTime,
	                            x: ele.x,
	                            y: ele.y,
	                            wrapperName: ele.wrapperElement.name,
	                            browser: ele.wrapperElement.page.browser,
	                            namePage: ele.wrapperElement.page.name,
	                            heightPage: ele.wrapperElement.page.height,
	                            widthPage: ele.wrapperElement.page.width
	                        };
	                        array.push(obj);
	                    });
	                }
	            });
	            return array;
	        }
	    }, {
	        key: 'createClickObjectToSend',
	        value: function createClickObjectToSend(list, wrappers) {
	            var array = [];
	            list.forEach(function (container) {
	                if (Inspector.containerIsInWrapperList(container.name, wrappers) || wrappers.length == 0) {
	                    //verifica se il container selezionato è tra quelli richiesti dall'utente, se wrappers è vuoto vuol dire che l'utente vuole prendere tutti i wrappers della pagina e quindi l'if sarà sempre true
	                    container.clickListener.getClickList().forEach(function (ele) {
	                        var obj = {
	                            type: 'click',
	                            dateTime: ele.dateTime,
	                            nameSelectedElement: ele.nameSelectedElement,
	                            x: ele.x,
	                            y: ele.y,
	                            wrapperName: ele.wrapperElement.name,
	                            browser: ele.wrapperElement.page.browser,
	                            namePage: ele.wrapperElement.page.name,
	                            heightPage: ele.wrapperElement.page.height,
	                            widthPage: ele.wrapperElement.page.width
	                        };
	                        array.push(obj);
	                    });
	                }
	            });
	            return array;
	        }
	    }]);

	    return JsonReport;
	}();

	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=mouseTracker.js.map