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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const TemplateStore_1 = __webpack_require__(1);
	const TemplateStoreConfiguration_1 = __webpack_require__(2);
	const FileStore_1 = __webpack_require__(4);
	const Logger_1 = __webpack_require__(6);
	const ListCommand_1 = __webpack_require__(84);
	const DiskDbTemplateIndex_1 = __webpack_require__(15);
	const Constants_1 = __webpack_require__(3);
	const config = new TemplateStoreConfiguration_1.TemplateStoreConfiguration();
	const fileStore = new FileStore_1.FileStore();
	const logger = new Logger_1.Logger();
	const templateIndex = new DiskDbTemplateIndex_1.DiskDbTemplateIndex(config.templateIndexPath, Constants_1.TEMPLATES_COLLECTION_NAME);
	const store = new TemplateStore_1.TemplateStore(templateIndex, config, fileStore, logger);
	const command = new ListCommand_1.ListCommand(store);
	command.execute();


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	class TemplateStore {
	    constructor(templateIndex, configuration, fileStore, logger) {
	        this.templateIndex = templateIndex;
	        this.configuration = configuration;
	        this.fileStore = fileStore;
	        this.logger = logger;
	    }
	    initialize() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return new Promise((resolve, reject) => {
	                if (!this.fileStore.fileExists(this.configuration.templateRootFolder)) {
	                    this.createFolder(this.configuration.templateRootFolder).then(() => {
	                        this.initiializeTemplateIndex().then(() => {
	                            resolve();
	                        }).catch((err) => { console.log(err); });
	                    }).catch((err) => { console.log(err); });
	                }
	                this.initiializeTemplateIndex().then(() => {
	                    resolve();
	                }).catch((err) => { console.log(err); });
	            });
	        });
	    }
	    add(template) {
	        this.templateIndex.add(template);
	    }
	    update() {
	    }
	    remove() {
	    }
	    find() {
	        return null;
	    }
	    getAll() {
	        return this.templateIndex.getAll();
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
	    createFolder(path) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return new Promise((resolve, reject) => {
	                this.fileStore.createFolder(path, (result, err) => {
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
	                if (!this.fileStore.fileExists(this.configuration.templateIndexPath)) {
	                    this.createFolder(this.configuration.templateIndexPath).then(() => {
	                        this.templateIndex.connect();
	                        resolve();
	                    });
	                }
	                else {
	                    this.templateIndex.connect();
	                    resolve();
	                }
	            });
	        });
	    }
	}
	exports.TemplateStore = TemplateStore;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Constants_1 = __webpack_require__(3);
	class TemplateStoreConfiguration {
	    constructor() {
	        this.initialize();
	    }
	    initialize() {
	        this.userHomeDirectory = this.getUserHome();
	        this.templateRootFolder = `${this.userHomeDirectory}/${Constants_1.ROOT_FOLDER_NAME}`;
	        this.templateIndexPath = `${this.templateRootFolder}/${Constants_1.INDEX_FOLDER_NAME}`;
	    }
	    getUserHome() {
	        return process.env.HOME || process.env.USERPROFILE;
	    }
	}
	exports.TemplateStoreConfiguration = TemplateStoreConfiguration;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	exports.INDEX_FOLDER_NAME = "templateindex";
	exports.TEMPLATES_COLLECTION_NAME = "templates";
	exports.ROOT_FOLDER_NAME = ".my-templates";


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const fs = __webpack_require__(5);
	class FileStore {
	    loadFile(path, callback) {
	        fs.readFile(path, "utf8", (data, err) => {
	            callback(err, data);
	        });
	    }
	    saveFile(path, content, callback) {
	        fs.writeFile(path, content, (err) => {
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
/* 5 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const chalk = __webpack_require__(7);
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var escapeStringRegexp = __webpack_require__(8);
	var ansiStyles = __webpack_require__(9);
	var stripAnsi = __webpack_require__(11);
	var hasAnsi = __webpack_require__(13);
	var supportsColor = __webpack_require__(14);
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
/* 8 */
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
/* 9 */
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module)))

/***/ },
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(12)();
	
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function () {
		return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(12);
	var re = new RegExp(ansiRegex().source); // remove the `g` flag
	module.exports = re.test.bind(re);


/***/ },
/* 14 */
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


