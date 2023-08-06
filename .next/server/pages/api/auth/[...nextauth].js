"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/google":
/*!*********************************************!*\
  !*** external "next-auth/providers/google" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/google");

/***/ }),

/***/ "(api)/./pages/api/auth/[...nextauth].ts":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"next-auth/providers/google\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__);\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n    providers: [\n        next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default()({\n            clientId: process.env.GOOGLE_ID || \"\",\n            clientSecret: process.env.GOOGLE_SECRET || \"\"\n        })\n    ],\n    callbacks: {\n        //@ts-ignore\n        async jwt (token, user, account, profile, isNewUser) {\n            // Puedes personalizar el token JWT aquí si lo deseas\n            return token;\n        },\n        //@ts-ignore\n        async session (session, token) {\n            session.accessToken = token;\n            // Puedes personalizar la sesión de usuario aquí si lo deseas\n            return session;\n        }\n    }\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQWlDO0FBQ3VCO0FBRXhELGlFQUFlQSxnREFBUUEsQ0FBQztJQUN0QkUsV0FBVztRQUNURCxpRUFBY0EsQ0FBQztZQUNiRSxVQUFVQyxRQUFRQyxHQUFHLENBQUNDLFNBQVMsSUFBSTtZQUNuQ0MsY0FBY0gsUUFBUUMsR0FBRyxDQUFDRyxhQUFhLElBQUk7UUFDN0M7S0FDRDtJQUNEQyxXQUFXO1FBQ1QsWUFBWTtRQUNaLE1BQU1DLEtBQ0pDLEtBQVUsRUFDVkMsSUFBUyxFQUNUQyxPQUFZLEVBQ1pDLE9BQVksRUFDWkMsU0FBYyxFQUNaO1lBRUYscURBQXFEO1lBQ3JELE9BQU9KO1FBQ1Q7UUFFQSxZQUFZO1FBQ1osTUFBTUssU0FBUUEsT0FBWSxFQUFFTCxLQUFVLEVBQUU7WUFDdENLLFFBQVFDLFdBQVcsR0FBR047WUFDdEIsNkRBQTZEO1lBQzdELE9BQU9LO1FBQ1Q7SUFDRjtBQUNGLEVBQUUsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Rlc3QvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLnRzPzJlOGIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIjtcclxuaW1wb3J0IEdvb2dsZVByb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmV4dEF1dGgoe1xyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xyXG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR09PR0xFX0lEIHx8IFwiXCIsXHJcbiAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuR09PR0xFX1NFQ1JFVCB8fCBcIlwiLFxyXG4gICAgfSksXHJcbiAgXSxcclxuICBjYWxsYmFja3M6IHtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgYXN5bmMgand0KFxyXG4gICAgICB0b2tlbjogYW55LFxyXG4gICAgICB1c2VyOiBhbnksXHJcbiAgICAgIGFjY291bnQ6IGFueSxcclxuICAgICAgcHJvZmlsZTogYW55LFxyXG4gICAgICBpc05ld1VzZXI6IGFueVxyXG4gICAgICApIHtcclxuICAgICAgICBcclxuICAgICAgLy8gUHVlZGVzIHBlcnNvbmFsaXphciBlbCB0b2tlbiBKV1QgYXF1w60gc2kgbG8gZGVzZWFzXHJcbiAgICAgIHJldHVybiB0b2tlbjtcclxuICAgIH0sXHJcblxyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBhc3luYyBzZXNzaW9uKHNlc3Npb246IGFueSwgdG9rZW46IGFueSkge1xyXG4gICAgICBzZXNzaW9uLmFjY2Vzc1Rva2VuID0gdG9rZW5cclxuICAgICAgLy8gUHVlZGVzIHBlcnNvbmFsaXphciBsYSBzZXNpw7NuIGRlIHVzdWFyaW8gYXF1w60gc2kgbG8gZGVzZWFzXHJcbiAgICAgIHJldHVybiBzZXNzaW9uO1xyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiR29vZ2xlUHJvdmlkZXIiLCJwcm92aWRlcnMiLCJjbGllbnRJZCIsInByb2Nlc3MiLCJlbnYiLCJHT09HTEVfSUQiLCJjbGllbnRTZWNyZXQiLCJHT09HTEVfU0VDUkVUIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJ1c2VyIiwiYWNjb3VudCIsInByb2ZpbGUiLCJpc05ld1VzZXIiLCJzZXNzaW9uIiwiYWNjZXNzVG9rZW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/[...nextauth].ts"));
module.exports = __webpack_exports__;

})();