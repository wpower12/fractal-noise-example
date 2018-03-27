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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/tectonics.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/simplex-noise/simplex-noise.js":
/*!*****************************************************!*\
  !*** ./node_modules/simplex-noise/simplex-noise.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;/*\n * A fast javascript implementation of simplex noise by Jonas Wagner\n\nBased on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.\nWhich is based on example code by Stefan Gustavson (stegu@itn.liu.se).\nWith Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).\nBetter rank ordering method by Stefan Gustavson in 2012.\n\n\n Copyright (c) 2018 Jonas Wagner\n\n Permission is hereby granted, free of charge, to any person obtaining a copy\n of this software and associated documentation files (the \"Software\"), to deal\n in the Software without restriction, including without limitation the rights\n to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n copies of the Software, and to permit persons to whom the Software is\n furnished to do so, subject to the following conditions:\n\n The above copyright notice and this permission notice shall be included in all\n copies or substantial portions of the Software.\n\n THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n SOFTWARE.\n */\n(function() {\n  'use strict';\n\n  var F2 = 0.5 * (Math.sqrt(3.0) - 1.0);\n  var G2 = (3.0 - Math.sqrt(3.0)) / 6.0;\n  var F3 = 1.0 / 3.0;\n  var G3 = 1.0 / 6.0;\n  var F4 = (Math.sqrt(5.0) - 1.0) / 4.0;\n  var G4 = (5.0 - Math.sqrt(5.0)) / 20.0;\n\n  function SimplexNoise(randomOrSeed) {\n    var random;\n    if (typeof randomOrSeed == 'function') {\n      random = randomOrSeed;\n    }\n    else if (randomOrSeed) {\n      random = alea(randomOrSeed);\n    } else {\n      random = Math.random;\n    }\n    this.p = buildPermutationTable(random);\n    this.perm = new Uint8Array(512);\n    this.permMod12 = new Uint8Array(512);\n    for (var i = 0; i < 512; i++) {\n      this.perm[i] = this.p[i & 255];\n      this.permMod12[i] = this.perm[i] % 12;\n    }\n\n  }\n  SimplexNoise.prototype = {\n    grad3: new Float32Array([1, 1, 0,\n      -1, 1, 0,\n      1, -1, 0,\n\n      -1, -1, 0,\n      1, 0, 1,\n      -1, 0, 1,\n\n      1, 0, -1,\n      -1, 0, -1,\n      0, 1, 1,\n\n      0, -1, 1,\n      0, 1, -1,\n      0, -1, -1]),\n    grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1,\n      0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1,\n      1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1,\n      -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1,\n      1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1,\n      -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1,\n      1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0,\n      -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]),\n    noise2D: function(xin, yin) {\n      var permMod12 = this.permMod12;\n      var perm = this.perm;\n      var grad3 = this.grad3;\n      var n0 = 0; // Noise contributions from the three corners\n      var n1 = 0;\n      var n2 = 0;\n      // Skew the input space to determine which simplex cell we're in\n      var s = (xin + yin) * F2; // Hairy factor for 2D\n      var i = Math.floor(xin + s);\n      var j = Math.floor(yin + s);\n      var t = (i + j) * G2;\n      var X0 = i - t; // Unskew the cell origin back to (x,y) space\n      var Y0 = j - t;\n      var x0 = xin - X0; // The x,y distances from the cell origin\n      var y0 = yin - Y0;\n      // For the 2D case, the simplex shape is an equilateral triangle.\n      // Determine which simplex we are in.\n      var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords\n      if (x0 > y0) {\n        i1 = 1;\n        j1 = 0;\n      } // lower triangle, XY order: (0,0)->(1,0)->(1,1)\n      else {\n        i1 = 0;\n        j1 = 1;\n      } // upper triangle, YX order: (0,0)->(0,1)->(1,1)\n      // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and\n      // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where\n      // c = (3-sqrt(3))/6\n      var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords\n      var y1 = y0 - j1 + G2;\n      var x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords\n      var y2 = y0 - 1.0 + 2.0 * G2;\n      // Work out the hashed gradient indices of the three simplex corners\n      var ii = i & 255;\n      var jj = j & 255;\n      // Calculate the contribution from the three corners\n      var t0 = 0.5 - x0 * x0 - y0 * y0;\n      if (t0 >= 0) {\n        var gi0 = permMod12[ii + perm[jj]] * 3;\n        t0 *= t0;\n        n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient\n      }\n      var t1 = 0.5 - x1 * x1 - y1 * y1;\n      if (t1 >= 0) {\n        var gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;\n        t1 *= t1;\n        n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);\n      }\n      var t2 = 0.5 - x2 * x2 - y2 * y2;\n      if (t2 >= 0) {\n        var gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;\n        t2 *= t2;\n        n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);\n      }\n      // Add contributions from each corner to get the final noise value.\n      // The result is scaled to return values in the interval [-1,1].\n      return 70.0 * (n0 + n1 + n2);\n    },\n    // 3D simplex noise\n    noise3D: function(xin, yin, zin) {\n      var permMod12 = this.permMod12;\n      var perm = this.perm;\n      var grad3 = this.grad3;\n      var n0, n1, n2, n3; // Noise contributions from the four corners\n      // Skew the input space to determine which simplex cell we're in\n      var s = (xin + yin + zin) * F3; // Very nice and simple skew factor for 3D\n      var i = Math.floor(xin + s);\n      var j = Math.floor(yin + s);\n      var k = Math.floor(zin + s);\n      var t = (i + j + k) * G3;\n      var X0 = i - t; // Unskew the cell origin back to (x,y,z) space\n      var Y0 = j - t;\n      var Z0 = k - t;\n      var x0 = xin - X0; // The x,y,z distances from the cell origin\n      var y0 = yin - Y0;\n      var z0 = zin - Z0;\n      // For the 3D case, the simplex shape is a slightly irregular tetrahedron.\n      // Determine which simplex we are in.\n      var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords\n      var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords\n      if (x0 >= y0) {\n        if (y0 >= z0) {\n          i1 = 1;\n          j1 = 0;\n          k1 = 0;\n          i2 = 1;\n          j2 = 1;\n          k2 = 0;\n        } // X Y Z order\n        else if (x0 >= z0) {\n          i1 = 1;\n          j1 = 0;\n          k1 = 0;\n          i2 = 1;\n          j2 = 0;\n          k2 = 1;\n        } // X Z Y order\n        else {\n          i1 = 0;\n          j1 = 0;\n          k1 = 1;\n          i2 = 1;\n          j2 = 0;\n          k2 = 1;\n        } // Z X Y order\n      }\n      else { // x0<y0\n        if (y0 < z0) {\n          i1 = 0;\n          j1 = 0;\n          k1 = 1;\n          i2 = 0;\n          j2 = 1;\n          k2 = 1;\n        } // Z Y X order\n        else if (x0 < z0) {\n          i1 = 0;\n          j1 = 1;\n          k1 = 0;\n          i2 = 0;\n          j2 = 1;\n          k2 = 1;\n        } // Y Z X order\n        else {\n          i1 = 0;\n          j1 = 1;\n          k1 = 0;\n          i2 = 1;\n          j2 = 1;\n          k2 = 0;\n        } // Y X Z order\n      }\n      // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),\n      // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and\n      // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where\n      // c = 1/6.\n      var x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords\n      var y1 = y0 - j1 + G3;\n      var z1 = z0 - k1 + G3;\n      var x2 = x0 - i2 + 2.0 * G3; // Offsets for third corner in (x,y,z) coords\n      var y2 = y0 - j2 + 2.0 * G3;\n      var z2 = z0 - k2 + 2.0 * G3;\n      var x3 = x0 - 1.0 + 3.0 * G3; // Offsets for last corner in (x,y,z) coords\n      var y3 = y0 - 1.0 + 3.0 * G3;\n      var z3 = z0 - 1.0 + 3.0 * G3;\n      // Work out the hashed gradient indices of the four simplex corners\n      var ii = i & 255;\n      var jj = j & 255;\n      var kk = k & 255;\n      // Calculate the contribution from the four corners\n      var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;\n      if (t0 < 0) n0 = 0.0;\n      else {\n        var gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3;\n        t0 *= t0;\n        n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0);\n      }\n      var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;\n      if (t1 < 0) n1 = 0.0;\n      else {\n        var gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;\n        t1 *= t1;\n        n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);\n      }\n      var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;\n      if (t2 < 0) n2 = 0.0;\n      else {\n        var gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;\n        t2 *= t2;\n        n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);\n      }\n      var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;\n      if (t3 < 0) n3 = 0.0;\n      else {\n        var gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;\n        t3 *= t3;\n        n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3);\n      }\n      // Add contributions from each corner to get the final noise value.\n      // The result is scaled to stay just inside [-1,1]\n      return 32.0 * (n0 + n1 + n2 + n3);\n    },\n    // 4D simplex noise, better simplex rank ordering method 2012-03-09\n    noise4D: function(x, y, z, w) {\n      var perm = this.perm;\n      var grad4 = this.grad4;\n\n      var n0, n1, n2, n3, n4; // Noise contributions from the five corners\n      // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in\n      var s = (x + y + z + w) * F4; // Factor for 4D skewing\n      var i = Math.floor(x + s);\n      var j = Math.floor(y + s);\n      var k = Math.floor(z + s);\n      var l = Math.floor(w + s);\n      var t = (i + j + k + l) * G4; // Factor for 4D unskewing\n      var X0 = i - t; // Unskew the cell origin back to (x,y,z,w) space\n      var Y0 = j - t;\n      var Z0 = k - t;\n      var W0 = l - t;\n      var x0 = x - X0; // The x,y,z,w distances from the cell origin\n      var y0 = y - Y0;\n      var z0 = z - Z0;\n      var w0 = w - W0;\n      // For the 4D case, the simplex is a 4D shape I won't even try to describe.\n      // To find out which of the 24 possible simplices we're in, we need to\n      // determine the magnitude ordering of x0, y0, z0 and w0.\n      // Six pair-wise comparisons are performed between each possible pair\n      // of the four coordinates, and the results are used to rank the numbers.\n      var rankx = 0;\n      var ranky = 0;\n      var rankz = 0;\n      var rankw = 0;\n      if (x0 > y0) rankx++;\n      else ranky++;\n      if (x0 > z0) rankx++;\n      else rankz++;\n      if (x0 > w0) rankx++;\n      else rankw++;\n      if (y0 > z0) ranky++;\n      else rankz++;\n      if (y0 > w0) ranky++;\n      else rankw++;\n      if (z0 > w0) rankz++;\n      else rankw++;\n      var i1, j1, k1, l1; // The integer offsets for the second simplex corner\n      var i2, j2, k2, l2; // The integer offsets for the third simplex corner\n      var i3, j3, k3, l3; // The integer offsets for the fourth simplex corner\n      // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.\n      // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w\n      // impossible. Only the 24 indices which have non-zero entries make any sense.\n      // We use a thresholding to set the coordinates in turn from the largest magnitude.\n      // Rank 3 denotes the largest coordinate.\n      i1 = rankx >= 3 ? 1 : 0;\n      j1 = ranky >= 3 ? 1 : 0;\n      k1 = rankz >= 3 ? 1 : 0;\n      l1 = rankw >= 3 ? 1 : 0;\n      // Rank 2 denotes the second largest coordinate.\n      i2 = rankx >= 2 ? 1 : 0;\n      j2 = ranky >= 2 ? 1 : 0;\n      k2 = rankz >= 2 ? 1 : 0;\n      l2 = rankw >= 2 ? 1 : 0;\n      // Rank 1 denotes the second smallest coordinate.\n      i3 = rankx >= 1 ? 1 : 0;\n      j3 = ranky >= 1 ? 1 : 0;\n      k3 = rankz >= 1 ? 1 : 0;\n      l3 = rankw >= 1 ? 1 : 0;\n      // The fifth corner has all coordinate offsets = 1, so no need to compute that.\n      var x1 = x0 - i1 + G4; // Offsets for second corner in (x,y,z,w) coords\n      var y1 = y0 - j1 + G4;\n      var z1 = z0 - k1 + G4;\n      var w1 = w0 - l1 + G4;\n      var x2 = x0 - i2 + 2.0 * G4; // Offsets for third corner in (x,y,z,w) coords\n      var y2 = y0 - j2 + 2.0 * G4;\n      var z2 = z0 - k2 + 2.0 * G4;\n      var w2 = w0 - l2 + 2.0 * G4;\n      var x3 = x0 - i3 + 3.0 * G4; // Offsets for fourth corner in (x,y,z,w) coords\n      var y3 = y0 - j3 + 3.0 * G4;\n      var z3 = z0 - k3 + 3.0 * G4;\n      var w3 = w0 - l3 + 3.0 * G4;\n      var x4 = x0 - 1.0 + 4.0 * G4; // Offsets for last corner in (x,y,z,w) coords\n      var y4 = y0 - 1.0 + 4.0 * G4;\n      var z4 = z0 - 1.0 + 4.0 * G4;\n      var w4 = w0 - 1.0 + 4.0 * G4;\n      // Work out the hashed gradient indices of the five simplex corners\n      var ii = i & 255;\n      var jj = j & 255;\n      var kk = k & 255;\n      var ll = l & 255;\n      // Calculate the contribution from the five corners\n      var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;\n      if (t0 < 0) n0 = 0.0;\n      else {\n        var gi0 = (perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32) * 4;\n        t0 *= t0;\n        n0 = t0 * t0 * (grad4[gi0] * x0 + grad4[gi0 + 1] * y0 + grad4[gi0 + 2] * z0 + grad4[gi0 + 3] * w0);\n      }\n      var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;\n      if (t1 < 0) n1 = 0.0;\n      else {\n        var gi1 = (perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32) * 4;\n        t1 *= t1;\n        n1 = t1 * t1 * (grad4[gi1] * x1 + grad4[gi1 + 1] * y1 + grad4[gi1 + 2] * z1 + grad4[gi1 + 3] * w1);\n      }\n      var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;\n      if (t2 < 0) n2 = 0.0;\n      else {\n        var gi2 = (perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32) * 4;\n        t2 *= t2;\n        n2 = t2 * t2 * (grad4[gi2] * x2 + grad4[gi2 + 1] * y2 + grad4[gi2 + 2] * z2 + grad4[gi2 + 3] * w2);\n      }\n      var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;\n      if (t3 < 0) n3 = 0.0;\n      else {\n        var gi3 = (perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32) * 4;\n        t3 *= t3;\n        n3 = t3 * t3 * (grad4[gi3] * x3 + grad4[gi3 + 1] * y3 + grad4[gi3 + 2] * z3 + grad4[gi3 + 3] * w3);\n      }\n      var t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;\n      if (t4 < 0) n4 = 0.0;\n      else {\n        var gi4 = (perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32) * 4;\n        t4 *= t4;\n        n4 = t4 * t4 * (grad4[gi4] * x4 + grad4[gi4 + 1] * y4 + grad4[gi4 + 2] * z4 + grad4[gi4 + 3] * w4);\n      }\n      // Sum up and scale the result to cover the range [-1,1]\n      return 27.0 * (n0 + n1 + n2 + n3 + n4);\n    }\n  };\n\n  function buildPermutationTable(random) {\n    var i;\n    var p = new Uint8Array(256);\n    for (i = 0; i < 256; i++) {\n      p[i] = i;\n    }\n    for (i = 0; i < 255; i++) {\n      var r = i + ~~(random() * (256 - i));\n      var aux = p[i];\n      p[i] = p[r];\n      p[r] = aux;\n    }\n    return p;\n  }\n  SimplexNoise._buildPermutationTable = buildPermutationTable;\n\n  function alea() {\n    // Johannes Baagøe <baagoe@baagoe.com>, 2010\n    var s0 = 0;\n    var s1 = 0;\n    var s2 = 0;\n    var c = 1;\n\n    var mash = masher();\n    s0 = mash(' ');\n    s1 = mash(' ');\n    s2 = mash(' ');\n\n    for (var i = 0; i < arguments.length; i++) {\n      s0 -= mash(arguments[i]);\n      if (s0 < 0) {\n        s0 += 1;\n      }\n      s1 -= mash(arguments[i]);\n      if (s1 < 0) {\n        s1 += 1;\n      }\n      s2 -= mash(arguments[i]);\n      if (s2 < 0) {\n        s2 += 1;\n      }\n    }\n    mash = null;\n    return function() {\n      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32\n      s0 = s1;\n      s1 = s2;\n      return s2 = t - (c = t | 0);\n    };\n  }\n  function masher() {\n    var n = 0xefc8249d;\n    return function(data) {\n      data = data.toString();\n      for (var i = 0; i < data.length; i++) {\n        n += data.charCodeAt(i);\n        var h = 0.02519603282416938 * n;\n        n = h >>> 0;\n        h -= n;\n        h *= n;\n        n = h >>> 0;\n        h -= n;\n        n += h * 0x100000000; // 2^32\n      }\n      return (n >>> 0) * 2.3283064365386963e-10; // 2^-32\n    };\n  }\n\n  // amd\n  if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {return SimplexNoise;}).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  // common js\n  if (true) exports.SimplexNoise = SimplexNoise;\n  // browser\n  else {}\n  // nodejs\n  if (true) {\n    module.exports = SimplexNoise;\n  }\n\n})();\n\n\n//# sourceURL=webpack:///./node_modules/simplex-noise/simplex-noise.js?");

/***/ }),