/***/ },
/* 15 */
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
	const db = __webpack_require__(16);
	class DiskDbTemplateIndex {
	    constructor(pathToStore, templateCollectionName) {
	        this.pathToStore = pathToStore;
	        this.templateCollectionName = templateCollectionName;
	        this.isConnected = false;
	    }
	    connect() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return new Promise((resolve, reject) => {
	                this.database = db.connect(this.pathToStore);
	                this.database.loadCollections([this.templateCollectionName]);
	                this.templateCollection = this.database[this.templateCollectionName];
	                resolve();
	            });
	        });
	    }
	    add(template) {
	        this.templateCollection.save(template);
	    }
	    getAll() {
	        return this.templateCollection.find();
	    }
	}
	exports.DiskDbTemplateIndex = DiskDbTemplateIndex;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * diskDB
	 * http://arvindr21.github.io/diskDB
	 *
	 * Copyright (c) 2014 Arvind Ravulavaru
	 * Licensed under the MIT license.
	 */
	
	'use strict';
	//global modules
	var path = __webpack_require__(17),
	    c = __webpack_require__(18),
	    e = c.red,
	    s = c.green;
	
	//local modules
	var util = __webpack_require__(22);
	
	
	var db = {
	    connect: function(path, collections) {
	        if (util.isValidPath(path)) {
	            var _db = {};
	            _db.path = path;
	            this._db = _db;
	            console.log(s('Successfully connected to : ' + path));
	            if (collections) {
	                this.loadCollections(collections);
	            }
	        } else {
	            console.log(e('The DB Path [' + path + '] does not seem to be valid. Recheck the path and try again'));
	            return false;
	        }
	        return this;
	    },
	    loadCollections: function(collections) {
	        if (!this._db) {
	            console.log(e('Initialize the DB before you add collections. Use : ', 'db.connect(\'path-to-db\');'));
	            return false;
	        }
	        if (typeof collections === 'object' && collections.length) {
	            for (var i = 0; i < collections.length; i++) {
	                var p = path.join(this._db.path, (collections[i].indexOf('.json') >= 0 ? collections[i] : collections[i] + '.json'));
	                if (!util.isValidPath(p)) {
	                    util.writeToFile(p);
	                }
	                var _c = collections[i].replace('.json', '');
	                this[_c] = new __webpack_require__(24)('./collection')(this, _c);
	            }
	        } else {
	            console.log(e('Invalid Collections Array.', 'Expected Format : ', '[\'collection1\',\'collection2\',\'collection3\']'));
	        }
	        return this;
	    }
	
	};
	
	module.exports = db;


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansi = __webpack_require__(19);
	var stripAnsi = __webpack_require__(20);
	var hasColor = __webpack_require__(21);
	var defineProps = Object.defineProperties;
	var chalk = module.exports;
	
	var styles = (function () {
		var ret = {};
	
		ansi.grey = ansi.gray;
	
		Object.keys(ansi).forEach(function (key) {
			ret[key] = {
				get: function () {
					this._styles.push(key);
					return this;
				}
			};
		});
	
		return ret;
	})();
	
	function init() {
		var ret = {};
	
		Object.keys(styles).forEach(function (name) {
			ret[name] = {
				get: function () {
					var obj = defineProps(function self() {
						var str = [].slice.call(arguments).join(' ');
	
						if (!chalk.enabled) {
							return str;
						}
	
						return self._styles.reduce(function (str, name) {
							var code = ansi[name];
							return str ? code.open + str + code.close : '';
						}, str);
					}, styles);
	
					obj._styles = [];
	
					return obj[name];
				}
			}
		});
	
		return ret;
	}
	
	defineProps(chalk, init());
	
	chalk.styles = ansi;
	chalk.stripColor = stripAnsi;
	chalk.supportsColor = hasColor;
	
	// detect mode if not set manually
	if (chalk.enabled === undefined) {
		chalk.enabled = chalk.supportsColor;
	}


/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	var styles = module.exports;
	
	var codes = {
		reset: [0, 0],
	
		bold: [1, 22],
		italic: [3, 23],
		underline: [4, 24],
		inverse: [7, 27],
		strikethrough: [9, 29],
	
		black: [30, 39],
		red: [31, 39],
		green: [32, 39],
		yellow: [33, 39],
		blue: [34, 39],
		magenta: [35, 39],
		cyan: [36, 39],
		white: [37, 39],
		gray: [90, 39],
	
		bgBlack: [40, 49],
		bgRed: [41, 49],
		bgGreen: [42, 49],
		bgYellow: [43, 49],
		bgBlue: [44, 49],
		bgMagenta: [45, 49],
		bgCyan: [46, 49],
		bgWhite: [47, 49]
	};
	
	Object.keys(codes).forEach(function (key) {
		var val = codes[key];
		var style = styles[key] = {};
		style.open = '\x1b[' + val[0] + 'm';
		style.close = '\x1b[' + val[1] + 'm';
	});


