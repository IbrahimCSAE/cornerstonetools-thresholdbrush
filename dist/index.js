/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("cornerstone"), require("cornerstoneTools"));
	else if(typeof define === 'function' && define.amd)
		define("ThresholdBrush", ["cornerstone", "cornerstoneTools"], factory);
	else if(typeof exports === 'object')
		exports["ThresholdBrush"] = factory(require("cornerstone"), require("cornerstoneTools"));
	else
		root["ThresholdBrush"] = factory(root["cornerstone"], root["cornerstoneTools"]);
})(self, (__WEBPACK_EXTERNAL_MODULE_cornerstone_core__, __WEBPACK_EXTERNAL_MODULE_cornerstone_tools__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ThresholdBrushTool.js":
/*!***********************************!*\
  !*** ./src/ThresholdBrushTool.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ThresholdBrushTool)\n/* harmony export */ });\n/* harmony import */ var cornerstone_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cornerstone-core */ \"cornerstone-core\");\n/* harmony import */ var cornerstone_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cornerstone_core__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var cornerstone_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cornerstone-tools */ \"cornerstone-tools\");\n/* harmony import */ var cornerstone_tools__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cornerstone_tools__WEBPACK_IMPORTED_MODULE_1__);\n// This tool extends the default brush tool to allow for a threshold value to be set using hounsfield units with a low and high values. The threshold decides if the brush should paint the pixel or not.\r\n\r\n\r\n\r\n\r\nconst { drawBrushPixels, getCircle } = cornerstone_tools__WEBPACK_IMPORTED_MODULE_1___default()[\"import\"](\r\n  \"util/segmentationUtils\"\r\n);\r\n\r\nconst segmentationModule = cornerstone_tools__WEBPACK_IMPORTED_MODULE_1___default().getModule(\"segmentation\");\r\nconst BaseBrushTool = cornerstone_tools__WEBPACK_IMPORTED_MODULE_1___default()[\"import\"](\"base/BaseBrushTool\");\r\n\r\n/**\r\n * @public\r\n * @class ThresholdBrushTool\r\n * @memberof Tools.Brush\r\n * @classdesc Tool for drawing segmentations on an image.\r\n * @extends Tools.Base.BaseBrushTool\r\n */\r\n\r\n\r\n class ThresholdBrushTool extends BaseBrushTool {\r\n  constructor(props = {}) {\r\n    const defaultProps = {\r\n      name: \"ThresholdBrush\",\r\n      supportedInteractionTypes: [\"Mouse\"],\r\n      configuration: {\r\n        thresholdLow: 200,\r\n        thresholdHigh: 1000,\r\n      },\r\n      mixins: [\"renderBrushMixin\"],\r\n    };\r\n\r\n    super(props, defaultProps);\r\n  }\r\n\r\n  /**\r\n   * Paints the data to the labelmap if the mouse is down and the pixel is in the threshold low and high values range.\r\n   * @protected\r\n   * @param  {Object}\r\n   * @returns {void}\r\n   */\r\n  _paint(evt) {\r\n    const { configuration } = segmentationModule;\r\n    const toolConfiguration = this.configuration;\r\n    const eventData = evt.detail;\r\n    const element = eventData.element;\r\n    const { rows, columns } = eventData.image;\r\n    const { x, y } = eventData.currentPoints.image;\r\n\r\n    if (x < 0 || x > columns || y < 0 || y > rows) {\r\n      return;\r\n    }\r\n    // check if the pixel is in the threshold range\r\n    const radius = configuration.radius;\r\n    const pointerArray = getCircle(radius, rows, columns, x, y);\r\n    // loop over the pixels in the circle and eliminate any that are outside the threshold range\r\n    const thresholdedPointerArray = pointerArray.filter((pointer) => {\r\n      const storedPixel = cornerstone_core__WEBPACK_IMPORTED_MODULE_0___default().getStoredPixels(\r\n        element,\r\n        pointer[0],\r\n        pointer[1],\r\n        1,\r\n        1\r\n      );\r\n      const hounsfieldValue =\r\n        storedPixel[0] * eventData.image.slope + eventData.image.intercept;\r\n      return (\r\n        hounsfieldValue >= toolConfiguration.thresholdLow &&\r\n        hounsfieldValue <= toolConfiguration.thresholdHigh\r\n      );\r\n    });\r\n\r\n    const { labelmap2D, labelmap3D, shouldErase } = this.paintEventData;\r\n\r\n    // Draw / Erase the active color.\r\n    drawBrushPixels(\r\n      thresholdedPointerArray,\r\n      labelmap2D.pixelData,\r\n      labelmap3D.activeSegmentIndex,\r\n      columns,\r\n      shouldErase\r\n    );\r\n    cornerstone_core__WEBPACK_IMPORTED_MODULE_0___default().updateImage(evt.detail.element);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://ThresholdBrush/./src/ThresholdBrushTool.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ThresholdBrushTool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ThresholdBrushTool */ \"./src/ThresholdBrushTool.js\");\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_ThresholdBrushTool__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack://ThresholdBrush/./src/index.js?");

/***/ }),

/***/ "cornerstone-core":
/*!******************************!*\
  !*** external "cornerstone" ***!
  \******************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_cornerstone_core__;

/***/ }),

/***/ "cornerstone-tools":
/*!***********************************!*\
  !*** external "cornerstoneTools" ***!
  \***********************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_cornerstone_tools__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});