/***/ "./src/lib/FractalNoise.js":
/*!*********************************!*\
  !*** ./src/lib/FractalNoise.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass FractalNoise {\n\tfractal2D(noise_src, x, y, octaves){\n\t    var x_n = x;\n\t    var y_n = y;\n\t    var ret = 0.0;\n\t    var amp = 0.5;\n\t    for (var i = 0; i < octaves; i++) {\n\t        ret += amp*noise_src.noise2D(x_n, y_n);\n\t        x_n = x_n*2; \n\t        y_n = y_n*2;\n\t        amp = amp * 0.5\n\t    }\n\t    return ret;\n\t};\n\n\tfractal2DSurface(noise_src, x, y, freq, octaves, thresh){\n\t\tvar map = new Array();\n\t    for (var i = 0; i < x; i++) {\n\t    \tmap[i] = new Array();\n\t    \tfor (var j = 0; j < y; j++) {\n\t    \t\tvar val = this.fractal2D(noise_src, (i/x)*freq, (j/y)*freq, octaves);\n\t    \t\tval = this.scale(val, -0.98, 0.98);\n\t    \t\tif(val > thresh){\n\t    \t\t\tmap[i][j] = val;\n\t    \t\t} else {\n\t    \t\t\tmap[i][j] = 0;\n\t    \t\t}\n\t    \t}\n\t    }\n\t    return map;\n\t};\n\n\tscale(val, min, max){\n        // from (min,max) to (0/1)\n        return (val-min)/(max - min);\n    }; \n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (FractalNoise);\n\n//# sourceURL=webpack:///./src/lib/FractalNoise.js?");

/***/ }),

