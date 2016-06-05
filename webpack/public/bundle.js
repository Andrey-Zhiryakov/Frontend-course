/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("__webpack_require__(8);\r\nvar {week, weekModel} = __webpack_require__(1);\r\n\r\nwindow.addEventListener('load', ()=>{\r\n document.body.appendChild(week(new weekModel(1)));\r\n});\r\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./app.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./app.js?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = {\r\n  week : __webpack_require__(2),\r\n  weekModel : __webpack_require__(3)\r\n};\r\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./components/index.js\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./components/index.js?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("__webpack_require__(13);\r\nvar Day = __webpack_require__(15);\r\n\r\nfunction Week(content) {\r\n  let container = document.createElement('div');\r\n\r\n  container.innerHTML = `\r\n<div class=\"calendar-week\">\r\n  <div class=\"head\">\r\n    <div class=\"header\"><span>Hour</span></div>\r\n    <div class=\"header\"><span>Monday</span></div>\r\n    <div class=\"header\"><span>Tuesday</span></div>\r\n    <div class=\"header\"><span>Wednesday</span></div>\r\n    <div class=\"header\"><span>Thursday</span></div>\r\n    <div class=\"header\"><span>Friday</span></div>\r\n    <div class=\"header\"><span>Saturday</span></div>\r\n    <div class=\"header\"><span>Sunday</span></div>\r\n  </div>\r\n  <div class=\"body\">\r\n  </div>\r\n</div>\r\n`;\r\n  let body = container.querySelector('.body');\r\n  let hoursList = document.createElement('ul');\r\n\r\n  for (let i = 1; i <= 24; i ++) {\r\n    hoursList.innerHTML += `\r\n    <li>${i}</li>\r\n    `;\r\n  }\r\n  let hours = document.createElement('div');\r\n  hours.classList.add('day-wrapper');\r\n  hours.appendChild(hoursList);\r\n  body.appendChild(hours);\r\n\r\n  for (let i = 0; i < 7; i++) {\r\n    container.querySelector('.body').appendChild(new Day(content.days[i]));\r\n  }\r\n\r\n  return container;\r\n}\r\n\r\nmodule.exports = Week;\r\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./components/views/week-view.js\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./components/views/week-view.js?");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("var Day = __webpack_require__(10);\r\n\r\nclass WeekModel {\r\n  constructor(weekNumber = 1){\r\n    this.weekNumber = weekNumber;\r\n    this.days = [];\r\n    for (let i = 0; i < 7; i++) {\r\n      this.days.push(new Day(weekNumber, i+1));\r\n    }\r\n  }\r\n}\r\n\r\nmodule.exports = WeekModel;\r\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./components/viewmodels/week-viewmodel.js\n ** module id = 3\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./components/viewmodels/week-viewmodel.js?");

/***/ },
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\n// css base code, injected by the css-loader\r\nmodule.exports = function() {\r\n\tvar list = [];\r\n\r\n\t// return the list of modules as css string\r\n\tlist.toString = function toString() {\r\n\t\tvar result = [];\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar item = this[i];\r\n\t\t\tif(item[2]) {\r\n\t\t\t\tresult.push(\"@media \" + item[2] + \"{\" + item[1] + \"}\");\r\n\t\t\t} else {\r\n\t\t\t\tresult.push(item[1]);\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn result.join(\"\");\r\n\t};\r\n\r\n\t// import a list of modules into the list\r\n\tlist.i = function(modules, mediaQuery) {\r\n\t\tif(typeof modules === \"string\")\r\n\t\t\tmodules = [[null, modules, \"\"]];\r\n\t\tvar alreadyImportedModules = {};\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar id = this[i][0];\r\n\t\t\tif(typeof id === \"number\")\r\n\t\t\t\talreadyImportedModules[id] = true;\r\n\t\t}\r\n\t\tfor(i = 0; i < modules.length; i++) {\r\n\t\t\tvar item = modules[i];\r\n\t\t\t// skip already imported module\r\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\r\n\t\t\t//  when a module is imported multiple times with different media queries.\r\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\r\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\r\n\t\t\t\tif(mediaQuery && !item[2]) {\r\n\t\t\t\t\titem[2] = mediaQuery;\r\n\t\t\t\t} else if(mediaQuery) {\r\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\r\n\t\t\t\t}\r\n\t\t\t\tlist.push(item);\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n\treturn list;\r\n};\r\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/css-loader/lib/css-base.js\n ** module id = 6\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./~/css-loader/lib/css-base.js?");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\nvar stylesInDom = {},\r\n\tmemoize = function(fn) {\r\n\t\tvar memo;\r\n\t\treturn function () {\r\n\t\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\r\n\t\t\treturn memo;\r\n\t\t};\r\n\t},\r\n\tisOldIE = memoize(function() {\r\n\t\treturn /msie [6-9]\\b/.test(window.navigator.userAgent.toLowerCase());\r\n\t}),\r\n\tgetHeadElement = memoize(function () {\r\n\t\treturn document.head || document.getElementsByTagName(\"head\")[0];\r\n\t}),\r\n\tsingletonElement = null,\r\n\tsingletonCounter = 0,\r\n\tstyleElementsInsertedAtTop = [];\r\n\r\nmodule.exports = function(list, options) {\r\n\tif(false) {\r\n\t\tif(typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\r\n\t}\r\n\r\n\toptions = options || {};\r\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\r\n\t// tags it will allow on a page\r\n\tif (typeof options.singleton === \"undefined\") options.singleton = isOldIE();\r\n\r\n\t// By default, add <style> tags to the bottom of <head>.\r\n\tif (typeof options.insertAt === \"undefined\") options.insertAt = \"bottom\";\r\n\r\n\tvar styles = listToStyles(list);\r\n\taddStylesToDom(styles, options);\r\n\r\n\treturn function update(newList) {\r\n\t\tvar mayRemove = [];\r\n\t\tfor(var i = 0; i < styles.length; i++) {\r\n\t\t\tvar item = styles[i];\r\n\t\t\tvar domStyle = stylesInDom[item.id];\r\n\t\t\tdomStyle.refs--;\r\n\t\t\tmayRemove.push(domStyle);\r\n\t\t}\r\n\t\tif(newList) {\r\n\t\t\tvar newStyles = listToStyles(newList);\r\n\t\t\taddStylesToDom(newStyles, options);\r\n\t\t}\r\n\t\tfor(var i = 0; i < mayRemove.length; i++) {\r\n\t\t\tvar domStyle = mayRemove[i];\r\n\t\t\tif(domStyle.refs === 0) {\r\n\t\t\t\tfor(var j = 0; j < domStyle.parts.length; j++)\r\n\t\t\t\t\tdomStyle.parts[j]();\r\n\t\t\t\tdelete stylesInDom[domStyle.id];\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n}\r\n\r\nfunction addStylesToDom(styles, options) {\r\n\tfor(var i = 0; i < styles.length; i++) {\r\n\t\tvar item = styles[i];\r\n\t\tvar domStyle = stylesInDom[item.id];\r\n\t\tif(domStyle) {\r\n\t\t\tdomStyle.refs++;\r\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\r\n\t\t\t}\r\n\t\t\tfor(; j < item.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\tvar parts = [];\r\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\r\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction listToStyles(list) {\r\n\tvar styles = [];\r\n\tvar newStyles = {};\r\n\tfor(var i = 0; i < list.length; i++) {\r\n\t\tvar item = list[i];\r\n\t\tvar id = item[0];\r\n\t\tvar css = item[1];\r\n\t\tvar media = item[2];\r\n\t\tvar sourceMap = item[3];\r\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\r\n\t\tif(!newStyles[id])\r\n\t\t\tstyles.push(newStyles[id] = {id: id, parts: [part]});\r\n\t\telse\r\n\t\t\tnewStyles[id].parts.push(part);\r\n\t}\r\n\treturn styles;\r\n}\r\n\r\nfunction insertStyleElement(options, styleElement) {\r\n\tvar head = getHeadElement();\r\n\tvar lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];\r\n\tif (options.insertAt === \"top\") {\r\n\t\tif(!lastStyleElementInsertedAtTop) {\r\n\t\t\thead.insertBefore(styleElement, head.firstChild);\r\n\t\t} else if(lastStyleElementInsertedAtTop.nextSibling) {\r\n\t\t\thead.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);\r\n\t\t} else {\r\n\t\t\thead.appendChild(styleElement);\r\n\t\t}\r\n\t\tstyleElementsInsertedAtTop.push(styleElement);\r\n\t} else if (options.insertAt === \"bottom\") {\r\n\t\thead.appendChild(styleElement);\r\n\t} else {\r\n\t\tthrow new Error(\"Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.\");\r\n\t}\r\n}\r\n\r\nfunction removeStyleElement(styleElement) {\r\n\tstyleElement.parentNode.removeChild(styleElement);\r\n\tvar idx = styleElementsInsertedAtTop.indexOf(styleElement);\r\n\tif(idx >= 0) {\r\n\t\tstyleElementsInsertedAtTop.splice(idx, 1);\r\n\t}\r\n}\r\n\r\nfunction createStyleElement(options) {\r\n\tvar styleElement = document.createElement(\"style\");\r\n\tstyleElement.type = \"text/css\";\r\n\tinsertStyleElement(options, styleElement);\r\n\treturn styleElement;\r\n}\r\n\r\nfunction createLinkElement(options) {\r\n\tvar linkElement = document.createElement(\"link\");\r\n\tlinkElement.rel = \"stylesheet\";\r\n\tinsertStyleElement(options, linkElement);\r\n\treturn linkElement;\r\n}\r\n\r\nfunction addStyle(obj, options) {\r\n\tvar styleElement, update, remove;\r\n\r\n\tif (options.singleton) {\r\n\t\tvar styleIndex = singletonCounter++;\r\n\t\tstyleElement = singletonElement || (singletonElement = createStyleElement(options));\r\n\t\tupdate = applyToSingletonTag.bind(null, styleElement, styleIndex, false);\r\n\t\tremove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);\r\n\t} else if(obj.sourceMap &&\r\n\t\ttypeof URL === \"function\" &&\r\n\t\ttypeof URL.createObjectURL === \"function\" &&\r\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\r\n\t\ttypeof Blob === \"function\" &&\r\n\t\ttypeof btoa === \"function\") {\r\n\t\tstyleElement = createLinkElement(options);\r\n\t\tupdate = updateLink.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t\tif(styleElement.href)\r\n\t\t\t\tURL.revokeObjectURL(styleElement.href);\r\n\t\t};\r\n\t} else {\r\n\t\tstyleElement = createStyleElement(options);\r\n\t\tupdate = applyToTag.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t};\r\n\t}\r\n\r\n\tupdate(obj);\r\n\r\n\treturn function updateStyle(newObj) {\r\n\t\tif(newObj) {\r\n\t\t\tif(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)\r\n\t\t\t\treturn;\r\n\t\t\tupdate(obj = newObj);\r\n\t\t} else {\r\n\t\t\tremove();\r\n\t\t}\r\n\t};\r\n}\r\n\r\nvar replaceText = (function () {\r\n\tvar textStore = [];\r\n\r\n\treturn function (index, replacement) {\r\n\t\ttextStore[index] = replacement;\r\n\t\treturn textStore.filter(Boolean).join('\\n');\r\n\t};\r\n})();\r\n\r\nfunction applyToSingletonTag(styleElement, index, remove, obj) {\r\n\tvar css = remove ? \"\" : obj.css;\r\n\r\n\tif (styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = replaceText(index, css);\r\n\t} else {\r\n\t\tvar cssNode = document.createTextNode(css);\r\n\t\tvar childNodes = styleElement.childNodes;\r\n\t\tif (childNodes[index]) styleElement.removeChild(childNodes[index]);\r\n\t\tif (childNodes.length) {\r\n\t\t\tstyleElement.insertBefore(cssNode, childNodes[index]);\r\n\t\t} else {\r\n\t\t\tstyleElement.appendChild(cssNode);\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction applyToTag(styleElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar media = obj.media;\r\n\r\n\tif(media) {\r\n\t\tstyleElement.setAttribute(\"media\", media)\r\n\t}\r\n\r\n\tif(styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = css;\r\n\t} else {\r\n\t\twhile(styleElement.firstChild) {\r\n\t\t\tstyleElement.removeChild(styleElement.firstChild);\r\n\t\t}\r\n\t\tstyleElement.appendChild(document.createTextNode(css));\r\n\t}\r\n}\r\n\r\nfunction updateLink(linkElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar sourceMap = obj.sourceMap;\r\n\r\n\tif(sourceMap) {\r\n\t\t// http://stackoverflow.com/a/26603875\r\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\r\n\t}\r\n\r\n\tvar blob = new Blob([css], { type: \"text/css\" });\r\n\r\n\tvar oldSrc = linkElement.href;\r\n\r\n\tlinkElement.href = URL.createObjectURL(blob);\r\n\r\n\tif(oldSrc)\r\n\t\tURL.revokeObjectURL(oldSrc);\r\n}\r\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/style-loader/addStyles.js\n ** module id = 7\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./~/style-loader/addStyles.js?");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(9);\nif(typeof content === 'string') content = [[module.id, content, '']];\n// add the styles to the DOM\nvar update = __webpack_require__(7)(content, {});\nif(content.locals) module.exports = content.locals;\n// Hot Module Replacement\nif(false) {\n\t// When the styles change, update the <style> tags\n\tif(!content.locals) {\n\t\tmodule.hot.accept(\"!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/sass-loader/index.js?sourceMap!./app.scss\", function() {\n\t\t\tvar newContent = require(\"!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/sass-loader/index.js?sourceMap!./app.scss\");\n\t\t\tif(typeof newContent === 'string') newContent = [[module.id, newContent, '']];\n\t\t\tupdate(newContent);\n\t\t});\n\t}\n\t// When the module is disposed, remove the <style> tags\n\tmodule.hot.dispose(function() { update(); });\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./components/styles/app.scss\n ** module id = 8\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./components/styles/app.scss?");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	eval("exports = module.exports = __webpack_require__(6)();\n// imports\n\n\n// module\nexports.push([module.id, \"html, body {\\n  margin: 0;\\n  padding: 0; }\\n\\nbody {\\n  height: 100%;\\n  padding-top: 20px;\\n  font: 16px Arial, Helvetica, sans-serif; }\\n\", \"\", {\"version\":3,\"sources\":[\"/./components/components/styles/app.scss\"],\"names\":[],\"mappings\":\"AAAA;EACE,UAAU;EACV,WAAW,EACZ;;AACD;EACE,aAAa;EACb,kBAAkB;EAClB,wCAAwC,EACzC\",\"file\":\"app.scss\",\"sourcesContent\":[\"html, body {\\r\\n  margin: 0;\\r\\n  padding: 0;\\r\\n}\\r\\nbody {\\r\\n  height: 100%;\\r\\n  padding-top: 20px;\\r\\n  font: 16px Arial, Helvetica, sans-serif;\\r\\n}\\r\\n\"],\"sourceRoot\":\"webpack://\"}]);\n\n// exports\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/css-loader?sourceMap!./~/sass-loader?sourceMap!./components/styles/app.scss\n ** module id = 9\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./components/styles/app.scss?./~/css-loader?sourceMap!./~/sass-loader?sourceMap");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	eval("var Hour = __webpack_require__(11);\r\n\r\n\r\nclass DayModel {\r\n\r\n  constructor(weekNumber = 1, dayNumber = 1){\r\n\r\n    //here this must read notesList form another file/location and cache it\r\n    var notesList = {\r\n      week1 : {\r\n        day1 : {\r\n          notes : [\r\n            {\r\n              hour : 7,\r\n              caption : 'note 1',\r\n              text : \"Create task\"\r\n            }\r\n          ]\r\n        },\r\n        day3 : {\r\n          notes : [\r\n            {\r\n              hour : 15,\r\n              caption : 'note 1',\r\n              text : \"Complete task\"\r\n            }\r\n          ]\r\n        },\r\n        day5 : {\r\n          notes : [\r\n            {\r\n              hour : 19,\r\n              caption : 'note 1',\r\n              text : \"Send work\"\r\n            }\r\n          ]\r\n        },\r\n      }\r\n    };\r\n\r\n    if (notesList['week' + weekNumber]\r\n      && notesList['week' + weekNumber]['day' + dayNumber]\r\n      && notesList['week' + weekNumber]['day' + dayNumber].notes)\r\n    {\r\n      var notesByhours = {};\r\n\r\n      notesList['week' + weekNumber]['day' + dayNumber].notes.forEach(note => {\r\n        notesByhours['hour' + note.hour] = {caption : note.caption, text: note.text};\r\n      });\r\n\r\n      this.hours = [];\r\n    }\r\n\r\n  }\r\n}\r\n\r\nmodule.exports = DayModel;\r\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./components/viewmodels/day-viewmodel.js\n ** module id = 10\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./components/viewmodels/day-viewmodel.js?");

