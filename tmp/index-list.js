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
	const TemplateStore_1 = __webpack_require__(58);
	const TemplateStoreConfiguration_1 = __webpack_require__(71);
	const FileStore_1 = __webpack_require__(72);
	const Logger_1 = __webpack_require__(73);
	const ListCommand_1 = __webpack_require__(81);
	console.log("Listing...");
	const config = new TemplateStoreConfiguration_1.TemplateStoreConfiguration();
	const fileStore = new FileStore_1.FileStore();
	const logger = new Logger_1.Logger();
	const store = new TemplateStore_1.TemplateStore(config, fileStore, logger);
	const command = new ListCommand_1.ListCommand(store);
	command.execute();


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
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
/* 41 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
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
/* 58 */
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
	const db = __webpack_require__(60);
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
	                        this.database = db.connect(this.configuration.templateIndexPath);
	                        this.templateCollection = this.database.loadCollections([Constants_1.TEMPLATES_COLLECTION_NAME]);
	                    });
	                }
	                else {
	                    this.database = db.connect(this.configuration.templateIndexPath);
	                    this.database.loadCollections([Constants_1.TEMPLATES_COLLECTION_NAME]);
	                    this.templateCollection = this.database[Constants_1.TEMPLATES_COLLECTION_NAME];
	                }
	            });
	        });
	    }
	}
	exports.TemplateStore = TemplateStore;


/***/ },
/* 59 */
/***/ function(module, exports) {

	"use strict";
	exports.INDEX_FOLDER_NAME = "templateindex";
	exports.TEMPLATES_COLLECTION_NAME = "templates";
	exports.ROOT_FOLDER_NAME = ".my-templates";


/***/ },
/* 60 */
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
	var path = __webpack_require__(41),
	    c = __webpack_require__(61),
	    e = c.red,
	    s = c.green;
	
	//local modules
	var util = __webpack_require__(65);
	
	
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
	                this[_c] = new __webpack_require__(68)('./collection')(this, _c);
	            }
	        } else {
	            console.log(e('Invalid Collections Array.', 'Expected Format : ', '[\'collection1\',\'collection2\',\'collection3\']'));
	        }
	        return this;
	    }
	
	};
	
	module.exports = db;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansi = __webpack_require__(62);
	var stripAnsi = __webpack_require__(63);
	var hasColor = __webpack_require__(64);
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
/* 62 */
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
/* 63 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, '') : str;
	};


/***/ },
/* 64 */
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * diskDB
	 * http://arvindr21.github.io/diskDB
	 *
	 * Copyright (c) 2014 Arvind Ravulavaru
	 * Licensed under the MIT license.
	 */
	
	/*jshint -W027*/
	var fs = __webpack_require__(1);
	var merge = __webpack_require__(66);
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
/* 66 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(67)(module)))

/***/ },
/* 67 */
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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./collection": 69,
		"./collection.js": 69,
		"./diskdb": 60,
		"./diskdb.js": 60,
		"./util": 65,
		"./util.js": 65
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
	webpackContext.id = 68;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * diskDB
	 * http://arvindr21.github.io/diskDB
	 *
	 * Copyright (c) 2014 Arvind Ravulavaru
	 * Licensed under the MIT license.
	 */
	
	var util = __webpack_require__(65),
	    path = __webpack_require__(41),
	    uuid = __webpack_require__(70);
	
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
/* 70 */
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
	        var _rb = __webpack_require__(5).randomBytes;
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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Constants_1 = __webpack_require__(59);
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
/* 72 */
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
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const chalk = __webpack_require__(74);
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var escapeStringRegexp = __webpack_require__(75);
	var ansiStyles = __webpack_require__(76);
	var stripAnsi = __webpack_require__(77);
	var hasAnsi = __webpack_require__(79);
	var supportsColor = __webpack_require__(80);
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
/* 75 */
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
/* 76 */
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(67)(module)))

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(78)();
	
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};


/***/ },
/* 78 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function () {
		return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
	};


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(78);
	var re = new RegExp(ansiRegex().source); // remove the `g` flag
	module.exports = re.test.bind(re);


/***/ },
/* 80 */
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
/* 81 */
/***/ function(module, exports) {

	"use strict";
	class ListCommand {
	    constructor(store) {
	        this.store = store;
	    }
	    execute() {
	        this.store.initialize()
	            .then(this.listItems)
	            .catch((err) => { console.log(err); });
	    }
	    listItems() {
	        console.log("Done.");
	    }
	}
	exports.ListCommand = ListCommand;


/***/ }
/******/ ]);
//# sourceMappingURL=index-list.js.map