/***/ "./src/lib/Helper.js":
/*!***************************!*\
  !*** ./src/lib/Helper.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Helper {\n    constructor(){\n        this.int_id = -1;        \n    }\n\n    draw_hmap_to_canvas(cvs, map, size, hue, thresh){\n        var ctx = cvs.getContext(\"2d\");\n        var w_px = cvs.width;\n        var h_px = cvs.height;\n        var o_x  = Math.floor((w_px - size*map.length)/2);\n        var o_y  = Math.floor((h_px - size*map[0].length)/2);\n        for (var i = 0; i < map.length; i++) {\n            for (var j = 0; j < map[0].length; j++) {\n                var val = map[i][j];\n                var c   = this.get_color(hue, thresh, val);\n                var x1 = i*size, x2 = x1+size;\n                var y1 = j*size, y2 = y1+size;\n                ctx.fillStyle = c;\n                ctx.fillRect(x1+o_x,y1+o_y,x2+o_x,y2+o_y);\n            }\n        }\n    }\n\n    attach_map_animation(cvs, map_list, size, hue, thresh){\n        if(this.int_id != -1){\n            console.log(\"clearning setInterval\");\n            clearInterval(this.int_id);\n        }\n        var m = 0;\n        function draw(){\n            var map = map_list[m];\n            this.draw_hmap_to_canvas(cvs, map, size, hue, thresh)\n            m += 1;\n            if(m >= map_list.length){m = 0;}\n        };\n        this.int_id = setInterval(draw.bind(this), 600);\n    }\n\n\tget_color(hue, thresh, percent){\n        var ret = \"\";\n        if(percent > thresh){\n            var n = Math.floor(100*percent)-1;\n            ret = \"hsl(\"+hue+\", 55%, \"+n+\"%)\";\n        } else {  \n            ret = \"hsl(\"+hue+\", 55%, 0%)\";\n        }\n        return ret;\n    };\n\n    scale_val(val, min, max){\n        // from (min,max) to (0/1)\n        return (val-min)/(max - min);\n    }; \n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Helper);\n\n//# sourceURL=webpack:///./src/lib/Helper.js?");

/***/ }),

