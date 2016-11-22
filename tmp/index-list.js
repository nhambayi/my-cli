/******/ (function(modules) { // webpackBootstrap
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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const TemplateStore_1 = __webpack_require__(58);
	const TemplateStoreConfiguration_1 = __webpack_require__(60);
	const FileStore_1 = __webpack_require__(61);
	const Logger_1 = __webpack_require__(62);
	console.log("Listing...");
	const config = new TemplateStoreConfiguration_1.TemplateStoreConfiguration();
	config.templateRootFolder = "root";
	config.templateIndexPath = "root/index.json";
	const fileStore = new FileStore_1.FileStore();
	const logger = new Logger_1.Logger();
	const store = new TemplateStore_1.TemplateStore(config, fileStore, logger);
	store.initialize();


/***/ },

/***/ 1:
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const Constants_1 = __webpack_require__(59);
	class TemplateStore {
	    constructor(config, fileStore, logger) {
	        this.configuration = config;
	        this.fileStore = fileStore;
	        this.logger = logger;
	    }
	    initialize() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return new Promise((resolve, reject) => {
	                if (!this.fileStore.fileExists(this.configuration.templateRootFolder)) {
	                    this.createRootFolder().then(() => {
	                        if (!this.fileStore.fileExists(`${this.configuration.templateRootFolder}/${Constants_1.INDEX_FILE_NAME}`)) {
	                            this.initiializeTemplateIndex().then(() => {
	                                resolve();
	                            });
	                        }
	                    });
	                }
	                if (!this.fileStore.fileExists(`${this.configuration.templateRootFolder}/${Constants_1.INDEX_FILE_NAME}`)) {
	                    this.initiializeTemplateIndex().then(() => {
	                        resolve();
	                    });
	                }
	            });
	        });
	    }
	    add() {
	    }
	    update() {
	    }
	    remove() {
	    }
	    find() {
	    }
	    getAll() {
	    }
	    load() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return new Promise((resolve, reject) => {
	                this.fileStore.loadFile(this.configuration.templateIndexPath, (result, err) => {
	                    if (err) {
	                        reject(err);
	                    }
	                    else {
	                        resolve(result);
	                    }
	                });
	            });
	        });
	    }
	    createRootFolder() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return new Promise((resolve, reject) => {
	                this.fileStore.createFolder(this.configuration.templateRootFolder, (result, err) => {
	                    if (err) {
	                        reject(err);
	                    }
	                    else {
	                        resolve();
	                    }
	                });
	            });
	        });
	    }
	    initiializeTemplateIndex() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return new Promise((resolve, reject) => {
	                let template = "";
	                this.fileStore.saveFile(this.configuration.templateIndexPath, template, (result, err) => {
	                    if (err) {
	                        reject(err);
	                    }
	                    else {
	                        resolve();
	                    }
	                });
	            });
	        });
	    }
	}
	exports.TemplateStore = TemplateStore;


/***/ },

/***/ 59:
/***/ function(module, exports) {

	"use strict";
	exports.INDEX_FILE_NAME = "templateindex.json";


/***/ },

/***/ 60:
/***/ function(module, exports) {

	"use strict";
	class TemplateStoreConfiguration {
	}
	exports.TemplateStoreConfiguration = TemplateStoreConfiguration;


/***/ },

/***/ 61:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const fs = __webpack_require__(1);
	class FileStore {
	    loadFile(path, callback) {
	        fs.readFile(path, "utf8", (data, err) => {
	            callback(err, data);
	        });
	    }
	    saveFile(path, content, callback) {
	        fs.watchFile(path, content, (err) => {
	            callback(false, err);
	        });
	    }
	    createFolder(path, callback) {
	        fs.mkdir(path, (err) => {
	            callback(false, err);
	        });
	    }
	    deleteFile(path, callback) {
	        callback(false, "not implemented");
	    }
	    fileExists(path) {
	        let exists = fs.existsSync(path);
	        return exists;
	    }
	}
	exports.FileStore = FileStore;


/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const chalk = __webpack_require__(63);
	class Logger {
	    log(message) {
	        console.log(message);
	    }
	    warn(message) {
	        console.log(chalk.yellow(message));
	    }
	    error(message) {
	        console.log(chalk.red(message));
	    }
	}
	exports.Logger = Logger;


/***/ },