/***/ },
/* 11 */
/***/ function(module, exports) {

	eval("\n\n/*****************\n ** WEBPACK FOOTER\n ** ./components/viewmodels/hour-viewmodel.js\n ** module id = 11\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./components/viewmodels/hour-viewmodel.js?");

/***/ },
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(14);\nif(typeof content === 'string') content = [[module.id, content, '']];\n// add the styles to the DOM\nvar update = __webpack_require__(7)(content, {});\nif(content.locals) module.exports = content.locals;\n// Hot Module Replacement\nif(false) {\n\t// When the styles change, update the <style> tags\n\tif(!content.locals) {\n\t\tmodule.hot.accept(\"!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/sass-loader/index.js?sourceMap!./weekstyle.scss\", function() {\n\t\t\tvar newContent = require(\"!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/sass-loader/index.js?sourceMap!./weekstyle.scss\");\n\t\t\tif(typeof newContent === 'string') newContent = [[module.id, newContent, '']];\n\t\t\tupdate(newContent);\n\t\t});\n\t}\n\t// When the module is disposed, remove the <style> tags\n\tmodule.hot.dispose(function() { update(); });\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./components/styles/weekstyle.scss\n ** module id = 13\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./components/styles/weekstyle.scss?");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	eval("exports = module.exports = __webpack_require__(6)();\n// imports\n\n\n// module\nexports.push([module.id, \".flex-container, .calendar-week .head, .calendar-week .body {\\n  display: flex;\\n  flex-direction: row;\\n  justify-content: space-around; }\\n\\n.calendar-week {\\n  width: 90%;\\n  height: 90%;\\n  margin: 0 auto;\\n  border: 1px solid #072100; }\\n  .calendar-week .head, .calendar-week .body {\\n    border-bottom: 1px solid #072100; }\\n    .calendar-week .head .header, .calendar-week .head .day-wrapper, .calendar-week .body .header, .calendar-week .body .day-wrapper {\\n      flex-basis: 165px;\\n      border-left: 1px solid #072100;\\n      text-align: center; }\\n    .calendar-week .head .header:first-child, .calendar-week .head .day-wrapper:first-child, .calendar-week .body .header:first-child, .calendar-week .body .day-wrapper:first-child {\\n      flex-basis: 25px;\\n      border: none; }\\n    .calendar-week .head .day-wrapper ul, .calendar-week .body .day-wrapper ul {\\n      list-style: none;\\n      margin: 0;\\n      padding: 0; }\\n\", \"\", {\"version\":3,\"sources\":[\"/./components/components/styles/weekstyle.scss\"],\"names\":[],\"mappings\":\"AAEA;EACE,cAAc;EACd,oBAAoB;EACpB,8BAA8B,EAC/B;;AAED;EACE,WAAW;EACX,YAAY;EACZ,eAAe;EACf,0BAZ6B,EAgC9B;EAxBD;IAOI,iCAf2B,EA+B5B;IAvBH;MASM,kBAAkB;MAClB,+BAlByB;MAmBzB,mBAAmB,EACpB;IAZL;MAcM,iBAAiB;MACjB,aAAa,EACd;IAhBL;MAmBM,iBAAiB;MACjB,UAAU;MACV,WAAW,EACZ\",\"file\":\"weekstyle.scss\",\"sourcesContent\":[\"$calendar-border-color: #072100;\\r\\n\\r\\n.flex-container {\\r\\n  display: flex;\\r\\n  flex-direction: row;\\r\\n  justify-content: space-around;\\r\\n}\\r\\n\\r\\n.calendar-week {\\r\\n  width: 90%;\\r\\n  height: 90%;\\r\\n  margin: 0 auto;\\r\\n  border: 1px solid $calendar-border-color;\\r\\n  .head, .body {\\r\\n    @extend .flex-container;\\r\\n    border-bottom: 1px solid $calendar-border-color;\\r\\n    .header, .day-wrapper {\\r\\n      flex-basis: 165px;\\r\\n      border-left: 1px solid $calendar-border-color;\\r\\n      text-align: center;\\r\\n    }\\r\\n    .header:first-child, .day-wrapper:first-child {\\r\\n      flex-basis: 25px;\\r\\n      border: none;\\r\\n    }\\r\\n\\r\\n    .day-wrapper ul {\\r\\n      list-style: none;\\r\\n      margin: 0;\\r\\n      padding: 0;\\r\\n    }\\r\\n  }\\r\\n}\\r\\n\"],\"sourceRoot\":\"webpack://\"}]);\n\n// exports\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/css-loader?sourceMap!./~/sass-loader?sourceMap!./components/styles/weekstyle.scss\n ** module id = 14\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./components/styles/weekstyle.scss?./~/css-loader?sourceMap!./~/sass-loader?sourceMap");

/***/ },
/* 15 */
/***/ function(module, exports) {

	eval("\n\n/*****************\n ** WEBPACK FOOTER\n ** ./components/views/day-view.js\n ** module id = 15\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./components/views/day-view.js?");

/***/ }
/******/ ]);