/***/ "./src/lib/Tectonics.js":
/*!******************************!*\
  !*** ./src/lib/Tectonics.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _FractalNoise_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FractalNoise.js */ \"./src/lib/FractalNoise.js\");\n\nvar SimplexNoise = __webpack_require__(/*! simplex-noise */ \"./node_modules/simplex-noise/simplex-noise.js\");\n\nvar DIRECTIONS = [[1,1], [1,0], [1,-1], [0,1], [0,-1], [-1,1], [-1,0], [-1,-1]];\n\nclass Tectonics {\n\t/* Generates a set of maps that represent steps in a simulation of plate\n\t   tectonics on a grid. \n\t*/\n\tgenerate(cvs, size, octaves, freq, thresh, min_size, hue, seed, rand){\n\t\tvar w = cvs.width;\n\t    var h = cvs.height;\n\t    var X = Math.floor(w / size);\n\t    var Y = Math.floor(h / size);\n\n\t    if(rand){\n            var simplex = new SimplexNoise();\n        } else {\n            var simplex = new SimplexNoise(seed);\n        }\n\n        var fn = new _FractalNoise_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n\t    var world_map = fn.fractal2DSurface(simplex, X, Y, freq, octaves, thresh);\t\t\n\t    clearEdges(world_map);\n\t    var plates = getPlates(world_map);\n\t    plates = clearSmallPlates(world_map, plates, min_size);\n\n\t    // Assign random initial direction to each plate \n\t    var dirs = [];\n\t    for (var i = 0; i < plates.length; i++) {\n\t    \tvar r_dir = DIRECTIONS[Math.floor(Math.random()*DIRECTIONS.length)];\n\t    \tdirs.push(r_dir);\n\t    }\n\n\t    var time_steps = 20;\n\t    var map_list = simulate_movement(world_map, plates, dirs, time_steps);\n\n\t    return map_list;\n\t}\n}\n\n// ** Basic Procedures *****\nfunction clearEdges(map){\n\t// Flood fill, starting with all edge cells in the stack.\n\tvar seen = new Array();\t// Track what cells have been traversed\n\tfor (var i = 0; i < map.length; i++) {\n\t\tseen[i] = new Array();\n\t\tfor (var j = 0; j < map[0].length; j++) {\n\t\t\tseen[i][j] = false;\n\t\t}\n\t}\n\n\tvar stack = [];\t  // cells to be checked - starts with all boundries\n\tfor (var i = 0; i < map.length; i++) {\n\t\tstack.push([i, 0]);\n\t\tstack.push([i, map[0].length-1]);\n\t}\n\tfor (var i = 1; i < map[0].length; i++) {\n\t\tstack.push([0, i]);\n\t\tstack.push([map.length-1, i]);\n\t}\n\t// list of deltas used to address neighbors\n\tvar ns = [[0,1], [0,-1], [1,0], [-1,0]];\n\t// stack based flood fill.\n\twhile( stack.length > 0  ){\n\t\tvar c = stack.pop();\n\t\tvar x = c[0];\n\t\tvar y = c[1];\n\n\t\tseen[x][y] = true;\n\n\t\tif( map[x][y] > 0 ){\n\t\t\tmap[x][y] = 0;\n\t\t\t// iterate over neighbors\n\t\t\tfor (var i = 0; i < ns.length; i++) {\n\t\t\t\tvar n  = ns[i];\n\t\t\t\tvar nx = x+n[0];\n\t\t\t\tvar ny = y+n[1];\n\t\t\t\t// ignore out of bounds and previously seen cells\n\t\t\t\tif( nx > 0 && \n\t\t\t\t\t\tnx < map.length && \n\t\t\t\t\t\tny > 0 && \n\t\t\t\t\t\tny < map[0].length &&\n\t\t\t\t\t\t!seen[nx][ny]){\n\t\t\t\t\tstack.push([nx, ny])\t\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n\nfunction getPlates(map){\n\t// Returns list of cells in each connected component.\n\tvar seen = new Array();\t// Track what cells have been traversed\n\tfor (var i = 0; i < map.length; i++) {\n\t\tseen[i] = new Array();\n\t\tfor (var j = 0; j < map[0].length; j++) {\n\t\t\tseen[i][j] = false;\n\t\t}\n\t}\n\n\tvar plates = new Array();\n\t\n\tfor (var i = 0; i < map.length; i++) {\n\t\tfor (var j = 0; j < map[0].length; j++) {\n\t\t\tif( !seen[i][j] && map[i][j] > 0  ){\t\n\t\t\t\tvar plate_list = flood_fill(i, j);\n\t\t\t\tplates.push(plate_list);\n\t\t\t}\n\t\t}\n\t}\n\n\tfunction flood_fill(x, y){\n\t\tvar plate_list = []; // all cells in the plate.\n\t\tvar stack = [];\t  // cells to be checked - starts with all boundries\n\t\tstack.push([x,y]);\n\t\t// list of deltas used to address neighbors\n\t\tvar ns = [[0,1], [0,-1], [1,0], [-1,0]];\n\t\twhile( stack.length > 0  ){\n\t\t\tvar c = stack.pop();\n\t\t\tvar x = c[0];\n\t\t\tvar y = c[1];\n\t\t\tseen[x][y] = true;\n\n\t\t\tif( map[x][y] > 0 ){\n\t\t\t\tplate_list.push(c);\n\t\t\t\t// iterate over neighbors\n\t\t\t\tfor (var i = 0; i < ns.length; i++) {\n\t\t\t\t\tvar n  = ns[i];\n\t\t\t\t\tvar nx = x+n[0];\n\t\t\t\t\tvar ny = y+n[1];\n\t\t\t\t\t// ignore out of bounds and previously seen cells\n\t\t\t\t\tif( nx > 0 && \n\t\t\t\t\t\t\tnx < map.length && \n\t\t\t\t\t\t\tny > 0 && \n\t\t\t\t\t\t\tny < map[0].length && \n\t\t\t\t\t\t\t!seen[nx][ny]){\n\t\t\t\t\t\tstack.push([nx, ny])\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn plate_list;\n\t}\n\treturn plates;\n}\n\nfunction clearSmallPlates(map, plates, min_size){\n\tvar new_list = [];\n\t// Clear groups under the min size\n\tfor (var i = 0; i < plates.length; i++) {\n\t\tvar p = plates[i];\n\t\tif (p.length < min_size){\n\t\t\tfor (var j = 0; j < p.length; j++) {\n\t\t\t\tvar c = p[j];\n\t\t\t\tvar x = c[0];\n\t\t\t\tvar y = c[1];\n\t\t\t\tmap[x][y] = 0;\n\t\t\t}\n\t\t} else {\n\t\t\tnew_list.push(p);\n\t\t}\n\t}\n\treturn new_list;\n}\n\n// ** Main Simulation *****\nfunction simulate_movement(map, plates, plate_dirs, time_steps){\n\tvar world_list = [];\n\tvar world  = copy2d(map);\n\tvar groups = []   // collection of collided groups of plates\n\tvar free_plates = [...Array(plates.length).keys()];\n\tvar stale_list  = Array(plates.length).fill(false);\n\tfor (var t = 0; t < time_steps; t++){\t\t\n\t\t// update free plates\n\t\tfor (var f = 0; f < free_plates.length; f++) {\n\t\t\tif(!stale_list[f]){\n\t\t\t\tvar collided = false;\n\t\t\t\tvar p_idx = free_plates[f];\n\t\t\t\tvar plate = plates[p_idx];\n\t\t\t\tvar dir   = plate_dirs[p_idx];\n\t\t\t\tfor (var c = 0; c < plate.length; c++) {\n\t\t\t\t\tvar cell = plate[c];\n\t\t\t\t\tvar nx   = modadd(cell[0], dir[0], map.length);\n\t\t\t\t\tvar ny   = modadd(cell[1], dir[1], map[0].length);\n\t\t\t\t\t\n\t\t\t\t\t// check all other free plates\n\t\t\t\t\tvar colliding_plate = check_free_plates(plates, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfree_plates,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tstale_list, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tp_idx, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tnx, ny);\n\t\t\t\t\tif(colliding_plate > -1){\n\t\t\t\t\t\t// combine and create new group, remove them from list\n\t\t\t\t\t\t// then break the for loop.\n\t\t\t\t\t\tvar n_group = combine_plates(plates, \n\t\t\t\t\t\t\t\t\t\t\t\t\tplate_dirs, \n\t\t\t\t\t\t\t\t\t\t\t\t\tp_idx, \n\t\t\t\t\t\t\t\t\t\t\t\t\tcolliding_plate);\n\t\t\t\t\t\tgroups.push(n_group);\n\n\t\t\t\t\t\t// make the current plate and coliding plate stale.\n\t\t\t\t\t\tstale_list[f] = true;\n\t\t\t\t\t\tstale_list[colliding_plate] = true;\n\t\t\t\t\t\tcollided = true;\n\t\t\t\t\t\tbreak;\t\n\t\t\t\t\t}\n\t\t\t\t\t// check the groups\n \t\t\t\t\tvar colliding_group = check_groups(groups, -1, nx, ny);\t\n \t\t\t\t\tif(colliding_group > -1){\n \t\t\t\t\t\t// there's a collision, add plate to group, remove from list, break.\n \t\t\t\t\t\tadd_plate_to_group(plates, p_idx, groups[colliding_group]);\n \t\t\t\t\t\tstale_list[f] = true;\n\t\t\t\t\t\tcollided = true; \n\t\t\t\t\t\tbreak;\n \t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tif(!collided){ \n\t\t\t\t\tmove_plate(world, plate, dir);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t// update colliding groups\n\t\tfor (var g = 0; g < groups.length; g++) {\n\t\t\tvar group = groups[g];\n\t\t\tif(group == []){\n\t\t\t\t// Can happen because we're slicing the array when we add a group\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\t// assume that group is [[plates...], dir, base_idx, mass?] for now.\n\t\t\tvar g_plates = group[0];\n\t\t\tvar g_dir    = group[1];\n\t\t\tfor (var p = 0; p < g_plates.length; p++) {\n\t\t\t\tvar plate = g_plates[p];\n\t\t\t\tfor (var c = 0; c < plate.length; c++) {\n\t\t\t\t\tvar cell = plate[c];\n\n\t\t\t\t\tvar nx   = modadd(cell[0], dir[0], map.length);\n\t\t\t\t\tvar ny   = modadd(cell[1], dir[1], map[0].length);\n\t\t\t\t\t\n\t\t\t\t\t// check all other free plates\n\t\t\t\t\tvar colliding_plate = check_free_plates(plates, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfree_plates,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tstale_list, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t-1, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tnx, ny);\n\t\t\t\t\tif(colliding_plate > -1){\n\t\t\t\t\t\t// combine and create new group, remove them from list, \n\t\t\t\t\t\t// then break the for loop.\n\t\t\t\t\t\tadd_plate_to_group(plates, colliding_plate, group); \n\n\t\t\t\t\t\t// removing the index from the free list\n\t\t\t\t\t\tstale_list[colliding_plate] = true;\n\t\t\t\t\t\tcollided = true;\n\t\t\t\t\t\tbreak;\t\n\t\t\t\t\t}\n\t\t\t\t\t// check the groups\n \t\t\t\t\tvar colliding_group = check_groups(groups, g, nx, ny);\t\n \t\t\t\t\tif(colliding_group > -1){\n \t\t\t\t\t\t// collision between two groups, combine them.\n \t\t\t\t\t\tcombine_groups(groups, colliding_group, g);\n \t\t\t\t\t\t// TODO - track stale groups? blarg.\n\t\t\t\t\t\tgroups.splice(colliding_group, 1);\n\t\t\t\t\t\tcollided = true; \n\t\t\t\t\t\tbreak;\n \t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tif(collided){\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t\tresolve_tectonics(world, group);\n\t\t\tmove_group(world, group);\n\t\t}\n\t\tvar w = copy2d(world);\n\t\tworld_list.push(w);\n\t}\n\treturn world_list;\n}\n\n// ** MovementSimulation Helper Methods\nfunction check_free_plates(plates, free_plates, stale_list, i_idx, nx, ny){\n\t// check all of the plates for collisions with x/y\n\t// ignore the plate at index i_idx. if i_idx is -1, look at all of them. ''ignore' index\n\tfor (var p = 0; p < free_plates.length; p++) {\n\t\tvar p_idx = free_plates[p];\n\t\tif(p_idx != i_idx && !stale_list[p]){\n\t\t\tvar plate = plates[p_idx];\n\t\t\tfor (var c = 0; c < plate.length; c++) {\n\t\t\t\tvar cell = plate[c];\n\t\t\t\tif (cell[0] == nx && cell[1] == ny) {\n\t\t\t\t\treturn p;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\treturn -1;\n}\n\nfunction check_groups(groups, g_idx, nx, ny){\n\tfor (var g = 0; g < groups.length; g++) {\n\t\tif(g != g_idx){\n\t\t\tvar group = groups[g];\n\t\t\tvar plates = group[0]; // plate list is first element.\n\t\t\tfor (var p = 0; p < plates.length; p++) {\n\t\t\t\tvar plate = plates[p];\n\t\t\t\tfor (var c = 0; c < plate.length; c++) {\n\t\t\t\t\tvar cell = plate[c];\n\t\t\t\t\tif (cell[0] == nx && cell[1] == ny) {\n\t\t\t\t\t\treturn g;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t}\n\t}\n\treturn -1;\n}\n\nfunction combine_plates(plates, plate_dirs, p_idx, c_idx){\n\tconsole.log(\"combining plates\");\n\tvar ps = [plates[p_idx], plates[c_idx]];\n\treturn [ps, plate_dirs[p_idx]]; // new group \n}\n\n// TODO - this is broken. One group stays still and the other\n//        keeps on truckin'.\nfunction combine_groups(groups, g_a, g_b){\n\tconsole.log(\"combining groups\");\n\tvar group_a = groups[g_a];\n\tvar group_b = groups[g_b];\n\tfor (var i = 0; i < group_b[0].length; i++) {\n\t\tgroup_a[0].push(group_b[0][i]);\n\t}\n\tgroup_b = [];\n}\n\nfunction add_plate_to_group(plates, c_idx, group){\n\tconsole.log(\"adding plate to group\");\n\tgroup[0].push(plates[c_idx]);\n}\n\nfunction move_plate(map, plate, dir){\n\tvar map_copy = copy2d(map);\n\tfor (var c = 0; c < plate.length; c++) {\n\t\tvar cell = plate[c];\n\t\tmap[cell[0]][cell[1]] = 0.0;\n\t}\n\tfor (var c = 0; c < plate.length; c++) { \n\t\tvar cell = plate[c];\n\t\tvar nx   = modadd(cell[0], dir[0], map.length);\n\t\tvar ny   = modadd(cell[1], dir[1], map[0].length);\n\t\tmap[nx][ny] = map_copy[cell[0]][cell[1]];\n\t\tplate[c] = [nx, ny];\n\t}\n}\n\nfunction move_group(map, group){\n\tvar plates = group[0];\n\tvar dir = group[1];    \n\tfor (var p = 0; p < plates.length; p++) {\n\t\tvar plate = plates[p];\n\t\tmove_plate(map, plate, dir);\n\t}\n}\n\n// Tectonics Method\nfunction resolve_tectonics(map, group){\n\t// need more information in the group. \n\t// need a 'stress map'. each location is \n\t// the stress of that cell. naieve: just \n\t// carry an array of the whole map.\n\t// have a value where it needs to be.\n}\n\n\n// ** Helper methods *****\nfunction copy2d(arr){\n\tvar ret = new Array();\n\tfor (var i = 0; i < arr.length; i++) {\n\t\tret[i] = new Array();\n\t\tfor (var j = 0; j < arr[0].length; j++) {\n\t\t\tret[i][j] = arr[i][j];\n\t\t}\n\t}\n\treturn ret;\n}\n\nfunction modadd(a, b, m){\n\t// because javascript gives you remainder, not modulus\n\tvar c = a + b;\n\tif(c < 0){\n\t\treturn m+c;\n\t}\n\tif(c >= m){\n\t\treturn c-m;\n\t}\n\treturn a+b;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Tectonics);\n\n//# sourceURL=webpack:///./src/lib/Tectonics.js?");