/***/ 63:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var escapeStringRegexp = __webpack_require__(64);
	var ansiStyles = __webpack_require__(65);
	var stripAnsi = __webpack_require__(67);
	var hasAnsi = __webpack_require__(69);
	var supportsColor = __webpack_require__(70);
	var defineProps = Object.defineProperties;
	var isSimpleWindowsTerm = process.platform === 'win32' && !/^xterm/i.test(process.env.TERM);
	
	function Chalk(options) {
		// detect mode if not set manually
		this.enabled = !options || options.enabled === undefined ? supportsColor : options.enabled;
	}
	
	// use bright blue on Windows as the normal blue color is illegible
	if (isSimpleWindowsTerm) {
		ansiStyles.blue.open = '\u001b[94m';
	}
	
	var styles = (function () {
		var ret = {};
	
		Object.keys(ansiStyles).forEach(function (key) {
			ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');
	
			ret[key] = {
				get: function () {
					return build.call(this, this._styles.concat(key));
				}
			};
		});
	
		return ret;
	})();
	
	var proto = defineProps(function chalk() {}, styles);
	
	function build(_styles) {
		var builder = function () {
			return applyStyle.apply(builder, arguments);
		};
	
		builder._styles = _styles;
		builder.enabled = this.enabled;
		// __proto__ is used because we must return a function, but there is
		// no way to create a function with a different prototype.
		/* eslint-disable no-proto */
		builder.__proto__ = proto;
	
		return builder;
	}
	
	function applyStyle() {
		// support varags, but simply cast to string in case there's only one arg
		var args = arguments;
		var argsLen = args.length;
		var str = argsLen !== 0 && String(arguments[0]);
	
		if (argsLen > 1) {
			// don't slice `arguments`, it prevents v8 optimizations
			for (var a = 1; a < argsLen; a++) {
				str += ' ' + args[a];
			}
		}
	
		if (!this.enabled || !str) {
			return str;
		}
	
		var nestedStyles = this._styles;
		var i = nestedStyles.length;
	
		// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
		// see https://github.com/chalk/chalk/issues/58
		// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
		var originalDim = ansiStyles.dim.open;
		if (isSimpleWindowsTerm && (nestedStyles.indexOf('gray') !== -1 || nestedStyles.indexOf('grey') !== -1)) {
			ansiStyles.dim.open = '';
		}
	
		while (i--) {
			var code = ansiStyles[nestedStyles[i]];
	
			// Replace any instances already present with a re-opening code
			// otherwise only the part of the string until said closing code
			// will be colored, and the rest will simply be 'plain'.
			str = code.open + str.replace(code.closeRe, code.open) + code.close;
		}
	
		// Reset the original 'dim' if we changed it to work around the Windows dimmed gray issue.
		ansiStyles.dim.open = originalDim;
	
		return str;
	}
	
	function init() {
		var ret = {};
	
		Object.keys(styles).forEach(function (name) {
			ret[name] = {
				get: function () {
					return build.call(this, [name]);
				}
			};
		});
	
		return ret;
	}
	
	defineProps(Chalk.prototype, init());
	
	module.exports = new Chalk();
	module.exports.styles = ansiStyles;
	module.exports.hasColor = hasAnsi;
	module.exports.stripColor = stripAnsi;
	module.exports.supportsColor = supportsColor;


/***/ },

/***/ 64:
/***/ function(module, exports) {

	'use strict';
	
	var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
	
	module.exports = function (str) {
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}
	
		return str.replace(matchOperatorsRe, '\\$&');
	};


/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';
	
	function assembleStyles () {
		var styles = {
			modifiers: {
				reset: [0, 0],
				bold: [1, 22], // 21 isn't widely supported and 22 does the same thing
				dim: [2, 22],
				italic: [3, 23],
				underline: [4, 24],
				inverse: [7, 27],
				hidden: [8, 28],
				strikethrough: [9, 29]
			},
			colors: {
				black: [30, 39],
				red: [31, 39],
				green: [32, 39],
				yellow: [33, 39],
				blue: [34, 39],
				magenta: [35, 39],
				cyan: [36, 39],
				white: [37, 39],
				gray: [90, 39]
			},
			bgColors: {
				bgBlack: [40, 49],
				bgRed: [41, 49],
				bgGreen: [42, 49],
				bgYellow: [43, 49],
				bgBlue: [44, 49],
				bgMagenta: [45, 49],
				bgCyan: [46, 49],
				bgWhite: [47, 49]
			}
		};
	
		// fix humans
		styles.colors.grey = styles.colors.gray;
	
		Object.keys(styles).forEach(function (groupName) {
			var group = styles[groupName];
	
			Object.keys(group).forEach(function (styleName) {
				var style = group[styleName];
	
				styles[styleName] = group[styleName] = {
					open: '\u001b[' + style[0] + 'm',
					close: '\u001b[' + style[1] + 'm'
				};
			});
	
			Object.defineProperty(styles, groupName, {
				value: group,
				enumerable: false
			});
		});
	
		return styles;
	}
	
	Object.defineProperty(module, 'exports', {
		enumerable: true,
		get: assembleStyles
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(66)(module)))

/***/ },

/***/ 66:
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(68)();
	
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};


/***/ },

/***/ 68:
/***/ function(module, exports) {

	'use strict';
	module.exports = function () {
		return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
	};


/***/ },

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(68);
	var re = new RegExp(ansiRegex().source); // remove the `g` flag
	module.exports = re.test.bind(re);


/***/ },

/***/ 70:
/***/ function(module, exports) {

	'use strict';
	var argv = process.argv;
	
	var terminator = argv.indexOf('--');
	var hasFlag = function (flag) {
		flag = '--' + flag;
		var pos = argv.indexOf(flag);
		return pos !== -1 && (terminator !== -1 ? pos < terminator : true);
	};
	
	module.exports = (function () {
		if ('FORCE_COLOR' in process.env) {
			return true;
		}
	
		if (hasFlag('no-color') ||
			hasFlag('no-colors') ||
			hasFlag('color=false')) {
			return false;
		}
	
		if (hasFlag('color') ||
			hasFlag('colors') ||
			hasFlag('color=true') ||
			hasFlag('color=always')) {
			return true;
		}
	
		if (process.stdout && !process.stdout.isTTY) {
			return false;
		}
	
		if (process.platform === 'win32') {
			return true;
		}
	
		if ('COLORTERM' in process.env) {
			return true;
		}
	
		if (process.env.TERM === 'dumb') {
			return false;
		}
	
		if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
			return true;
		}
	
		return false;
	})();


/***/ }

/******/ });
//# sourceMappingURL=index-list.js.map