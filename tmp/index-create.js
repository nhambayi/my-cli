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
	const fs = __webpack_require__(2);
	const SerializationHelper_1 = __webpack_require__(3);
	const Template_1 = __webpack_require__(4);
	const TemplateDatabase_1 = __webpack_require__(5);
	const crypto = __webpack_require__(6);
	console.log("Creating...");
	class CreateCommandArguments {
	}
	class CreateCommand {
	    CreateTemplate(commandArgs) {
	        crypto.randomBytes(12, function (err, buffer) {
	            const token = buffer.toString("hex");
	            fs.readFile(`${commandArgs.templateRootFolder}/.template-index.json`, "utf8", function (err, data) {
	                if (err) {
	                    return console.log(err);
	                }
	                const db = SerializationHelper_1.SerializationHelper.toInstance(new TemplateDatabase_1.TemplateDatabase(), data);
	                const templates = db.templates.filter(item => item.id === commandArgs.templateName);
	                if (templates.length === 0) {
	                    let template = new Template_1.Template();
	                    template.name = token;
	                    template.id = commandArgs.templateName;
	                    db.templates.push(template);
	                    fs.createReadStream(commandArgs.sourceFilePath)
	                        .pipe(fs.createWriteStream(commandArgs.templateRootFolder + "/templates/" + token));
	                    fs.writeFile(commandArgs.templateRootFolder + "/.template-index.json", JSON.stringify(db), function (err) {
	                        if (err) {
	                            return console.log(err);
	                        }
	                    });
	                }
	                else {
	                    console.log("Template already exists");
	                }
	            });
	        });
	    }
	    ValidateArguments(args) {
	        return false;
	    }
	}


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	class SerializationHelper {
	    static toInstance(obj, json) {
	        let jsonObj = JSON.parse(json);
	        if (typeof obj["fromJSON"] === "function") {
	            obj["fromJSON"](jsonObj);
	        }
	        else {
	            for (let propName in jsonObj) {
	                obj[propName] = jsonObj[propName];
	            }
	        }
	        return obj;
	    }
	}
	exports.SerializationHelper = SerializationHelper;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	class Template {
	    get id() {
	        return this._id;
	    }
	    set id(value) {
	        this._id = value;
	    }
	}
	exports.Template = Template;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	class TemplateDatabase {
	    initialize() {
	    }
	}
	exports.TemplateDatabase = TemplateDatabase;


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ }
/******/ ]);
//# sourceMappingURL=index-create.js.map