/***/ }),

/***/ "./src/tectonics.js":
/*!**************************!*\
  !*** ./src/tectonics.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_Tectonics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/Tectonics.js */ \"./src/lib/Tectonics.js\");\n/* harmony import */ var _lib_Helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/Helper.js */ \"./src/lib/Helper.js\");\n\n\n\nvar initial_size    = 15;\nvar initial_octaves = 3;\nvar initial_hue     = 115; // light blue\nvar initial_freq    = 2.6;\nvar initial_thresh  = 0.6;\nvar initial_platesize = 50;\n\nvar button_gen      = document.getElementById(\"generate\");\nvar field_size      = document.getElementById(\"cellsize\");\nvar field_octaves   = document.getElementById(\"octaves\");\nvar field_freq      = document.getElementById(\"freq\");\nvar field_platesize = document.getElementById(\"platesize\");\nvar field_hue       = document.getElementById(\"hue\");\nvar field_seed      = document.getElementById(\"seed\");\nvar field_thresh    = document.getElementById(\"thresh\");\nvar box_random      = document.getElementById(\"random\");\nvar cvs             = document.getElementById(\"cvs\");\nbox_random.checked  = true;\n\nvar t = new _lib_Tectonics_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar map_list = t.generate(cvs, initial_size, \n                               initial_octaves, \n                               initial_freq, \n                               initial_thresh, \n                               initial_platesize,\n                               initial_hue, \"\", true);\n\nvar h = new _lib_Helper_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nh.attach_map_animation(cvs, map_list, initial_size, initial_hue, initial_thresh);\n\nbutton_gen.addEventListener(\"click\", generateClickListener);\nfunction generateClickListener(){\n\tvar size      = field_size.value*1.0;\n  var octaves   = field_octaves.value*1.0;\n  var hue       = field_hsaue.value*1.0;\n  var freq      = field_freq.value*1.0;\n  var thresh    = field_thresh.value*1.0;\n  var platesize = field_platesize.value*1.0;\n  var seed      = field_seed.value;\n  var rand      = box_random.checked;\n\n  if(seed == \"\") {seed = \" \";}; // the noise libs constructor is weird?     \n  map_list =  t.generate(cvs, size, octaves, freq, thresh, platesize, hue, seed, rand);\n  h.attach_map_animation(cvs, map_list, size, hue, thresh);\n}\n\n\n\n\n//# sourceURL=webpack:///./src/tectonics.js?");

/***/ })

/******/ });