/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, '') : str;
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	module.exports = (function () {
		if (process.argv.indexOf('--no-color') !== -1) {
			return false;
		}
	
		if (process.argv.indexOf('--color') !== -1) {
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


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * diskDB
	 * http://arvindr21.github.io/diskDB
	 *
	 * Copyright (c) 2014 Arvind Ravulavaru
	 * Licensed under the MIT license.
	 */
	
	/*jshint -W027*/
	var fs = __webpack_require__(5);
	var merge = __webpack_require__(23);
	var util = {};
	
	util.isValidPath = function(path) {
	    return fs.existsSync(path);
	};
	
	util.writeToFile = function(outputFilename, content) {
	    if (!content) {
	        content = [];
	    }
	    fs.writeFileSync(outputFilename, JSON.stringify(content, null, 0));
	};
	
	util.readFromFile = function(file) {
	    return fs.readFileSync(file, 'utf-8');
	};
	
	util.removeFile = function(file) {
	    return fs.unlinkSync(file);
	};
	
	util.updateFiltered = function(collection, query, data, multi) {
	    // break 2 loops at once - multi : false
	    loop: for (var i = collection.length - 1; i >= 0; i--) {
	        var c = collection[i];
	        for (var p in query) {
	            if (p in c && c[p] == query[p]) {
	                collection[i] = merge(c, data);
	                if (!multi) {
	                    break loop;
	                }
	            }
	        }
	    }
	    return collection;
	};
	
	// [TODO] : Performance
	util.removeFiltered = function(collection, query, multi) {
	    // break 2 loops at once -  multi : false
	    loop: for (var i = collection.length - 1; i >= 0; i--) {
	        var c = collection[i];
	        for (var p in query) {
	            if (p in c && c[p] == query[p]) {
	                collection.splice(i, 1);
	                if (!multi) {
	                    break loop;
	                }
	            }
	        }
	    }
	    return collection;
	};
	
	// [TODO] : Performance
	util.finder = function(collection, query, multi) {
	    var retCollection = [];
	    loop: for (var i = collection.length - 1; i >= 0; i--) {
	        var c = collection[i];
	        for (var p in query) {
	            if (p in c && c[p] == query[p]) {
	                retCollection.push(collection[i]);
	                if (!multi) {
	                    break loop;
	                }
	            }
	        }
	    }
	    return retCollection;
	};
	
	/** recursive finder **/
	util.ObjectSearcher = function() {
	    this.results = [];
	    this.objects = [];
	    this.resultIDS = {};
	};
	
	util.ObjectSearcher.prototype.findAllInObject = function(object, valueOBj, isMulti) {
	    for (var objKey in object) {
	        this.performSearch(object[objKey], valueOBj, object[objKey]);
	        if (!isMulti && this.results.length == 1) {
	            return this.results;
	        }
	    }
	
	    while (this.objects.length !== 0) {
	        var objRef = this.objects.pop();
	        this.performSearch(objRef['_obj'], valueOBj, objRef['parent']);
	        if (!isMulti && this.results.length == 1) {
	            return this.results;
	        }
	    }
	
	    return this.results;
	};
	
	util.ObjectSearcher.prototype.performSearch = function(object, valueOBj, opt_parentObj) {
	  for (var criteria in valueOBj) {
	    var query = {};
	    query[criteria] = valueOBj[criteria];
	    this.searchObject(object, query, opt_parentObj);
	  }
	
	  for (var i = 0; i < this.results.length; i++) {
	    var result = this.results[i];
	    for (var field in valueOBj) {
	      if (result[field] !== undefined) {
	        if (result[field] !== valueOBj[field]) {
	          this.results.splice(i, 1);
	        }
	      }
	    }
	  }
	};
	
	util.ObjectSearcher.prototype.searchObject = function(object, valueOBj, opt_parentObj) {
	    for (var objKey in object) {
	        if (typeof object[objKey] != 'object') {
	            if (valueOBj[objKey] == object[objKey]) {
	                if (opt_parentObj !== undefined) {
	                    if (this.resultIDS[opt_parentObj['_id']] === undefined) {
	                        this.results.push(opt_parentObj);
	                        this.resultIDS[opt_parentObj['_id']] = '';
	                    }
	                } else {
	                    if (this.resultIDS[object['_id']] === undefined) {
	                        this.results.push(object);
	                        this.resultIDS[object['_id']] = '';
	                    }
	                }
	            }
	        } else {
	            var obj = object;
	            if (opt_parentObj !== undefined) {
	                obj = opt_parentObj;
	            }
	            var objRef = {
	                parent: obj,
	                _obj: object[objKey]
	            };
	
	            this.objects.push(objRef);
	        }
	    }
	};
	
	module.exports = util;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*!
	 * @name JavaScript/NodeJS Merge v1.2.0
	 * @author yeikos
	 * @repository https://github.com/yeikos/js.merge
	
	 * Copyright 2014 yeikos - MIT license
	 * https://raw.github.com/yeikos/js.merge/master/LICENSE
	 */
	
	;(function(isNode) {
	
		/**
		 * Merge one or more objects 
		 * @param bool? clone
		 * @param mixed,... arguments
		 * @return object
		 */
	
		var Public = function(clone) {
	
			return merge(clone === true, false, arguments);
	
		}, publicName = 'merge';
	
		/**
		 * Merge two or more objects recursively 
		 * @param bool? clone
		 * @param mixed,... arguments
		 * @return object
		 */
	
		Public.recursive = function(clone) {
	
			return merge(clone === true, true, arguments);
	
		};
	
		/**
		 * Clone the input removing any reference
		 * @param mixed input
		 * @return mixed
		 */
	
		Public.clone = function(input) {
	
			var output = input,
				type = typeOf(input),
				index, size;
	
			if (type === 'array') {
	
				output = [];
				size = input.length;
	
				for (index=0;index<size;++index)
	
					output[index] = Public.clone(input[index]);
	
			} else if (type === 'object') {
	
				output = {};
	
				for (index in input)
	
					output[index] = Public.clone(input[index]);
	
			}
	
			return output;
	
		};
	
		/**
		 * Merge two objects recursively
		 * @param mixed input
		 * @param mixed extend
		 * @return mixed
		 */
	
		function merge_recursive(base, extend) {
	
			if (typeOf(base) !== 'object')
	
				return extend;
	
			for (var key in extend) {
	
				if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {
	
					base[key] = merge_recursive(base[key], extend[key]);
	
				} else {
	
					base[key] = extend[key];
	
				}
	
			}
	
			return base;
	
		}
	
		/**
		 * Merge two or more objects
		 * @param bool clone
		 * @param bool recursive
		 * @param array argv
		 * @return object
		 */
	
		function merge(clone, recursive, argv) {
	
			var result = argv[0],
				size = argv.length;
	
			if (clone || typeOf(result) !== 'object')
	
				result = {};
	
			for (var index=0;index<size;++index) {
	
				var item = argv[index],
	
					type = typeOf(item);
	
				if (type !== 'object') continue;
	
				for (var key in item) {
	
					var sitem = clone ? Public.clone(item[key]) : item[key];
	
					if (recursive) {
	
						result[key] = merge_recursive(result[key], sitem);
	
					} else {
	
						result[key] = sitem;
	
					}
	
				}
	
			}
	
			return result;
	
		}
	
		/**
		 * Get type of variable
		 * @param mixed input
		 * @return string
		 *
		 * @see http://jsperf.com/typeofvar
		 */
	
		function typeOf(input) {
	
			return ({}).toString.call(input).slice(8, -1).toLowerCase();
	
		}
	
		if (isNode) {
	
			module.exports = Public;
	
		} else {
	
			window[publicName] = Public;
	
		}
	
	})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module)))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./collection": 25,
		"./collection.js": 25,
		"./diskdb": 16,
		"./diskdb.js": 16,
		"./util": 22,
		"./util.js": 22
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 24;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * diskDB
	 * http://arvindr21.github.io/diskDB
	 *
	 * Copyright (c) 2014 Arvind Ravulavaru
	 * Licensed under the MIT license.
	 */
	
	var util = __webpack_require__(22),
	    path = __webpack_require__(17),
	    uuid = __webpack_require__(26);
	
	module.exports = function(db, collectionName) {
	    var coltn = {};
	    coltn.collectionName = collectionName;
	    coltn._f = path.join(db._db.path, (collectionName + '.json'));
	
	    coltn.find = function(query) {
	        var collection = JSON.parse(util.readFromFile(this._f));
	        if (!query || Object.keys(query).length === 0) {
	            return collection;
	        } else {
	            var searcher = new util.ObjectSearcher(); 
	            return searcher.findAllInObject(collection, query, true);
	        }
	    };
	
	    coltn.findOne = function(query) {
	        var collection = JSON.parse(util.readFromFile(this._f));
	        if (!query) {
	            return collection[0];
	        } else {
	            var searcher = new util.ObjectSearcher(); 
	            return searcher.findAllInObject(collection, query, false)[0];
	        }
	    };
	
	    coltn.save = function(data) {
	        var collection = JSON.parse(util.readFromFile(this._f));
	        if (typeof data === 'object' && data.length) {
	            if (data.length === 1) {
	                if (data[0].length > 0) {
	                    data = data[0];
	                }
	            }
	            var retCollection = [];
	            for (var i = data.length - 1; i >= 0; i--) {
	                var d = data[i];
	                d._id = uuid.v4().replace(/-/g, '');
	                collection.push(d);
	                retCollection.push(d);
	            }
	            util.writeToFile(this._f, collection);
	            return retCollection;
	        } {
	            data._id = uuid.v4().replace(/-/g, '');
	            collection.push(data);
	            util.writeToFile(this._f, collection);
	            return data;
	        }
	    };
	
	    coltn.update = function(query, data, options) {
	        var ret = {},
	            collection = JSON.parse(util.readFromFile(this._f)); // update
	        var records = util.finder(collection, query, true);
	        if (records.length) {
	            if (options && options.multi) {
	                collection = util.updateFiltered(collection, query, data, true);
	                ret.updated = records.length;
	                ret.inserted = 0;
	            } else {
	                collection = util.updateFiltered(collection, query, data, false);
	                ret.updated = 1;
	                ret.inserted = 0;
	            }
	        } else {
	            if (options && options.upsert) {
	                data._id = uuid.v4().replace(/-/g, '');
	                collection.push(data);
	                ret.updated = 0;
	                ret.inserted = 1;
	            } else {
	                ret.updated = 0;
	                ret.inserted = 0;
	            }
	        }
	        util.writeToFile(this._f, collection);
	        return ret;
	    };
	
	    coltn.remove = function(query, multi) {
	        if (query) {
	            var collection = JSON.parse(util.readFromFile(this._f));
	            if (typeof multi === 'undefined') {
	                multi = true;
	            }
	            collection = util.removeFiltered(collection, query, multi);
	
	            util.writeToFile(this._f, collection);
	        } else {
	            util.removeFile(this._f);
	            delete db[collectionName];
	        }
	        return true;
	    };
	
	    coltn.count = function() {
	        return (JSON.parse(util.readFromFile(this._f))).length;
	    };
	
	    return coltn;
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php
	
	/*global window, require, define */
	(function(_window) {
	  'use strict';
	
	  // Unique ID creation requires a high quality random # generator.  We feature
	  // detect to determine the best RNG source, normalizing to a function that
	  // returns 128-bits of randomness, since that's what's usually required
	  var _rng, _mathRNG, _nodeRNG, _whatwgRNG, _previousRoot;
	
	  function setupBrowser() {
	    // Allow for MSIE11 msCrypto
	    var _crypto = _window.crypto || _window.msCrypto;
	
	    if (!_rng && _crypto && _crypto.getRandomValues) {
	      // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	      //
	      // Moderately fast, high quality
	      try {
	        var _rnds8 = new Uint8Array(16);
	        _whatwgRNG = _rng = function whatwgRNG() {
	          _crypto.getRandomValues(_rnds8);
	          return _rnds8;
	        };
	        _rng();
	      } catch(e) {}
	    }
	
	    if (!_rng) {
	      // Math.random()-based (RNG)
	      //
	      // If all else fails, use Math.random().  It's fast, but is of unspecified
	      // quality.
	      var  _rnds = new Array(16);
	      _mathRNG = _rng = function() {
	        for (var i = 0, r; i < 16; i++) {
	          if ((i & 0x03) === 0) { r = Math.random() * 0x100000000; }
	          _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	        }
	
	        return _rnds;
	      };
	      if ('undefined' !== typeof console && console.warn) {
	        console.warn("[SECURITY] node-uuid: crypto not usable, falling back to insecure Math.random()");
	      }
	    }
	  }
	
	  function setupNode() {
	    // Node.js crypto-based RNG - http://nodejs.org/docs/v0.6.2/api/crypto.html
	    //
	    // Moderately fast, high quality
	    if (true) {
	      try {
	        var _rb = __webpack_require__(27).randomBytes;
	        _nodeRNG = _rng = _rb && function() {return _rb(16);};
	        _rng();
	      } catch(e) {}
	    }
	  }
	
	  if (_window) {
	    setupBrowser();
	  } else {
	    setupNode();
	  }
	
	  // Buffer class to use
	  var BufferClass = ('function' === typeof Buffer) ? Buffer : Array;
	
	  // Maps for number <-> hex string conversion
	  var _byteToHex = [];
	  var _hexToByte = {};
	  for (var i = 0; i < 256; i++) {
	    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	    _hexToByte[_byteToHex[i]] = i;
	  }
	
	  // **`parse()` - Parse a UUID into it's component bytes**
	  function parse(s, buf, offset) {
	    var i = (buf && offset) || 0, ii = 0;
	
	    buf = buf || [];
	    s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
	      if (ii < 16) { // Don't overflow!
	        buf[i + ii++] = _hexToByte[oct];
	      }
	    });
	
	    // Zero out remaining bytes if string was short
	    while (ii < 16) {
	      buf[i + ii++] = 0;
	    }
	
	    return buf;
	  }
	
	  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	  function unparse(buf, offset) {
	    var i = offset || 0, bth = _byteToHex;
	    return  bth[buf[i++]] + bth[buf[i++]] +
	            bth[buf[i++]] + bth[buf[i++]] + '-' +
	            bth[buf[i++]] + bth[buf[i++]] + '-' +
	            bth[buf[i++]] + bth[buf[i++]] + '-' +
	            bth[buf[i++]] + bth[buf[i++]] + '-' +
	            bth[buf[i++]] + bth[buf[i++]] +
	            bth[buf[i++]] + bth[buf[i++]] +
	            bth[buf[i++]] + bth[buf[i++]];
	  }
	
	  // **`v1()` - Generate time-based UUID**
	  //
	  // Inspired by https://github.com/LiosK/UUID.js
	  // and http://docs.python.org/library/uuid.html
	
	  // random #'s we need to init node and clockseq
	  var _seedBytes = _rng();
	
	  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	  var _nodeId = [
	    _seedBytes[0] | 0x01,
	    _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	  ];
	
	  // Per 4.2.2, randomize (14 bit) clockseq
	  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;
	
	  // Previous uuid creation time
	  var _lastMSecs = 0, _lastNSecs = 0;
	
	  // See https://github.com/broofa/node-uuid for API details
	  function v1(options, buf, offset) {
	    var i = buf && offset || 0;
	    var b = buf || [];
	
	    options = options || {};
	
	    var clockseq = (options.clockseq != null) ? options.clockseq : _clockseq;
	
	    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	    var msecs = (options.msecs != null) ? options.msecs : new Date().getTime();
	
	    // Per 4.2.1.2, use count of uuid's generated during the current clock
	    // cycle to simulate higher resolution clock
	    var nsecs = (options.nsecs != null) ? options.nsecs : _lastNSecs + 1;
	
	    // Time since last uuid creation (in msecs)
	    var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;
	
	    // Per 4.2.1.2, Bump clockseq on clock regression
	    if (dt < 0 && options.clockseq == null) {
	      clockseq = clockseq + 1 & 0x3fff;
	    }
	
	    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	    // time interval
	    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
	      nsecs = 0;
	    }
	
	    // Per 4.2.1.2 Throw error if too many uuids are requested
	    if (nsecs >= 10000) {
	      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	    }
	
	    _lastMSecs = msecs;
	    _lastNSecs = nsecs;
	    _clockseq = clockseq;
	
	    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	    msecs += 12219292800000;
	
	    // `time_low`
	    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	    b[i++] = tl >>> 24 & 0xff;
	    b[i++] = tl >>> 16 & 0xff;
	    b[i++] = tl >>> 8 & 0xff;
	    b[i++] = tl & 0xff;
	
	    // `time_mid`
	    var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	    b[i++] = tmh >>> 8 & 0xff;
	    b[i++] = tmh & 0xff;
	
	    // `time_high_and_version`
	    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	    b[i++] = tmh >>> 16 & 0xff;
	
	    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	    b[i++] = clockseq >>> 8 | 0x80;
	
	    // `clock_seq_low`
	    b[i++] = clockseq & 0xff;
	
	    // `node`
	    var node = options.node || _nodeId;
	    for (var n = 0; n < 6; n++) {
	      b[i + n] = node[n];
	    }
	
	    return buf ? buf : unparse(b);
	  }
	
	  // **`v4()` - Generate random UUID**
	
	  // See https://github.com/broofa/node-uuid for API details
	  function v4(options, buf, offset) {
	    // Deprecated - 'format' argument, as supported in v1.2
	    var i = buf && offset || 0;
	
	    if (typeof(options) === 'string') {
	      buf = (options === 'binary') ? new BufferClass(16) : null;
	      options = null;
	    }
	    options = options || {};
	
	    var rnds = options.random || (options.rng || _rng)();
	
	    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	    rnds[6] = (rnds[6] & 0x0f) | 0x40;
	    rnds[8] = (rnds[8] & 0x3f) | 0x80;
	
	    // Copy bytes to buffer, if provided
	    if (buf) {
	      for (var ii = 0; ii < 16; ii++) {
	        buf[i + ii] = rnds[ii];
	      }
	    }
	
	    return buf || unparse(rnds);
	  }
	
	  // Export public API
	  var uuid = v4;
	  uuid.v1 = v1;
	  uuid.v4 = v4;
	  uuid.parse = parse;
	  uuid.unparse = unparse;
	  uuid.BufferClass = BufferClass;
	  uuid._rng = _rng;
	  uuid._mathRNG = _mathRNG;
	  uuid._nodeRNG = _nodeRNG;
	  uuid._whatwgRNG = _whatwgRNG;
	
	  if (('undefined' !== typeof module) && module.exports) {
	    // Publish as node.js module
	    module.exports = uuid;
	  } else if (true) {
	    // Publish as AMD module
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {return uuid;}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	
	  } else {
	    // Publish as global (in browsers)
	    _previousRoot = _window.uuid;
	
	    // **`noConflict()` - (browser only) to reset global 'uuid' var**
	    uuid.noConflict = function() {
	      _window.uuid = _previousRoot;
	      return uuid;
	    };
	
	    _window.uuid = uuid;
	  }
	})('undefined' !== typeof window ? window : null);


/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 28 */,
/* 29 */,
/* 30 */
/***/ function(module, exports) {

	module.exports = Table
	
	function Table() {
	  this.rows = []
	  this.row = {__printers : {}}
	}
	
	/**
	 * Push the current row to the table and start a new one
	 *
	 * @returns {Table} `this`
	 */
	
	Table.prototype.newRow = function() {
	  this.rows.push(this.row)
	  this.row = {__printers : {}}
	  return this
	}
	
	/**
	 * Write cell in the current row
	 *
	 * @param {String} col          - Column name
	 * @param {Any} val             - Cell value
	 * @param {Function} [printer]  - Printer function to format the value
	 * @returns {Table} `this`
	 */
	
	Table.prototype.cell = function(col, val, printer) {
	  this.row[col] = val
	  this.row.__printers[col] = printer || string
	  return this
	}
	
	/**
	 * String to separate columns
	 */
	
	Table.prototype.separator = '  '
	
	function string(val) {
	  return val === undefined ? '' : ''+val
	}
	
	function length(str) {
	  return str.replace(/\u001b\[\d+m/g, '').length
	}
	
	/**
	 * Default printer
	 */
	
	Table.string = string
	
	/**
	 * Create a printer which right aligns the content by padding with `ch` on the left
	 *
	 * @param {String} ch
	 * @returns {Function}
	 */
	
	Table.leftPadder = leftPadder
	
	function leftPadder(ch) {
	  return function(val, width) {
	    var str = string(val)
	    var len = length(str)
	    var pad = width > len ? Array(width - len + 1).join(ch) : ''
	    return pad + str
	  }
	}
	
	/**
	 * Printer which right aligns the content
	 */
	
	var padLeft = Table.padLeft = leftPadder(' ')
	
	/**
	 * Create a printer which pads with `ch` on the right
	 *
	 * @param {String} ch
	 * @returns {Function}
	 */
	
	Table.rightPadder = rightPadder
	
	function rightPadder(ch) {
	  return function padRight(val, width) {
	    var str = string(val)
	    var len = length(str)
	    var pad = width > len ? Array(width - len + 1).join(ch) : ''
	    return str + pad
	  }
	}
	
	var padRight = rightPadder(' ')
	
	/**
	 * Create a printer for numbers
	 *
	 * Will do right alignment and optionally fix the number of digits after decimal point
	 *
	 * @param {Number} [digits] - Number of digits for fixpoint notation
	 * @returns {Function}
	 */
	
	Table.number = function(digits) {
	  return function(val, width) {
	    if (val == null) return ''
	    if (typeof val != 'number')
	      throw new Error(''+val + ' is not a number')
	    var str = digits == null ? val+'' : val.toFixed(digits)
	    return padLeft(str, width)
	  }
	}
	
	function each(row, fn) {
	  for(var key in row) {
	    if (key == '__printers') continue
	    fn(key, row[key])
	  }
	}
	
	/**
	 * Get list of columns in printing order
	 *
	 * @returns {string[]}
	 */
	
	Table.prototype.columns = function() {
	  var cols = {}
	  for(var i = 0; i < 2; i++) { // do 2 times
	    this.rows.forEach(function(row) {
	      var idx = 0
	      each(row, function(key) {
	        idx = Math.max(idx, cols[key] || 0)
	        cols[key] = idx
	        idx++
	      })
	    })
	  }
	  return Object.keys(cols).sort(function(a, b) {
	    return cols[a] - cols[b]
	  })
	}
	
	/**
	 * Format just rows, i.e. print the table without headers and totals
	 *
	 * @returns {String} String representaion of the table
	 */
	
	Table.prototype.print = function() {
	  var cols = this.columns()
	  var separator = this.separator
	  var widths = {}
	  var out = ''
	
	  // Calc widths
	  this.rows.forEach(function(row) {
	    each(row, function(key, val) {
	      var str = row.__printers[key].call(row, val)
	      widths[key] = Math.max(length(str), widths[key] || 0)
	    })
	  })
	
	  // Now print
	  this.rows.forEach(function(row) {
	    var line = ''
	    cols.forEach(function(key) {
	      var width = widths[key]
	      var str = row.hasOwnProperty(key)
	        ? ''+row.__printers[key].call(row, row[key], width)
	        : ''
	      line += padRight(str, width) + separator
	    })
	    line = line.slice(0, -separator.length)
	    out += line + '\n'
	  })
	
	  return out
	}
	
	/**
	 * Format the table
	 *
	 * @returns {String}
	 */
	
	Table.prototype.toString = function() {
	  var cols = this.columns()
	  var out = new Table()
	
	  // copy options
	  out.separator = this.separator
	
	  // Write header
	  cols.forEach(function(col) {
	    out.cell(col, col)
	  })
	  out.newRow()
	  out.pushDelimeter(cols)
	
	  // Write body
	  out.rows = out.rows.concat(this.rows)
	
	  // Totals
	  if (this.totals && this.rows.length) {
	    out.pushDelimeter(cols)
	    this.forEachTotal(out.cell.bind(out))
	    out.newRow()
	  }
	
	  return out.print()
	}
	
	/**
	 * Push delimeter row to the table (with each cell filled with dashs during printing)
	 *
	 * @param {String[]} [cols]
	 * @returns {Table} `this`
	 */
	
	Table.prototype.pushDelimeter = function(cols) {
	  cols = cols || this.columns()
	  cols.forEach(function(col) {
	    this.cell(col, undefined, leftPadder('-'))
	  }, this)
	  return this.newRow()
	}
	
	/**
	 * Compute all totals and yield the results to `cb`
	 *
	 * @param {Function} cb - Callback function with signature `(column, value, printer)`
	 */
	
	Table.prototype.forEachTotal = function(cb) {
	  for(var key in this.totals) {
	    var aggr = this.totals[key]
	    var acc = aggr.init
	    var len = this.rows.length
	    this.rows.forEach(function(row, idx) {
	      acc = aggr.reduce.call(row, acc, row[key], idx, len)
	    })
	    cb(key, acc, aggr.printer)
	  }
	}
	
	/**
	 * Format the table so that each row represents column and each column represents row
	 *
	 * @param {Object} [opts]
	 * @param {String} [ops.separator] - Column separation string
	 * @param {Function} [opts.namePrinter] - Printer to format column names
	 * @returns {String}
	 */
	
	Table.prototype.printTransposed = function(opts) {
	  opts = opts || {}
	  var out = new Table
	  out.separator = opts.separator || this.separator
	  this.columns().forEach(function(col) {
	    out.cell(0, col, opts.namePrinter)
	    this.rows.forEach(function(row, idx) {
	      out.cell(idx+1, row[col], row.__printers[col])
	    })
	    out.newRow()
	  }, this)
	  return out.print()
	}
	
	/**
	 * Sort the table
	 *
	 * @param {Function|string[]} [cmp] - Either compare function or a list of columns to sort on
	 * @returns {Table} `this`
	 */
	
	Table.prototype.sort = function(cmp) {
	  if (typeof cmp == 'function') {
	    this.rows.sort(cmp)
	    return this
	  }
	
	  var keys = Array.isArray(cmp) ? cmp : this.columns()
	
	  var comparators = keys.map(function(key) {
	    var order = 'asc'
	    var m = /(.*)\|\s*(asc|des)\s*$/.exec(key)
	    if (m) {
	      key = m[1]
	      order = m[2]
	    }
	    return function (a, b) {
	      return order == 'asc'
	        ? compare(a[key], b[key])
	        : compare(b[key], a[key])
	    }
	  })
	
	  return this.sort(function(a, b) {
	    for (var i = 0; i < comparators.length; i++) {
	      var order = comparators[i](a, b)
	      if (order != 0) return order
	    }
	    return 0
	  })
	}
	
	function compare(a, b) {
	  if (a === b) return 0
	  if (a === undefined) return 1
	  if (b === undefined) return -1
	  if (a === null) return 1
	  if (b === null) return -1
	  if (a > b) return 1
	  if (a < b) return -1
	  return compare(String(a), String(b))
	}
	
	/**
	 * Add a total for the column
	 *
	 * @param {String} col - column name
	 * @param {Object} [opts]
	 * @param {Function} [opts.reduce = sum] - reduce(acc, val, idx, length) function to compute the total value
	 * @param {Function} [opts.printer = padLeft] - Printer to format the total cell
	 * @param {Any} [opts.init = 0] - Initial value for reduction
	 * @returns {Table} `this`
	 */
	
	Table.prototype.total = function(col, opts) {
	  opts = opts || {}
	  this.totals = this.totals || {}
	  this.totals[col] = {
	    reduce: opts.reduce || Table.aggr.sum,
	    printer: opts.printer || padLeft,
	    init: opts.init == null ? 0 : opts.init
	  }
	  return this
	}
	
	/**
	 * Predefined helpers for totals
	 */
	
	Table.aggr = {}
	
	/**
	 * Create a printer which formats the value with `printer`,
	 * adds the `prefix` to it and right aligns the whole thing
	 *
	 * @param {String} prefix
	 * @param {Function} printer
	 * @returns {printer}
	 */
	
	Table.aggr.printer = function(prefix, printer) {
	  printer = printer || string
	  return function(val, width) {
	    return padLeft(prefix + printer(val), width)
	  }
	}
	
	/**
	 * Sum reduction
	 */
	
	Table.aggr.sum = function(acc, val) {
	  return acc + val
	}
	
	/**
	 * Average reduction
	 */
	
	Table.aggr.avg = function(acc, val, idx, len) {
	  acc = acc + val
	  return idx + 1 == len ? acc/len : acc
	}
	
	/**
	 * Print the array or object
	 *
	 * @param {Array|Object} obj - Object to print
	 * @param {Function|Object} [format] - Format options
	 * @param {Function} [cb] - Table post processing and formating
	 * @returns {String}
	 */
	
	Table.print = function(obj, format, cb) {
	  var opts = format || {}
	
	  format = typeof format == 'function'
	    ? format
	    : function(obj, cell) {
	      for(var key in obj) {
	        if (!obj.hasOwnProperty(key)) continue
	        var params = opts[key] || {}
	        cell(params.name || key, obj[key], params.printer)
	      }
	    }
	
	  var t = new Table
	  var cell = t.cell.bind(t)
	
	  if (Array.isArray(obj)) {
	    cb = cb || function(t) { return t.toString() }
	    obj.forEach(function(item) {
	      format(item, cell)
	      t.newRow()
	    })
	  } else {
	    cb = cb || function(t) { return t.printTransposed({separator: ' : '}) }
	    format(obj, cell)
	    t.newRow()
	  }
	
	  return cb(t)
	}
	
	/**
	 * Same as `Table.print()` but yields the result to `console.log()`
	 */
	
	Table.log = function(obj, format, cb) {
	  console.log(Table.print(obj, format, cb))
	}
	
	/**
	 * Same as `.toString()` but yields the result to `console.log()`
	 */
	
	Table.prototype.log = function() {
	  console.log(this.toString())
	}


/***/ },
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */
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
	let Table = __webpack_require__(30);
	class ListCommand {
	    constructor(store) {
	        this.store = store;
	    }
	    execute() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return new Promise((resolve, reject) => {
	                this.store.initialize()
	                    .then(() => {
	                    this.listItems();
	                    resolve();
	                })
	                    .catch((err) => {
	                    reject(err);
	                });
	            });
	        });
	    }
	    listItems() {
	        console.log("");
	        let t = new Table();
	        let templateList = this.store.getAll();
	        templateList.forEach((item, index, array) => {
	            t.cell(" ", index + 1);
	            t.cell("Name", item.name);
	            t.cell("Description", item.description);
	            t.cell("Ext", item.extension);
	            t.cell("Context", item.context);
	            // t.cell("Template", item._id);
	            t.newRow();
	        });
	        console.log(t.toString());
	    }
	}
	exports.ListCommand = ListCommand;


/***/ }
/******/ ]);
//# sourceMappingURL=index-list.js.map